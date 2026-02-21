import React, { useEffect } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

const useGetMessages = () => {
  const { selectedUser } = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!selectedUser?._id) return;
        dispatch(setMessages(null)); // Clear old messages before fetching new ones
        axios.defaults.withCredentials = true;
        const res = await axios.get(`http://localhost:3000/api/v1/message/${selectedUser?._id}`);
        if (res.data.messages) {
          dispatch(setMessages(res.data.messages));
        }
      } catch (error) {
        console.error("Axios Error in useGetMessages:", error);
      }
    }
    fetchMessages();
  }, [selectedUser?._id, dispatch])
}

export default useGetMessages
