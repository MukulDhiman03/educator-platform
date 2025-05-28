import React from "react";
import Summary from "./pages/Summary";
import QuestionGenerator from "./pages/QuestionGenerator";
import Assignments from "./pages/Assignments";
import PersonalizedLearning from "./pages/PersonalizedLearning";
import RubricGenerator from "./pages/RubricGenerator";
import NotFound from "./pages/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" />
        <Route path="/summary" element={<Summary />} />
        <Route path="/question-generator" element={<QuestionGenerator />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/rubric-generator" element={<RubricGenerator />} />
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
