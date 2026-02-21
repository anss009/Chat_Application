import React from 'react'

const Message = () => {
    return (
        <div className="chat chat-end">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src="https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg" />
                </div>
            </div>
            <div className="chat-header text-white">
                <time className="text-xs opacity-50 text-white ml-2">12:45</time>
            </div>
            <div className="chat-bubble bg-zinc-700 text-white">I hate you!</div>
            <div className="chat-footer opacity-50 text-white">
                Delivered
            </div>
        </div>
    )
}

export default Message
