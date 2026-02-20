import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const SignUp = () => {
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmedPassword: "",
    gender: "",
  });

  const navigate = useNavigate();
  const handleCheckBoxChange = (gender) => {
    setUser({ ...user, gender })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3000/api/v1/user/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        navigate('/login')
        console.log(res
          



        );
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
    setUser({
      fullname: "",
      username: "",
      password: "",
      confirmedPassword: "",
      gender: "",
    })
  }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-white/10 backdrop-blur-md border border-white/20'>
        <h1 className='text-3xl font-semibold text-center text-white'>
          Sign Up
        </h1>

        <form onSubmit={onSubmit} action="">
          <div className='mt-4'>
            <label className='label p-2'>
              <span className='text-base label-text text-black font-medium'>Full Name</span>
            </label>
            <input
              value={user.fullname}
              onChange={(e) => setUser({ ...user, fullname: e.target.value })}
              type='text'
              placeholder='Enter Full Name'
              className='w-full input input-bordered h-10 bg-gray-800/50 text-white placeholder:text-white border-gray-700'
            />
          </div>

          <div className='mt-4'>
            <label className='label p-2'>
              <span className='text-base label-text text-black font-medium'>Username</span>
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
              <span className='text-base label-text text-black font-medium'>Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type='password'
              placeholder='Enter Password'
              className='w-full input input-bordered h-10 bg-gray-800/50 text-white placeholder:text-white border-gray-700'
            />
          </div>

          <div className='mt-4'>
            <label className='label p-2'>
              <span className='text-base label-text text-black font-medium'>Confirm Password</span>
            </label>
            <input
              value={user.confirmedPassword}
              onChange={(e) => setUser({ ...user, confirmedPassword: e.target.value })}
              type='password'
              placeholder='Confirm Password'
              className='w-full input input-bordered h-10 bg-gray-800/50 text-white placeholder:text-white border-gray-700'
            />
          </div>

          <div className='flex gap-4 mt-2'>
            <div className='form-control'>
              <label className={`label gap-2 cursor-pointer`}>
                <span className='label-text text-black'>Male</span>
                <input type='checkbox'
                  checked={user.gender === "Male"}
                  onChange={() => handleCheckBoxChange("Male")}
                  className='checkbox checkbox-primary border-slate-900' />
              </label>
            </div>
            <div className='form-control'>
              <label className={`label gap-2 cursor-pointer`}>
                <span className='label-text text-black'>Female</span>
                <input type='checkbox'
                  checked={user.gender === "Female"}
                  onChange={() => handleCheckBoxChange("Female")}
                  className='checkbox checkbox-primary border-slate-900' />
              </label>
            </div>
          </div>


          <div className='mt-2'>
            <span className='text-sm text-white'>
              Already have an account?{' '}
            </span>
            <Link
              to='/login'
              className='text-sm hover:underline hover:text-gray-400 !text-white'
            >
              Login Here
            </Link>
          </div>

          <div className='mt-2'>
            <button type='submit' className='btn btn-block btn-md mt-2 bg-white text-black border-none hover:bg-gray-200'>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp