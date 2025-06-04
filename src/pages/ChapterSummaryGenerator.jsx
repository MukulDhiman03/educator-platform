import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const ChapterSummaryGenerator = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summaryText, setSummaryText] = useState("");
  const [showActions, setShowActions] = useState(false);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
    setSummaryText("");
    setShowActions(false);
  };

  const handleGenerateSummary = async () => {
    if (!pdfFile) return toast.warn("Please upload a PDF file.");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", pdfFile);
      formData.append("save_path", "math");

      const response = await axios.post(
        "http://localhost:8000/generate_chapter_summary/",
        formData
      );

      setSummaryText(response.data); // Assuming it's plain text
      setShowActions(true);
      toast.success("Chapter summary generated successfully!");
    } catch (error) {
      toast.error("Failed to generate summary. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryText);
    toast.success("Summary copied to clipboard!");
  };

  const handleReset = () => {
    setPdfFile(null);
    setSummaryText("");
    setShowActions(false);
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
          📘 Chapter Summary Generator
        </h1>
        <p className="text-center text-gray-600 mb-6 max-w-xl mx-auto">
          Upload a chapter PDF to generate a concise summary.
        </p>

        {/* File Upload */}
        <label className="block mb-2 font-semibold text-gray-700">
          Upload PDF File
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="w-full p-3 mb-6 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
          disabled={loading}
        />

        {/* Action Button */}
        <button
          onClick={handleGenerateSummary}
          disabled={loading || !pdfFile}
          className={`bg-indigo-600 text-white px-6 py-3 rounded-xl w-full transition ${
            loading ? "opacity-60 cursor-not-allowed" : "hover:bg-indigo-700"
          }`}
        >
          {loading ? "⏳ Generating Summary..." : "📝 Generate Summary"}
        </button>

        {/* Buttons */}
        {showActions && (
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleCopy}
              className="w-full bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
            >
              📋 Copy Summary
            </button>
            <button
              onClick={handleReset}
              className="w-full bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition"
            >
              ♻️ Reset
            </button>
          </div>
        )}

        {/* Display Summary */}
        {summaryText && (
          <motion.div
            key={summaryText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 bg-indigo-50 p-6 rounded-xl border border-indigo-300 shadow-md text-indigo-900"
          >
            <h2 className="text-xl font-bold mb-4">📄 Chapter Summary</h2>
            <p className="leading-relaxed whitespace-pre-line">{summaryText}</p>
          </motion.div>
        )}
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default ChapterSummaryGenerator;
