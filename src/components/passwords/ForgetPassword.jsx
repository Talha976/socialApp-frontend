import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import bg from '.././images/loginBg.jpg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Toaster from '../commonComponents/Toaster';


const ForgetPassword = () => {
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
    });

    const postData = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await fetch('/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (!response.ok) {  
                Toaster({ status: 'error', message: data.message || 'Error sending mail' })
            }
            else {
                Toaster({ status: 'success', message: data.message || 'Mail sent successfully!' })
            }
            resetForm();
        } catch (error) {
            Toaster({ status: 'error', message: 'Mail sent successfully!' })
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 sm:p-8" style={{ backgroundImage: `url(${bg})` }}>
            <div className="w-full max-w-[420px] p-6 sm:p-8 rounded-lg border-2 border-white/20 backdrop-blur-md bg-white/10 shadow-lg">

                <h1 className="text-3xl sm:text-4xl text-white mb-5 text-center">Forgot Password</h1>
                <Formik
                    initialValues={{ email: '' }}
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
                            <div className="w-full my-3 sm:my-5">
                                <button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-full bg-white text-black text-lg font-semibold shadow-md hover:bg-gray-100 transition-colors duration-300">
                                    {isSubmitting ? 'Sending Mail...' : 'Send'}
                                </button>

                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ForgetPassword;
