import React from 'react'
import Message from './Message'
import useGetMessages from '../hooks/useGetMessages'
import { useSelector } from 'react-redux'

const Messages = () => {
    useGetMessages();
    const { messages } = useSelector(store => store.message);
    console.log("DEBUG: Messages from Redux in Messages component:", messages);

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {
                messages?.map((message) => {
                    return (
                        <Message key={message._id} message={message} />
                    )
                })
            }
        </div>
    )
}

export default Messages
