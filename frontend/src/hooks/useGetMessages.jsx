import React, { useEffect } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

const useGetMessages = () => {
  const { selectedUser } = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useGetMessages effect triggered for:", selectedUser?.fullname);
    const fetchMessages = async () => {
      try {
        if (!selectedUser?._id) return;
        dispatch(setMessages(null)); // Clear old messages before fetching new ones
        axios.defaults.withCredentials = true;
        const res = await axios.get(`http://localhost:3000/api/v1/message/${selectedUser?._id}`);
        console.log("DEBUG: Full API Response data:", res.data);
        if (res.data.messages) {
          console.log("DEBUG: Found messages array:", res.data.messages);
          dispatch(setMessages(res.data.messages));
        } else {
          console.log("DEBUG: 'messages' property not found in response.");
          console.error("Messages not found in response:", res.data);
        }
      } catch (error) {
        console.error("Axios Error in useGetMessages:", error);
      }
    }
    fetchMessages();
  }, [selectedUser?._id, dispatch])
}

export default useGetMessages
