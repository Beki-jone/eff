require("dotenv").config();
const express = require("express");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;
// Enable CORS for all routes
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const dbConnection = require("./db/dbConfig");
const userRoutes = require("./routes/userRoute");
const questionRoutes = require("./routes/questionRoute");
const answerRoutes = require("./routes/answerRoute");

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);

async function start() {
  try {
    await dbConnection(); // Assuming dbConnection is an async function that establishes the database connection
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1); // Exit the process if there's an error
  }
}

start();