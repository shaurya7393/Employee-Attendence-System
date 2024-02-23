import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();
    const handleLogin = async () => {
        // console.log('Login button clicked');
        try {
            if(!username){
                // alert("Enter username first");
                toast.error("Enter username first");
                return;
            }
            if (!password) {
                // alert("Enter password first");
                toast.error("Enter password first");
                return;
            }
            const response = await axios.post('http://localhost:5000/api/login', { username, password });
            // handle login success
            
            if(response.status===200){
                navigate('/landing', { state: { username, password } });
            }
            
        } catch (error) {
            if(error.response.status === 401){
                
                    toast.error('Invalid username or password');
                }
            else if (error.response.status === 500) {
                toast.error('login failed');
            }
        }
    };

   

    const handleRegistration = async () => {
        try {
            if (!username) {
                toast.error("Enter username first");
                // alert("Enter username first");
                return;
            }
            if (!password) {
                toast.error("Enter password first");
                return;
            }
            const response = await axios.post('http://localhost:5000/api/register', { username, password });
            // handle registration success
            // console.log(response);
            // navigate('/');
            if (response.status === 201) toast.success('User registered successfully');

        } catch (error) {
            if (error.response.status === 400) {
                toast.error('user already exists');
            }
            else if (error.response.status === 500) {
                toast.error('failed to register');
            }
        }
    };
    const movetoDashboard=()=>{
        navigate('/dashboard');
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col items-center border-8 p-7 rounded-xl border-blue-300">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-2 border-blue-700 rounded-md p-2 mb-3"
                    placeholder="Username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-2 border-blue-700 rounded-md p-2 mb-3"
                    placeholder="Password"
                />
                <button
                    onClick={handleLogin}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md mr-3 cursor-pointer"
                >
                    Login
                </button>
                <div className='flex gap-4'>
                <button
                    onClick={handleRegistration}
                    className="bg-green-500 text-white py-2 px-4 rounded-md mt-3 cursor-pointer"
                >
                    Register
                </button>
                    <button
                        onClick={movetoDashboard}
                        className="bg-green-500 text-white py-2 px-4 rounded-md mt-3 cursor-pointer"
                    >
                        Dashboard
                    </button>
                    </div>
            </div>
            <ToastContainer />
        </div>
    );

};

export default Home;
