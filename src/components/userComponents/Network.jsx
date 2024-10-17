import React, { useEffect, useState } from 'react';
import { faChevronDown, faChevronUp, faUserFriends, faAddressBook, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WithHeader from '../commonComponents/HOC';
import Toaster from '../commonComponents/Toaster';
import useConversation from '../hooks/useConversation';
import avatar from '../images/avatar.png';
import { Bounce, ToastContainer } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Network = () => {
    const [requests, setRequests] = useState([]);
    const { conversations } = useConversation();
    const [show, setShow] = useState(false);
    const authUser = useSelector((state)=>state.auth.user)
    const senderId = authUser?.info?._id;

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await fetch('/get-requests', {
                method: 'GET',
            });
            const data = await response.json();
            if (response.ok) {
                setRequests(data);
                console.log(data)
            } else {
                Toaster({ status: 'error', message: data.message || 'Failed to fetch requests' });
            }
        } catch (error) {
            Toaster({ status: 'error', message: 'Server Error' });
        }
    };

    const handleShow = () => {
        setShow(!show);
    };

    const sendRequest = async (senderId, receiverId) => {
        try {
            const response = await fetch('/send-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ senderId, receiverId }),
            });
            const data = await response.json();
            if (response.ok) {
                Toaster({ status: 'success', message: data.message });
            } else {
                Toaster({ status: 'error', message: data.message });
            }
        } catch (error) {
            Toaster({ status: 'error', message: 'Server Error' });
        }
    };

    const acceptRequest = async (requestId) => {
        try {
            const response = await fetch('/accept-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ requestId }),
            });
            const data = await response.json();
            if (response.ok) {
                Toaster({ status: 'success', message: data.message });
                fetchRequests();
            } else {
                Toaster({ status: 'error', message: data.message });
            }
        } catch (error) {
            Toaster({ status: 'error', message: 'Server Error' });
        }
    };

    const rejectRequest = async (requestId) => {
        try {
            const response = await fetch('/reject-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ requestId }),
            });
            const data = await response.json();
            if (response.ok) {
                Toaster({ status: 'success', message: data.message });
                fetchRequests();
            } else {
                Toaster({ status: 'error', message: data.message });
            }
        } catch (error) {
            Toaster({ status: 'error', message: 'Server Error' });
        }
    };

    return (
        <div className="mt-14 container mx-auto">
            <div className="flex flex-col lg:flex-row p-5">
                <div className="w-full lg:w-1/4 mb-4">
                    <div className='border rounded bg-white p-3 shadow-sm'>
                        <div className='flex justify-between items-center'>
                            <h6 className='font-bold mb-0'>Manage My Network</h6>
                            <FontAwesomeIcon
                                className="cursor-pointer"
                                icon={show ? faChevronUp : faChevronDown}
                                onClick={handleShow}
                            />
                        </div>
                        {show && (
                            <div className='mt-3'>
                                <ul className="list-none">
                                    <li className=" text-gray-500 cursor-pointer p-2 rounded hover:bg-gray-100">
                                        <NavLink to='/connections' className='flex items-center' >
                                            <FontAwesomeIcon icon={faUserFriends} className="mr-2" />
                                            <h6 className="mb-0">Connections</h6>
                                        </NavLink>
                                    </li>
                                    <li className="flex items-center text-gray-500 cursor-pointer p-2 rounded hover:bg-gray-100">
                                        <FontAwesomeIcon icon={faAddressBook} className="mr-2" />
                                        <h6 className="mb-0">Contacts</h6>
                                    </li>
                                    <li className="flex items-center text-gray-500 cursor-pointer p-2 rounded hover:bg-gray-100">
                                        <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                                        <h6 className="mb-0">Following & Followers</h6>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full lg:w-3/4">
                    <div className='border rounded bg-white p-3 mb-3 shadow-sm'>
                        <h5 className='font-bold mb-0'>Grow</h5>
                    </div>

                    <div className='bg-white p-3 mb-3 border rounded shadow-sm'>
                        <h4 className='border-b pb-2'>Invitations</h4>
                        <div className="bg-white p-3 border rounded shadow-sm">
                            {requests.length > 0 ? requests.map(request => (
                                <div key={request._id} className="flex items-center mb-3 p-2 border-b">
                                    <img
                                        src={request.sender.profileImage || avatar}
                                        alt="Profile"
                                        className="rounded-full mr-3"
                                        style={{ width: '60px', height: '60px' }}
                                    />
                                    <div className="flex-grow">
                                        <h5 className="mb-1">{request.sender.firstName} {request.sender.lastName}</h5>
                                    </div>
                                    <div className='flex flex-row'>
                                        <button
                                            onClick={() => acceptRequest(request._id)}
                                            className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-white py-1 px-2 rounded mr-2"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => rejectRequest(request._id)}
                                            className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-1 px-2 rounded"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            )) : (<p>No invitations</p>)}
                        </div>
                    </div>

                    <div className='bg-white p-4 rounded border shadow-sm'>
                        <h5 className='border-b pb-3'>Based on your recent activity</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {conversations.map(user => (
                                <div key={user._id} className="bg-white border rounded shadow-sm h-full p-3 flex flex-col items-center">
                                    <img
                                        src={user.profileimage || avatar}
                                        alt="Profile"
                                        className="rounded-full mb-2"
                                        style={{ width: '80px', height: '80px' }}
                                    />
                                    <h6 className="font-semibold mb-1">{user.firstName} {user.lastName}</h6>
                                    <p className="text-center text-gray-500 mb-0">{user.headline}</p>
                                    <button onClick={() => sendRequest(senderId, user._id)} className="mt-2 border border-gray-800 text-gray-800 py-1 px-2 rounded hover:bg-gray-800 hover:text-white transition">
                                        Connect
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
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
        </div>
    );
};

export default WithHeader(Network);

