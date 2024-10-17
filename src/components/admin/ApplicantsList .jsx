import React, { useEffect, useState } from 'react';
import AdminHOC from './AdminHOC';
import Header from './Header';


const ApplicantsList = () => {
    const [applicants, setApplicants] = useState([]);
    useEffect(() => {
        fetchApplicants()
    }, [])
    const fetchApplicants = async () => {
        try {
            const response = await fetch('/appllicants', {
                method: 'GET'
            })
            const data = await response.json()
            if (response.ok) {
                setApplicants(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="ml-64">
            <Header title='Applicants List' />
            <div className='p-5'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-20">
                    {applicants.map(applicant => (
                        <div key={applicant._id} className="bg-white shadow-lg rounded-lg p-5 border border-gray-200">
                            <h3 className="text-xl font-semibold  text-blue-600">{applicant.firstname} {applicant.lastname}</h3>
                            <p className="text-gray-600 mt-2"><span className="font-bold">Email:</span> {applicant.email}</p>
                            <p className="text-gray-600"><span className="font-bold">Job Applied:</span> {applicant.jobId.title}</p>
                            <p className="text-gray-600"><span className="font-bold">Applied On:</span> {applicant.dateApplied}</p>
                           
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminHOC(ApplicantsList);
