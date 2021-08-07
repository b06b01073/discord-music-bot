# discord-bot
這是一個discord機器人的app，最主要的功能是可以在對此bot輸入特定訊息後讓這個機器人到youtube上面抓音樂並在語音頻道撥放。

主要是使用DiscordJS的API做出來的，搭配了簡單的mongodb讓使用者可以與機器人互動。

## Start Server

```javascript
// require the discord.js module
const Discord = require("discord.js");

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once("ready", () => {
  console.log("Ready!");
});

// login to Discord with your app's token
client.login("your-token-goes-here");
```

note: client.once 與 client.on 的差別在於前者只會執行一次，後者會持續執行

## 儲存一些變數的方法

建立一個`config.json`檔

```javascript
//config.json
{
	"prefix": "!",
	"token": "your-token-goes-here"
}
```

```javascript
//index.js
const config = require("./config.json");
```

就可以在 index.js 透過`config.variable`中使用這些變數

## 監聽訊息的方法

msg.content 就是在 discord 輸入的訊息，(startsWith 是 javascript 本身的 function，回傳 true/false)

```javascript
client.on("message", (msg) => {
  if (msg.content.startsWith(`${prefix}ping`)) {
    msg.channel.send("pong");
  } else if (msg.content.startsWith(`${prefix}beep`)) {
    msg.channel.send(`the server name is ${msg.guild.name}`);
  } else {
    console.log("no match");
  }
});
```

在上面的 code 中，如果輸入:

- `!ping`
- `!ping test`

bot 都會回傳`pong`到聊天室當中(透過`msg.channel.send`方法)

在使用 command 給 bot 的時候要區分這個 command 可不可以中間有空白。
不行的話在 if 判斷式當中就要直接用`msg.content === some-message`來接收訊息

## 在訊息中吃引數的方法

```javascript
// client.on('message', message => {

//(如果msg開頭不是當初說好的prefix就跳過 || 如果這則msg是由機器人本身所發出的) => return
if (!message.content.startsWith(prefix) || message.author.bot) return;

const args = message.content.slice(prefix.length).trim().split(" ");
const command = args.shift().toLowerCase();
// the rest of your code
```

1. If the message either doesn't start with the prefix or was sent by a bot, exit early.
1. Create an args variable that slices off the prefix entirely, removes the leftover whitespaces and then splits it into an array by spaces.
1. Create a command variable by calling `args.shift()`, which will take the first element in array and return it while also removing it from the original array (so that you don't have the command name string inside the args array).

關於上面 code 的一些補充:

1. [slice](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)，將 prefix 給去掉
1. [trim](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)，把一個字串的頭尾空白去掉
1. [split](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split)，把一個字串依照 split 的參數進行切割，回傳一個字串的陣列
1. [shift](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split)，回傳 array 的第一個元素並移除。

一般我們輸入 command 給機器人的方式為:

!command arg1, arg2, ...

所以上面的 code 會把:

1. 確定這個 command 有對的 prefix, 並且不是由機器人所送出了
2. 把左邊的驚嘆號拆掉
3. 確定整個 command 沒有 leading 跟 trailing spaces
4. split 整個 command，這時候的 args 陣列長得像\[command, arg1, arg2, ...\]
5. 把第一個抓出來當作 command

接下來我們就可以分別對 command 以及 arg 做出相對應的處理。
