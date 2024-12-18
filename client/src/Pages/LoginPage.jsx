import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../Assets/MentorHands.png';

const LoginPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'Mentee',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('https://margdarshak-find-the-right-mentor.onrender.com/api/auth/login', formData);
    
            if (response.data.success) {
                // Store authentication details in localStorage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('token', response.data.token);
    
                // Store user-specific data and navigate based on role
                if (formData.role === 'Mentor') {
                    localStorage.setItem('mentorData', JSON.stringify(response.data.mentorData));
                    localStorage.setItem('mentorId', response.data.mentorData._id);
                    localStorage.setItem('role', 'Mentor');
                    navigate('/mentor-dashboard');
                } else {
                    localStorage.setItem('menteeData', JSON.stringify(response.data.menteeData));
                    localStorage.setItem('menteeId', response.data.menteeData._id);
                    localStorage.setItem('role', 'Mentee');
                    navigate('/mentee-dashboard');
                }
            } else {
                setError(response.data.message || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred. Please try again.');
        }
    };
    
    const toggleRole = () => {
        setFormData((prevData) => ({
            ...prevData,
            role: prevData.role === 'Mentor' ? 'Mentee' : 'Mentor',
        }));
    };

    const handleMentorApply = () => navigate('/mentor-register');
    const handleMenteeSignUp = () => navigate('/mentee-register');

    return (
        <div className="login-container flex flex-col md:flex-row justify-center items-center max-h-screen bg-green-50">
            <div className="hidden logo-container w-full md:w-5/12 md:flex flex-col justify-center items-center h-full m-2">
                <img src={logo} alt="MentorHands Logo" className="logo w-1/4 md:w-1/3" />
                <p className='text-[#3B50D5] text-xl md:text-5xl text-semibold mt-10'>Margadarshak</p>
            </div>

            <div className="form-container w-full md:w-7/12 bg-white flex flex-col justify-center p-8 md:p-36 max-h-screen">
                <h1 className="text-xl font-semibold mb-6">Log In as {formData.role}</h1>

                <div className="toggle-role mb-6 flex">
                    <button
                        className={`px-4 py-2 ${formData.role === 'Mentor' ? 'bg-black text-white' : 'bg-white text-black border border-gray-300'} rounded-l-md`}
                        onClick={toggleRole}
                    >
                        I'm a Mentor
                    </button>
                    <button
                        className={`px-4 py-2 ${formData.role === 'Mentee' ? 'bg-black text-white' : 'bg-white text-black border border-gray-300'} rounded-r-md`}
                        onClick={toggleRole}
                    >
                        I'm a Mentee
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
                    <div className="form-group w-full">
                        <label htmlFor="email" className="block mb-1 text-sm">Enter your Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div className="form-group w-full">
                        <label htmlFor="password" className="block mb-1 text-sm">Enter your Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500">{error}</p>}

                    <button className="w-full h-12 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors" type="submit">
                        Log In
                    </button>

                    <p>Or</p>

                    <button
                        className="w-full h-12 bg-white text-black rounded-md hover:bg-black hover:text-white transition-colors border border-black"
                        type="button"
                    >
                        Log In with Google
                    </button>
                </form>

                <p className="mt-2">Forgot Password?</p>

                <p className="mt-2">
                    <span className="text-green-500 cursor-pointer" onClick={handleMenteeSignUp}>
                        Sign up as a Mentee
                    </span>
                    <span className="mx-2">Or</span>
                    <span className="text-green-500 cursor-pointer" onClick={handleMentorApply}>
                        Apply to be a Mentor
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;