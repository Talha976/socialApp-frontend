import React from 'react'
import pic from '../images/pic.jpg'
import AdminHOC from './AdminHOC'
import Header from './Header';


const AdminProfile = () => {
    return (
        <div className='ml-64 '>
            <Header title='Admin Profile' />
            <div className='flex items-center justify-center mt-20'></div>
            <div className="flex flex-col items-center justify-center p-5 bg-gray-100">
                <div className="w-full max-w-md p-6 bg-white border rounded-lg shadow-lg">

                    <div className="flex justify-center mb-4">
                        <img
                            src={pic}
                            alt="Admin Profile"
                            className="w-32 h-32 rounded-full border-4 border-blue-500"
                        />
                    </div>

                    <div className="text-center mb-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Talha Rana</h2>
                        <p className="text-gray-600">Administrator</p>
                    </div>

                    <div className="flex flex-col text-sm">
                        <div className="flex justify-between py-2 border-t">
                            <span className="text-gray-600">Email:</span>
                            <span className="text-gray-800">talhashahzad834@gmail.com</span>
                        </div>
                        <div className="flex justify-between py-2 border-t">
                            <span className="text-gray-600">Phone:</span>
                            <span className="text-gray-800">+92 3467560939</span>
                        </div>
                        <div className="flex justify-between py-2 border-t">
                            <span className="text-gray-600">Location:</span>
                            <span className="text-gray-800">Fort Abbas, Bahawalnagar</span>
                        </div>
                    </div>

                    <div className="flex justify-between mt-6">
                      
                        <button className="w-full px-4 py-2 ml-2 text-white bg-red-500 rounded-md hover:bg-red-600">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AdminHOC(AdminProfile)
