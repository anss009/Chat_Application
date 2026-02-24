import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client';
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <SignUp />
  },
  {
    path: "/signup",
    element: <SignUp />
  }
])

function App() {
  const { authUser } = useSelector(store => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:3000", {
        query: {
          userId: authUser._id
        }
      });
      dispatch(setSocket(socket));
      socket.on("getOnlineUsers", (onlineUsers) => {
        console.log("RECEIVED ONLINE USERS FROM SERVER:", onlineUsers);
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => {
        socket.close();
        dispatch(setSocket(null));
      }
    } else {
      dispatch(setSocket(null));
    }
  }, [authUser]);
  return (
    <div className='min-h-screen w-full flex items-center justify-center p-4'>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  )
}

export default App