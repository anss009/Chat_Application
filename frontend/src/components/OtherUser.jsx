import React from 'react'

const OtherUser = () => {
  return (
    <>
      <div className='flex gap-2 items-center text-white hover:text-black hover:bg-zinc-200 rounded p-2 cursor-pointer transition-all duration-300'>
        <div className='avatar online'>
          <div className='w-12 rounded-full border-2 border-zinc-600'>
            <img src="https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg" alt="user-profile" />
          </div>
        </div>
        <div className='flex flex-col flex-1'>
          <div className='flex justify-between gap-2'>
            <p className='font-bold'>John Doe</p>
          </div>
        </div>
      </div>
      <div className='divider my-0 py-0 h-1 px-3'></div>
    </>
  )
}

export default OtherUser
