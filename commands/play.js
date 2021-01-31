const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const validUrl = require("valid-url");
const path = require("path");
const { google } = require("googleapis");
const { title } = require("process");
const isValidIndex = require(path.resolve(
  __dirname,
  "utils",
  "isValidIndex.js"
));
const idParser = require(path.resolve(__dirname, "utils", "idParser.js"));

// test music https://www.youtube.com/watch?v=QF08nvtHHCY&ab_channel=Black%26White

const playMusic = async (url, connection, queue, title, message) => {
  const stream = await ytdl(url, {
    filter: "audioonly",
    quality: "highestaudio",
  });

  const id = idParser(url);

  await google
    .youtube("v3")
    .videos.list({
      key: process.env.YOUTUBE_KEY,
      part: "snippet",
      id: id,
    })
    .then((res) => {
      const songTitle = res.data.items[0].snippet.title;
      title.push(songTitle);
      message.reply(`**${songTitle}** is added to the list!`);
    })
    .catch((err) => console.log(err));

  queue.push(stream);
  if (queue.length === 1) {
    play(connection, queue, title);
  }
};

// use recursion to play songs, what about iterative solution(?).
const play = (connection, queue, title) => {
  if (!queue.length) return;
  connection.play(queue[0], { seek: 0, volumn: 1 }).on("finish", () => {
    queue.shift();
    title.shift();
    play(connection, queue, title);
  });
};

module.exports = {
  name: "play",
  description: "Play a song from Youtube",
  example: "!play <Youtube link | keyword>",
  candidates: [],
  async execute(message, args, queue, title, isWaiting) {
    //isWaiting 代表使用者使用關鍵字查過影片，但是還沒有從中選歌
    // note that this queue is from index.js
    const channel = message.member.voice.channel;

    if (!channel) {
      return message.reply("You need to be in a voice channel!");
    }

    if (!args.length) {
      return message.reply("Argument is required!!!");
    }

    if (args[0] === "help" || args[0] === "h") {
      message.channel.send("Description: " + this.description);
      message.channel.send("`" + this.example + "`");
      return;
    }

    // make the bot join the channel
    const connection = await channel.join();

    const isValidUrl = validUrl.isHttpsUri(args[0]); // return original url if it is valid, otherwise return undefined

    if (isValidUrl) {
      try {
        playMusic(args[0], connection, queue, title, message);
      } catch (err) {
        message.channel.send(`error occurred with error message: ${err}`);
      }

      // 使用url播放不影響另外一個播歌方式
      return isWaiting;
    } else {
      if (isWaiting && isValidIndex(args, this.candidates.length)) {
        const index = Number(args[0]);
        playMusic(
          this.candidates[index - 1],
          connection,
          queue,
          title,
          message
        );

        //如果從目前的選擇清單選擇了，就清空目前的選擇清單，並且將目前的狀態改為沒有在等待
        //目前的問題是，如果多人一起輸入的話會出問題
        this.candidates = [];
        return false;
      } else {
        const searchMusic = async (query) => {
          const videoResult = await ytSearch(query);

          let msg = []; // message of search result

          for (let i = 0; i < Math.min(5, videoResult.videos.length); i++) {
            msg.push(`${i + 1}. ${videoResult.videos[i].title}`);
          }

          message.channel.send(msg);

          return Object.keys(videoResult).length
            ? videoResult.videos.slice(0, 5)
            : null;
        };

        const video = await searchMusic(args.join(" "));

        if (!video) {
          message.reply("No results found :grinning:");

          // 如果用新的關鍵字沒有找到歌，就不更新等待狀態跟選擇清單
          return isWaiting;
        }
        message.channel.send(`> 使用 !p + 數字 來選歌`);
        // 如果用新的關鍵字找到了新歌，就清空目前的選擇清單重新填入，然後將等待狀態設成true
        this.candidates = [];
        video.forEach((v) => this.candidates.push(v.url));
        return true;
      }
    }
  },
};
