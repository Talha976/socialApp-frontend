import React, { useState } from 'react';
import AdminHOC from './AdminHOC';
import Header from './Header';
import Toaster from '../commonComponents/Toaster';

const CreateJob = () => {
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
        file: null
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setJobData(prevData => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(jobData).forEach(key => {
            formData.append(key, jobData[key]);
        });

        try {
            const response = await fetch('/create-jobs', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
                Toaster({ status: 'success', message: data.message || 'Job posted successfully!' })
                setJobData({
                    title: '',
                    vacancy: '',
                    description: '',
                    education: '',
                    experience: '',
                    specialization: '',
                    lastDate: '',
                    jobType: '',
                    salary: '',
                    file: null
                })
            } else {
                Toaster({ status: 'error', message: data.message || 'Error occured!' })
            }
        } catch (error) {
            Toaster({ status: 'success', message: 'Server Error!' })
        }
    };

    return (
        <div className='ml-64 mx-auto'>
            <Header title='Post Job' />
            <div className="flex flex-col items-center justify-center mt-20">
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
                            cols="30"
                            rows="2"
                            value={jobData.description}
                            onChange={handleChange}
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
                                <label className="text-gray-600 text-sm" htmlFor="salary">Salary</label>
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
                        <label className="text-gray-600 text-sm" htmlFor="file">Image</label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            onChange={handleChange}
                            className="block w-full cursor-pointer px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="w-full px-4 py-2 mt-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
                        >
                            Post Job
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default AdminHOC(CreateJob);
