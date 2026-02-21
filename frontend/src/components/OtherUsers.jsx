import React from 'react'
import OtherUser from './OtherUSer'
import { useSelector } from 'react-redux'

const OtherUsers = () => {
    const { otherUsers } = useSelector(store => store.user);

    if (!otherUsers) return null;

    return (
        <div className='overflow-auto flex-1'>
            {
                otherUsers?.map((user) => {
                    return (
                        <OtherUser key={user._id} user={user} />
                    )
                })
            }
        </div>
    )
}

export default OtherUsers
