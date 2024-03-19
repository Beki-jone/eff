
const express = require("express");
const {
  postQuestions,
  allQuestions,
  singleQuestions,
} = require("../controller/questionContoller");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
//post questions routes
router.post("/post_question",authMiddleware, postQuestions);
//all questions routesz
router.get("/all-questions",authMiddleware, allQuestions);
//single questions routes
router.get("/question/:questionid",authMiddleware, singleQuestions);{
  
}
module.exports = router;