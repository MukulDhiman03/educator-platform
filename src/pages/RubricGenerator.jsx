import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const RubricGenerator = () => {
  const [form, setForm] = useState({
    assignmentTitle: "",
    objective: "",
    criteria: [""],
    ratingScale: "",
    levelsCount: "",
    audience: "",
    language: "English",
  });

  const [rubricData, setRubricData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleCriteriaChange = (index, value) => {
    const newCriteria = [...form.criteria];
    newCriteria[index] = value;
    setForm({ ...form, criteria: newCriteria });
  };

  const addCriteria = () => {
    setForm({ ...form, criteria: [...form.criteria, ""] });
  };

  const removeCriteria = (index) => {
    const newCriteria = form.criteria.filter((_, i) => i !== index);
    setForm({ ...form, criteria: newCriteria });
  };

  const handleSubmit = async () => {
    if (
      !form.assignmentTitle ||
      !form.objective ||
      form.criteria.some((c) => !c)
    ) {
      return toast.warn("Please fill all required fields.");
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/generate_rubric",
        form
      );
      setRubricData(response.data.rubric);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate rubric.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Rubric", 14, 22);
    doc.setFontSize(12);
    doc.text(`Title: ${form.assignmentTitle}`, 14, 32);
    doc.text(`Objective: ${form.objective}`, 14, 40);
    doc.text(`Audience: ${form.audience}`, 14, 48);
    doc.text(`Language: ${form.language}`, 14, 56);

    doc.autoTable({
      head: [["Criteria", "Performance Levels"]],
      body: form.criteria.map((criterion) => [criterion, form.ratingScale]),
      startY: 66,
    });

    doc.save("rubric.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-8"
      >
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-2">
          🧾 Rubric Generator
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Create detailed grading rubrics to simplify scoring and set clear
          expectations for assignments and assessments.
        </p>

        {/* Form Fields */}
        <div className="grid gap-4 mb-6">
          <input
            type="text"
            placeholder="Assignment Title"
            className="w-full p-3 border rounded-xl"
            value={form.assignmentTitle}
            onChange={(e) => handleChange("assignmentTitle", e.target.value)}
          />

          <textarea
            placeholder="Objective / Learning Outcome"
            className="w-full p-3 border rounded-xl"
            rows={2}
            value={form.objective}
            onChange={(e) => handleChange("objective", e.target.value)}
          />

          {/* Criteria Inputs */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Criteria
            </label>
            {form.criteria.map((c, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder={`Criteria ${index + 1}`}
                  className="w-full p-2 border rounded-xl"
                  value={c}
                  onChange={(e) => handleCriteriaChange(index, e.target.value)}
                />
                {form.criteria.length > 1 && (
                  <button
                    onClick={() => removeCriteria(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                  >
                    ➖
                  </button>
                )}
              </div>
            ))}
            <button
              className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition"
              onClick={addCriteria}
            >
              ➕
            </button>
          </div>

          <input
            type="text"
            placeholder="Rating Scale (e.g. Excellent, Good, Fair, Poor)"
            className="w-full p-3 border rounded-xl"
            value={form.ratingScale}
            onChange={(e) => handleChange("ratingScale", e.target.value)}
          />

          <input
            type="number"
            placeholder="Number of Performance Levels"
            className="w-full p-3 border rounded-xl"
            value={form.levelsCount}
            onChange={(e) => handleChange("levelsCount", e.target.value)}
          />

          <input
            type="text"
            placeholder="Audience (optional)"
            className="w-full p-3 border rounded-xl"
            value={form.audience}
            onChange={(e) => handleChange("audience", e.target.value)}
          />

          <select
            value={form.language}
            onChange={(e) => handleChange("language", e.target.value)}
            className="w-full p-3 border rounded-xl"
          >
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition w-full"
          >
            🛠 Generate Rubric
          </button>
        </div>

        {/* Output */}
        {loading && (
          <div className="flex justify-center mb-4">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-indigo-500 h-10 w-10 animate-spin"></div>
          </div>
        )}

        {/* {!loading && rubricData && ( */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 shadow"
        >
          <h2 className="text-lg font-semibold text-indigo-800 mb-2">
            📋 Generated Rubric
          </h2>
          <pre className="whitespace-pre-wrap text-gray-800">{rubricData}</pre>
          <button
            onClick={handleDownloadPDF}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
          >
            📥 Download as PDF
          </button>
        </motion.div>
        {/* )} */}
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default RubricGenerator;
