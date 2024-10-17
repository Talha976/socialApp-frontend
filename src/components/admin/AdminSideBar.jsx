import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTachometerAlt,
    faPlusSquare,
    faList,
    faUsers,
    faUserCircle,
    faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, Bounce } from 'react-toastify';
import Toaster from '../commonComponents/Toaster';

const AdminSideBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('/admin-logout', {
                method: 'POST',
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok) {
                Toaster({ status: 'success', message: data.message || 'Successfully logged out' });
                navigate('/admin-login');
            } else {
                Toaster({ status: 'error', message: data.message || 'Logout failed' });
            }
        } catch (error) {
            Toaster({ status: 'error', message: 'An error occurred during logout' });
        } finally {
            setIsModalOpen(false);
        }
    };

    return (
        <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 shadow-lg">
                <ul className="space-y-2 font-medium">
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-600 dark:hover:bg-gray-700 group ${isActive ? 'bg-blue-600 text-white hover:bg-black hover:text-white' : ''}`
                            }
                        >
                            <FontAwesomeIcon icon={faTachometerAlt} className="w-5 h-5 transition duration-75 dark:text-gray-400" />
                            <span className="ml-3">Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/create_job"
                            className={({ isActive }) =>
                                `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-600 dark:hover:bg-gray-700 group ${isActive ? 'bg-blue-600 text-white hover:bg-black hover:text-white' : ''}`
                            }
                        >
                            <FontAwesomeIcon icon={faPlusSquare} className="w-5 h-5 transition duration-75 dark:text-gray-400" />
                            <span className="ml-3">Create Job</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/job_list"
                            className={({ isActive }) =>
                                `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-600 dark:hover:bg-gray-700 group ${isActive ? 'bg-blue-600 text-white hover:bg-black hover:text-white' : ''}`
                            }
                        >
                            <FontAwesomeIcon icon={faList} className="w-5 h-5 transition duration-75 dark:text-gray-400" />
                            <span className="ml-3">Job Listing</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/applicants"
                            className={({ isActive }) =>
                                `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-600 dark:hover:bg-gray-700 group ${isActive ? 'bg-blue-600 text-white hover:bg-black hover:text-white' : ''}`
                            }
                        >
                            <FontAwesomeIcon icon={faUsers} className="w-5 h-5 transition duration-75 dark:text-gray-400" />
                            <span className="ml-3">Applicants</span>
                            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin_profile"
                            className={({ isActive }) =>
                                `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-600 dark:hover:bg-gray-700 group ${isActive ? 'bg-blue-600 text-white hover:bg-black hover:text-white' : ''}`
                            }
                        >
                            <FontAwesomeIcon icon={faUserCircle} className="w-5 h-5 transition duration-75 dark:text-gray-400" />
                            <span className="ml-3">Profile</span>
                        </NavLink>
                    </li>
                    <li>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-600 dark:hover:bg-gray-700 group w-full"
                        >
                            <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5 transition duration-75 dark:text-gray-400" />
                            <span className="ml-3">Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
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
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden bg-gray-900 bg-opacity-50">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button
                                type="button"
                                className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => setIsModalOpen(false)}
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 text-center">
                                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to logout?</h3>
                                <button
                                    onClick={handleLogout}
                                    type="button"
                                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                                >
                                    Yes, I'm sure
                                </button>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    type="button"
                                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                >
                                    No, cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
};

export default AdminSideBar;
