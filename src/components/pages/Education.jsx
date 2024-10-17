import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Modal from '../commonComponents/Modal';
import Toaster from '../commonComponents/Toaster';

const Education = () => {
  const [editEducation, setEditEducation] = useState(false);
  const [education, setEducation] = useState(false);
  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    fetchEducation();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getUTCFullYear();

    return `${month} ${year}`;
  };

  const initialState = {
    school: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    grade: '',
    description: '',
  };

  const [formData, setFormData] = useState(initialState);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditEducation = (edu) => {
    setFormData(edu || initialState);
    setEditEducation(true);
  };

  const handleEducation = () => {
    setFormData(initialState);
    setEducation(!education);
  };

  const handleEducationSave = async () => {
    try {
      const response = await fetch('/education', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        Toaster({ status: 'success', message: data.message });
        setEducation(false);
        fetchEducation();
      } else {
        Toaster({ status: 'error', message: data.message });
      }
    } catch (error) {
      Toaster({ status: 'error', message: 'Server Error' });
    }
  };

  const fetchEducation = async () => {
    try {
      const response = await fetch('/education', {
        method: 'GET',
      });
      const data = await response.json();
      setFetchData(Array.isArray(data) ? data : [data]);
    } catch (error) {
      Toaster({ status: 'error', message: 'Failed to fetch education data' });
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`/education/${id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if (response.ok) {
        fetchEducation()
        Toaster({ status: 'success', message: data.message })
        handleEditEducation()
      } else {
        Toaster({ status: 'error', message: data.message })
      }
    } catch (error) {

    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/education/${id}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      if (response.ok) {
        Toaster({ status: 'success', message: data.message })
        fetchEducation()
      } else {
        Toaster({ status: 'error', message: data.message })
      }
    } catch (error) {
      Toaster({ status: 'error', message: 'Server Error' })
    }
  }

  return (
    <div>
      <div className='flex flex-row items-center justify-between mt-3'>
        <h2 className="text-xl font-semibold mb-1">Education</h2>
        <div className='flex flex-row gap-4'>
          <p className='cursor-pointer' onClick={handleEducation}> <FontAwesomeIcon icon={faPlus} /> </p>
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        {fetchData.length > 0 ? (
          fetchData.map((edu) => (
            <div key={edu._id} className="flex items-center justify-center relative flex-col bg-gradient-to-r from-blue-100 to-blue-500 p-4 rounded-lg">
              <h3 className="text-lg font-bold">{edu.degree}</h3>
              <p className="text-gray-500">{edu.school}</p>
              {edu.startDate && (
                <p>{`${formatDate(edu.startDate)} - ${edu.endDate ? formatDate(edu.endDate) : 'Present'}`}</p>
              )}
              <p>{edu.description && edu.description}</p>
              <div>
                <FontAwesomeIcon className='cursor-pointer absolute top-2 right-8' icon={faTrash} onClick={() => handleDelete(edu._id)} />
                <FontAwesomeIcon className='cursor-pointer absolute top-2 right-1' icon={faPen} onClick={() => handleEditEducation(edu)} />
              </div>
            </div>
          ))
        ) : (
          <p>No education data available.</p>
        )}
      </div>

      <Modal show={editEducation} title='Edit Education' handleClose={() => setEditEducation(false)} handleSave={() => handleUpdate(formData._id)}>
        <div className='flex flex-col'>
          <label className="text-gray-600 text-sm" htmlFor="school">School</label>
          <input type="text" value={formData.school} onChange={handleInput} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" name="school" id="school" />
          <label className="text-gray-600 text-sm" htmlFor="degree">Degree</label>
          <input type="text" value={formData.degree} onChange={handleInput} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" name="degree" id="degree" />
          <label className="text-gray-600 text-sm" htmlFor="fieldOfStudy">Field of Study</label>
          <input type="text" value={formData.fieldOfStudy} onChange={handleInput} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" name="fieldOfStudy" id="fieldOfStudy" />
          <label className="text-gray-600 text-sm" htmlFor="startDate">Start Date</label>
          <input type="date" value={formData.startDate} onChange={handleInput} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" name="startDate" id="startDate" />
          <label className="text-gray-600 text-sm" htmlFor="endDate">End Date</label>
          <input type="date" value={formData.endDate} onChange={handleInput} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" name="endDate" id="endDate" />
          <label className="text-gray-600 text-sm" htmlFor="grade">Grade</label>
          <input type="text" value={formData.grade} onChange={handleInput} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" name="grade" id="grade" />
          <label className="text-gray-600 text-sm" htmlFor="description">Description</label>
          <textarea value={formData.description} onChange={handleInput} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" name="description" id="description" cols="30" rows="3"></textarea>
        </div>
      </Modal>

      <Modal show={education} title='Add Education' handleClose={handleEducation} handleSave={handleEducationSave}>
        <div className='flex flex-col'>
          <label className="text-gray-600 text-sm" htmlFor="school">School</label>
          <input type="text" value={formData.school} onChange={handleInput} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" name="school" id="school" />
          <label className="text-gray-600 text-sm" htmlFor="degree">Degree</label>
          <input type="text" value={formData.degree} onChange={handleInput} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" name="degree" id="degree" />
          <label className="text-gray-600 text-sm" htmlFor="fieldOfStudy">Field of Study</label>
          <input type="text" value={formData.fieldOfStudy} onChange={handleInput} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" name="fieldOfStudy" id="fieldOfStudy" />
          <label className="text-gray-600 text-sm" htmlFor="startDate">Start Date</label>
          <input type="date" value={formData.startDate} onChange={handleInput} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" name="startDate" id="startDate" />
          <label className="text-gray-600 text-sm" htmlFor="endDate">End Date</label>
          <input type="date" value={formData.endDate} onChange={handleInput} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" name="endDate" id="endDate" />
          <label className="text-gray-600 text-sm" htmlFor="grade">Grade</label>
          <input type="text" value={formData.grade} onChange={handleInput} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" name="grade" id="grade" />
          <label className="text-gray-600 text-sm" htmlFor="description">Description</label>
          <textarea value={formData.description} onChange={handleInput} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" name="description" id="description" cols="30" rows="3"></textarea>
        </div>
      </Modal>
    </div>
  );
};

export default Education;
