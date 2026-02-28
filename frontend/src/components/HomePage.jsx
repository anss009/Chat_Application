import React, { useState } from 'react'
import SideBar from './SideBar'
import MessageContainer from './MessageContainer'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import { useSelector } from 'react-redux'

const HomePage = () => {
    useGetOtherUsers();
    const { selectedUser } = useSelector(store => store.user);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className='relative flex h-[100dvh] md:h-[550px] w-full md:w-auto rounded-none md:rounded-lg overflow-hidden bg-white/10 backdrop-blur-lg border-0 md:border border-white/20 shadow-xl'>

            {/* Sidebar: always visible on md+, overlay on mobile */}
            <div className={`hidden md:flex md:w-[350px] flex-col`}>
                <SideBar onUserSelect={() => setSidebarOpen(false)} />
            </div>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <>
                    {/* Dark backdrop */}
                    <div
                        className='md:hidden fixed inset-0 bg-black/50 z-40'
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                    {/* Sidebar panel */}
                    <div className='md:hidden fixed inset-y-0 left-0 w-[80%] max-w-[320px] z-50 bg-gray-900/95 backdrop-blur-xl border-r border-white/10 shadow-2xl animate-slide-in'>
                        <SideBar onUserSelect={() => setSidebarOpen(false)} />
                    </div>
                </>
            )}

            <div className='divider divider-horizontal px-1 mx-0 hidden md:flex'></div>

            {/* Chat area: always visible, full width on mobile */}
            <div className='flex flex-col flex-1 w-full'>
                <MessageContainer
                    onBack={() => setSidebarOpen(true)}
                    onHamburgerClick={() => setSidebarOpen(!sidebarOpen)}
                />
            </div>
        </div>
    )
}

export default HomePage
