const express = require("express");
const router = express.Router();

// const {
//   getServer,
//   StyleServerStart,
//   StyleServerStop,
//   BlogServerStart,
//   BlogServerStop,
// } = require("../Controllers/ServerControl");

// router.get("/", getServer);
// router.put("/styleserverstart", StyleServerStart);
// router.put("/styleserverstop", StyleServerStop);
// router.put("/blogserverstart", BlogServerStart);
// router.put("/blogserverstop", BlogServerStop);

const {
  upsertServerControl,
  getIdServerControl,
  getServerControl,
} = require("../Controllers/ServerControl");
router.post("/delete_time", upsertServerControl);
router.get("/:style_tokyo_id", getIdServerControl);
router.get("/", getServerControl);

module.exports = router;
