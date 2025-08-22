import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import Signup from "./pages/Signin";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AtsFriendlyResume from "./pages/AtsFriendlyResume";




function AppContent() {
  const location = useLocation();
  const hideHeaderFooter = ["/login", "/signup"].includes(location.pathname);


  return (
    <>
      {!hideHeaderFooter && <Header />}
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ats-friendly-resume" element={<AtsFriendlyResume />} />"


      </Routes>
    
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
      {/* <AtsScoreCalculator/> */}

    </Router>
  );
}

export default App;
