import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import avatar from '../../images/profileAvatar.webp';
import useConversation from '../../hooks/useConversation';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedConversation } from '../../../redux/slices/conversationSlice';

const Sidebar = ({ onChatClick }) => {
  const authUser = useSelector((state) => state.auth.user);
  const selectedConversation = useSelector((state) => state.conversation);
  const onlineUsers = useSelector((state) => state.socket.connectedUsers);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const { conversations } = useConversation();
  console.log('conversation', conversations);

  const selectChat = (user) => {
    dispatch(setSelectedConversation(user));
    localStorage.setItem('chat', JSON.stringify(user));
    onChatClick(user);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    else {
      const conversation = conversations.find((c) =>
        c.firstName.toLowerCase().includes(search.toLowerCase())
      );
      dispatch(setSelectedConversation(conversation));
      localStorage.setItem('chat', JSON.stringify(conversation));
      setSearch('');
    }
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md shadow-lg border border-white border-opacity-20 rounded-lg p-6 h-full min-h-[700px] w-full  overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-600 transition-all duration-200 ease-in-out">
      <form className="flex items-center justify-center gap-3 mb-4" onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="bg-white bg-opacity-30 rounded-full text-white placeholder-white py-2 px-4 outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150"
        />
        <button className="bg-white bg-opacity-30 text-white p-2 rounded-full cursor-pointer hover:bg-opacity-50 transition-all duration-150">
          <FontAwesomeIcon icon={faSearch} className='rounded-full' />
        </button>
      </form>

      <div className="">
        {conversations.map((user) => {
          const isSelected = selectedConversation?._id === user._id;
          const isOnlineUser = onlineUsers.includes(user._id);

          return (
            <div
              key={user._id}
              className={`flex items-center gap-3 border-b p-2 cursor-pointer border-gray-600 pb-2 rounded-md transition-all duration-150 ease-in-out transform hover:scale-105 hover:bg-white hover:bg-opacity-30 hover:shadow-lg ${
                isSelected ? 'shadow-lg bg-white bg-opacity-30' : ''
              }`}
              onClick={() => selectChat(user)}
            >
              <div className="relative">
                <img
                  src={user?.profileImage || avatar}
                  alt={user?.firstName}
                  className="rounded-full bg-center shadow-md hover:shadow-lg transition-all duration-150"
                  style={{ width: '60px', height: '60px' }}
                />
                {isOnlineUser && (
                  <div className="absolute h-3 w-3 bg-green-600 rounded-full top-1 right-1 border-2 border-white"></div>
                )}
              </div>
              <h6 className="text-white font-semibold">{user?.firstName}</h6>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
