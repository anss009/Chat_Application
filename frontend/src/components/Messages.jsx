import React from 'react'
import Message from './Message'
import useGetMessages from '../hooks/useGetMessages'
import { useSelector } from 'react-redux'

const Messages = () => {
    useGetMessages();
    const { messages } = useSelector(store => store.message);
    const { selectedUser, authUser } = useSelector(store => store.user);

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {
                (messages && messages.length > 0) ? (
                    messages?.map((message) => {
                        return (
                            <Message key={message._id} message={message} />
                        )
                    })
                ) : (
                    <div className='flex flex-col items-center justify-center h-full text-zinc-400'>
                        <p className='text-md font-semibold text-white italic'>Say Hi to {selectedUser?.fullname} 👋</p>
                    </div>
                )
            }
        </div>
    )
}

export default Messages
