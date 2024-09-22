import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";

import "./App.css";
import Features from "./outpages/Features";
import Contact from "./outpages/Contact";
import Admin from "./outpages/Admin";
import AdminLogin from "./outpages/AdminLogin";
import Courses from "./outpages/Courses";
import Membership from "./outpages/Membership";
import Job from "./outpages/Jobs";


function App() {
  const appStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };


  return (
    <div style={appStyle}>
      <Router>
        <div >
          <Routes>
            <Route path="/" element={<Signup/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/Dashboard/*" element={<Dashboard />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-login" element={<AdminLogin />} /> 
            <Route path="/memberships" component={Membership} />
        <Route path="/courses" component={Courses} />
        <Route path="/job" component={Job} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
