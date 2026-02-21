import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages'
import { useSelector, useDispatch } from 'react-redux'
import { TiMessages } from "react-icons/ti";
import { setSelectedUser } from '../redux/userSlice'

const MessageContainer = () => {
  const { selectedUser, authUser } = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(setSelectedUser(null));
  }, [dispatch]);

  return (
    <div className='md:min-w-[450px] flex flex-col h-full'>
      {
        selectedUser !== null ? (
          <>
            <div className='bg-slate-500/30 px-4 py-2 mb-2 flex items-center gap-3'>
              <div className='avatar online'>
                <div className='w-10 rounded-full border-2 border-zinc-600'>
                  <img src={selectedUser?.profilePhoto || "https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg"} alt="user-profile" />
                </div>
              </div>
              <div className='flex flex-col'>
                <span className='text-white font-bold'>{selectedUser?.fullname}</span>
              </div>
            </div>
            <Messages />
            <SendInput />
          </>
        ) : (
          <div className='flex flex-col items-center justify-center h-full text-white'>
            <TiMessages className='text-6xl text-sky-500 mb-4' />
            <h1 className='text-2xl font-bold'>Welcome, {authUser?.fullname}! </h1>
            <p className='text-zinc-400'>Select a user to start a conversation.</p>
          </div>
        )
      }
    </div>
  )
}

export default MessageContainer
