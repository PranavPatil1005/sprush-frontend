import React from "react";
import { useLocation } from "react-router-dom";

const AtsFriendlyResume = () => {
  const { state } = useLocation();
  const { fileName, dashboard, resumeText } = state || {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          ATS-Friendly Resume
        </h2>
        {dashboard && typeof dashboard === "object" ? (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">ATS Score Dashboard</h3>
            <ul className="mb-2">
              <li>
                <b>Score:</b> {dashboard.score}
              </li>
              <li>
                <b>Matched Keywords:</b>{" "}
                {dashboard.matched_keywords?.join(", ")}
              </li>
              <li>
                <b>Missing Keywords:</b>{" "}
                {dashboard.missing_keywords?.join(", ")}
              </li>
              <li>
                <b>Summary:</b> {dashboard.summary}
              </li>
            </ul>
          </div>
        ) : (
          <p className="mb-6 text-gray-700">{dashboard}</p>
        )}
        {resumeText && (
  <div className="mt-6">
    <h2 className="text-xl font-semibold mb-2">Optimized Resume</h2>
    <pre className="bg-gray-100 p-4 rounded-lg whitespace-pre-wrap">
      {resumeText}
    </pre>
    <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md">
      Download Resume
    </button>
  </div>
)}
        {fileName && (
          <div className="flex justify-center">
            <a
              href={`http://localhost:5000/download/${fileName}`}
              download
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Download Resume
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AtsFriendlyResume;
