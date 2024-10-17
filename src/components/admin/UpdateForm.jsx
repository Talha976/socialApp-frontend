import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminHOC from './AdminHOC';
import Header from './Header';
import Toaster from '../commonComponents/Toaster';

const UpdateJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [jobData, setJobData] = useState({
        title: '',
        vacancy: '',
        description: '',
        education: '',
        experience: '',
        specialization: '',
        lastDate: '',
        jobType: '',
        salary: '',
    });

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`/fetch/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();
                if (response.ok) {
                    setJobData(data.job);
                } else {
                    Toaster({ status: 'error', message: data.message });
                    navigate('/job_list');
                }
            } catch (error) {
                Toaster({ status: 'error', message: 'Internal Server Error' });
            }
        };
    
        fetchJob();
    }, [id, navigate]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jobData),
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok) {
                Toaster({ status: 'success', message: data.message || 'Job updated successfully!' });
                navigate('/jobs');
            } else {
                Toaster({ status: 'error', message: data.message || 'Error occurred while updating!' });
            }
        } catch (error) {
            Toaster({ status: 'error', message: 'Server Error!' });
        }
    };

    return (
        <div className="ml-64">
            <Header title="Update Job" />
            <div className="flex flex-col items-center justify-center mt-16">
                <div className="flex flex-col w-[700px] border rounded-md p-5 bg-slate-200">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-row gap-5 w-full">
                            <div className='w-full'>
                                <label className="text-gray-600 text-sm" htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={jobData.title}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
                                />
                            </div>
                            <div className='w-full'>
                                <label className="text-gray-600 text-sm" htmlFor="vacancy">Number of Vacancies</label>
                                <input
                                    type="text"
                                    id="vacancy"
                                    name="vacancy"
                                    value={jobData.vacancy}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
                                />
                            </div>
                        </div>
                        <label className="text-gray-600 text-sm" htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={jobData.description}
                            onChange={handleChange}
                            cols="30"
                            rows="2"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
                        ></textarea>
                        <div className="flex flex-row gap-5 w-full">
                            <div className='w-full'>
                                <label className="text-gray-600 text-sm" htmlFor="education">Education Required</label>
                                <input
                                    type="text"
                                    id="education"
                                    name="education"
                                    value={jobData.education}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
                                />
                            </div>
                            <div className='w-full'>
                                <label className="text-gray-600 text-sm" htmlFor="experience">Experience Required</label>
                                <input
                                    type="text"
                                    id="experience"
                                    name="experience"
                                    value={jobData.experience}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
                                />
                            </div>
                        </div>
                        <div className="flex flex-row gap-5">
                            <div className='w-full'>
                                <label className="text-gray-600 text-sm" htmlFor="specialization">Specialization</label>
                                <input
                                    type="text"
                                    id="specialization"
                                    name="specialization"
                                    value={jobData.specialization}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
                                />
                            </div>
                            <div className='w-full'>
                                <label className="text-gray-600 text-sm" htmlFor="lastDate">Last Date To Apply</label>
                                <input
                                    type="date"
                                    id="lastDate"
                                    name="lastDate"
                                    value={jobData.lastDate}
                                    onChange={handleChange}
                                    className="block cursor-pointer w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
                                />
                            </div>
                        </div>
                        <div className="flex flex-row gap-5">
                            <div className='w-full'>
                                <label className="text-gray-600 text-sm" htmlFor="jobType">Job Type</label>
                                <select
                                    id="jobType"
                                    name="jobType"
                                    value={jobData.jobType}
                                    onChange={handleChange}
                                    className="block cursor-pointer w-full py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
                                >
                                    <option value="">Please Select</option>
                                    <option value="on-site">On-Site</option>
                                    <option value="hybrid">Hybrid</option>
                                    <option value="remote">Remote</option>
                                </select>
                            </div>
                            <div className='w-full'>
                                <label className="text-gray-600 text-sm" htmlFor="salary">Salary Offered</label>
                                <input
                                    type="text"
                                    id="salary"
                                    name="salary"
                                    value={jobData.salary}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                        >
                            Update Job
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminHOC(UpdateJob);
