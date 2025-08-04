import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faMessage, faArrowRotateBack } from '@fortawesome/free-solid-svg-icons';
import useSendMessage from '../hooks/useSendMessage';
import useGetMessage from '../hooks/useGetMessage';
import Message from './Message';
import profilePic from '../images/profileAvatar.webp'
import InputEmoji from 'react-input-emoji'
import { useSelector } from 'react-redux';

const ChatBox = ({ onBackClick }) => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useSendMessage();
  const { messages } = useGetMessage();


  const authUser = useSelector((state) => state.auth.user)
  const selectedConversation = useSelector((state) => state.conversation.selectedConversation)
  const lastMessage = useRef()
  
  useEffect(() => {
    lastMessage.current?.scrollIntoView({ behaviour: 'smooth' })
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    try {
      await sendMessage(message, selectedConversation._id);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md shadow-lg border border-white border-opacity-20 rounded p-4 mt-12 h-full w-full relative">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <div>
          <div className='flex items-center gap-4 bg-[#03182D] text-white p-3 rounded-t-lg shadow-md'>
            <FontAwesomeIcon icon={faArrowRotateBack} onClick={onBackClick} className='lg:hidden size-12' />
            <div className="flex flex-row items-center w-full">
              <img
                src={profilePic}
                alt="Profile"
                className="h-12 w-12 rounded-full object-cover"
              />
              <h4 className="font-bold text-xl">{selectedConversation?.firstName}</h4>
            </div>
          </div>
          <div className=' max-h-[357px] overflow-y-auto scrollbar-thin scrollbar-thumb scrollbar-thumb-gray-300'>
            <div className='p-3'>
              {messages.length > 0 && messages.map((message) => (
                <div key={message._id} ref={lastMessage}>
                  <Message message={message} />
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 w-full absolute bottom-0 left-0 bg-gray-400 rounded-full py-2 px-4">
              <InputEmoji
                value={message}
                onChange={setMessage}
                cleanOnEnter
                placeholder="Type your message"
                theme="light"
                className="w-full"
              />
              <button type="submit" className="text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-full transition-colors">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBox;

const NoChatSelected = () => {
  const  authUser  = useSelector((state)=>state.auth.user)
  return (
    <div className="flex items-center justify-center h-full min-h-[700px] w-full min-w-[700px]">
      <div className="px-4 sm:text-lg md:text-xl font-semibold flex flex-col items-center gap-2 text-white text-center mt-28">
        <p>Welcome🙌 {authUser?.info?.firstName} {authUser?.info?.lastName}</p>
        <p>Select a chat to start Messaging</p>
        <FontAwesomeIcon className="text-3xl md:text-6xl text-center" icon={faMessage} />
      </div>
    </div>
  );
};
