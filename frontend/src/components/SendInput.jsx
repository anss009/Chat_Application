import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const SendInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector(store => store.user);
  const { messages } = useSelector(store => store.message);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3000/api/v1/message/send/${selectedUser?._id}`, { message }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      console.log(res)
      if (res.data.success) {
        dispatch(setMessages([...(messages || []), res?.data?.newMessage]));
      }
    } catch (error) {
      console.log(error);
    }
    setMessage("");
  }

  return (
    <form onSubmit={onSubmitHandler} className='px-4 my-3'>
      <div className='w-full relative'>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className='border text-sm rounded-lg block w-full p-3 bg-gray-700 border-gray-600 text-white focus:ring-sky-500 focus:border-sky-500 transition-all'
          placeholder='Send a message...'
        />
        <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-4 text-white hover:text-sky-500 transition-colors'>
          <IoSend />
        </button>
      </div>
    </form>
  )
}

export default SendInput
