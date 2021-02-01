const fetch = require("node-fetch");

const awake = () => {
  setInterval(() => {
    fetch("https://chiwawabot.herokuapp.com/")
      .then(() => {
        console.log("awake");
      })
      .catch((err) => {
        console.log(err);
      });
  }, 1000 * 60 * 20);
};

module.exports = awake;
