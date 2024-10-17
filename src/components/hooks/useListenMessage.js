import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../../redux/slices/conversationSlice';

const useListenMessage = () => {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket.socket); 
  const {messages} = useSelector((state)=>state.conversation)


  useEffect(() => {
    if (!socket) return; 

    const handleNewMessage = (newMessage) => {
      // const sound = new Audio(auido);
      // sound.play();
      dispatch(setMessages([...messages,newMessage]));
    };

    socket?.on('newMessage', handleNewMessage);

    return () => {
      socket?.off('newMessage', handleNewMessage);
    };
  }, [socket, dispatch]);

  return null;
};

export default useListenMessage;