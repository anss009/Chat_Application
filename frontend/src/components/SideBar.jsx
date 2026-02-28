import React, { useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';

const SideBar = ({ onUserSelect }) => {
  const [search, setSearch] = useState("");
  const { otherUsers } = useSelector(store => store.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOutHandler = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/logout`, { withCredentials: true });
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
      dispatch(setOtherUsers(null));
      dispatch(setSelectedUser(null));
    } catch (error) {
      console.log(error);
    }
  }
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const conversationUser = otherUsers?.find((user) => user.fullname.toLowerCase().includes(search.toLowerCase()));
    if (conversationUser) {
      dispatch(setSelectedUser(conversationUser));
      onUserSelect?.();
    } else {
      toast.error("User not found");
    }
  }
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col w-full h-full'>
      <form onSubmit={onSubmitHandler} action="" className='flex items-center gap-2'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className='input input-bordered rounded-full bg-zinc-700/50 text-white placeholder:text-zinc-400 border-zinc-600 focus:border-zinc-500 h-10 transition-all duration-300 flex-1'
          placeholder='Search...'
        />
        <button type='submit' className='btn btn-circle bg-zinc-700/50 text-white border-zinc-600 hover:bg-zinc-600/50 min-h-10 h-10 w-10 transition-all duration-300'>
          <IoSearchOutline className='w-5 h-5 outline-none' />
        </button>
      </form>
      <div className="divider px-3"></div>
      <OtherUsers search={search} onUserSelect={onUserSelect} />
      <div className='mt-auto pt-4'>
        <button onClick={logOutHandler} className='btn btn-sm btn-ghost text-white hover:bg-white/10'>Logout</button>
      </div>
    </div>
  )
}

export default SideBar
