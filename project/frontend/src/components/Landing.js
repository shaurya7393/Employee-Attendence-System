import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react'


const Landing = () => {
  const location = useLocation();
  const navigate=useNavigate();
  const { username, password } = location.state;
  const handlelogout = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/api/logout`, {username,password});
      // handle login success
      console.log(response);
      if (response.status === 200) {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='flex justify-center items-center mt-20'>
      <div className='flex flex-col justify-center items-center mt-8 p-5'>
      Welcome to the Main Page
        <button onClick={handlelogout} className="bg-blue-500 text-white py-2 h-10 w-20 px-4 rounded-md mr-3 justify-center mt-4 cursor-pointer">Logout</button>
      </div>
    </div>
  )
}

export default Landing
