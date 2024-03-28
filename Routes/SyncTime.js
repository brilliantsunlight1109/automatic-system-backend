const express = require("express");
const router = express.Router();

const { putSyncTime, getSyncTime } = require("../Controllers/SyncTime");

router.put("/", putSyncTime);
router.get("/", getSyncTime);

module.exports = router;
