import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages'
import { useSelector, useDispatch } from 'react-redux'
import { TiMessages } from "react-icons/ti";
import { IoArrowBack } from "react-icons/io5";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { setSelectedUser } from '../redux/userSlice'

const MessageContainer = ({ onBack, onHamburgerClick }) => {
  const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
  const dispatch = useDispatch();

  const isOnline = onlineUsers?.includes(selectedUser?._id);

  useEffect(() => {
    return () => dispatch(setSelectedUser(null));
  }, [dispatch]);

  const maleAvatar = "https://static.vecteezy.com/system/resources/previews/014/388/508/non_2x/avatar-portrait-of-a-young-caucasian-boy-man-in-round-blue-frame-illustration-in-cartoon-flat-style-vector.jpg";
  const femaleAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK3ld3OtGOABKUv-gxfVyfus01zn5Dpx_5-2EYaONOTct5BCR10RXMyoA&s";

  const isProfilePhotoValid = selectedUser?.profilePhoto && !selectedUser.profilePhoto.includes("icon-library.com");

  const handleBack = () => {
    dispatch(setSelectedUser(null));
    onBack?.();
  }

  return (
    <div className='md:min-w-[450px] flex flex-col h-full w-full'>
      {
        selectedUser !== null ? (
          <>
            <div className='bg-slate-500/30 px-4 py-2 mb-2 flex items-center gap-3'>
              {/* Back button on mobile to reopen sidebar */}
              <button onClick={handleBack} className='md:hidden btn btn-ghost btn-sm btn-circle text-white'>
                <IoArrowBack className='w-5 h-5' />
              </button>
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
          <div className='flex flex-col items-center justify-center h-full text-white relative'>
            {/* Hamburger button on mobile - top left */}
            <button onClick={onHamburgerClick} className='md:hidden absolute top-4 left-4 btn btn-ghost btn-sm btn-circle text-white'>
              <HiOutlineMenuAlt2 className='w-6 h-6' />
            </button>
            <TiMessages className='text-6xl text-sky-500 mb-4' />
            <h1 className='text-2xl font-bold'>Welcome, {authUser?.fullname}!</h1>
            <p className='text-zinc-400'>Select a user to start a conversation.</p>
          </div>
        )
      }
    </div>
  )
}

export default MessageContainer
