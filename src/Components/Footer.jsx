// src/components/Footer.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub as fabGithub, faLinkedin as fabLinkedin } from "@fortawesome/free-brands-svg-icons";


const Footer = () => {
  return (
          <footer className="bg-black text-gray-400 px-6 md:px-12 py-10 text-sm">
            <div className="flex flex-col md:flex-row justify-between items-start gap-10">
              <div>
                <h1 className="text-[2rem] font-extrabold text-gray-300">sprush</h1>
                <p className="mt-5 text-gray-300">Create professional resumes with AI-powered tools</p>
              </div>
    
              <div className="flex flex-wrap gap-12">
                <div>
                  <h4 className="text-white mb-2">Product</h4>
                  <a href="#" className="block hover:underline">AI Improve Version</a>
                  <a href="#" className="block hover:underline">Resume Enhance</a>
                </div>
                <div>
                  <h4 className="text-white mb-2">Feedback</h4>
                  <a href="#" className="block hover:underline">Rate Experience</a>
                  <a href="#" className="block hover:underline">Give Suggestions</a>
                </div>
                <div>
                  <h4 className="text-white mb-2">Company</h4>
                  <a href="/about" className="block hover:underline">About Us</a>
                  <a href="/contact" className="block hover:underline">Contact</a>
                </div>
              </div>
            </div>
    
            <hr className="border-gray-700 my-6" />
    
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 m-0">&copy; 2025 Sprush. All rights reserved</p>
              <div className="flex gap-4">
                <a href="https://github.com" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={fabGithub} className="text-xl hover:text-white transition" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={fabLinkedin} className="text-xl hover:text-white transition" />
                </a>
              </div>
            </div>
          </footer>
  );
};

export default Footer;
