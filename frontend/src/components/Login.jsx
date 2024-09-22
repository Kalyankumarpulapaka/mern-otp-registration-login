import React from "react";
import Navbarr from "./Navbarr";
import "./Form.css";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const navigate = useNavigate();
  
  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
    }),
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:3001/login", values);
        navigate("/Dashboard");
      } catch (error) {
        alert("An error occurred during login. Please try with valid credentials.");
      }
    }
  });

  return (
    <>
     <Navbarr/>
     <MDBContainer fluid className="p-4 background-radial-gradient overflow-hidden" style={{ marginBottom: 0 }}>     
      <MDBRow>
        <MDBCol md="7" className="text-center text-md-start d-flex flex-column justify-content-center">
          <h2 className="hero-title">Welcome Back!</h2>
          <p className="hero-description">
            Log in to your account and continue exploring job opportunities that match your skills.
          </p>
        </MDBCol>
        <MDBCol md="4" className="position-relative">
          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
          <MDBCard className="my-5 bg-glass">
            <MDBCardBody className="p-5">
              <h3 className="text-center mb-5">Login to Your Account</h3>
              <form onSubmit={formik.handleSubmit}>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="email"
                  invalid={formik.touched.email && Boolean(formik.errors.email)}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger">{formik.errors.email}</div>
                ) : null}
                
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="current-password"
                  invalid={formik.touched.password && Boolean(formik.errors.password)}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">{formik.errors.password}</div>
                ) : null}
                
                <MDBBtn className="w-100 mb-4" size="md" type="submit">
                  Login
                </MDBBtn>
                <div className="text-center">
                  <p>Don't have an account?</p>
                  <Link to="/signup">
                    <MDBBtn color="primary">Sign Up</MDBBtn>
                  </Link>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </>
    
  );
};

export default Login;
