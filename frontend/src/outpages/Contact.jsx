import React from 'react';
import Navbarr from '../components/Navbarr';
import './Background.css'; // Ensure this is imported

const Contact = () => {
  return (
   <div className="custom-background-radial-gradient">
     <Navbarr />
     <div>
       <h1 className="custom-hero-title">Contact Us</h1>
       <p className="custom-hero-description">If you have any questions, feel free to reach out!</p>
       <p>Email: support@jobvista.com</p>
       <p>Phone: (123) 456-7890</p>
     </div>
   </div>
  );
};

export default Contact;
