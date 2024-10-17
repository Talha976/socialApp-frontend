import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import bg from '.././images/loginBg.jpg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Toaster from '../commonComponents/Toaster';

const ResetPassword = () => {
    const { id, token } = useParams()
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters long')
            .required('Required'),
        confirm_password: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required'),
    });

    const postData = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await fetch(`/reset-password/${id}/${token}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (!response.ok) {
                Toaster({ status: 'error', message: data.message || 'Error resetting password' });
            }
            else {
                Toaster({ status: 'success', message: data.message || 'Password reset successfully!' });
                resetForm();
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (error) {
            Toaster({ status: 'error', message: 'Server Error' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 sm:p-8" style={{ backgroundImage: `url(${bg})` }}>
            <div className="w-full max-w-[420px] p-6 sm:p-8 rounded-lg border-2 border-white/20 backdrop-blur-md bg-white/10 shadow-lg">
                <h1 className="text-3xl sm:text-4xl text-white mb-5 text-center">Reset Password</h1>
                <Formik
                    initialValues={{ password: '', confirm_password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={postData}
                >
                    {({ isSubmitting }) => (
                        <Form className="w-full">
                            <div className="relative w-full my-3 sm:my-5">
                                <FontAwesomeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" icon={faLock} />
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="New Password"
                                    className="w-full h-12 rounded-full border-2 border-white/20 bg-transparent px-12 text-white text-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div className="relative w-full my-3 sm:my-5">
                                <FontAwesomeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" icon={faLock} />
                                <Field
                                    type="password"
                                    name="confirm_password"
                                    placeholder="Confirm Password"
                                    className="w-full h-12 rounded-full border-2 border-white/20 bg-transparent px-12 text-white text-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                                />
                                <ErrorMessage name="confirm_password" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div className="w-full my-3 sm:my-5">
                                <button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-full bg-white text-black text-lg font-semibold shadow-md hover:bg-gray-100 transition-colors duration-300">
                                    {isSubmitting ? 'Resetting...' : 'Reset'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ResetPassword;
