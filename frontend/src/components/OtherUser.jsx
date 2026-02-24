import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector(store => store.user);
  const isOnline = onlineUsers?.includes(user?._id); 

  // LOG FOR DEBUGGING - Check your browser console!
  console.log(`Checking status for ${user?.fullname}: isOnline = ${isOnline}`, "Online Users List:", onlineUsers);

  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  }

  const maleAvatar = "https://static.vecteezy.com/system/resources/previews/014/388/508/non_2x/avatar-portrait-of-a-young-caucasian-boy-man-in-round-blue-frame-illustration-in-cartoon-flat-style-vector.jpg";
  const femaleAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK3ld3OtGOABKUv-gxfVyfus01zn5Dpx_5-2EYaONOTct5BCR10RXMyoA&s";

  // Check if profilePhoto is a broken/old link
  const isProfilePhotoValid = user?.profilePhoto && !user.profilePhoto.includes("icon-library.com");

  return (
    <>
      <div onClick={() => selectedUserHandler(user)} className={`${selectedUser?._id === user?._id ? 'bg-zinc-200 text-black' : 'text-white'} flex gap-2 items-center hover:text-black hover:bg-zinc-200 rounded p-2 cursor-pointer transition-all duration-300`}>
        <div className={`avatar ${isOnline ? 'online' : ''} relative`}>
          <div className='w-12 rounded-full border-2 border-zinc-600'>
            <img src={isProfilePhotoValid ? user.profilePhoto : (user?.gender === "Male" ? maleAvatar : femaleAvatar)} alt="user-profile" />
          </div>
          {/* Manual Backup Green Dot for testing */}
          {isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>}
        </div>
        <div className='flex flex-col flex-1'>
          <div className='flex justify-between gap-2'>
            <p className='font-bold'>{user?.fullname}</p>
          </div>
        </div>
      </div>
      <div className='divider my-0 py-0 h-1 px-3'></div>
    </>
  )
}

export default OtherUser
