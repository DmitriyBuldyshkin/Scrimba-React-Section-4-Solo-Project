import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

export default function Question(props) {
  const [answersArray, setAnswersArray] = useState([]);
  function shuffle(array) {
    if (array.length > 2) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  }
  const correctId = nanoid();
  function createIncorrectIds() {
    let newArr = [];
    for (let i = 0; i < props.incorrectAnswers.length; i++) {
      newArr.push(nanoid());
    }
    return newArr;
  }
  const incorrectIds = createIncorrectIds();
  function changeClass(id, value) {
    if (value === "correct") {
      document.getElementById(id).className = "correctClicked";
    }
    for (let i = 0; i < incorrectIds.length; i++) {
      document.getElementById(incorrectIds[i]).className = "disabled";
    }
    if (value === "incorrect") {
      document.getElementById(id).className = "incorrectClicked";
    }
  }
  const correctAnswer = (
    <button
      value="correct"
      id={correctId}
      onClick={(event) => {
        changeClass(correctId, "correct");
        props.answerQuestion(event, "correct");
      }}
      dangerouslySetInnerHTML={{ __html: props.correctAnswer }}
    />
  );
  let i = 0;
  const allAnswers = props.incorrectAnswers.map((answer) => {
    const id = incorrectIds[i];
    i++;
    return (
      <button
        value="incorrect"
        id={id}
        onClick={(event) => {
          changeClass(correctId, "correct");
          changeClass(id, "incorrect");
          props.answerQuestion(event, "incorrect");
        }}
        dangerouslySetInnerHTML={{ __html: answer }}
      />
    );
  });
  allAnswers.push(correctAnswer);
  useEffect(() => {
    setAnswersArray(shuffle(allAnswers));
  }, [props.question]);
  return (
    <div className="question-container">
      <h3
        className="question-title"
        dangerouslySetInnerHTML={{ __html: props.question }}
      />
      <div className="answers">{answersArray}</div>
    </div>
  );
}
