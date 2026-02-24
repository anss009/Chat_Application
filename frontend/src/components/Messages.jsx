import React from 'react'
import Message from './Message'
import useGetMessages from '../hooks/useGetMessages'
import { useSelector } from 'react-redux'
import useGetRealTimeMessages from '../hooks/getRealTimeMessages'

const Messages = () => {
    useGetRealTimeMessages();
    useGetMessages();
    const { messages } = useSelector(store => store.message);
    const { selectedUser, authUser } = useSelector(store => store.user);

    const lastMessageRef = React.useRef(null);

    React.useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    console.log("RENDERING MESSAGES COMPONENT. MESSAGE COUNT:", messages?.length || 0);

    return (
        <div className='px-4 flex-1 overflow-auto bg-transparent scrollbar-hide'>
            {
                (messages && messages.length > 0) ? (
                    messages.map((message) => {
                        return (
                            <div key={message._id} ref={lastMessageRef}>
                                <Message message={message} />
                            </div>
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