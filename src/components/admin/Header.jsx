import React from 'react';
import pic from '../images/pic.jpg';

const Header = ({ title }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-blue-600 fixed top-0 left-0 w-[calc(100%-16rem)] ml-64 z-10">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <div className="flex items-center">
        <span className="mr-4 text-white">Welcome, Admin</span>
        <img
          src={pic}
          alt="Admin Avatar"
          className="w-10 h-10 rounded-full border-2 border-white"
        />
      </div>
    </header>
  );
};

export default Header;
