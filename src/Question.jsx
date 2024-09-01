import React from 'react';

function Question({ questionData, onAnswer }) {
  const answers = [...questionData.incorrect_answers, questionData.correct_answer].sort();

  return (
    <div>
      <h2 dangerouslySetInnerHTML={{ __html: questionData.question }} />
      <div>
        {answers.map((answer, index) => (
          <button key={index} onClick={() => onAnswer(answer)} dangerouslySetInnerHTML={{ __html: answer }} />
        ))}
      </div>
    </div>
  );
}

export default Question;
