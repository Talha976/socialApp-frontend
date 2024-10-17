import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addMessage } from '../../redux/slices/conversationSlice';

const useSendMessage = () => {
  const dispatch = useDispatch();
  const {selectedConversation}  = useSelector((state) => state.conversation);
  const authUser = useSelector((state) => state.auth.user);
  
  const sendMessage = async (message) => {
    if (!authUser || !selectedConversation?._id) {
      console.error('User or conversation ID is missing');
      return;
    }

    try {
      const response = await axios.post(
        `/send/${selectedConversation._id}`,
        { message },
      );
      dispatch(addMessage(response.data));
    } catch (error) {
      if (error.response) {
        console.error('Error:', error.response.data.message);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error in sending message:', error.message);
      }
    }
  };

  return { sendMessage };
};

export default useSendMessage;
