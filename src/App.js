import React, { useState, useEffect } from "react";
import Question from "./Question";

export default function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [count, setCount] = useState(0);
  const [allQuestions, setAllQuestions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) => setAllQuestions(data.results));
  }, [count]);
  function start() {
    setStartQuiz(true);
  }
  function newQuiz() {
    setCount((prevState) => prevState + 1);
    setCorrectAnswers(0);
    setAnsweredQuestions(0);
    const buttons = document.querySelectorAll(".answers button");
    for (let button of buttons) {
      button.className = "";
    }
  }
  function answerQuestion(event, value) {
    setAnsweredQuestions((prevState) => prevState + 1);
    value === "correct" && setCorrectAnswers((prevState) => prevState + 1);
  }
  const quizElements = allQuestions.map((question) => (
    <Question
      question={question.question}
      correctAnswer={question.correct_answer}
      incorrectAnswers={question.incorrect_answers}
      answerQuestion={answerQuestion}
    />
  ));
  return (
    <main>
      {startQuiz ? (
        <div className="quiz-container">
          {quizElements}
          {answeredQuestions === allQuestions.length && (
            <div className="startNew-container">
              <h2 className="scored">
                You have scored {correctAnswers} / {answeredQuestions} correct
                answers
              </h2>
              <button className="play-again" onClick={newQuiz}>
                Play Again
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="start-screen">
          <h1 className="start-header">Quizzical</h1>
          <h3 className="start-description">Can you answer this questions?</h3>
          <button className="quiz-start" onClick={start}>
            Start quiz
          </button>
        </div>
      )}
    </main>
  );
}
