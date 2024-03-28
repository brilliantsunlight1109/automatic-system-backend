const mongoose = require("mongoose");

const ServerControlSchema = new mongoose.Schema({
  style: {
    type: Boolean,
  },
  blog: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const ServerControl = mongoose.model("ServerControl", ServerControlSchema);

module.exports = ServerControl;
