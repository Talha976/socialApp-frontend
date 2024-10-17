import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { io } from 'socket.io-client';
import WithHeader from '../commonComponents/HOC';
import { format } from 'timeago.js';

// const socket = io('http://localhost:3001');

const iconMap = {
  like: faThumbsUp,
  comment: faComment,
  connect: faUserPlus,
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/notifications', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (response.ok) {
          setNotifications(data);
        } else {
          console.error('Failed to fetch notifications', data.message);
        }
      } catch (error) {
        console.error('Server error:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="mt-14 p-5 container mx-auto">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold">Notifications</h3>
        </div>
        <ul className="list-none">
          {notifications.map(notification => (
            <li key={notification._id} className="flex items-center p-4 bg-white rounded-lg shadow mb-2">
              <FontAwesomeIcon icon={iconMap[notification.icon]} className="text-blue-500 mr-3 text-2xl" />
              <div className="flex-grow">
                <p className="mb-1">{notification.message}</p>
                <small className="text-gray-500">{format(notification.createdAt)}</small>
              </div>
              <NavLink to={`/post/${notification.post}`}>
                <button className="border border-blue-500 text-blue-500 px-4 py-1 rounded hover:bg-blue-500 hover:text-white transition">
                  View
                </button>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WithHeader(Notifications);
