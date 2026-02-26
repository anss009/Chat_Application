import React from 'react'
import { Link } from 'react-router-dom'
import { IoChatbubblesSharp } from "react-icons/io5";

const Welcome = () => {
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-lg border border-white/20 text-center'>

                {/* Icon */}
                <div className='flex justify-center mb-4'>
                    <div className='p-4 rounded-full bg-sky-500/20 border border-sky-400/30'>
                        <IoChatbubblesSharp className='text-5xl text-sky-400' />
                    </div>
                </div>

                {/* Title */}
                <h1 className='text-4xl font-bold text-white mb-2'>
                    Welcome to ChatApp
                </h1>
                <p className='text-zinc-400 text-sm mb-8'>
                    Connect with friends and start chatting instantly.
                </p>

                {/* Buttons */}
                <div className='flex flex-col gap-3'>
                    <Link
                        to='/login'
                        className='btn btn-block bg-white text-black border-none hover:bg-gray-200 text-base font-semibold h-12 transition-all duration-300 hover:scale-[1.02] no-underline'
                    >
                        Login
                    </Link>
                    <Link
                        to='/register'
                        className='btn btn-block bg-transparent text-white border border-white/30 hover:bg-white/10 text-base font-semibold h-12 transition-all duration-300 hover:scale-[1.02] no-underline'
                    >
                        Sign Up
                    </Link>
                </div>

                {/* Footer */}
                <p className='text-zinc-500 text-xs mt-6'>
                    Secure • Fast • Real-time
                </p>
            </div>
        </div>
    )
}

export default Welcome
