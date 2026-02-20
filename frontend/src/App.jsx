import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { Toaster } from 'react-hot-toast'

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
  return (
    <div className='min-h-screen w-full flex items-center justify-center p-4'>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  )
}

export default App