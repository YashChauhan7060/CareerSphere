import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import dp from "../assets/dp.webp"
import { userDataContext } from '../context/userContext';
import { authDataContext } from '../context/AuthContext';
import EditProfile from '../components/EditProfile';
import Post from '../components/Post';
import ConnectionButton from '../components/ConnectionButton';
import { Camera, Pencil, MapPin, Users, Briefcase, GraduationCap, Award, Moon, Sun, Plus } from 'lucide-react';

function Profile() {
    let {userData, setuserData, edit, setEdit, postData, setPostData, profileData, setProfileData} = useContext(userDataContext)
    let [profilePost, setProfilePost] = useState([])
    let {serverUrl} = useContext(authDataContext)
    let [darkMode, setDarkMode] = useState(false)
   
    useEffect(() => {
        setProfilePost(postData.filter((post) => post.author._id == profileData._id))
    }, [profileData])

    // Theme classes
    const bgClass = darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50'
    const cardBg = darkMode ? 'bg-gray-800' : 'bg-white'
    const textPrimary = darkMode ? 'text-white' : 'text-gray-900'
    const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600'
    const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200'
    const hoverBg = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'

    return (
        <div className={`w-full min-h-screen ${bgClass} flex flex-col items-center pt-[100px] pb-[60px] transition-colors duration-300`}>
            <Nav darkMode={darkMode} setDarkMode={setDarkMode} />
            {edit && <EditProfile/>}
            
            {/* Theme Toggle Button */}
            <button
                onClick={() => setDarkMode(!darkMode)}
                className={`fixed top-24 right-6 z-40 w-12 h-12 rounded-full ${cardBg} shadow-lg flex items-center justify-center ${hoverBg} transition-all duration-300 border-2 ${borderColor}`}
            >
                {darkMode ? (
                    <Sun className='w-5 h-5 text-yellow-400' />
                ) : (
                    <Moon className='w-5 h-5 text-indigo-600' />
                )}
            </button>

            <div className='w-full max-w-[900px] px-4 flex flex-col gap-5'>

                {/* Profile Header Card */}
                <div className={`relative ${cardBg} rounded-2xl shadow-xl overflow-hidden border ${borderColor} transition-all`}>
                    {/* Cover Image */}
                    <div className='relative w-full h-[200px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 overflow-hidden group'>
                        {profileData.coverImage && (
                            <img src={profileData.coverImage} alt="" className='w-full h-full object-cover'/>
                        )}
                        <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent'></div>
                        {/* Decorative Elements */}
                        <div className='absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-3xl'></div>
                        <div className='absolute bottom-4 left-4 w-24 h-24 bg-white/10 rounded-full blur-2xl'></div>
                    </div>

                    {/* Profile Content */}
                    <div className='relative px-8 pb-8'>
                        {/* Profile Image with Border */}
                        <div className='relative -mt-20 mb-6 inline-block'>
                            <div className='w-36 h-36 rounded-full border-4 border-white overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-600 shadow-2xl'>
                                <img src={profileData.profileImage || dp} alt="" className='w-full h-full object-cover'/>
                            </div>
                            {/* Status Indicator */}
                            <div className='absolute bottom-2 right-2 w-7 h-7 bg-green-500 rounded-full border-4 border-white'></div>
                        </div>

                        {/* User Info Section */}
                        <div className='mb-6'>
                            <h1 className={`text-3xl font-bold mb-2 ${textPrimary}`}>
                                {`${profileData.firstName} ${profileData.lastName}`}
                            </h1>
                            {profileData.headline && (
                                <p className={`text-lg ${textSecondary} font-medium mb-3`}>
                                    {profileData.headline}
                                </p>
                            )}
                            <div className='flex flex-wrap items-center gap-4 text-sm'>
                                {profileData.location && (
                                    <div className={`flex items-center gap-2 ${textSecondary}`}>
                                        <MapPin className='w-4 h-4 text-blue-500'/>
                                        <span>{profileData.location}</span>
                                    </div>
                                )}
                                <div className={`flex items-center gap-2 ${textSecondary}`}>
                                    <Users className='w-4 h-4 text-blue-500'/>
                                    <span className='font-semibold'>{profileData.connection?.length || 0}</span>
                                    <span>connections</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex flex-wrap gap-3'>
                            {profileData._id == userData._id ? (
                                <button 
                                    className='px-6 h-11 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/30 transform hover:scale-[1.02]' 
                                    onClick={() => setEdit(true)}
                                >
                                    <Pencil className='w-4 h-4'/>
                                    Edit Profile
                                </button>
                            ) : (
                                <ConnectionButton userId={profileData._id}/>
                            )}
                        </div>
                    </div>
                </div>

                {/* Posts Section */}
                <div className={`${cardBg} rounded-2xl shadow-lg p-6 border ${borderColor} transition-all`}>
                    <div className='flex items-center gap-3 mb-4'>
                        <Award className='w-6 h-6 text-blue-600' />
                        <h2 className={`text-2xl font-bold ${textPrimary}`}>
                            Posts ({profilePost.length})
                        </h2>
                    </div>
                </div>

                {/* Posts Feed */}
                <div className='space-y-5'>
                    {profilePost.map((post, index) => (
                        <Post 
                            key={index} 
                            id={post._id} 
                            description={post.description} 
                            author={post.author} 
                            image={post.image} 
                            like={post.like} 
                            comment={post.comment} 
                            createdAt={post.createdAt}
                        />
                    ))}
                </div>

                {/* Skills Section */}
                {profileData.skills?.length > 0 && (
                    <div className={`${cardBg} rounded-2xl shadow-lg p-6 border ${borderColor} transition-all hover:shadow-xl`}>
                        <div className='flex items-center gap-3 mb-5'>
                            <Award className='w-6 h-6 text-blue-600' />
                            <h2 className={`text-2xl font-bold ${textPrimary}`}>Skills</h2>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            {profileData.skills.map((skill, index) => (
                                <div 
                                    key={index}
                                    className={`px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 ${darkMode ? 'from-gray-700 to-gray-600' : ''} border ${borderColor} ${textPrimary} font-medium text-sm shadow-sm hover:shadow-md transition-all`}
                                >
                                    {skill}
                                </div>
                            ))}
                            {profileData._id == userData._id && (
                                <button 
                                    className={`px-5 py-2.5 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold flex items-center gap-2 ${hoverBg} transition-all hover:shadow-md`}
                                    onClick={() => setEdit(true)}
                                >
                                    <Plus className='w-4 h-4'/>
                                    Add Skills
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Education Section */}
                {profileData.education?.length > 0 && (
                    <div className={`${cardBg} rounded-2xl shadow-lg p-6 border ${borderColor} transition-all hover:shadow-xl`}>
                        <div className='flex items-center gap-3 mb-5'>
                            <GraduationCap className='w-6 h-6 text-blue-600' />
                            <h2 className={`text-2xl font-bold ${textPrimary}`}>Education</h2>
                        </div>
                        <div className='space-y-6'>
                            {profileData.education.map((edu, index) => (
                                <div key={index} className={`p-5 rounded-xl ${hoverBg} border ${borderColor} transition-all`}>
                                    <div className='flex items-start gap-4'>
                                        <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-md'>
                                            <GraduationCap className='w-6 h-6 text-white' />
                                        </div>
                                        <div className='flex-1'>
                                            <h3 className={`text-lg font-bold ${textPrimary} mb-1`}>
                                                {edu.college}
                                            </h3>
                                            <p className={`${textSecondary} font-medium mb-1`}>
                                                {edu.degree}
                                            </p>
                                            <p className='text-sm text-gray-500'>
                                                {edu.fieldOfStudy}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {profileData._id == userData._id && (
                                <button 
                                    className={`w-full px-5 py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold flex items-center justify-center gap-2 ${hoverBg} transition-all hover:shadow-md`}
                                    onClick={() => setEdit(true)}
                                >
                                    <Plus className='w-4 h-4'/>
                                    Add Education
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Experience Section */}
                {profileData.experience?.length > 0 && (
                    <div className={`${cardBg} rounded-2xl shadow-lg p-6 border ${borderColor} transition-all hover:shadow-xl`}>
                        <div className='flex items-center gap-3 mb-5'>
                            <Briefcase className='w-6 h-6 text-blue-600' />
                            <h2 className={`text-2xl font-bold ${textPrimary}`}>Experience</h2>
                        </div>
                        <div className='space-y-6'>
                            {profileData.experience.map((ex, index) => (
                                <div key={index} className={`p-5 rounded-xl ${hoverBg} border ${borderColor} transition-all`}>
                                    <div className='flex items-start gap-4'>
                                        <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0 shadow-md'>
                                            <Briefcase className='w-6 h-6 text-white' />
                                        </div>
                                        <div className='flex-1'>
                                            <h3 className={`text-lg font-bold ${textPrimary} mb-1`}>
                                                {ex.title}
                                            </h3>
                                            <p className={`${textSecondary} font-medium mb-2`}>
                                                {ex.company}
                                            </p>
                                            <p className='text-sm text-gray-500 leading-relaxed'>
                                                {ex.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {profileData._id == userData._id && (
                                <button 
                                    className={`w-full px-5 py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold flex items-center justify-center gap-2 ${hoverBg} transition-all hover:shadow-md`}
                                    onClick={() => setEdit(true)}
                                >
                                    <Plus className='w-4 h-4'/>
                                    Add Experience
                                </button>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Profile