import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // Load quiz data from the JSON file
    fetch("/quizData.json")
      .then((response) => response.json())
      .then((data) => {
        setQuizData(data);
      })
      .catch((error) => console.error("Error loading quiz data: ", error));
  }, []);

  const checkAnswer = () => {
    const currentQuestion = quizData[currentQuestionIndex];

    if (selectedOption === currentQuestion.answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex === quizData.length - 1) {
      setShowResult(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); // Clear the selected option for the next question
    }
  };

  return (
    <div className="App">
      <div className="quiz-container">
        <h1>Quiz Application</h1>
        <div id="question-container">
          {currentQuestionIndex < quizData.length ? (
            <div>
              <h2 id="question-text">
                {quizData[currentQuestionIndex].question}
              </h2>
              <ul id="options-list">
                {quizData[currentQuestionIndex].options.map((option, index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="radio"
                        name="option"
                        value={option}
                        checked={selectedOption === option}
                        onChange={() => setSelectedOption(option)}
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        {currentQuestionIndex < quizData.length ? (
          <button
            id="next-button"
            onClick={checkAnswer}
            disabled={!selectedOption}
          >
            Next
          </button>
        ) : null}
        <div
          id="result-container"
          style={{ display: showResult ? "block" : "none" }}
        >
          <p id="score">Your Score: {score}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
