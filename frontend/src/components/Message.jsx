import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';

const Message = ({ message }) => {
    const { authUser, selectedUser } = useSelector(store => store.user);

    const isMe = message?.senderId === authUser?._id;
    const scroll = useRef(null);
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message])
    const maleAvatar = "https://static.vecteezy.com/system/resources/previews/014/388/508/non_2x/avatar-portrait-of-a-young-caucasian-boy-man-in-round-blue-frame-illustration-in-cartoon-flat-style-vector.jpg";
    const femaleAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK3ld3OtGOABKUv-gxfVyfus01zn5Dpx_5-2EYaONOTct5BCR10RXMyoA&s";

    const getProfilePhoto = (user) => {
        if (user?.profilePhoto && !user.profilePhoto.includes("icon-library.com")) {
            return user.profilePhoto;
        }
        return user?.gender === "Male" ? maleAvatar : femaleAvatar;
    };

    return (
        <div ref={scroll} className={`chat ${isMe ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={isMe ? getProfilePhoto(authUser) : getProfilePhoto(selectedUser)}
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
