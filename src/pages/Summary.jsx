import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";

const Summary = () => {
  const [chapter, setChapter] = useState("");
  const [question, setQuestion] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateResponse = () => {
    if (!chapter || !question) return alert("Please enter all fields.");
    setLoading(true);
    setTimeout(() => {
      setOutput(`🧠 Answer for: "${question}" from "${chapter}"`);
      setLoading(false);
    }, 1500);
  };

  const handleGenerateSummary = () => {
    if (!chapter) return alert("Select a chapter first.");
    setLoading(true);
    setTimeout(() => {
      setOutput(`📄 Summary of "${chapter}"`);
      setLoading(false);
    }, 1500);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl p-8"
      >
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          📚 AI Chapter Assistant
        </h1>

        {/* Select Chapter */}
        <label className="block mb-2 font-semibold text-gray-700">
          Select Chapter
        </label>
        <select
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
          className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <option value="">-- Choose Chapter --</option>
          <option value="Biology - Plants">Biology - Plants</option>
          <option value="Physics - Motion">Physics - Motion</option>
          <option value="Chemistry - Reactions">Chemistry - Reactions</option>
        </select>

        {/* Question */}
        <label className="block mb-2 font-semibold text-gray-700">
          Enter Question
        </label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here..."
          className="w-full p-3 mb-6 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300"
          rows={4}
        />

        {/* Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleGenerateResponse}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition w-full"
          >
            ✅ Generate Response
          </button>
          <button
            onClick={handleGenerateSummary}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition w-full"
          >
            📝 Generate Summary
          </button>
        </div>

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
    </div>
  );
};

export default Summary;
