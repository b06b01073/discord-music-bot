const dotenv = require("dotenv");
const Discord = require("discord.js");
const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
dotenv.config();

let port = process.env.PORT || 4000;
let hasStart = false;

app.get("/", (req, res) => {
  if (hasStart) return res.sendFile(path.resolve(__dirname, "index.html"));
  else hasStart = true;

  token = process.env.BOT_TOKEN;
  prefix = process.env.PREFIX;

  //client is an instance of the Client class
  const client = new Discord.Client();
  client.commands = new Discord.Collection();
  client.queue = [];

  // console.log(process.env.TOKEN);

  client.once("ready", async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // reading command files from commands folder
    const commandFiles = fs
      .readdirSync(path.resolve(__dirname, "commands"))
      .filter((fileName) => fileName.endsWith(".js"));

    for (let commandFile of commandFiles) {
      let file = require(path.resolve(__dirname, "commands", commandFile));
      client.commands.set(file.name, file);
    }
  });

  client.on("message", async (message) => {
    // 在server端記錄所有訊息
    console.log(`[${message.author.tag}]:　${message.content}`);

    // 不接收由機器人發出的訊息
    if (message.author.bot) return;

    const raw = message.content;

    if (raw === "哭啊") {
      message.reply("你是在哭吧");
      return;
    }
    if (raw === "好") {
      message.reply("好");
      return;
    }
    if (raw.startsWith("嚶")) {
      message.reply("嚶嚶嚶");
    }
    if (raw.startsWith("哈")) {
      message.reply("嘻嘻");
    }
    if (raw.startsWith("嘻嘻")) {
      message.replay("哈");
    }

    // parsing command
    const args = message.content.slice(prefix.length).trim().split(/\s+/);
    const command = args.shift().toLowerCase();

    //確定command有prefix
    if (!raw.startsWith(prefix)) return;

    if (command === "ping") {
      if (client.commands.has("ping")) {
        try {
          client.commands.get("ping").execute(message, args);
        } catch (err) {
          message.channel.send(
            `> error occured with message \`\`\`${err}\`\`\``
          );
        }
      }
    } else if (command === "play" || command === "p") {
      if (client.commands.has("play")) {
        try {
          await client.commands
            .get("play")
            .execute(message, args, client.queue);
        } catch (err) {
          message.channel.send(
            `> error occured with message \`\`\`${err}\`\`\``
          );
        }
      }
    } else if (command === "quit" || command === "q") {
      if (client.commands.has("quit")) {
        client.queue = [];
        client.commands.get("quit").execute(message, args);
      }
    } else if (command === "skip" || command === "s") {
      if (client.commands.has("skip")) {
        client.commands.get("skip").execute(message, args);
      }
    } else if (command === "help" || command === "h") {
      message.reply(
        `You can check **https://chiwawabot.herokuapp.com/** for more info.`
      );
    }
  });

  client.login(token);
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`server is running at port: ${port}`);
});
