const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const questionsFilePath = "./question_paper.json";

// Function to read questions from JSON file
function getQuestions() {
  const data = fs.readFileSync(questionsFilePath);
  return JSON.parse(data);
}

// Function to calculate limit based on percentage
function calculateLimit(totalMarks, percentage) {
  return Math.floor((totalMarks * percentage) / 100);
}

// Endpoint to generate question paper
app.post("/generate-paper", (req, res) => {
  const { totalMarks, easyPercent, mediumPercent, hardPercent } = req.body;
  const allQuestions = getQuestions();

  // Filter and select questions based on difficulty and marks
  const selectedQuestions = {
    easy: [],
    medium: [],
    hard: [],
  };

  allQuestions.forEach((question) => {
    if (
      question.difficulty === "Easy" &&
      selectedQuestions.easy.reduce((acc, q) => acc + q.marks, 0) <
        calculateLimit(totalMarks, easyPercent)
    ) {
      selectedQuestions.easy.push(question);
    } else if (
      question.difficulty === "Medium" &&
      selectedQuestions.medium.reduce((acc, q) => acc + q.marks, 0) <
        calculateLimit(totalMarks, mediumPercent)
    ) {
      selectedQuestions.medium.push(question);
    } else if (
      question.difficulty === "Hard" &&
      selectedQuestions.hard.reduce((acc, q) => acc + q.marks, 0) <
        calculateLimit(totalMarks, hardPercent)
    ) {
      selectedQuestions.hard.push(question);
    }
  });

  res.json({
    totalMarks,
    questions: [
      ...selectedQuestions.easy,
      ...selectedQuestions.medium,
      ...selectedQuestions.hard,
    ],
  });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
