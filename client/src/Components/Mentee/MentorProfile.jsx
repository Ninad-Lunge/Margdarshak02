import React, { useState, useEffect } from 'react';

import Navbar from '../../Components/Mentee/MenteeNavbar.jsx';

import { FaEnvelope, FaYoutube, FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaGlobe } from "react-icons/fa";

const MentorProfile = () => {
    const [mentorData, setMentorData] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const mentorId = localStorage.getItem('mentorId'); // Assume the mentor ID is stored in localStorage

    useEffect(() => {
        const fetchFollowStatus = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`/api/mentor/${mentorId}/is-following`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if (data.success) {
                    setIsFollowing(data.isFollowing);
                }
            } catch (error) {
                console.error('Error checking follow status:', error);
            }
        };

        const fetchMentorData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`/api/mentor/${mentorId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if (data.success) {
                    setMentorData(data.mentor);
                }
            } catch (error) {
                console.error('Error fetching mentor data:', error);
            }
        };

        fetchFollowStatus();
        fetchMentorData();
    }, [mentorId]);

    const toggleFollow = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/mentor/${mentorId}/follow`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (data.success) {
                setIsFollowing(!isFollowing);
                //realtime update
                const newFollowerCount = isFollowing ? mentorData.followerCount - 1 : mentorData.followerCount + 1;
                setMentorData({
                    ...mentorData,
                    followerCount: newFollowerCount,
                });

            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error toggling follow status:', error);
            alert('An error occurred.');
        }
    };


    return (
        <div className="mentor min-h-screen bg-gray-50">
            <Navbar />

            <div className="grid grid-cols-1 lg:grid-cols-4 mt-3 mx-6 gap-3">
                {/* Sidebar */}
                <div className="col-span-1 border border-black rounded-md py-8 bg-white shadow-md ">
                    <img
                        src="hhbootstrap"
                        alt="Mentor Profile"
                        className="mentor-img border border-gray-300 rounded-full h-32 w-32 mx-auto"
                    />
                    <h1 className="mentor-name mt-4 text-xl font-bold text-center">
                        {mentorData?.firstName} {mentorData?.lastName}
                    </h1>
                    <p className="text-center text-gray-600 mt-2">Job Title: {mentorData?.jobTitle}</p>
                    <div className=" flex justify-center gap-5 mt-2 text-gray-700">
                        <span className="text-lg font-medium ">Rating:</span>
                        <div className="flex justify-center mt-1">
                            {/* Example Rating with 4 Stars */}
                            <span className="text-yellow-400">★</span>
                            <span className="text-yellow-400">★</span>
                            <span className="text-yellow-400">★</span>
                            <span className="text-yellow-400">★</span>
                            <span className="text-gray-300">★</span>
                        </div>
                    </div>


                    <button
                        className={`mt-4 px-3 py-1 rounded ${isFollowing ? 'mx-auto block bg-green-400' : 'bg-blue-500 text-white hover:bg-blue-600 mx-auto block'
                            }`}
                        onClick={toggleFollow}>
                        {isFollowing ? 'Following' : 'Follow'}
                    </button>
                </div>


                {/* Stats Section */}
                <div className="stats col-span-2 border border-black rounded-md bg-white mx-0shadow-md p-6 w-100 ">
                    <h2 className="text-lg font-bold text-center">Your Stats</h2>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold">{mentorData?.followerCount}</h3>
                            <p className="text-gray-600">Followers</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold">52</h3>
                            <p className="text-gray-600">Community Created</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold">5</h3>
                            <p className="text-gray-600">Workshops</p>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h2 className="text-lg font-semibold text-gray-800">Areas of Expertise:</h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-center">
                            {/* Expertise Item 1 */}
                            <li className="bg-green-100 text-green-700 p-3 text-sm rounded-lg shadow-sm hover:shadow-md hover:bg-green-200 transition duration-300">
                                Web Development
                            </li>
                            {/* Expertise Item 2 */}
                            <li className="bg-green-100 text-green-700 p-3 text-sm rounded-lg shadow-sm hover:shadow-md hover:bg-green-200 transition duration-300">
                                Data Science
                            </li>
                            {/* Expertise Item 3 */}
                            <li className="bg-green-100 text-green-700 p-3 text-sm rounded-lg shadow-sm hover:shadow-md hover:bg-green-200 transition duration-300">
                                Machine Learning
                            </li>
                            {/* Expertise Item 4 */}
                            <li className="bg-green-100 text-green-700 p-3 text-sm rounded-lg shadow-sm hover:shadow-md hover:bg-green-200 transition duration-300">
                                App Development
                            </li>
                            {/* Expertise Item 5 */}
                            <li className="bg-green-100 text-green-700 p-3 text-sm rounded-lg shadow-sm hover:shadow-md hover:bg-green-200 transition duration-300">
                                Cloud Computing
                            </li>
                            {/* Expertise Item 6 */}
                            <li className="bg-green-100 text-green-700 p-3 text-sm rounded-lg shadow-sm hover:shadow-md hover:bg-green-200 transition duration-300">
                                Cybersecurity
                            </li>
                        </ul>

                    </div>


                </div>

                {/* Meetings Section */}

                <div className='grid grid-rows-2 gap-3'>
                    <div className='flex flex-col border border-black rounded-md p-6'>
                        <h2 className="text-lg font-bold text-gray-800">Book an Online Meet:</h2>
                        <h2 className="font-medium text-gray-800">Available for Meet on:</h2>
                        <div className="flex items-center justify-center gap-4">
                            <h3 className="text-gray-800 font-medium">Sunday 04 August 2024</h3>
                            <button
                                // onClick={handleNavigation}
                                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition">
                                Book
                            </button>
                        </div>

                        <div className="mt-2 flex items-center justify-center gap-4">
                            <h3 className="text-gray-800 font-medium">Sunday 30 August 2024</h3>
                            <button
                                // onClick={handleNavigation}
                                className="bg-blue-500 text-white px-2 py-1  rounded hover:bg-blue-600 transition">
                                Book
                            </button>
                        </div>

                    </div>

                    <div className="flex flex-col border border-black rounded-md p-6">
                        <h2 className="text-lg font-bold text-gray-800">Connect</h2>
                        <div className="flex justify-start mt-6 space-x-4">
                            {/* Gmail */}
                            <a
                                href={mentorData?.email}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-black-600 hover:text-red-800"
                            >
                                <FaEnvelope size={30} />
                            </a>
                            {/* website */}
                            <a
                                href={mentorData?.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800"
                            >
                                <FaGlobe size={30} /> </a>

                            {/* LinkedIn */}
                            <a
                                href={mentorData?.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-700 hover:text-blue-900"
                            >
                                <FaLinkedin size={30} /> </a>
                            {/* Twitter */}
                            <a
                                href={mentorData?.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-black-400 hover:text-blue-600"
                            >
                                <FaTwitter size={30} /> </a>
                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com/yourprofile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-pink-600 hover:text-pink-800"
                            >
                                <FaInstagram size={30} /> </a>


                            {/* YouTube */}
                            <a
                                href="https://www.youtube.com/c/yourchannel"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-red-500 hover:text-red-700"
                            >
                                <FaYoutube size={30} />

                            </a>
                            {/* GitHub */}
                            <a
                                href="https://github.com/yourusername"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-black-800 hover:text-gray-600"
                            >
                                <FaGithub size={30} />
                            </a>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bio section*/}
            <div className=" h-60 border mt-3 p-5 mx-6 gap-3 border-black rounded-md">
                About
                <p className='text-sm'>{mentorData?.bio}</p>
            </div>

        </div>
    );
};

export default MentorProfile;