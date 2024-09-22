import React from 'react';
import AdminLogin from './AdminLogin'; // Import the AdminLogin component
import Navbarr from '../components/Navbarr';
const Admin = () => {
  return (
    <div>
      <Navbarr/>
      <AdminLogin /> {/* Render the AdminLogin component */}
    </div>
  );
};

export default Admin;

