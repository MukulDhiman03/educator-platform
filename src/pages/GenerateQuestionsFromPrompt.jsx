import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const ExtractQuestions = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [prompt, setPrompt] = useState(""); // user input prompt
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
    setQuestions([]);
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleExtractQuestions = async () => {
    if (!pdfFile) return toast.warn("Please upload a PDF file.");
    if (!prompt.trim()) return toast.warn("Please enter a question prompt.");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", pdfFile);
      formData.append("save_path", "math"); // you can make this dynamic if needed
      formData.append("question", prompt);

      const response = await axios.post(
        "http://13.201.230.224:8003/generate_questions_from_prompt/",
        formData
      );
      console.log(response);
      const output = response.data;
      const qList = Array.isArray(output) ? output : [output]; // fallback if not array
      setQuestions(qList);
      toast.success("Questions extracted successfully!");
    } catch (error) {
      toast.error("Failed to extract questions. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (questions.length === 0) return;
    navigator.clipboard.writeText(questions.join("\n"));
    toast.success("Questions copied to clipboard!");
  };

  const handleReset = () => {
    setPdfFile(null);
    setPrompt("");
    setQuestions([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-2">
          PDF to Questions Generator
        </h1>
        <p className="text-center text-gray-600 mb-6 max-w-xl mx-auto">
          Upload a PDF and enter a prompt like "Generate 5 MCQs" to create quiz
          questions automatically using AI.
        </p>

        {/* Prompt Input */}
        <label className="block mb-2 font-semibold text-gray-700">
          Enter Prompt
        </label>
        <input
          type="text"
          placeholder="e.g. Generate 3 MCQs from this chapter"
          value={prompt}
          onChange={handlePromptChange}
          className="w-full p-3 mb-6 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />

        {/* File Upload */}
        <label className="block mb-2 font-semibold text-gray-700">
          Upload PDF File
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="w-full p-3 mb-6 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />

        {/* Submit Button */}
        <button
          onClick={handleExtractQuestions}
          disabled={loading}
          className={`bg-indigo-600 text-white px-6 py-3 rounded-xl w-full transition ${
            loading ? "opacity-60 cursor-not-allowed" : "hover:bg-indigo-700"
          }`}
        >
          {loading ? "⏳ Extracting..." : "🧠 Generate Questions"}
        </button>

        {/* Copy & Reset */}
        {questions.length > 0 && (
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleCopyToClipboard}
              className="w-full bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
            >
              📋 Copy Questions
            </button>
            <button
              onClick={handleReset}
              className="w-full bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition"
            >
              ♻️ Reset
            </button>
          </div>
        )}

        {/* Loader */}
        {loading && (
          <div className="flex justify-center my-6">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-indigo-500 h-12 w-12 animate-spin"></div>
          </div>
        )}

        {/* Output */}
        {!loading && questions.length > 0 && (
          <motion.div
            key={questions.join("")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 bg-indigo-50 p-6 rounded-xl border border-indigo-300 shadow-md text-indigo-900"
          >
            <h2 className="text-xl font-bold mb-4">📝 Extracted Questions</h2>
            <ul className="list-disc ml-5 space-y-2">
              {questions.map((q, i) => (
                <li key={i} className="leading-relaxed">
                  {q}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default ExtractQuestions;
