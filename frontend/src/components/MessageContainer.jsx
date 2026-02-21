import React from 'react'
import SendInput from './SendInput'
import Messages from './Messages'

const MessageContainer = () => {
  return (
    <div className='md:min-w-[450px] flex flex-col h-full'>
      <div className='bg-slate-500/30 px-4 py-2 mb-2 flex items-center gap-2'>
        <span className='label-text text-gray-200'>To:</span>
        <span className='text-white font-bold'>John Doe</span>
      </div>

      <Messages />

      <SendInput />
    </div>
  )
}

export default MessageContainer
