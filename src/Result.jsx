import React from 'react';

function Result({ score, totalQuestions, onRestart }) {
  return (
    <div>
      <h2>Your Score: {score}/{totalQuestions}</h2>
      <button onClick={onRestart}>Restart Quiz</button>
    </div>
  );
}

export default Result;
