import React from 'react'
import { IoSend } from "react-icons/io5";

const SendInput = () => {
  return (
    <form className='px-4 my-3'>
      <div className='w-full relative'>
        <input
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
