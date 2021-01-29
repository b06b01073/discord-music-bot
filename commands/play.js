const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const validUrl = require("valid-url");

const playMusic = (url, connection, channel) => {
  const stream = ytdl(url, { filter: "audioonly" });
  console.log(stream);

  connection.play(stream, { seek: 0, volume: 1 }).on("finish", () => {
    channel.leave();
  });
};

module.exports = {
  name: "play",
  description: "Play a song from Youtube",
  example: "!play <Youtube link | keyword>",
  async execute(message, args) {
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
        return playMusic(args[0], connection, channel);
      } catch (err) {
        return message.channel.send(
          `message occurred with error message: ${err}`
        );
      }
    } else {
      const searchMusic = async (query) => {
        const videoResult = await ytSearch(query);

        return Object.keys(videoResult).length ? videoResult.videos[0] : null;
      };

      const video = await searchMusic(args.join(" "));

      if (video) {
        await message.reply(`Now playing ${video.title}`);
        return playMusic(video.url, connection, channel);
      }
    }

    return message.reply("No results found :grinning:");
  },
};
