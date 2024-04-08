const mongoose = require("mongoose");

const ServerControlSchema = new mongoose.Schema({
  style_tokyo_id: {
    type: String,
  },
  delete_sync_time: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const ServerControl = mongoose.model("ServerControl", ServerControlSchema);

module.exports = ServerControl;
