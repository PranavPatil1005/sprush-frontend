import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleCreateAtsFriendlyResume = async () => {
 const loggedInUser = localStorage.getItem("loggedInUser");
if (!loggedInUser) {
  setError("Please log in first.");
  navigate("/login"); // redirect to login page
  return;
}

if (!file) {
  setError("Please upload a PDF file first.");
  return;
}

  if (!jobDescription) {
    setError("Please enter a job description.");
    return;
  }

  const formData = new FormData();
  formData.append("resume", file);
  formData.append("jobDescription", jobDescription);

  try {
    setLoading(true);
    const res = await axios.post(
      "http://localhost:5000/api/calculate-ats-score",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (res.data.success) {
      let dashboard = {};
      let resumeText = "";
      if (res.data.feedback) {
        const [dashboardRaw, resumeRaw] =
          res.data.feedback.split("**ATS-Friendly Resume:**");
        try {
          const jsonMatch = dashboardRaw.match(/```json([\s\S]*?)```/);
          if (jsonMatch) {
            dashboard = JSON.parse(jsonMatch[1].trim());
          } else {
            dashboard = JSON.parse(
              dashboardRaw.replace(/```json|```/g, "").trim()
            );
          }
        } catch {
          dashboard = dashboardRaw;
        }
        resumeText = resumeRaw ? resumeRaw.trim() : "";
      }
      navigate("/ats-friendly-resume", {
        state: {
          fileName: res.data.fileName,
          dashboard,
          resumeText,
        },
      });
    } else {
      setError("Failed to create ATS-friendly resume. Try again.");
    }
  } catch (err) {
    console.error(err);
    setError("Something went wrong. Check your server.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-16 px-6 max-w-3xl mx-auto">
        <h1 className="text-6xl font-bold mb-3 text-gray-800">
          Optimize Your Resume for ATS & Get Hired Faster
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Beat the bots. Impress the recruiters.”
        </p>

        {/* Job Description Input */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 hover:scale-105 transition-transform duration-200 ease-in-out">
          <textarea
            value={jobDescription}
            onChange={handleJobDescriptionChange}
            className="block w-full text-sm text-gray-600 p-2"
            placeholder="Enter job description"
          />
        </div>

        {/* File Upload */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 hover:scale-105 transition-transform duration-200 ease-in-out">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-gray-200 file:text-black
              hover:file:bg-gray-300"
            placeholder="Upload your resume"
          />
        </div>

        {/* Create ATS-Friendly Resume Button */}
        <button
          onClick={handleCreateAtsFriendlyResume}
          disabled={loading}
          className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create ATS-Friendly Resume"}
        </button>

        {error && <p className="text-red-400 mt-4">{error}</p>}
      </section>

      {/* How it Works */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          From Upload to Interview — Here’s How
        </h2>
        <div className="max-w-4xl mx-auto grid gap-6">
          {[
            {
              title: "1. Upload Your Resume",
              desc: "Upload your current resume in PDF or DOCX format. Our system will securely process your document.",
            },
            {
              title: "2. Get Recommendations",
              desc: "Receive detailed AI-powered suggestions to improve your resume and make it stand out to recruiters.",
            },
            {
              title: "3. Download your Resume",
              desc: "Download your optimized resume and a tailored cover letter generated by our AI to help you land interviews faster.",
            },
            {
              title: "4. Get Job matching",
              desc: "Find Job matching based on the skills you have provided in the resume making you target selected companies.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-200 ease-in-out"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          What Makes Us Different
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "AI-Powered Resume Analysis",
              desc: "Our AI reviews your resume against top examples to deliver precise improvement suggestions.",
            },
            {
              title: "Role-Specific Recommendations",
              desc: "Receive advice tailored to your industry, target role, and career goals.",
            },
            {
              title: "Professional Enhancements",
              desc: "Refine your resume’s language, format, and content to meet professional standards.",
            },
            {
              title: "Boost Your Interview Prospects",
              desc: "Send out a polished resume that grabs attention and highlights your strengths.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gray-100 p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-200 ease-in-out"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[
            {
              name: "Avni Sharma",
              role: "Software Engineer",
              text: "Sprush helped me land my dream job at Google. The AI-powered suggestions and ATS optimization were game-changers.",
              rating: 5,
            },
            {
              name: "Sanchit Singh",
              role: "Doctor",
              text: "The cover letter generator is incredible. It saved me hours of work and produced highly personalized results.",
              rating: 5,
            },
            {
              name: "Alex Carter",
              role: "Software Tester",
              text: "The template selection and customization options are top-notch. My resume now stands out while remaining professional.",
              rating: 4,
            },
            {
              name: "Riya Mehta",
              role: "Software Engineer",
              text: "Sprush gave me the extra edge I needed. The AI recommendations and instant feedback were incredibly helpful.",
              rating: 4,
            },
          ].map((review, i) => (
            <div
              key={i}
              className="bg-gray-100 p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-200 ease-in-out"
            >
              <h3 className="font-semibold text-gray-800">{review.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{review.role}</p>
              <p className="text-gray-600 mb-4">{review.text}</p>
              <div>{"⭐".repeat(review.rating)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Got Questions? We’ve Got Answers
        </h2>
        <div className="space-y-4">
          {[
            {
              question: "What are the benefits of using a resume analyzer?",
              answer:
                "A resume analyzer helps you optimize your resume to pass through applicant tracking systems (ATS) and increase your chances of getting noticed by hiring managers.",
            },
            {
              question: "What features does the resume analyzer offer?",
              answer:
                "Our resume analyzer offers features such as keyword extraction, resume scoring, and personalized feedback to help you improve your resume.",
            },
            {
              question: "Is the resume analyzer free to use?",
              answer:
                "Yes, our resume analyzer is free to use, with optional premium features available for upgraded accounts.",
            },
            {
              question: "How can I get support if I have questions?",
              answer:
                "You can contact our support team through our website's contact form or email us directly at support@example.com for assistance with any questions or concerns.",
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="bg-gray-100 rounded-lg p-4 hover:scale-105 transition-transform duration-200 ease-in-out"
            >
              <summary className="cursor-pointer font-semibold text-gray-800">
                {faq.question}
              </summary>
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
