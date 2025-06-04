import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import jsPDF from "jspdf";
import PptxGenJS from "pptxgenjs";

const Summary = () => {
  const [chapter, setChapter] = useState("");
  const [question, setQuestion] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSummary, setIsSummary] = useState(false);

  const handleGenerateResponse = async () => {
    if (!chapter || !question) return toast.warn("Please enter all fields.");
    setLoading(true);
    setIsSummary(false);
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
    } catch (e) {
      toast.error("Failed to get answer. Please try again.");
      setLoading(false);
    }
  };

  const handleGenerateSummary = async () => {
    if (!chapter) return toast.warn("Select a chapter first.");
    setLoading(true);
    setIsSummary(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/generate_chapter_summary",
        {
          chapter: chapter,
        }
      );
      setOutput(response.data.response);
      setLoading(false);
    } catch (e) {
      toast.error("Failed to get summary. Please try again.");
      setLoading(false);
    }
  };

  const copyOutputToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast.success("Output copied to clipboard!");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(output, 180);
    doc.text(lines, 10, 10);
    doc.save("Chapter_Summary.pdf");
  };

  const downloadPPT = () => {
    const pptx = new PptxGenJS();
    const slide = pptx.addSlide();

    // Title
    slide.addText("Chapter Summary", {
      x: 0.5,
      y: 0.3,
      fontSize: 24,
      bold: true,
      color: "003366",
    });

    // Prepare bullet points (max ~10 per slide)
    const points = output.split("\n").filter((line) => line.trim() !== "");
    const maxPerSlide = 10;
    const slides = [];

    for (let i = 0; i < points.length; i += maxPerSlide) {
      slides.push(points.slice(i, i + maxPerSlide));
    }

    slides.forEach((chunk, index) => {
      const newSlide = index === 0 ? slide : pptx.addSlide();
      newSlide.addText(chunk, {
        x: 0.5,
        y: 1.0,
        fontSize: 14,
        color: "000000",
        bullet: true,
        lineSpacingMultiple: 1.2,
      });
    });

    pptx.writeFile("Chapter_Summary.pptx");
  };

  const clearOutput = () => {
    setOutput("");
    setIsSummary(false);
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
        <p className="text-center text-sm text-gray-600 mb-6">
          Generate answers using chapter and question OR just generate summary
          by selecting chapter only.
        </p>

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
              {/* <h2 className="text-xl font-bold text-indigo-700 flex items-center gap-2">
                <span>📄 Output Summary</span>
              </h2> */}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={copyOutputToClipboard}
                  className="px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition text-sm"
                >
                  Copy Output
                </button>
                {isSummary && (
                  <>
                    <button
                      onClick={downloadPDF}
                      className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm"
                    >
                      Download PDF
                    </button>
                    <button
                      onClick={downloadPPT}
                      className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition text-sm"
                    >
                      Download PPT
                    </button>
                  </>
                )}
                <button
                  onClick={clearOutput}
                  className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
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
