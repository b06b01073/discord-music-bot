module.exports = {
  name: "ping",
  description: "a ping command",
  execute(message, args) {
    message.reply("pong");
  },
};
