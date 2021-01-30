const { VoiceChannel } = require("discord.js");

module.exports = {
  name: "quit",
  description: "Make bot quit from current voice channel",
  async execute(message, args) {
    const channel = message.member.voice.channel;

    if (!channel) {
      return message.reply("You need to be in a voice channel first");
    }

    await channel.leave();
    await message.channel.send(`小吉離開了 **${channel.name}** 頻道`);
  },
};
