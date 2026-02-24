import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages'
import { useSelector, useDispatch } from 'react-redux'
import { TiMessages } from "react-icons/ti";
import { setSelectedUser } from '../redux/userSlice'

const MessageContainer = () => {
  const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
  const dispatch = useDispatch();

  const isOnline = onlineUsers?.includes(selectedUser?._id);

  useEffect(() => {
    return () => dispatch(setSelectedUser(null));
  }, [dispatch]);

  const maleAvatar = "https://static.vecteezy.com/system/resources/previews/014/388/508/non_2x/avatar-portrait-of-a-young-caucasian-boy-man-in-round-blue-frame-illustration-in-cartoon-flat-style-vector.jpg";
  const femaleAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK3ld3OtGOABKUv-gxfVyfus01zn5Dpx_5-2EYaONOTct5BCR10RXMyoA&s";

  const isProfilePhotoValid = selectedUser?.profilePhoto && !selectedUser.profilePhoto.includes("icon-library.com");

  return (
    <div className='md:min-w-[450px] flex flex-col h-full'>
      {
        selectedUser !== null ? (
          <>
            <div className='bg-slate-500/30 px-4 py-2 mb-2 flex items-center gap-3'>
              <div className={`avatar ${isOnline ? 'online' : ''}`}>
                <div className='w-10 rounded-full border-2 border-zinc-600'>
                  <img src={isProfilePhotoValid ? selectedUser.profilePhoto : (selectedUser?.gender === "Male" ? maleAvatar : femaleAvatar)} alt="user-profile" />
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
