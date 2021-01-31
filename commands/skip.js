const { BroadcastDispatcher } = require("discord.js");

module.exports = {
  name: "skip",
  description: "skip the current song",
  async execute(message, args, title) {
    const channel = message.member.voice.channel;
    if (!channel) {
      return message.reply("You need to be in a voice channel!");
    }

    // According to the official guide, nothing will be done if the bot is already join in that server, so don't worry about running this method repeatedly, WARNING: remember the async-await to make sure we get the connection object correctly
    const connection = await channel.join();

    if (connection.dispatcher) {
      connection.dispatcher.end();
      message.channel.send(`${title[0]} 已經被跳過`);
      title.shift();
    }
  },
};
