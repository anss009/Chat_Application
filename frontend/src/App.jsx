import './App.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import HomePage from './components/HomePage'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Welcome from './components/Welcome'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client';
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';

// Protected route: shows HomePage if logged in, redirects to /welcome if not
const ProtectedRoute = () => {
  const { authUser } = useSelector(store => store.user);
  return authUser ? <HomePage /> : <Navigate to="/welcome" />;
};

// Guest route: shows component if NOT logged in, redirects to / if already logged in
const GuestRoute = ({ children }) => {
  const { authUser } = useSelector(store => store.user);
  return authUser ? <Navigate to="/" /> : children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />
  },
  {
    path: "/welcome",
    element: <GuestRoute><Welcome /></GuestRoute>
  },
  {
    path: "/login",
    element: <GuestRoute><Login /></GuestRoute>
  },
  {
    path: "/register",
    element: <GuestRoute><SignUp /></GuestRoute>
  },
  {
    path: "/signup",
    element: <GuestRoute><SignUp /></GuestRoute>
  }
])

function App() {
  const { authUser } = useSelector(store => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (authUser) {
      const socket = io(import.meta.env.VITE_API_URL, {
        query: {
          userId: authUser._id
        }
      });
      dispatch(setSocket(socket));

      socket.on("connect", () => {
        console.log("SOCKET_CLIENT: Connected successfully to server ✅");
      });

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