const express = require("express");
const router = express.Router({ mergeParams: true });

const { getLogs } = require("../controllers/logController");

router.get("/", getLogs);

module.exports = router;