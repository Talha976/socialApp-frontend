import React from 'react';
import useListenMesssage from '../hooks/useListenMessage'
import {format} from 'timeago.js'
import { useSelector } from 'react-redux';

const Message = ({ message }) => {
  useListenMesssage()
  const authUser  = useSelector((state)=>state.auth.user);
  const {selectedConversation} = useSelector((state) => state.conversation);
  const fromMe = message.senderID === authUser?.info?._id;

  return (
    <div className={`flex items-start gap-2 ${fromMe ? 'justify-end' : 'justify-start'}`}>

      <div className="flex flex-col max-w-[70%]">
        <div
          className={`p-2 rounded-lg text-sm max-w-full break-words flex flex-col ${
            fromMe ? 'bg-blue-500 text-white self-end' : 'bg-gray-800 text-white'
          }`}
        >
          {message.message}
          <span className='text-xs text-gray-500 mt-1'> {fromMe ? 'You' : selectedConversation?.firstName} </span>
        </div>

        <div
          className={`text-xs text-gray-500 mt-1 ${
            fromMe ? 'text-right' : 'text-left'
          }`}
        >
           {format(message.createdAt)}
        </div>
      </div>
    </div>

  );
};

export default Message;
