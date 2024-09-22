import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Custom CSS for styling

const Navbarr = () => {
  return (
    <Navbar variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">JobVista</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={NavLink} to="/" exact className={({ isActive }) => (isActive ? 'active-link' : '')}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/features" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              Features
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              Contact
            </Nav.Link>
            <Nav.Link as={NavLink} to="/admin" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              Admin
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbarr;
