import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Jobs.css';

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('/jobcard.json')
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error('Error fetching job data:', error));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-primary">Available Jobs</h1>
      <div className="row">
        {jobs.map((job) => (
          <div className="col-md-6 mb-4" key={job.id}>
            <div className="card job-card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{job.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
                <p className="card-text"><strong>Location:</strong> {job.location}</p>
                <p className="card-text"><strong>Date Posted:</strong> {new Date(job.datePosted).toLocaleDateString()}</p>
                <p className="card-text"><strong>Salary:</strong> {job.salary}</p>
                <p className="card-text"><strong>Job Type:</strong> {job.jobType}</p>
                <p className="card-text"><strong>Description:</strong> {job.description}</p>
                <h6 className="mt-3">Requirements:</h6>
                <ul className="list-group list-group-flush">
                  {job.requirements.map((req, index) => (
                    <li className="list-group-item" key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              <div className="card-footer text-center">
                <button className="btn btn-primary">Apply Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobs;
