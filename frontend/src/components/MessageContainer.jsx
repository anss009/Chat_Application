import React from 'react'
import SendInput from './SendInput'
import Messages from './Messages'
import { useSelector } from 'react-redux'

const MessageContainer = () => {
  const { selectedUser } = useSelector(store => store.user);

  return (
    <div className='md:min-w-[450px] flex flex-col h-full'>
      <div className='bg-slate-500/30 px-4 py-2 mb-2 flex items-center gap-3'>
        <div className='avatar online'>
          <div className='w-10 rounded-full border-2 border-zinc-600'>
            <img src={selectedUser?.profilePhoto || "https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg"} alt="user-profile" />
          </div>
        </div>
        <div className='flex flex-col'>
          <span className='text-white font-bold'>{selectedUser?.fullname || "Select a user"}</span>
        </div>
      </div>

      <Messages />

      <SendInput />
    </div>
  )
}

export default MessageContainer
