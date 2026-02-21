import React from 'react'
import OtherUser from './OtherUser'
import { useSelector } from 'react-redux'

const OtherUsers = ({ search }) => {
    const { otherUsers } = useSelector(store => store.user);

    if (!otherUsers) return null;

    // Filter users based on search with defensive check
    const filteredUsers = Array.isArray(otherUsers) ? otherUsers.filter((user) =>
        user.fullname.toLowerCase().includes(search.toLowerCase())
    ) : [];

    return (
        <div className='overflow-auto flex-1'>
            {
                filteredUsers?.map((user) => {
                    return (
                        <OtherUser key={user._id} user={user} />
                    )
                })
            }
        </div>
    )
}

export default OtherUsers
