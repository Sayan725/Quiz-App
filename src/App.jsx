import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question';
import Timer from './Timer';
import Result from './Result';
import './App.css';


function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [difficulty, setDifficulty] = useState('easy');
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    axios
      .get(`https://opentdb.com/api.php?amount=10&category=9&difficulty=${difficulty}&type=multiple`)
      .then(response => {
        setQuestions(response.data.results);
      });
  }, [difficulty]);

  useEffect(() => {
    if (timeLeft > 0 && !quizFinished) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      nextQuestion();
    }
  }, [timeLeft, quizFinished]);

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }
    nextQuestion();
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setTimeLeft(30);
    setQuizFinished(false);
    axios
      .get(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`)
      .then(response => {
        setQuestions(response.data.results);
      });
  };

  return (
    <div className="App">
      <h1>Quiz App</h1>
      {!quizFinished ? (
        <>
          <div>
            <label>Select Difficulty: </label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          {questions.length > 0 && (
            <>
              <Timer timeLeft={timeLeft} />
              <Question
                questionData={questions[currentQuestionIndex]}
                onAnswer={handleAnswer}
              />
            </>
          )}
        </>
      ) : (
        <Result score={score} totalQuestions={questions.length} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;

