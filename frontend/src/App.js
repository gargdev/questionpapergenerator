import React, { useState } from "react";
import "./App.css";

function App() {
  const [formValues, setFormValues] = useState({
    totalMarks: "",
    easyPercent: "",
    mediumPercent: "",
    hardPercent: "",
  });
  const [generatedPaper, setGeneratedPaper] = useState(null);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/generate-paper", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });
    const data = await response.json();
    setGeneratedPaper(data);
  };

  return (
    <div className="App">
      <h1>Question Paper Generator</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Generate Paper</button>
      </form>
      {generatedPaper && (
        <div>
          <h2>Generated Question Paper</h2>
          <ul>
            {generatedPaper.questions.map((question, index) => (
              <li key={index}>
                <p>
                  <b>Question:</b> {question.question}
                </p>
                <p>
                  <b>Subject:</b> {question.subject}
                </p>
                <p>
                  <b>Topic:</b> {question.topic}
                </p>
                <p>
                  <b>Difficulty:</b> {question.difficulty}
                </p>
                <p>
                  <b>Marks:</b> {question.marks}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
