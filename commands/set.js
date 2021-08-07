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

    let originalCustomMessage;
    await CustomMessage.findOne({ message: args[0] }, (err, customMessage) => {
      if (err) {
        message.reply(err);
        console.log(err);
        return;
      }
      originalCustomMessage = customMessage;
    });

    if (originalCustomMessage !== null) {
      await CustomMessage.findOneAndUpdate(
        { message: args[0] },
        { response: args[1] },
        (err) => {
          if (err) {
            return message.reply("創建失敗: ", err);
          } else {
            return message.reply(
              `修改成功: \`message: ${args[0]}, response: ${originalCustomMessage.response} -> ${args[1]}\``
            );
          }
        }
      );
    } else {
      await CustomMessage.create(
        { message: args[0], response: args[1] },
        (err) => {
          if (err) {
            console.log(err);
            return message.reply("創建失敗: ", err);
          } else {
            return message.reply("創建成功");
          }
        }
      );
    }
  },
};
