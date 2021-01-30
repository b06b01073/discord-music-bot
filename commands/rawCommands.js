module.exports = {
  name: "rawCommands",
  description: "Handle raw commands",
  execute(message, raw) {
    if (raw === "哭啊") {
      message.reply("你是在哭吧");
      return true;
    }
    if (raw === "好") {
      message.reply("好");
      return true;
    }
    if (raw.startsWith("嚶")) {
      message.reply("嚶嚶嚶");
      return true;
    }
    if (raw.startsWith("哈")) {
      message.reply("嘻嘻");
      return true;
    }
    if (raw.startsWith("嘻嘻")) {
      message.reply("哈");
      return true;
    }

    return false;
  },
};
