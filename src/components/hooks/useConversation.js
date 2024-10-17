import { useEffect, useState } from 'react';
import axios from 'axios'

const useConversation = () => {
  const [conversations, setConversations] = useState([]);
  
  const getConversation = async () => {
    try {
      const response = await axios.get('/all-users');
      setConversations(response.data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  useEffect(() => {
    getConversation();
  }, []);
  return { conversations };
};

export default useConversation;
