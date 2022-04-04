const dotenv = require("dotenv");
const fs = require("fs");
const express = require("express");
const path = require("path");
const rawCommands = require(path.resolve(__dirname, "commands", "rawCommands"));
const cors = require("cors");
const awake = require(path.resolve(__dirname, "awake.js"));
const app = express();
const Discord = require("discord.js");
const mongoose = require("mongoose");
const CustomMessage = require(path.resolve(
  __dirname,
  "./models/CustomMessage"
));

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => {
    console.log("MongoDB connected");
  }
);

let port = process.env.PORT || 4000;

awake();
app.use(cors());

// 這邊目前有一個問題是，不同的伺服器給bot指令時會混在一起，一個解決辦法是帶入mongo db來分別記錄

app.get("/getCommands", async (req, res) => {
  const commandList = await CustomMessage.find({}, (err, res) => {
    if (err) {
      return res
        .status(500)
        .send("Something went wrong, try to reload the page...");
    }
  });
  return res.send(commandList);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`server is running at port: ${port}`);
});

token = process.env.BOT_TOKEN;
prefix = process.env.PREFIX;

//client is an instance of the Client class
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.queue = [];
client.title = [];
client.userWaiting = new Map();

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  await client.user.setActivity("!help", {
    type: "PLAYING",
  });

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
  console.log(`[${message.author.tag}]: ${message.content}`);

  // 不接收由機器人發出的訊息
  if (message.author.bot) return;

  const userId = message.author.id;
  const raw = message.content;

  // parsing command
  const args = message.content.slice(prefix.length).trim().split(/\s+/);
  const command = args.shift().toLowerCase();

  //確定command有prefix
  if (!raw.startsWith(prefix)) {
    await rawCommands.execute(message, raw);
    return;
  }

  if (command === "ping") {
    if (client.commands.has("ping")) {
      try {
        client.commands.get("ping").execute(message, args);
      } catch (err) {
        message.channel.send(`> error occured with message \`\`\`${err}\`\`\``);
      }
    }
  } else if (command === "play" || command === "p") {
    if (client.commands.has("play")) {
      if (!client.userWaiting.has(userId)) {
        client.userWaiting.set(userId, false);
      }
      try {
        client.userWaiting.userId = await client.commands
          .get("play")
          .execute(message, args, client.queue, client.title, userId);
      } catch (err) {
        message.channel.send(`> error occured with message \`\`\`${err}\`\`\``);
      }
    }
  } else if (command === "quit" || command === "q") {
    if (client.commands.has("quit")) {
      client.queue = [];
      client.title = [];
      client.commands.get("quit").execute(message);
    }
  } else if (command === "skip" || command === "s") {
    if (client.commands.has("skip")) {
      client.commands.get("skip").execute(message, client.title);
    }
  } else if (command === "list" || command === "ls" || command === "l") {
    if (client.commands.has("list")) {
      client.commands.get("list").execute(message, client.title);
    }
  } else if (command === "help" || command === "h") {
    message.reply(
      `You can check **https://chiwawabot.herokuapp.com/** for more info.`
    );
  } else if (command === "set") {
    if (client.commands.has("set")) {
      await client.commands.get("set").execute(message, args);
    }
  }
});

client.on("voiceStateUpdate", async (oldState, newState) => {
  //如果前面沒有加入頻道，或在同一個頻道裡面操作，則不會影響
  if (
    oldState.channelID !== oldState.guild.me.voice.channelID ||
    newState.channelID === oldState.channelID
  )
    return;
  if (oldState.channel.members.size === 1) {
    client.queue = [];
    client.title = [];
    await oldState.channel.leave();
  }
});

client.login(token);
