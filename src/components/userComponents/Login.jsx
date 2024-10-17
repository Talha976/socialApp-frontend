import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import bg from '../images/loginBg.jpg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, Bounce } from 'react-toastify';
import Toaster from '../commonComponents/Toaster';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/authSlice';

const Login = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required')
  });

  const postData = async (values, { setSubmitting, resetForm }) => {

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        Toaster({ status: 'error', message: data.message || 'Failed to Login. Please try again.' });
      }
      else{
        Toaster({ status: 'success', message: data.message || 'Login successful!' });
        resetForm();
        localStorage.setItem('user',JSON.stringify(data))
        dispatch(setUser(data))
        setTimeout(()=>{
          navigate('/')
        },2000)
      }

    
    } catch (error) {
      Toaster({ status: 'error', message:  'Internal Server Error' });

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 sm:p-8" style={{ backgroundImage: `url(${bg})` }}>
      <div className="w-full max-w-[420px] p-6 sm:p-8 rounded-lg border-2 border-white/20 backdrop-blur-md bg-white/10 shadow-lg">
        <h1 className="text-3xl sm:text-4xl text-white mb-5 text-center">Login</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={postData}
        >
          {({ isSubmitting }) => (
            <Form className="w-full">
              <div className="relative w-full my-3 sm:my-5">
                <FontAwesomeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" icon={faEnvelope} />
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full h-12 rounded-full border-2 border-white/20 bg-transparent px-12 text-white text-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="relative w-full h-12 my-3 sm:my-5">
                <FontAwesomeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" icon={faLock} />
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full h-full rounded-full border-2 border-white/20 bg-transparent px-12 text-white text-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className='flex items-center justify-end'>
                <NavLink to="/forgot-password" className='text-white hover:underline text-sm'>Forgot Password?</NavLink>
              </div>
              <div className="w-full my-3 sm:my-5">
                <button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-full bg-white text-black text-lg font-semibold shadow-md hover:bg-gray-100 transition-colors duration-300">
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
              </div>
              <div className="text-center mt-5">
                <p className="text-white text-sm">Don't have an account?
                  <NavLink to="/register" className="font-semibold ml-2 hover:underline">Sign Up</NavLink>
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

export default Login;
