const mongoose = require("mongoose");

const StylistSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  blog_identify_id: {
    type: String,
  },
  // furigana: {
  //   type: String,
  // },
  // stylist_assistant: {
  //   type: String,
  // },
  // sex: {
  //   type: String,
  // },
  // catch: {
  //   type: String,
  // },
  // self_introduction: {
  //   type: String,
  // },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Stylist = mongoose.model("Stylist", StylistSchema);

module.exports = Stylist;
