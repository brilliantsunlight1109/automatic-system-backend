const ServerControl = require("../Models/ServerControl");

module.exports.upsertServerControl = (req, res) => {
  console.log("req: ", req.body);
  const { style_tokyo_id, delete_sync_time } = req.body;
  ServerControl.updateOne(
    { style_tokyo_id },
    { delete_sync_time },
    { upsert: true }
  )
    .then((data) =>
      res.json({ message: "ServerCotrol added successfully", data })
    )
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Failed to add ServerCotrol", error: err.message })
    );
};

module.exports.getIdServerControl = (req, res) => {
  const style_tokyo_id = req.params.style_tokyo_id;
  ServerControl.findOne({ style_tokyo_id: style_tokyo_id })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Coupon not found" });
      }
      res.json(data);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error fetching Coupon", error: err.message });
    });
};

module.exports.getServerControl = (req, res) => {
  ServerControl.find()
    .then((data) => res.json(data))
    .catch((err) =>
      res
        .status(404)
        .json({ message: "servercontrol not find", error: err.message })
    );
};
// const ServerControl = require("../Models/ServerControl");
// const { spawn } = require("child_process");
// const path = require("path");
// let childProcess5000;
// let childProcess5001;
// let childProcess5002;

// module.exports.getServer = (req, res) => {
//   ServerControl.find()
//     .then((data) => res.json(data))
//     .catch((err) => {
//       res
//         .status(404)
//         .json({ message: "get servercontrol", error: err.message });
//     });
// };

// module.exports.StyleServerStart = (req, res) => {
//   console.log("req: ", req.body);
//   ServerControl.findOneAndUpdate({}, req.body)
//     .then((data) => res.json({ message: "Style server start", data }))
//     .catch((err) => {
//       res
//         .status()
//         .json({ message: "Failed style server start", error: err.message });
//     });

//   // if (!childProcess5000) {
//   //   const startScriptPath = path.join(__dirname, "../../main.js");
//   //   childProcess5000 = spawn("node", [startScriptPath], {
//   //     stdio: [0, 1, 2, "ipc"],
//   //   });
//   //   console.log("Child process 5000 started");

//   //   childProcess5000.on("exit", (code) => {
//   //     console.log(`Child process 5000 exited with code ${code}`);
//   //     childProcess5000 = null;
//   //   });
//   // } else {
//   //   console.log("Child process 5000 is already running");
//   // }
// };

// module.exports.StyleServerStop = (req, res) => {
//   console.log("req: ", req.body);
//   ServerControl.findOneAndUpdate({}, req.body)
//     .then((data) => res.json({ message: "Style server stop", data }))
//     .catch((err) => {
//       res
//         .status()
//         .json({ message: "Failed style server stop", error: err.message });
//     });
// };

// module.exports.BlogServerStart = (req, res) => {
//   console.log("req: ", req.body);
//   ServerControl.findOneAndUpdate({}, req.body)
//     .then((data) => res.json({ message: "blog server start", data }))
//     .catch((err) => {
//       res
//         .status()
//         .json({ message: "Failed blog server start", error: err.message });
//     });
// };

// module.exports.BlogServerStop = (req, res) => {
//   console.log("req: ", req.body);
//   ServerControl.findOneAndUpdate({}, req.body)
//     .then((data) => res.json({ message: "blog server stop", data }))
//     .catch((err) => {
//       res
//         .status()
//         .json({ message: "Failed blog server stop", error: err.message });
//     });
// };

// // StyleServerStart.findOneAndUpdate({}, req.body)
