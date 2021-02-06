const path = require("path");
const CustomMessage = require(path.resolve(
  __dirname,
  "../models/CustomMessage"
));

module.exports = {
  name: "set",
  description: "let user set a custom message",
  async execute(message, args) {
    if (args.length !== 2) {
      return message.reply("This command requires two arguments");
    }
    await CustomMessage.create(
      {
        message: args[0],
        response: args[1],
      },
      (err, customMessage) => {
        if (err) {
          return message.reply("新增失敗，或許是這個指令已經被使用過了:(");
        }
      }
    );
  },
};
