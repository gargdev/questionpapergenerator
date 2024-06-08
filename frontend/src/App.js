/* App.js */
import React, { useState } from "react";
import "./App.css";

const initialQuestions = [
    // Your initial question data here...
];

function App() {
  const [formValues, setFormValues] = useState({
    totalMarks: "",
    easyPercent: "",
    mediumPercent: "",
    hardPercent: "",
  });
  const [questions, setQuestions] = useState(initialQuestions);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    subject: "",
    topic: "",
    difficulty: "Easy",
    marks: 5,
  });
  const [view, setView] = useState("home");
  const [feedback, setFeedback] = useState("");

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const response = await fetch("https://questionpapergenerator-backend.onrender.com/generate-paper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      const data = await response.json();
      setQuestions(data.questions);
      setView("paper");
      setFeedback("");
    } else {
      setFeedback("Please ensure the total percentage equals 100%.");
    }
  };

  const validateForm = () => {
    const totalPercent =
      parseInt(formValues.easyPercent) +
      parseInt(formValues.mediumPercent) +
      parseInt(formValues.hardPercent);
    return totalPercent === 100;
  };

  const handleNewQuestionChange = (e) => {
    setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    setQuestions([...questions, newQuestion]);
    setNewQuestion({
      question: "",
      subject: "",
      topic: "",
      difficulty: "Easy",
      marks: 5,
    });
    setFeedback("Question added successfully!");
  };

  const handleReset = () => {
    setFormValues({
      totalMarks: "",
      easyPercent: "",
      mediumPercent: "",
      hardPercent: "",
    });
    setNewQuestion({
      question: "",
      subject: "",
      topic: "",
      difficulty: "Easy",
      marks: 5,
    });
    setFeedback("Form reset successfully!");
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    setFeedback("Question deleted successfully!");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mock Test Generator</h1>
        <p>Create customized mock tests easily</p>
        <div className="button-container">
          <button onClick={() => setView("generate")} className="btn btn-primary">Generate</button>
          <button onClick={() => setView("addQuestions")} className="btn btn-secondary">Add Questions</button>
          <button onClick={() => setView("home")} className="btn btn-info">Home</button>
        </div>
      </header>
      {feedback && <p className="feedback">{feedback}</p>}
      {view === "generate" && (
        <form onSubmit={handleSubmit} className="form-container">
          <input
            type="number"
            name="totalMarks"
            placeholder="Total Marks"
            value={formValues.totalMarks}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="easyPercent"
            placeholder="Easy %"
            value={formValues.easyPercent}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="mediumPercent"
            placeholder="Medium %"
            value={formValues.mediumPercent}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="hardPercent"
            placeholder="Hard %"
            value={formValues.hardPercent}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-success">Generate Paper</button>
          <button type="button" onClick={handleReset} className="btn btn-warning">Reset</button>
        </form>
      )}
      {view === "addQuestions" && (
        <form onSubmit={handleAddQuestion} className="form-container">
          <input
            type="text"
            name="question"
            placeholder="Question"
            value={newQuestion.question}
            onChange={handleNewQuestionChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={newQuestion.subject}
            onChange={handleNewQuestionChange}
            required
          />
          <input
            type="text"
            name="topic"
            placeholder="Topic"
            value={newQuestion.topic}
            onChange={handleNewQuestionChange}
            required
          />
          <select
            name="difficulty"
            value={newQuestion.difficulty}
            onChange={handleNewQuestionChange}
            required
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <input
            type="number"
            name="marks"
            placeholder="Marks"
            value={newQuestion.marks}
            onChange={handleNewQuestionChange}
            required
          />
          <button type="submit" className="btn btn-success">Add Question</button>
          <button type="button" onClick={handleReset} className="btn btn-warning">Reset</button>
        </form>
      )}
      {view === "paper" && (
        <div className="paper-container">
          <h2>Generated Question Paper</h2>
          <ul className="questions-list">
            {questions.map((question, index) => (
              <li key={index} className="question-item">
                <p><b>Question:</b> {question.question}</p>
                <p><b>Subject:</b> {question.subject}</p>
                <p><b>Topic:</b> {question.topic}</p>
                <p><b>Difficulty:</b> {question.difficulty}</p>
                <p><b>Marks:</b> {question.marks}</p>
                <button onClick={() => handleDeleteQuestion(index)} className="btn btn-danger">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
