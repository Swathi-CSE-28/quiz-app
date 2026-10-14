
import { useState } from "react";
import "./style.css";

const questions = [
  {
    question: "Which language is used to build React apps?",
    options: ["Python", "JavaScript", "C", "SQL"],
    answer: "JavaScript",
  },
  {
    question: "Which hook is used to manage state in React?",
    options: ["useEffect", "useState", "useRef", "useMemo"],
    answer: "useState",
  },
  {
    question: "Which HTML element is used for a button?",
    options: ["<div>", "<p>", "<button>", "<h1>"],
    answer: "<button>",
  },
  {
    question: "What does CSS control?",
    options: [
      "Database",
      "Page styling",
      "Server logic",
      "Variables",
    ],
    answer: "Page styling",
  },
  {
    question: "Which command starts a Vite development server?",
    options: [
      "npm start",
      "npm run dev",
      "node start",
      "react run",
    ],
    answer: "npm run dev",
  },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  function handleNext() {
    if (!selected) return;

    const isCorrect =
      selected === questions[current].answer;

    const updatedScore = score + (isCorrect ? 1 : 0);
    setScore(updatedScore);

    if (current === questions.length - 1) {
      setFinished(true);
    } else {
      setCurrent(current + 1);
      setSelected("");
    }
  }

  function restartQuiz() {
    setCurrent(0);
    setSelected("");
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <main className="quiz-container">
        <div className="quiz-card result">
          <h1>Quiz Completed!</h1>
          <p>Your final score is</p>
          <h2>
            {score} / {questions.length}
          </h2>
          <p>
            {score >= 4
              ? "Excellent work!"
              : "Good try! Keep practicing."}
          </p>
          <button onClick={restartQuiz}>
            Try Again
          </button>
        </div>
      </main>
    );
  }

  const q = questions[current];

  return (
    <main className="quiz-container">
      <div className="quiz-card">
        <h1>React Quiz</h1>

        <p className="progress">
          Question {current + 1} of {questions.length}
        </p>

        <div className="progress-bar">
          <div
            style={{
              width: `${((current + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        <h2>{q.question}</h2>

        <div className="options">
          {q.options.map((option) => (
            <button
              key={option}
              className={`option ${
                selected === option ? "selected" : ""
              }`}
              onClick={() => setSelected(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          className="next-button"
          onClick={handleNext}
          disabled={!selected}
        >
          {current === questions.length - 1
            ? "Finish Quiz"
            : "Next Question"}
        </button>
      </div>
    </main>
  );
}

