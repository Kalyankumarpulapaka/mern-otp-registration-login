import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inav from '../components/Inav'; // Adjust the import path
import Courses from '../outpages/Courses'; // Adjust the import path
import Membership from '../outpages/Membership'; // Adjust the import path
import Profile from '../outpages/Profile'; // Adjust the import path
import Jobs from '../outpages/Jobs';

function Dashboard() {
  return (
    <div>
      <Inav />
   
      <Routes>
      <Route path="jobs" element={<Jobs />} />
        <Route path="courses" element={<Courses />} />
        <Route path="membership" element={<Membership />} />
        <Route path="profile" element={<Profile />} />
       
      </Routes>
    </div>
  );
}

export default Dashboard;
