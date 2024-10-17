import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setMessages } from '../../redux/slices/conversationSlice';

const useGetMessage = () => {
  const dispatch = useDispatch();
  const { selectedConversation, messages } = useSelector((state) => state.conversation);
  const authUser = useSelector((state) => state.auth.user); 
  const socket = useSelector((state) => state.socket.socket); 


  useEffect(() => {
    const getMessage = async () => {
      if (!selectedConversation?._id || !authUser?.info?._id) return;

      try {
        const response = await axios.get(
          `/messages/${selectedConversation._id}`
        );

        const data = response.data;
        dispatch(setMessages(data));
      } catch (error) {
        if (error.response) {
          console.error('Error fetching messages:', error.response.data.message);
        } else {
          console.error('Server error:', error.message);
        }
      }
    };

    if(selectedConversation?._id){
      getMessage();
    }

  }, [selectedConversation, dispatch, authUser]);

  return { messages };
};

export default useGetMessage;

