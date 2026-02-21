import React, { useEffect } from 'react'
import axios from 'axios'

const userGetOtherUsers = () => {
  
    useEffect(()=>{
        const fetchOtherUsers = async ()=>{
            try {
                const res = await axios.get('http://localhost:3000/api/v1/user/');
                console.log(res)

            } catch (error) {
                console.log(error)
            }
        }
        fetchOtherUsers(); 
    },[])
}

export default userGetOtherUsers
