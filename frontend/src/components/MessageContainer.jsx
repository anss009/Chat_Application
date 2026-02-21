import React from 'react'
import SendInput from './SendInput'

const MessageContainer = () => {
  return (
    <div className='md:min-w-[450px] flex flex-col h-full'>
      <div className='bg-slate-500/30 px-4 py-2 mb-2 flex items-center gap-2'>
        <span className='label-text text-gray-200'>To:</span>
        <span className='text-white font-bold'>John Doe</span>
      </div>

      <div className='flex-1 overflow-auto px-4 py-2 space-y-4'>
        {/* Messages will be rendered here */}
        <div className='flex flex-col items-center justify-center h-full text-gray-400'>
          <p>Select a chat to start messaging</p>
        </div>
      </div>

      <SendInput />
    </div>
  )
}

export default MessageContainer
