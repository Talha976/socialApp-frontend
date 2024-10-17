import React, { useEffect, useState } from 'react';
import WithHeader from '../commonComponents/HOC';
import { NavLink, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from '../commonComponents/Modal';
import Toaster from '../commonComponents/Toaster';

const Job = () => {
    const [apply, setApply] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await fetch('/fetch-all-jobs', {
                method: 'GET'
            });
            const data = await response.json();
            if (data) {
                setJobs(data);
            } else {
                Toaster({ status: 'error', message: data.message });
            }
        } catch (error) {
            Toaster({ status: 'error', message: 'Internal Server Error' });
        }
    };

    const handleApply = () => {
        setApply(!apply);
    };

    const handleSubmit = async (values, actions) => {
        console.log("Form submitted with values:", values);
        console.log("Selected Job ID:", selectedJobId);

        if (isLastStep) {
            const formData = new FormData();
            formData.append('firstname', values.firstname);
            formData.append('lastname', values.lastname);
            formData.append('email', values.email);
            formData.append('contact', values.contact);
            formData.append('file', values.file);
            formData.append('jobId', selectedJobId);

            console.log("FormData being sent:", formData);

            try {
                const response = await fetch('/apply-job', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                console.log("API Response:", data);

                if (response.ok) {
                    Toaster({ status: 'success', message: 'Application submitted successfully' });
                } else {
                    Toaster({ status: 'error', message: data.message });
                }
            } catch (error) {
                console.error("Error during form submission:", error);
                Toaster({ status: 'error', message: 'Internal Server Error' });
            }

            actions.setSubmitting(false);
        } else {
            handleNext(values, actions);
        }
    };


    const steps = [
        { label: 'Step 1', description: 'Personal Info' },
        { label: 'Step 2', description: 'Contact Details' },
        { label: 'Step 3', description: 'Confirmation' },
    ];

    const validationSchemas = [
        Yup.object({
            firstname: Yup.string().required('Required'),
            lastname: Yup.string().required('Required')
        }),
        Yup.object({
            email: Yup.string().email('Invalid email format').required('Required'),
            contact: Yup.string().required('Required'),
        }),
        Yup.object({
            file: Yup.mixed().required('File is required'),
        }),
    ];

    const [step, setStep] = useState(0);
    const initialValues = {
        firstname: '',
        lastname: '',
        email: '',
        contact: '',
        file: null,
    };

    const isLastStep = step === steps.length - 1;

    const handleNext = (values, actions) => {
        setStep(step + 1);
        actions.setTouched({});
        actions.setSubmitting(false);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    return (
        <div className="container mx-auto mt-14 p-5">
            <h2 className="text-2xl font-bold mb-4">Job Listings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                {jobs.length > 0 ? (jobs.map(job => (
                    <div key={job._id} className="bg-white shadow-lg rounded-lg p-5 border border-gray-200 relative">
                        <h3 className="text-xl font-semibold  text-blue-600">{job.title}</h3>
                        <p className="text-gray-600 mt-2">{job.description}</p>
                        <div className="mt-4">
                            <p><span className="font-bold">Vacancies:</span> {job.vacancy}</p>
                            <p><span className="font-bold">Education:</span> {job.education}</p>
                            <p><span className="font-bold">Experience:</span> {job.experience}</p>
                            <p><span className="font-bold">Specialization:</span> {job.specialization}</p>
                            <p><span className="font-bold">Last Date to Apply:</span> {job.lastDate}</p>
                            <p><span className="font-bold">Job Type:</span> {job.jobType}</p>
                            <p><span className="font-bold">Salary:</span> {job.salary}</p>
                        </div>
                        <div className="flex justify-between mt-5  ">
                            <NavLink
                                onClick={() => {
                                    setSelectedJobId(job._id);  
                                    handleApply();  
                                }}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 transition"
                            >
                                Apply Now
                            </NavLink>
                            <button className="bg-transparent border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition">
                                Save Job
                            </button>
                        </div>
                    </div>
                ))
                ) : (
                    <h2>No Jobs Found</h2>
                )
                }
            </div>
            <Modal show={apply} handleClose={handleApply} title='Apply Here'>
                <div className='flex items-center justify-center '>
                    <div className="w-[500px] mx-auto p-4 border bg-gradient-to-r from-blue-100 to-blue-200 border-gray-300 rounded shadow">
                        <div className="mb-4">
                            <div className="flex justify-between mb-2">
                                {steps.map((s, index) => (
                                    <div key={index} className={`flex-1 text-center ${index <= step ? 'text-blue-500' : 'text-gray-400'}`}>
                                        <div>{s.label}</div>
                                        <div className="text-sm">{s.description}</div>
                                        <div className={`h-1 ${index <= step ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                                    </div>
                                ))}
                            </div>
                            <div className="h-1 bg-gray-300"></div>
                        </div>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchemas[step]}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, setFieldValue }) => (
                                <Form>
                                    {step === 0 && (
                                        <div className="mb-4">
                                            <label htmlFor="firstname" className="block text-sm font-medium">First Name</label>
                                            <Field
                                                type="text"
                                                name="firstname"
                                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
                                            />
                                            <ErrorMessage name="firstname" component="div" className="text-red-500 text-sm" />
                                            <label htmlFor="lastname" className="block text-sm font-medium mt-1">Last Name</label>
                                            <Field
                                                type="text"
                                                name="lastname"
                                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
                                            />
                                            <ErrorMessage name="lastname" component="div" className="text-red-500 text-sm" />
                                        </div>
                                    )}

                                    {step === 1 && (
                                        <div className="mb-4">
                                            <label htmlFor="email" className="block text-sm font-medium">Email</label>
                                            <Field
                                                type="email"
                                                name="email"
                                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
                                            />
                                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

                                            <label htmlFor="contact" className="block text-sm font-medium mt-4">Contact</label>
                                            <Field
                                                type="text"
                                                name="contact"
                                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
                                            />
                                            <ErrorMessage name="contact" component="div" className="text-red-500 text-sm" />
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <div className="mb-4">
                                            <label htmlFor="file" className="block text-sm font-medium">Upload File</label>
                                            <input
                                                type="file"
                                                name="file"
                                                onChange={(event) => {
                                                    setFieldValue('file', event.currentTarget.files[0]);
                                                }}
                                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
                                            />
                                            <ErrorMessage name="file" component="div" className="text-red-500 text-sm" />
                                        </div>
                                    )}

                                    <div className="flex justify-between mt-6">
                                        {step > 0 && (
                                            <button
                                                type="button"
                                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                                                onClick={handleBack}
                                            >
                                                Back
                                            </button>
                                        )}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                        >
                                            {isLastStep ? 'Submit' : 'Next'}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default WithHeader(Job);


