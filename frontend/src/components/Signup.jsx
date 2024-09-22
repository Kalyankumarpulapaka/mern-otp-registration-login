import React, { useState } from "react";
import "./Form.css";
import Navbarr from "./Navbarr";
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
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import Toast CSS

const Signup = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required."),
    lastName: Yup.string().required("Last name is required."),
    email: Yup.string()
      .email("Email is invalid.")
      .required("Email is required."),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters.")
      .required("Password is required."),
  });

  const sendOtp = async (email) => {
    try {
      await axios.post("http://localhost:3001/send-otp", { email });
      setOtpSent(true);
      toast.success("OTP sent to your email!"); // Use toast for success
    } catch (error) {
      console.error("Error sending OTP", error);
      toast.error("User is already Exist /Incorrect Gmail"); // Use toast for error
    }
  };

  const verifyOtp = async (email, values) => {
    try {
      await axios.post("http://localhost:3001/verify-otp", {
        email,
        otp,
        name: `${values.firstName} ${values.lastName}`,
        password: values.password,
      });
      toast.success("Registration successful! Redirecting to login..."); // Use toast for success
      setTimeout(() => (window.location.href = "/login"), 2000);
    } catch (error) {
      console.error("Error verifying OTP", error);
      toast.error("Invalid OTP. Please try again."); // Use toast for error
    }
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    if (!otpSent) {
      const { email } = values;
      await sendOtp(email);
    } else {
      await verifyOtp(values.email, values);
    }
    setSubmitting(false);
  };

  return (
    <>
     <Navbarr />
     <MDBContainer fluid className="p-4 background-radial-gradient overflow-hidden">
         
         <MDBRow>
           <MDBCol md="6" className="text-center text-md-start d-flex flex-column justify-content-center">
             <h2 className="hero-title">
               Find Your Dream Job <br />
               <span>with us :)</span>
             </h2>
             <p className="hero-description">
               Discover the perfect job that aligns with your skills and career goals.
             </p>
           </MDBCol>
           <MDBCol md="6" className="position-relative">
             <MDBCard className="my-5 bg-glass">
               <MDBCardBody className="p-5">
                 <h3 className="text-center mb-5">Create Account</h3>
                 <Formik
                   initialValues={initialValues}
                   validationSchema={validationSchema}
                   onSubmit={handleSubmit}
                 >
                   {({ isSubmitting, status, errors }) => (
                     <Form>
                       <MDBRow>
                         <MDBCol md="6">
                           <Field
                             name="firstName"
                             as={MDBInput}
                             wrapperClass="mb-4"
                             label="First name"
                             type="text"
                             invalid={!!errors.firstName}
                           />
                           <ErrorMessage name="firstName" component="div" className="text-danger" />
                         </MDBCol>
                         <MDBCol md="6">
                           <Field
                             name="lastName"
                             as={MDBInput}
                             wrapperClass="mb-4"
                             label="Last name"
                             type="text"
                             invalid={!!errors.lastName}
                           />
                           <ErrorMessage name="lastName" component="div" className="text-danger" />
                         </MDBCol>
                       </MDBRow>
                       <Field
                         name="email"
                         as={MDBInput}
                         wrapperClass="mb-4"
                         label="Email"
                         type="email"
                         invalid={!!errors.email}
                       />
                       <ErrorMessage name="email" component="div" className="text-danger" />
   
                       {otpSent && (
                         <>
                           <Field
                             name="otp"
                             as={MDBInput}
                             wrapperClass="mb-4"
                             label="OTP"
                             type="text"
                             onChange={(e) => setOtp(e.target.value)}
                             invalid={!!errors.otp}
                           />
                           <ErrorMessage name="otp" component="div" className="text-danger" />
                         </>
                       )}
   
                       <Field
                         name="password"
                         as={MDBInput}
                         wrapperClass="mb-4"
                         label="Password"
                         type="password"
                         invalid={!!errors.password}
                       />
                       <ErrorMessage name="password" component="div" className="text-danger" />
   
                       <MDBBtn className="w-100 mb-4" size="md" type="submit" disabled={isSubmitting}>
                         {otpSent ? "Verify OTP & Register" : "Send OTP"}
                       </MDBBtn>
   
                       <div className="text-center">
                         <p>Already have an account?</p>
                         <Link to="/login">
                           <MDBBtn color="primary">Login</MDBBtn>
                         </Link>
                       </div>
                       {status && status.success && <div className="alert alert-info mt-4">{status.success}</div>}
                       {errors.email && <div className="alert alert-danger mt-4">{errors.email}</div>}
                     </Form>
                   )}
                 </Formik>
                 <ToastContainer /> {/* Add ToastContainer for notifications */}
               </MDBCardBody>
             </MDBCard>
           </MDBCol>
         </MDBRow>
       </MDBContainer>
    </>
    
  );
};

export default Signup;
