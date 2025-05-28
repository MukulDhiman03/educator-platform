import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const QuestionGenerator = () => {
  const [topic, setTopic] = useState("");
  const [chapter, setChapter] = useState("");
  const [questionType, setQuestionType] = useState("mcq");
  const [language, setLanguage] = useState("English");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateQuestions = async () => {
    if (!topic || !chapter) {
      return toast.warn("Please fill in all fields.");
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/generate_questions",
        {
          topic,
          chapter,
          questionType,
          language,
        }
      );

      setOutput(response.data.response);
      setLoading(false);
    } catch (e) {
      console.error(e);
      toast.error("Failed to generate questions.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl p-8"
      >
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-2">
          🧠 Question Generator
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Generate quizzes, tests, and assessments with MCQs, short-answer, or
          essay questions. Includes answer keys and grading rubrics.
        </p>

        {/* Topic */}
        <label className="block mb-2 font-semibold text-gray-700">
          Assignment / Topic
        </label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Photosynthesis, World War II"
          className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />

        {/* Chapter */}
        <label className="block mb-2 font-semibold text-gray-700">
          Chapter
        </label>
        <input
          type="text"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
          placeholder="e.g. Chapter 5 - Plant Biology"
          className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300"
        />

        {/* Question Type */}
        <label className="block mb-2 font-semibold text-gray-700">
          Question Type
        </label>
        <select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
          className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <option value="mcq">Multiple Choice Questions</option>
          <option value="short">Short Answer</option>
          <option value="essay">Essay Type</option>
        </select>

        {/* Language */}
        <label className="block mb-2 font-semibold text-gray-700">
          Language
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-3 mb-6 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300"
        >
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
        </select>

        {/* Generate Button */}
        <button
          onClick={handleGenerateQuestions}
          className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition w-full mb-6"
        >
          ✨ Generate Questions
        </button>

        {/* Loader */}
        {loading && (
          <div className="flex justify-center mb-4">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-indigo-500 h-10 w-10 animate-spin"></div>
          </div>
        )}

        {/* Output */}
        {!loading && output && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 shadow"
          >
            <p className="text-gray-800 whitespace-pre-line">{output}</p>
          </motion.div>
        )}
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default QuestionGenerator;
