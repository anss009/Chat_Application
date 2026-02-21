import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import OtherUsers from './OtherUsers';

const SideBar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col w-full md:w-[350px]'>
      <form action="" className='flex items-center gap-2'>
        <input
          type="text"
          className='input input-bordered rounded-full bg-zinc-700/50 text-white placeholder:text-zinc-400 border-zinc-600 focus:border-zinc-500 h-10 transition-all duration-300'
          placeholder='Search...'
        />
        <button type='submit' className='btn btn-circle bg-zinc-700/50 text-white border-zinc-600 hover:bg-zinc-600/50 min-h-10 h-10 w-10 transition-all duration-300'>
          <IoSearchOutline className='w-5 h-5 outline-none' />
        </button>
      </form>
      <div className="divider px-3"></div>
      <OtherUsers />
      <div className='mt-auto pt-4'>
        <button className='btn btn-sm btn-ghost text-white hover:bg-white/10'>Logout</button>
      </div>
    </div>
  )
}

export default SideBar
