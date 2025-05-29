import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Assignments = () => {
  const [studentName, setStudentName] = useState("");
  const [learningProgress, setLearningProgress] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateAssignment = async () => {
    if (!studentName || !learningProgress) {
      toast.warn("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/generate_assignment",
        {
          student_name: studentName,
          progress_details: learningProgress,
        }
      );
      setOutput(res.data.recommendation);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch assignment. Try again.");
    } finally {
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
          📌 Assignment Recommendation System
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Suggests personalized assignments for students based on their learning
          progress and gaps.
        </p>

        {/* Student Name */}
        <label className="block mb-2 font-semibold text-gray-700">
          Student Name
        </label>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
          placeholder="Enter student name"
        />

        {/* Learning Progress */}
        <label className="block mb-2 font-semibold text-gray-700">
          Learning Progress / Gaps
        </label>
        <textarea
          value={learningProgress}
          onChange={(e) => setLearningProgress(e.target.value)}
          className="w-full p-3 mb-6 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300"
          rows={4}
          placeholder="Describe progress or learning gaps"
        />

        {/* Button */}
        <button
          onClick={handleGenerateAssignment}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition w-full mb-6"
        >
          🎯 Recommend Assignment
        </button>

        {/* Output */}
        {loading && (
          <div className="flex justify-center mb-4">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-indigo-500 h-10 w-10 animate-spin"></div>
          </div>
        )}

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

export default Assignments;
