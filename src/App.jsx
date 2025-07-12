import React from "react";
import Summary from "./pages/Summary";
import QuestionGenerator from "./pages/QuestionGenerator";
import Assignments from "./pages/Assignments";
import PersonalizedLearning from "./pages/PersonalizedLearning";
import RubricGenerator from "./pages/RubricGenerator";
import NotFound from "./pages/NotFound";
import SummarizePdf from "./pages/SummarizePdf";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ExtractQuestions from "./pages/ExtractQuestions";
import ChapterSummaryGenerator from "./pages/ChapterSummaryGenerator";
import GenerateQuestionsFromPrompt from "./pages/GenerateQuestionsFromPrompt";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" />
        <Route path="/summary" element={<Summary />} />
        {/* <Route path="/question-generator" element={<QuestionGenerator />} /> */}
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/rubric-generator" element={<RubricGenerator />} />
        <Route path="/summarize-pdf" element={<SummarizePdf />} />
        <Route path="/question-generator" element={<ExtractQuestions />} />
        <Route path="/chapter-summary" element={<ChapterSummaryGenerator />} />
        <Route
          path="/question_from_prompt"
          element={<GenerateQuestionsFromPrompt />}
        />
        <Route
          path="/personalized-learning"
          element={<PersonalizedLearning />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
