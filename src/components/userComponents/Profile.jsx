import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Experience from '../pages/Experience';
import Education from '../pages/Education';
import Skills from '../pages/Skills';
import Modal from '../commonComponents/Modal';
import profileBg from '../images/bg.jpeg';
import WithHeader from '../commonComponents/HOC';
import Footer from '../commonComponents/Footer';
import talha from '../images/wb.jpg';
import umair from '../images/umair.jpg';
import awais from '../images/awais.jpg';
import abd from '../images/abd.jpg';
import pic from '../images/pic.jpg';
import DEFAULT_IMAGE_URL from '../images/user.png'
import Toaster from '../commonComponents/Toaster';
import { updateData, postData, fetchData } from '../hooks/customHooks';


const Profile = () => {
  const users = [
    { id: 1, name: 'Talha Rana', Skills: 'MERN Stack Developer', image: talha },
    { id: 2, name: 'Rana Umair', Skills: 'Architect Engineer', image: umair },
    { id: 3, name: 'Rana Awais', Skills: 'SQA Engineer', image: awais },
    { id: 4, name: 'Rana Abdullah', Skills: 'Full Stack Developer', image: abd },
    { id: 5, name: 'Roy Shahid', Skills: 'DJango Python Developer', image: pic },
  ];

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [about, setAbout] = useState(false);
  const [profile, setprofile] = useState('')
  const [file, setfile] = useState('')
  const [imgURL, setimgURL] = useState(DEFAULT_IMAGE_URL)
  const [aboutInput, setAboutInput] = useState('')
  const [aboutData, setAboutData] = useState('')
  // const [editAboutInput,setEditAboutInput] = useState('')


  useEffect(() => {
    fetchProfileImage();
    fetchAbout();
    fetchUser()
  }, []);

  const [formData, setFormData] = useState('');

  const handleEditProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const profileModal = () => {
    setprofile(!profile)
  }

  const handleEditModal = () => {
    setShowEditModal(!showEditModal);
  };

  const handleAboutModal = () => {
    setShowAboutModal(!showAboutModal);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleAbout = () => {
    setAbout(!about);
  };


  const editProfileSave = () => {
    updateData({ url: '/profile', formData });
  }

  const saveAbout = async () => {
    try {
      const response = await fetch('/profile/about', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ about: aboutInput }),
      });

      const data = await response.json();

      if (!response.ok) {
        Toaster({ status: 'error', message: data.message || 'Error saving about info' });
      } else {
        Toaster({ status: 'success', message: data.message });
        setAboutInput('');
      }
    } catch (error) {
      Toaster({ status: 'error', message: 'Server Error' });
    }
  };
  const fetchAbout = async () => {
    try {
      const response = await fetch('/profile/about', {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      })
      const data = await response.json()
      if (response.ok) {
        setAboutData(data.about)
      }
    } catch (error) {
      Toaster({ status: 'error', message: 'Server Error' });
    }

  }


  const fetchUser = async () => {
    try {
      const response = await fetch('/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const saveEditAbout = async () => {
    try {
      const response = await fetch('/profile/about', {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ about: aboutData })
      })
      const data = response.json()
      if (response.ok) {
        Toaster({ status: 'success', message: data.message })
      }
      else {
        Toaster({ status: 'error', message: data.message })

      }
    } catch (error) {
      Toaster({ status: 'error', message: 'Server Error' })
    }
  }

  const saveProfileImg = async () => {
    const formData = new FormData();
    formData.append('profile-image', file);

    try {
      const response = await fetch('/profile', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        Toaster({ status: 'error', message: data.message });
      } else {
        Toaster({ status: 'success', message: data.message });
      }
    } catch (error) {
      Toaster({ status: 'error', message: 'Server Error' });
    }
  };

  const fetchProfileImage = async () => {
    try {
      const response = await fetch('/profile', { method: 'GET' });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setimgURL(data.profileImage || DEFAULT_IMAGE_URL);
      } else {
        Toaster({ status: 'error', message: data.message || 'Failed to load profile image' });
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
      Toaster({ status: 'error', message: 'Error fetching profile image' });
    }
  };






  return (
    <div className="">
      <div className=" items-center justify-center mx-auto mt-14 p-5 flex flex-col lg:flex-row">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-3/4">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="relative">
                  <div className="bg-cover bg-center h-52" style={{ backgroundImage: `url(${profileBg})` }}>
                    <div className="absolute border-white -bottom-10 left-2">
                      <img src={`${imgURL ? imgURL : DEFAULT_IMAGE_URL}`} alt="Profile" className="rounded-full border-4 border-white w-36 h-36" />
                      <p onClick={profileModal} className="absolute bottom-6 right-0 cursor-pointer pr-2 pl-2  bg-gray-800 text-white rounded-md shadow-lg hover:bg-gray-700">
                        <FontAwesomeIcon icon={faCamera} />
                      </p>

                    </div>
                  </div>


                </div>
                <div className="flex justify-between mt-14">
                  <div className="">
                    <h2 className="text-2xl font-bold">
                      {(formData.firstName || formData.lastName || formData.additionalName) &&
                        `${formData.firstName || ''} ${formData.lastName || ''} ${formData.additionalName ? `(${formData.additionalName})` : ''}`}
                    </h2>
                    <p className="text-lg">{formData.headline || ''}</p>
                    <p className="text-gray-500">  {(formData.city || formData.country) && `${formData.city || ''}, ${formData.country || ''}`}</p>
                    <NavLink className="text-blue-500 hover:underline">381 Connections</NavLink>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="cursor-pointer" onClick={handleEditModal}>
                      <FontAwesomeIcon icon={faPen} />
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex justify-between">
                    <h2 className="text-xl font-semibold">About</h2>
                    <div className="flex flex-row gap-4">
                      <p className="cursor-pointer" onClick={handleAbout}>
                        <FontAwesomeIcon icon={faPlus} />
                      </p>
                      <p className="cursor-pointer" onClick={handleAboutModal}>
                        <FontAwesomeIcon icon={faPen} />
                      </p>
                    </div>
                  </div>
                  <p className="mt-2">
                    {aboutData}
                    <span className="text-blue-500 cursor-pointer" onClick={toggleShowMore}>
                      {showMore ? 'See Less' : 'See More'}
                    </span>
                  </p>
                </div>

                <Experience />
                <Education />
                <Skills />
              </div>
            </div>
            <div className="lg:w-1/4 lg:ml-4">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">People Also Viewed</h2>
                <div className="flex flex-col gap-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex hover:bg-gray-200 cursor-pointer p-2 items-center">
                      <img src={user.image} alt={user.name} className="w-12 h-12 rounded-full border-2 border-white" />
                      <div className="ml-2">
                        <h3 className="text-lg">{user.name}</h3>
                        <p className="text-gray-500">{user.Skills}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={profile} handleClose={profileModal} handleSave={saveProfileImg} title='Upload Profile Picture'>
        <div>
          <label
            htmlFor="profile-image"
            className="flex items-center justify-center w-full h-12 bg-blue-500 text-white rounded-md shadow-md cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            <span className="text-lg font-semibold">Upload Image</span>
          </label>
          <input type="file" onChange={(e) => setfile(e.target.files[0])} name='profile-image' className="hidden" id="profile-image" />
        </div>
      </Modal>
      <Modal show={showEditModal} handleClose={handleEditModal} handleSave={editProfileSave} title="Edit Info">
        <form>
          <div className="flex flex-col gap-2">
            <label className="text-gray-600 text-sm" htmlFor="fname">First Name</label>
            <input type="text" value={formData.firstName} onChange={handleEditProfileChange} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" name="firstName" id="fname" />
            <label className="text-gray-600 text-sm" htmlFor="lname">Last Name</label>
            <input type="text" value={formData.lastName} onChange={handleEditProfileChange} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" name="lastName" id="lname" />
            <label className="text-gray-600 text-sm" htmlFor="aName">Additional Name</label>
            <input type="text" value={formData.additionalName} onChange={handleEditProfileChange} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" name="additionalName" id="aName" />
            <label className="text-gray-600 text-sm" htmlFor="headline">Headline</label>
            <input type="text" value={formData.headline} onChange={handleEditProfileChange} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" name="headline" id="headline" />
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <h4>Current Position</h4>
            <label className="text-gray-600 text-sm" htmlFor="cPosition">Position</label>
            <input type="text" value={formData.position} onChange={handleEditProfileChange} name='position' id="cPosition" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" />
            <label className="text-gray-600 text-sm" htmlFor="industry">Industry</label>
            <input type="text" value={formData.industry} onChange={handleEditProfileChange} name='industry' id="industry" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" />
          </div>
          <div className="mt-3 flex flex-col">
            <h4>Education</h4>
            <label className="text-gray-600 text-sm" htmlFor="education">School Name</label>
            <input type="text" value={formData.schoolName} onChange={handleEditProfileChange} name='schoolName' id="education" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" />
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <h4>Location</h4>
            <label className="text-gray-600 text-sm" htmlFor="country">Country/Region</label>
            <input type="text" value={formData.country} onChange={handleEditProfileChange} name="country" id="country" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
            />
            <label className="text-gray-600 text-sm" htmlFor="city">City</label>
            <input type="text" value={formData.city} onChange={handleEditProfileChange} name="city" id="city" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
            />
          </div>
          <div>
            <h4>Website</h4>
            <p>Add a link that will appear at the top of your profile</p>
            <label className="text-gray-600 text-sm mt-2" htmlFor="website">Link</label>
            <input type="text" value={formData.website} onChange={handleEditProfileChange} id="website" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" />
          </div>
        </form>
      </Modal>
      <Modal show={showAboutModal} handleClose={handleAboutModal} title='Edit About Info' handleSave={saveEditAbout}>
        <div>
          <textarea name="editAbout" value={aboutData} onChange={(e) => setAboutData(e.target.value)} id="" cols="30" rows="3" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"></textarea>
        </div>
      </Modal>
      <Modal show={about} handleClose={handleAbout} title='Add About Info' handleSave={saveAbout}>
        <div>
          <textarea name="about" value={aboutInput} onChange={(e) => setAboutInput(e.target.value)} id="" cols="30" rows="3" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"></textarea>
        </div>
      </Modal>
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


      <Footer />
    </div>
  );
};

export default WithHeader(Profile);