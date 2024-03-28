const mongoose = require("mongoose");

const SyncTimeSchema = new mongoose.Schema({
  sync_start_time: {
    type: String,
  },
  sync_end_time: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const SyncTime = mongoose.model("SyncTime", SyncTimeSchema);

module.exports = SyncTime;
