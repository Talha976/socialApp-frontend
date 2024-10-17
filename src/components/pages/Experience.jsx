import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Modal from '../commonComponents/Modal';
import { formatDate, postData } from '../hooks/customHooks';
import Toaster from '../commonComponents/Toaster';

const Experience = () => {
  const [experience, setExperience] = useState(false);
  const [editExperience, setEditExperience] = useState(false);
  const [fetchData, setDataFetch] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    employmentType: '',
    location: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  useEffect(() => {
    fetchExperience()
  }, [])
  const postExperience = async() => {
    postData({url:'/experience',formData})
    fetchExperience()
  };
  const fetchExperience = async () => {
    try {
      const response = await fetch('/experience', {
        method: 'GET',
      });
      const data = await response.json();
      if (response.ok) {
        setDataFetch(Array.isArray(data) ? data : [data]);
        Toaster({ status: 'success', message: data.message });
      } else {
        Toaster({ status: 'error', message: data.message });
      }
    } catch (error) {
      Toaster({ status: 'error', message: 'Server Error' });
    }
  };
  

  const handleUpdate = async (id)=>{
    try {
      const response = await fetch(`/experience/${id}`,{
        method: 'PUT',
        headers: {
          'content-type' : 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data =await response.json()
      if(response.ok){
        fetchExperience()
        Toaster({status:'success',message:data.message})
      }else{
        Toaster({status:'error',message:data.message})
      }
    } catch (error) {
      Toaster({status:'error',message:'Server Error'})
    }
  }

  const handleDelete = async(id)=>{
    try {
      const response = await fetch(`/experience/${id}`,{
        method: 'DELETE'
      })
      const data = await response.json()
      if(response.ok){
        fetchExperience()
        Toaster({status:'success', message: data.message})
      }else{
        Toaster({status:'error', message: data.message})
      }
    } catch (error) {
      Toaster({status:'error', message: 'Server Error'})
    }
  }
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleExperience = () => {
    setExperience(!experience);
  };

  const handleEditExperience = (exp) => {
    setFormData(exp || formData)
    setEditExperience(!editExperience);
  };

  return (
    <div>
      <div className='flex flex-row items-center justify-between'>
        <h2 className="text-xl font-semibold mb-4">Experience</h2>
        <div className='flex flex-row gap-4'>
          <p className='cursor-pointer' onClick={handleExperience}> <FontAwesomeIcon icon={faPlus} /> </p>
        </div>
        </div>
        <div className='flex flex-col gap-3'>
        {fetchData.length > 0 ? (
        fetchData.map((exp) => (
          <div key={exp._id} className="flex items-center justify-center relative flex-col bg-gradient-to-r from-blue-100 to-blue-500 p-4 rounded-lg">
            <h3 className="text-lg font-bold">{exp.title}</h3>
            <p className="text-gray-500">{exp.companyName}</p>
            {exp.startDate && (
              <p>{`${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : 'Present'}`}</p>
            )}
            <p>{exp.description && exp.description}</p>
            <div>
            <FontAwesomeIcon className='cursor-pointer  absolute top-2 right-8' icon={faTrash} onClick={()=>handleDelete(exp._id)}/>
              <FontAwesomeIcon className='cursor-pointer  absolute top-2 right-1' icon={faPen}  onClick={()=>handleEditExperience(exp)}/>
            </div>
          </div>
        ))
      ) : (
        <p>No experience data available.</p>
      )}
        </div>
      <Modal show={editExperience} title='Edit Experience' handleClose={handleEditExperience} handleSave={()=>handleUpdate(formData._id)}>
        <div className='flex flex-col'>
          <label className="text-gray-600 text-sm" htmlFor="title">Title</label>
          <input type="text" value={formData.title} onChange={handleInput} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" name="title" id="title" />
          <label className="text-gray-600 text-sm" htmlFor="companyName">Company Name</label>
          <input type="text" value={formData.companyName} onChange={handleInput} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" name="companyName" id="companyName" />
          <label className="text-gray-600 text-sm" htmlFor="employmentType">Employment Type</label>
          <select
            name='employmentType'
            value={formData.employmentType}
            onChange={handleInput}
            className="block w-full py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none">
            <option value="">Please Select</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="self">Self Employed</option>
            <option value="contract">Contract</option>
            <option value="freelance">Freelance</option>
            <option value="internship">Internship</option>
            <option value="apprenticeship">Apprenticeship</option>
            <option value="seasonal">Seasonal</option>
          </select>
          <label className="text-gray-600 text-sm" htmlFor="location">Location</label>
          <select
            value={formData.location} onChange={handleInput}
            name='location'
            className="block w-full py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none">
            <option value="">Please Select</option>
            <option value="on-site">On-Site</option>
            <option value="hybrid">Hybrid</option>
            <option value="remote">Remote</option>
          </select>
          <label className="text-gray-600 text-sm" htmlFor="startDate">Start Date</label>
          <input type="date" value={formData.startDate} onChange={handleInput} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" name="startDate" id="startDate" />
          <label className="text-gray-600 text-sm" htmlFor="endDate">End Date</label>
          <input type="date" value={formData.endDate} onChange={handleInput} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" name="endDate" id="endDate" />
          <label className="text-gray-600 text-sm" htmlFor="description">Description</label>
          <textarea value={formData.description} onChange={handleInput} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" name="description" id="description" cols="30" rows="10"></textarea>
        </div>
      </Modal>
      <Modal show={experience} title='Add Experience' handleClose={handleExperience} handleSave={postExperience}>
        <div className='flex flex-col'>
          <label className="text-gray-600 text-sm" htmlFor="title">Title</label>
          <input type="text" value={formData.title} onChange={handleInput} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" name="title" id="title" />
          <label className="text-gray-600 text-sm" htmlFor="companyName">Company Name</label>
          <input type="text" value={formData.companyName} onChange={handleInput} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" name="companyName" id="companyName" />
          <label className="text-gray-600 text-sm" htmlFor="employmentType">Employment Type</label>
          <select
            name='employmentType'
            value={formData.employmentType}
            onChange={handleInput}
            className="block w-full py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none">
            <option value="">Please Select</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="self">Self Employed</option>
            <option value="contract">Contract</option>
            <option value="freelance">Freelance</option>
            <option value="internship">Internship</option>
            <option value="apprenticeship">Apprenticeship</option>
            <option value="seasonal">Seasonal</option>
          </select>
          <label className="text-gray-600 text-sm" htmlFor="location">Location</label>
          <select
            value={formData.location} onChange={handleInput}
            name='location'
            className="block w-full py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none">
            <option value="">Please Select</option>
            <option value="on-site">On-Site</option>
            <option value="hybrid">Hybrid</option>
            <option value="remote">Remote</option>
          </select>
          <label className="text-gray-600 text-sm" htmlFor="startDate">Start Date</label>
          <input type="date" value={formData.startDate} onChange={handleInput} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" name="startDate" id="startDate" />
          <label className="text-gray-600 text-sm" htmlFor="endDate">End Date</label>
          <input type="date" value={formData.endDate} onChange={handleInput} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" name="endDate" id="endDate" />
          <label className="text-gray-600 text-sm" htmlFor="description">Description</label>
          <textarea value={formData.description} onChange={handleInput} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" name="description" id="description" cols="30" rows="10"></textarea>
        </div>
      </Modal>
    </div>
  );
};

export default Experience;