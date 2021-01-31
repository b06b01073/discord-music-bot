const dotenv = require("dotenv");
const fs = require("fs");
const express = require("express");
const path = require("path");
const rawCommands = require(path.resolve(__dirname, "commands", "rawCommands"));
const app = express();
dotenv.config();
let port = process.env.PORT || 4000;
let hasStart = false;
const Discord = require("discord.js");

// 這邊目前有一個問題是，不同的伺服器給bot指令時會混在一起，一個解決辦法是帶入mongo db來分別記錄
app.get("/", (req, res) => {
  if (hasStart) return res.sendFile(path.resolve(__dirname, "index.html"));
  else hasStart = true;

  token = process.env.BOT_TOKEN;
  prefix = process.env.PREFIX;

  //client is an instance of the Client class
  const client = new Discord.Client();
  client.commands = new Discord.Collection();
  client.queue = [];
  client.title = [];
  client.isWaiting = false;

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

    if (rawCommands.execute(message, raw)) return;

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
    } else if (command === "play" || command === "p" || command === "t") {
      if (client.commands.has("play")) {
        try {
          client.isWaiting = await client.commands
            .get("play")
            .execute(
              message,
              args,
              client.queue,
              client.title,
              client.isWaiting
            );
        } catch (err) {
          message.channel.send(
            `> error occured with message \`\`\`${err}\`\`\``
          );
        }
      }
    } else if (command === "quit" || command === "q") {
      if (client.commands.has("quit")) {
        client.queue = [];
        client.title = [];
        client.commands.get("quit").execute(message, args);
      }
    } else if (command === "skip" || command === "s") {
      if (client.commands.has("skip")) {
        client.commands.get("skip").execute(message, args, client.title);
      }
    } else if (command === "list" || command === "ls" || command === "l") {
      if (client.commands.has("list")) {
        client.commands.get("list").execute(message, client.title);
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
