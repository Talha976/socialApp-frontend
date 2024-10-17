import React from 'react';
import AdminHOC from './AdminHOC';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faPlusSquare, faUsers } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';

const Dashboard = () => {
    return (
        <div className="ml-64">
            <div className="flex h-screen bg-gray-100 mt-20">
                <div className="flex-1 flex flex-col">
                   <Header title='Dashboard' />
                    <main className="flex-1 p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="p-6 bg-white border border-blue-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                                <div className="flex flex-row gap-3 items-center">
                                    <FontAwesomeIcon className="text-blue-600" icon={faUsers} />
                                    <h3 className="font-bold text-lg text-gray-800">Total Users</h3>
                                </div>
                                <p className="mt-4 text-3xl font-semibold text-gray-700">12</p>
                            </div>
                            <div className="p-6 bg-white border border-green-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                                <div className="flex flex-row gap-3 items-center">
                                    <FontAwesomeIcon className="text-green-600" icon={faList} />
                                    <h3 className="font-bold text-lg text-gray-800">Jobs Posted</h3>
                                </div>
                                <p className="mt-4 text-3xl font-semibold text-gray-700">3</p>
                            </div>
                            <div className="p-6 bg-white border border-red-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                                <div className="flex flex-row gap-3 items-center">
                                    <FontAwesomeIcon className="text-red-600" icon={faUsers} />
                                    <h3 className="font-bold text-lg text-gray-800">Applications</h3>
                                </div>
                                <p className="mt-4 text-3xl font-semibold text-gray-700">3</p>
                            </div>
                            <div className="p-6 bg-white border border-yellow-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                                <div className="flex flex-row gap-3 items-center">
                                    <FontAwesomeIcon className="text-yellow-600" icon={faPlusSquare} />
                                    <h3 className="font-bold text-lg text-gray-800">New Messages</h3>
                                </div>
                                <p className="mt-4 text-3xl font-semibold text-gray-700">5</p>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminHOC(Dashboard);
