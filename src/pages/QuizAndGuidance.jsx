import React, { useState } from "react";
import { motion } from "framer-motion";

const QuizAndGuidance = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);

  const question = {
    text: "Which gas is most responsible for global warming?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
    correctAnswer: "Carbon Dioxide",
    guidance:
      "Greenhouse gases like CO₂ trap heat in the Earth's atmosphere, leading to global warming.",
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (selectedOption === question.correctAnswer) {
      setScore(1);
      setFeedback("✅ Correct! " + question.guidance);
    } else {
      setScore(0);
      setFeedback("❌ Incorrect. " + question.guidance);
    }
  };

  const resetQuiz = () => {
    setSelectedOption(null);
    setSubmitted(false);
    setFeedback("");
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-2xl rounded-3xl p-8 max-w-2xl w-full"
      >
        <h1 className="text-3xl font-bold text-indigo-700 text-center mb-4">
          🎯 Quiz & Guidance
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Practice your knowledge and receive instant feedback with guidance!
        </p>

        <div className="mb-6">
          <p className="font-semibold text-lg text-gray-800 mb-2">
            {question.text}
          </p>
          {question.options.map((option, index) => (
            <label
              key={index}
              className={`block px-4 py-2 rounded-xl cursor-pointer border mb-2 ${
                selectedOption === option
                  ? "bg-indigo-100 border-indigo-500"
                  : "bg-white"
              }`}
            >
              <input
                type="radio"
                value={option}
                name="quiz"
                className="mr-2"
                onChange={() => setSelectedOption(option)}
                disabled={submitted}
              />
              {option}
            </label>
          ))}
        </div>

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            Submit Answer
          </button>
        ) : (
          <>
            <div className="mt-4 bg-indigo-50 p-4 rounded-xl border border-indigo-200 shadow">
              <p className="text-gray-800 whitespace-pre-line">{feedback}</p>
              <p className="mt-2 font-bold text-indigo-600">
                Your Score: {score}/1
              </p>
            </div>
            <button
              onClick={resetQuiz}
              className="mt-4 w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition"
            >
              Try Another Question
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default QuizAndGuidance;
