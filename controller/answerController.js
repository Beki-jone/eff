// Importing the StatusCodes object from the "http-status-codes" package to easily reference HTTP status codes
const { StatusCodes } = require("http-status-codes");

// Importing the database connection from the "../db/dbConfig" file
const dbConnection = require("../db/dbConfig");

// Post answer function definition, handling the route for posting an answer to a question
async function post_answer(req, res){
  // Destructuring the answer field from the request body
  const { answer } = req.body;
  // Extracting the questionid from the request parameters
  const questionid = req.params.questionid;
  // Extracting the userid from the authenticated user object attached to the request
  const { userid } = req.user;

  // Checking if the answer field is missing in the request body
  if (!answer) {
    // Returning a Bad Request response if the answer field is missing
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Provide answer field" });
  }
  try {
    // Executing an SQL query to insert the answer into the database
    await dbConnection.query(
      "INSERT INTO answers (userid, questionid, answer) VALUES (?, ?, ?)",
      [userid, questionid, answer]
    );

    // Returning a successful response after posting the answer
    return res.status(StatusCodes.OK).json({ msg: "Answer posted successfully" });
  } catch (error) {
    // Logging any error that occurred during the database operation
    console.log(error.message);
    // Returning an Internal Server Error response if an error occurred
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong. Please try again later" });
  }
};

// Get all answers function definition, handling the route for fetching all answers to a question
async function all_answer(req, res){
  // Extracting the questionid from the request parameters
  const questionid = req.params.questionid;

  try {
    // Executing an SQL query to retrieve all answers along with the username of the users who posted them
    const [answer] = await dbConnection.query(
      "SELECT answer, username FROM answers JOIN users ON answers.userid = users.userid WHERE questionid = ?",
      [questionid]
    );

    // Returning the retrieved answers along with usernames in the response
    return res.status(StatusCodes.OK).json({ answer });
  } catch (error) {
    // Logging any error that occurred during the database operation
    console.log(error.message);
    // Returning an Internal Server Error response if an error occurred
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong. Please try again later" });
  }
};

// Exporting the post_answer and all_answer functions to be used in other modules
module.exports = { post_answer, all_answer };
