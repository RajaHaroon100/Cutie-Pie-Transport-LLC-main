import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAdmin } from '../context/AdminContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import LoadingModal from './Panel/Order/Order Components/LoadingModal'

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAdmin();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('/adminLogin', { username, password });
            login(response.data.token);
            toast.success('Login Successful');
            navigate('/adminPanel');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something went wrong. Try again later.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen bg-gray-100 font-sans">
            
            <LoadingModal isOpen={isLoading} />

            <div className="flex flex-col items-center justify-center h-full">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                            disabled={isLoading} // Disable the button when loading
                        >
                            Login
                        </button>
                        <Link to="/">
                            <button className="w-full mt-4 border border-gray-900 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 px-4 rounded-lg transition duration-300">
                                Back to Home
                            </button>
                        </Link>
                    </form>
                </div>
                <div className='pt-4'>
                    <p>&copy; 2024 Cutie Pie Transport, LLC</p>
                </div>
            </div>
            {/* <div className="flex flex-col p-4 items-center justify-center h-full md:hidden">
                <p className="text-xl font-semibold text-center text-gray-700">You can't access Admin Panel from Mobile Phone.</p>
                <p className="text-xl font-semibold pt-4 text-gray-700">Use Laptop or Personal Computer.</p>
            </div> */}
        </div>
    );
}