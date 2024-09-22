import React from 'react';
import Navbarr from '../components/Navbarr';
import './Background.css'; // Include the background styles

const Features = () => {
  return (
    <div className="background-radial-gradient">
      <Navbarr />
      <div className="features-container bg-glass">
        <h1 className="hero-title">Features of JobVista</h1>
        <p className="hero-description">Explore our unique features that make JobVista the best platform for job seekers!</p>
        <ul>
          <li>🔍 <strong>Job Search:</strong> Easily search and filter job listings by category, location, and salary.</li>
          <li>📄 <strong>Resume Builder:</strong> Create professional resumes with our easy-to-use resume builder tool.</li>
          <li>🎤 <strong>Interview Preparation:</strong> Access resources and tips to help you prepare for interviews.</li>
          <li>🤝 <strong>Networking Opportunities:</strong> Connect with professionals in your field through our networking events.</li>
          <li>📈 <strong>Career Resources:</strong> Gain access to articles, videos, and tools that can help advance your career.</li>
          <li>🌍 <strong>Global Reach:</strong> Job listings from companies all around the world, right at your fingertips.</li>
        </ul>
      </div>
    </div>
  );
};

export default Features;
