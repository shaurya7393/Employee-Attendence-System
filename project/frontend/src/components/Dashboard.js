import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/api/user`);
            setUserData(response.data);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };

    return (
        <div className='flex justify-center'>
            {userData ? (
                <table className='min-w-full divide-y divide-gray-200'>
                    <thead>
                        <tr>
                            <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Username</th>
                            <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Login Time</th>
                            <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Logout Time</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {userData.map(user => (
                            <tr key={user._id}>
                                <td className='px-6 py-4 whitespace-nowrap'>{user.username}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{user.loginTime}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{user.logoutTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default Dashboard;
