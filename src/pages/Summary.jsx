import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Summary = () => {
  const [chapter, setChapter] = useState("");
  const [question, setQuestion] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateResponse = async () => {
    if (!chapter || !question) return toast.warn("Please enter all fields.");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/generate_response",
        {
          query: question,
          chapter: chapter,
        }
      );
      setOutput(response.data.response);
      setLoading(false);
      setQuestion("");
      console.log(response);
    } catch (e) {
      toast.error("Failed to get answer. Please try again.");
      setLoading(false);
      console.log(e);
    }
  };

  const handleGenerateSummary = async () => {
    if (!chapter) return toast.warn("Select a chapter first.");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/generate_chapter_summary",
        {
          chapter: chapter,
        }
      );
      setOutput(response.data.response);
      setLoading(false);
      console.log(response);
    } catch (e) {
      toast.error("Failed to get summary. Please try again.");
      setLoading(false);
      console.log(e);
    }
  };

  const copyOutputToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast.success("Output copied to clipboard!");
  };

  const clearOutput = () => {
    setOutput("");
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
          📚 Chapter Summarizer
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
          <option value="BIOMOLECULES">BIOMOLECULES</option>
          <option value="CELL CYCLE AND CELL DIVISION">
            CELL CYCLE AND CELL DIVISION
          </option>
          {/* <option value="Chemistry - Reactions">Chemistry - Reactions</option> */}
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
            ✅ Generate Answer
          </button>
          <button
            onClick={handleGenerateSummary}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition w-full"
          >
            📝 Generate Chapter Summary
          </button>
        </div>

        {/* Loader */}
        {loading && (
          <div className="flex justify-center mb-6">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-indigo-500 h-12 w-12 animate-spin"></div>
          </div>
        )}

        {/* Output */}
        {!loading && output && (
          <motion.div
            key={output}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-indigo-50 p-6 rounded-xl border border-indigo-300 shadow-lg text-indigo-900 font-medium whitespace-pre-line"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-indigo-700 flex items-center gap-2">
                <span>📄 Output Summary</span>
                <svg
                  className="w-5 h-5 text-indigo-500 animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={copyOutputToClipboard}
                  className="px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition text-sm"
                >
                  Copy Output
                </button>
                <button
                  onClick={clearOutput}
                  className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                >
                  Clear Output
                </button>
              </div>
            </div>
            <p className="leading-relaxed whitespace-pre-line">{output}</p>
          </motion.div>
        )}
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default Summary;
