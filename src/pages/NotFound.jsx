import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl p-8 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-2">
          404 - Page Not Found
          <span role="img" aria-label="Stop Sign">
            🚫
          </span>
        </h1>
      </div>
    </div>
  );
};

export default NotFound;
