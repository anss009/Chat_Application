import React from 'react'
import OtherUser from './OtherUser'
import { useSelector } from 'react-redux'

const OtherUsers = ({ search }) => {
    const { otherUsers, onlineUsers } = useSelector(store => store.user);

    if (!otherUsers) return null;

    // Filter users based on search
    const filteredUsers = Array.isArray(otherUsers) ? otherUsers.filter((user) =>
        user.fullname.toLowerCase().includes(search.toLowerCase())
    ) : [];

    // Use the order in otherUsers directly (which we manage via moveUserToTop)
    const sortedUsers = filteredUsers;

    return (
        <div className='overflow-auto flex-1'>
            {
                sortedUsers?.map((user) => {
                    return (
                        <OtherUser key={user._id} user={user} />
                    )
                })
            }
        </div>
    )
}

export default OtherUsers
