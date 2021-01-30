const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const validUrl = require("valid-url");
const path = require("path");
const { google } = require("googleapis");
const { title } = require("process");
const idParser = require(path.resolve(__dirname, "utils", "idParser.js"));

// test music https://www.youtube.com/watch?v=QF08nvtHHCY&ab_channel=Black%26White

const playMusic = async (url, connection, queue, title, message) => {
  const stream = ytdl(url, { filter: "audioonly", quality: "highestaudio" });

  const id = idParser(url);

  google
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
  async execute(message, args, queue, title) {
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
        return playMusic(args[0], connection, queue, title, message);
      } catch (err) {
        return message.channel.send(
          `message occurred with error message: ${err}`
        );
      }
    } else {
      const searchMusic = async (query) => {
        const videoResult = await ytSearch(query);

        let msg = []; // message of search result

        // for (let i = 0; i < Math.min(5, videoResult.videos.length); i++) {
        //   msg.push(`${i + 1}. ${videoResult.videos[i].title}`);
        // }

        // message.channel.send(msg);

        return Object.keys(videoResult).length ? videoResult.videos[0] : null;
      };

      const video = await searchMusic(args.join(" "));

      if (video) {
        return playMusic(video.url, connection, queue, title, message);
      }
    }

    return message.reply("No results found :grinning:");
  },
};
