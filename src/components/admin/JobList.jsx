import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHOC from './AdminHOC';
import Header from './Header';
import Toaster from '../commonComponents/Toaster';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        fetchJobs()
    })

    const fetchJobs = async () => {
        try {
            const response = await fetch('/fetch-jobs', {
                method: 'GET'
            })
            const data = await response.json()
            if (data) {
                setJobs(data)
            } else {
                Toaster({ status: 'error', message: data.message })
            }
        } catch (error) {
            Toaster({ status: 'error', message: 'Internal Server Error' })

        }
    }

    const handleDelete =async (id) => {
        try {
            const response = await fetch(`/delete-job/${id}`,{
                method: 'DELETE'
            })
            const data =await response.json()
            if(data){
                Toaster({status:'success',message:data.message})
            }
            else{
                Toaster({status:'error',message:data.message})
            }
        } catch (error) {
            Toaster({status:'error',message:'Server Error'})   
        }
    };

    const handleUpdateClick = (id) => {
        navigate(`/update/:${id}`);
    };

    return (
        <>

            <div className=" ml-64">
                <Header title='Job List' />
                <div className='p-5 mt-20'>
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
                                    <button
                                        onClick={() => handleUpdateClick(job._id)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(job._id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                        ) : (
                            <h2>No Jobs Found</h2>
                        )
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminHOC(JobList);