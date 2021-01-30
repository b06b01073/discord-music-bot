module.exports = {
  name: "list",
  description: "Show the current playlist.",
  execute(message, title) {
    let result = "";
    console.log(title);

    if (title.length === 0) {
      return message.reply("Playlist is empty : (");
    }

    result += "目前的播放清單\n";

    for (let i = 0; i < title.length; i++) {
      if (i == 0) result += `**${i + 1}. ${title[i]}**\n`;
      else result += `${i + 1}. ${title[i]}\n`;
    }

    message.channel.send(result);
  },
};
