const express = require("express");
const router = express.Router();

const { post_answer, all_answer } = require("../controller/answerController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/postanswer/:questionid",authMiddleware, post_answer);
router.get("/allanswer/:questionid",authMiddleware, all_answer);

module.exports = router;