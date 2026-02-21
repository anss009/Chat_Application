import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '../redux/userSlice'

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3000/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        navigate('/')
        toast.success(res.data.message);
        dispatch(setAuthUser(res.data));
      }
    } catch (error) {
      console.error("Login Error:", error);
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
    setUser({
      username: "",
      password: "",
    })
  }
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-white/10 backdrop-blur-md border border-white/20'>
        <h1 className='text-3xl font-semibold text-center text-white'>
          Login
        </h1>

        <form onSubmit={onSubmit}>
          <div className='mt-4'>
            <label className='label p-2'>
              <span className='text-base label-text text-white font-medium'>Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type='text'
              placeholder='Enter Username'
              className='w-full input input-bordered h-10 bg-gray-800/50 text-white placeholder:text-white border-gray-700'
            />
          </div>

          <div className='mt-4'>
            <label className='label p-2'>
              <span className='text-base label-text text-white font-medium'>Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type='password'
              placeholder='Enter Password'
              className='w-full input input-bordered h-10 bg-gray-800/50 text-white placeholder:text-white border-gray-700'
            />
          </div>

          <div className='mt-2'>
            <span className='text-sm text-white'>
              {"Don't"} have an account?{' '}
            </span>
            <Link
              to='/register'
              className='text-sm hover:underline hover:text-gray-400 !text-white'
            >
              Sign up here
            </Link>
          </div>

          <div className='mt-2'>
            <button type='submit' className='btn btn-block btn-md mt-2 bg-white text-black border-none hover:bg-gray-200'>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
