import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import bg from '../images/logBg.jpg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, Bounce } from 'react-toastify';
import Toaster from '../commonComponents/Toaster';

const SignUp = () => {
  const navigate = useNavigate()
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const postData = async (values, { setSubmitting, resetForm }) => {

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        Toaster({ status: 'error', message: data.message || 'Failed to register. Please try again.' })
      }
     else{
      Toaster({ status: 'success', message: data.message || 'Registration successful!' })
      resetForm();
      setTimeout(()=>{
        navigate('/login')
      },2000)
     }
    } catch (error) {

      Toaster({ status: 'error', message: 'Internal Server error' })
   
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 sm:p-8" style={{ backgroundImage: `url(${bg})` }}>
      <div className="w-full max-w-[420px] p-6 sm:p-8 rounded-lg border-2 border-white/20 backdrop-blur-md bg-white/10 shadow-lg">
        <h1 className="text-3xl sm:text-4xl text-white mb-5 text-center">Register Here</h1>
        <Formik
          initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={postData}
        >
          {({ isSubmitting }) => (
            <Form className="w-full">
              <div className="relative w-full h-12 my-3 sm:my-5">
                <FontAwesomeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" icon={faUser} />
                <Field
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="w-full h-full rounded-full border-2 border-white/20 bg-transparent px-12 text-white text-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mb-1" />
              </div>
              <div className="relative w-full h-12 my-3 sm:my-5">
                <FontAwesomeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" icon={faUser} />
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full h-full rounded-full border-2 border-white/20 bg-transparent px-12 text-white text-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mb-1" />
              </div>
              <div className="relative w-full h-12 my-3 sm:my-5">
                <FontAwesomeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" icon={faEnvelope} />
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full h-full rounded-full border-2 border-white/20 bg-transparent px-12 text-white text-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mb-1" />
              </div>
              <div className="relative w-full h-12 my-3 sm:my-5">
                <FontAwesomeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" icon={faLock} />
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full h-full rounded-full border-2 border-white/20 bg-transparent px-12 text-white text-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mb-1" />
              </div>
              <div className="w-full my-3 sm:my-5">
                <button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-full bg-white text-black text-lg font-semibold shadow-md hover:bg-gray-100 transition-colors duration-300">
                  {isSubmitting ? 'Registering...' : 'Register'}
                </button>
              </div>
              <div className="text-center mt-5">
                <p className="text-white text-sm">Already have an account?
                  <NavLink to="/login" className="font-semibold ml-2 hover:underline">Login</NavLink>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
};

export default SignUp;
