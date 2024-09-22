import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom"; // Use useNavigate for redirection
import "./Inav.css"; // Custom CSS for styling

const Inav = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3001/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        localStorage.removeItem('adminToken');
        navigate('/login');
      } else {
        const errorData = await response.json(); // Get error response body
        console.error("Logout failed:", errorData);
      }
    } catch (error) {
      console.error("Network error during logout:", error);
    }
  };
  

  return (
    <Navbar variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="jobs">
          JobVista
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link
              as={NavLink}
              to="courses" // Relative path
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Courses
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="membership" // Relative path
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Membership
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="profile" // Relative path
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Profile
            </Nav.Link>
            {/* Add Logout Button */}
            <Nav.Link
              as="button"
              onClick={handleLogout}
              className="btn btn-danger ml-2" // Add Bootstrap button styling
              style={{ cursor: "pointer" }} // Ensure pointer cursor on hover
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Inav;
