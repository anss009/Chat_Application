import React from 'react'
import SideBar from './SideBar'
import MessageContainer from './MessageContainer'

const HomePage = () => {
    return (
        <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl'>
            <SideBar />
            <div className='divider divider-horizontal px-1 mx-0 hidden md:flex'></div>
            <MessageContainer />
        </div>
    )
}

export default HomePage
