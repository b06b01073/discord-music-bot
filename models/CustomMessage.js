const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomMessageSchema = new Schema({
  message: {
    type: String,
    required: true,
    unique: true,
  },
  response: String,
});

const CustomMessage = mongoose.model("CustomMessage", CustomMessageSchema);

module.exports = CustomMessage;
