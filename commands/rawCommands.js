const path = require("path");
const CustomMessage = require(path.resolve(
  __dirname,
  "../models/CustomMessage"
));

module.exports = {
  name: "rawCommands",
  description: "Handle raw commands",
  async execute(message, raw) {
    if (raw === "哭啊") {
      return await message.reply("你是在哭吧");
    }
    if (raw === "好") {
      return await message.reply("好");
    }
    if (raw.startsWith("嚶")) {
      return await message.reply("嚶嚶嚶");
    }
    if (raw.startsWith("哈")) {
      return await message.reply("嘻嘻");
    }
    if (raw.startsWith("嘻嘻")) {
      return await message.reply("哈");
    }

    await CustomMessage.findOne({ message: raw }, (err, customMessage) => {
      if (err) {
        return console.log(err);
      } else {
        return message.reply(customMessage.response);
      }
    });
  },
};
