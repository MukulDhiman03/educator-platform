import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const SummarizePdf = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pptBlobUrl, setPptBlobUrl] = useState(null);
  const [showRetry, setShowRetry] = useState(false);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
    setPptBlobUrl(null);
    setShowRetry(false);
  };

  const handleGeneratePpt = async () => {
    if (!pdfFile) return toast.warn("Please upload a PDF file.");
    setLoading(true);
    setShowRetry(false);

    try {
      const formData = new FormData();
      formData.append("file", pdfFile);
      formData.append("save_path", "file");

      const response = await axios.post(
        "http://localhost:8000/generate_summary/",
        formData,
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      });
      const url = URL.createObjectURL(blob);
      setPptBlobUrl(url);
      toast.success("PPT generated successfully!");
      setShowRetry(false); // ✅ No retry on success
    } catch (error) {
      toast.error("Failed to generate PPT. Please try again.");
      console.error(error);
      setShowRetry(true); // ✅ Only show retry on failure
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setPdfFile(null);
    setPptBlobUrl(null);
    setShowRetry(false);
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
          📄 PDF Summary Generator
        </h1>
        <p className="text-center text-gray-600 mb-6 max-w-xl mx-auto">
          Convert your PDF into a summarized PowerPoint presentation in just one
          click.
        </p>

        <label className="block mb-2 font-semibold text-gray-700">
          Upload PDF File
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="w-full p-3 mb-6 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300"
          disabled={loading}
        />

        <button
          onClick={handleGeneratePpt}
          disabled={loading || !pdfFile}
          className={`bg-purple-600 text-white px-6 py-3 rounded-xl w-full transition ${
            loading ? "opacity-60 cursor-not-allowed" : "hover:bg-green-700"
          }`}
        >
          {loading ? "⏳ Generating PPT..." : "🚀 Convert to PPT"}
        </button>

        {/* Download Button */}
        {!loading && pptBlobUrl && !showRetry && (
          <a
            href={pptBlobUrl}
            download="summary.pptx"
            className="block text-center mt-6 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
          >
            📥 Download PPT
          </a>
        )}

        {/* Try Again Button */}
        {showRetry && (
          <button
            onClick={handleRetry}
            className="block text-center mt-4 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition w-full"
          >
            Generate New PPT
          </button>
        )}
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default SummarizePdf;
