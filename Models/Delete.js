const mongoose = require("mongoose");

const DeleteSchema = new mongoose.Schema({
  state: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Delete = mongoose.model("Delete", DeleteSchema);

module.exports = Delete;
