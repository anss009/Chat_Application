import React, { useEffect } from 'react'
import axios from 'axios';

const useGetMessages =  () => {
  useEffect(()=>{
        const fetchMessages = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`http://localhost:3000/api/v1/message/697fd7ba0de059075bbf3626`);
                console.log("Fetched Messages:", res.data);
                dispatch(setMessages(res.data));
            } catch (error) {
            console.log(error);         
            }
        } 
        fetchMessages(); 
   },[])
}

export default useGetMessages
