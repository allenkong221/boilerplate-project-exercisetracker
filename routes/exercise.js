const express = require("express");
const router = express.Router({ mergeParams: true });
const { createExercise } = require("../controllers/exerciseController");

router.post("/", createExercise);

module.exports = router;