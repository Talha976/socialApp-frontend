import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserFriends, faBriefcase, faCommentDots, faBell, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import pic from '../images/social.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow z-50">
      <nav className="flex justify-between pl-10 pr-10 items-center mx-auto py-2">
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center">
            <img src={pic} className="h-8 w-8" alt="Logo" />
          </NavLink>
          <div className="hidden md:block ml-4">
            <input
              type="text"
              className="border border-gray-300 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search"
            />
          </div>
          <div className="md:hidden ml-4">
            <input
              type="text"
              className="border border-gray-300 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="md:hidden flex items-center" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} className="text-2xl" />
        </div>
        <div className={`hidden md:flex items-center space-x-4 `}>
          {[
            { to: '/', icon: faHome, label: 'Home' },
            { to: '/network', icon: faUserFriends, label: 'My Network' },
            { to: '/jobs', icon: faBriefcase, label: 'Jobs' },
            { to: '/messaging', icon: faCommentDots, label: 'Messaging' },
            { to: '/notification', icon: faBell, label: 'Notifications' },
            { to: '/profile', icon: faUser, label: 'Me' },
          ].map(({ to, icon, label }) => (
            <NavLink
              to={to}
              key={label}
              className="flex flex-col items-center p-1  text-gray-600 hover:text-black"

            >
              <FontAwesomeIcon icon={icon} />
              <span className="text-sm">{label}</span>
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-transparent transition-all duration-300 ease-in-out transform origin-left scale-x-0 group-hover:scale-x-100 group-active:scale-x-100" />
            </NavLink>
          ))}
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-md mt-2 w-full">
          {[
            { to: '/', icon: faHome, label: 'Home' },
            { to: '/network', icon: faUserFriends, label: 'My Network' },
            { to: '/jobs', icon: faBriefcase, label: 'Jobs' },
            { to: '/messaging', icon: faCommentDots, label: 'Messaging' },
            { to: '/notification', icon: faBell, label: 'Notifications' },
            { to: '/profile', icon: faUser, label: 'Me' },
          ].map(({ to, icon, label }) => (
            <NavLink
              to={to}
              key={label}
              className="flex items-center pl-10 p-2 text-gray-600 hover:bg-gray-300 hover:text-black"
              activeClassName="border-b-2"
            >
              <FontAwesomeIcon icon={icon} className="mr-2" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
