import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Membership.css'; // Ensure this CSS file is created

function Membership() {
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    fetch('/mem.json')
      .then((response) => response.json())
      .then((data) => setMemberships(data))
      .catch((error) => console.error('Error fetching membership data:', error));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-primary">Membership Plans</h1>
      <div className="row">
        {memberships.map((membership) => (
          <div className="col-md-4 mb-4" key={membership.id}>
            <div className="card membership-card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{membership.type}</h5>
                <p className="card-text"><strong>Price:</strong> {membership.price}</p>
                <p className="card-text"><strong>Duration:</strong> {membership.duration}</p>
                <h6 className="mt-3">Benefits:</h6>
                <ul className="list-group list-group-flush">
                  {membership.benefits.map((benefit, index) => (
                    <li className="list-group-item" key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
              <div className="card-footer text-center">
                <button className="btn btn-primary">Join Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Membership;
