import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';

const Message = ({ message }) => {
    const { authUser, selectedUser } = useSelector(store => store.user);

    const isMe = message?.senderId === authUser?._id;
    const scroll = useRef(null);
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message])
    return (
        <div ref={scroll} className={`chat ${isMe ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={isMe ? authUser?.profilePhoto : selectedUser?.profilePhoto}
                    />
                </div>
            </div>
            <div className="chat-header text-white">
                <time className="text-xs opacity-50 text-white ml-2">12:45</time>
            </div>
            <div className={`chat-bubble ${isMe ? 'bg-zinc-700 text-white' : 'bg-zinc-500 text-white'}`}>
                {message?.message}
            </div>
            <div className="chat-footer opacity-50 text-white">
                Delivered
            </div>
        </div>
    )
}

export default Message
