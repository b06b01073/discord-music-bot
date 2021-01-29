const dotenv = require("dotenv");
const Discord = require("discord.js");
const fs = require("fs");
const express = require("express");
const app = express();
dotenv.config();

let port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  token = process.env.TOKEN;
  prefix = process.env.PREFIX;

  //client is an instance of the Client class
  const client = new Discord.Client();
  client.commands = new Discord.Collection();
  client.queue = [];

  // console.log(process.env.TOKEN);

  client.once("ready", async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    const commandFiles = fs
      .readdirSync("./commands")
      .filter((fileName) => fileName.endsWith(".js"));

    for (let commandFile of commandFiles) {
      let file = require(`./commands/${commandFile}`);
      client.commands.set(file.name, file);
    }
  });

  client.on("message", async (message) => {
    console.log(`[${message.author.tag}]:　${message.content}`);

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
    if (raw === "叔叔") {
      message.channel.send(
        `巨槌瑞斯` +
          `
      ⠄⠄⠄⠄⠄⠄⠄⠈⠉⠁⠈⠉⠉⠙⠿⣿⣿⣿⣿⣿
      ⠄⠄⠄⠄⠄⠄⠄⠄⣀⣀⣀⠄⠄⠄⠄⠄⠹⣿⣿⣿ 
      ⠄⠄⠄⠄⠄⢐⣲⣿⣿⣯⠭⠉⠙⠲⣄⡀⠄⠈⢿⣿
      ⠐⠄⠄⠰⠒⠚⢩⣉⠼⡟⠙⠛⠿⡟⣤⡳⡀⠄⠄⢻
      ⠄⠄⢀⣀⣀⣢⣶⣿⣦⣭⣤⣭⣵⣶⣿⣿⣏⠄⠄⣿
      ⠄⣼⣿⣿⣿⡉⣿⣀⣽⣸⣿⣿⣿⣿⣿⣿⣿⡆⣀⣿
      ⢠⣿⣿⣿⠿⠟⠛⠻⢿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣼
      ⠄⣿⣿⣿⡆⠄⠄⠄⠄⠳⡈⣿⣿⣿⣿⣿⣿⣿⣿⣿
      ⠄⢹⣿⣿⡇⠄⠄⠄⠄⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
      ⠄⠄⢿⣿⣷⣨⣽⣭⢁⣡⣿⣿⠟⣩⣿⣿⣿⠿⠿⠟
      ⠄⠄⠈⡍⠻⣿⣿⣿⣿⠟⠋⢁⣼⠿⠋⠉⠄⠄⠄⠄
      ⠄⠄⠄⠈⠴⢬⣙⣛⡥⠴⠂⠄⠄⠄⠄⠄⠄⠄⠄⠄`
      );
    }
    if (raw.startsWith("嚶")) {
      message.reply("嚶嚶嚶");
    }

    // parsing command
    const args = message.content.slice(prefix.length).trim().split(/\s+/);
    const command = args.shift().toLowerCase();
    // finish paring command

    const commands = new Discord.Collection();

    if (!raw.startsWith(prefix)) return;

    // reading command files from commands folder

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
    } else if (command === "play") {
      if (client.commands.has("play")) {
        try {
          client.commands.get("play").execute(message, args);
        } catch (err) {
          message.channel.send(
            `> error occured with message \`\`\`${err}\`\`\``
          );
        }
      }
    } else if (command === "quit") {
      if (client.commands.has("quit")) {
        client.commands.get("quit").execute(message, args);
      }
    }
  });

  client.login(token);
  res.send("connected");
});

app.listen(port, () => {
  console.log(`App is running at port: ${port}`);
});
