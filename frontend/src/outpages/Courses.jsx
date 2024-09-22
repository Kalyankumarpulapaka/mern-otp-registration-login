import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Courses.css'; // Ensure this CSS file is created

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/course.json')
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error('Error fetching course data:', error));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-primary">Available Courses</h1>
      <div className="row">
        {courses.map((course) => (
          <div className="col-md-4 mb-4" key={course.id}>
            <div className="card course-card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text"><strong>Instructor:</strong> {course.instructor}</p>
                <p className="card-text"><strong>Duration:</strong> {course.duration}</p>
                <p className="card-text"><strong>Description:</strong> {course.description}</p>
                <p className="card-text"><strong>Price:</strong> {course.price}</p>
                <p className="card-text"><strong>Level:</strong> {course.level}</p>
              </div>
              <div className="card-footer text-center">
                <button className="btn btn-primary">Enroll Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
