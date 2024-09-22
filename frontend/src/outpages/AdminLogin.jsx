import React from "react";
import "../components/Form.css";
import "./Membership"
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
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AdminLogin = () => {
  const navigate = useNavigate();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Username is required'),
      password: Yup.string()
        .required('Password is required')
    }),
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:3001/admin/login", values);
        navigate("/Aboard"); // Update the path as needed
      } catch (error) {
        alert("An error occurred during login. Please try with valid credentials.");
      }
    }
  });

  return (
    <MDBContainer fluid className="p-4 background-radial-gradient overflow-hidden" style={{ marginBottom: 0 }}>
      <MDBRow>
        <MDBCol md="7" className="text-center text-md-start d-flex flex-column justify-content-center">
          <h2 className="hero-title">Welcome Back, Admin!</h2>
          <p className="hero-description">
            Log in to manage the platform effectively.
          </p>
        </MDBCol>
        <MDBCol md="4" className="position-relative">
          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
          <MDBCard className="my-5 bg-glass">
            <MDBCardBody className="p-5">
              <h3 className="text-center mb-5">Admin Login</h3>
              <form onSubmit={formik.handleSubmit}>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Username"
                  type="text"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="username"
                  invalid={formik.touched.username && Boolean(formik.errors.username)}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="text-danger">{formik.errors.username}</div>
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
              </form>
              {formik.errors.message && <div className="alert alert-danger mt-4">{formik.errors.message}</div>}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default AdminLogin;
