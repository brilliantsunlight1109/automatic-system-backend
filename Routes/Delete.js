const express = require("express");
const router = express.Router();

const { Start, Get } = require("../Controllers/Delete");

router.put("/start", Start);
router.get("/", Get);

module.exports = router;
