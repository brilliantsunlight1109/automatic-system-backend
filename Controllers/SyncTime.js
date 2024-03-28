const SyncTime = require("../Models/SyncTime");

module.exports.putSyncTime = (req, res) => {
  console.log("req: ", req.body);
  SyncTime.findOneAndUpdate({}, req.body)
    .then((data) => res.json({ message: "Stylist successfully updated", data }))
    .catch((err) => {
      res
        .status(400)
        .json({ message: "Failed to update stylist", error: err.message });
    });
};

module.exports.getSyncTime = (req, res) => {
  SyncTime.find()
    .then((data) => res.json(data))
    .catch((err) => {
      res
        .status(404)
        .json({ message: "SyncTime not found", error: err.message });
    });
};

// SyncTime.findOneAndUpdate({}, req.body)
// SyncTime.create(req.body)
