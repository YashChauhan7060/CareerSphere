import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { X, Bell, Trash2, Moon, Sun, Boxes, Heart, MessageCircle, UserPlus, CheckCircle } from 'lucide-react'
import dp from "../assets/dp.webp"
import { userDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'

function Notification() {
    let { serverUrl } = useContext(authDataContext)
    let [notificationData, setNotificationData] = useState([])
    let { userData } = useContext(userDataContext)
    let [darkMode, setDarkMode] = useState(false)
    const navigate = useNavigate()

    const handleGetNotification = async () => {
        try {
            let result = await axios.get(serverUrl + "/api/notification/get", { withCredentials: true })
            setNotificationData(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handledeleteNotification = async (id) => {
        try {
            await axios.delete(serverUrl + `/api/notification/deleteone/${id}`, { withCredentials: true })
            await handleGetNotification()
        } catch (error) {
            console.log(error)
        }
    }

    const handleClearAllNotification = async () => {
        try {
            await axios.delete(serverUrl + "/api/notification", { withCredentials: true })
            await handleGetNotification()
        } catch (error) {
            console.log(error)
        }
    }

    const handleMessage = (type) => {
        if (type === "like") {
            return "liked your post"
        } else if (type === "comment") {
            return "commented on your post"
        } else {
            return "accepted your connection"
        }
    }

    const getNotificationIcon = (type) => {
        if (type === "like") {
            return <Heart className='w-5 h-5 text-red-500' fill='currentColor' />
        } else if (type === "comment") {
            return <MessageCircle className='w-5 h-5 text-blue-500' />
        } else {
            return <UserPlus className='w-5 h-5 text-green-500' />
        }
    }

    const getTimeAgo = (createdAt) => {
        const now = new Date()
        const notificationTime = new Date(createdAt)
        const diffInMs = now - notificationTime
        const diffInMinutes = Math.floor(diffInMs / 60000)
        
        if (diffInMinutes < 1) return 'Just now'
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`
        
        const diffInHours = Math.floor(diffInMinutes / 60)
        if (diffInHours < 24) return `${diffInHours}h ago`
        
        const diffInDays = Math.floor(diffInHours / 24)
        if (diffInDays < 7) return `${diffInDays}d ago`
        
        return `${Math.floor(diffInDays / 7)}w ago`
    }

    useEffect(() => {
        handleGetNotification()
    }, [])

    // Theme classes
    const bgClass = darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50'
    const cardBg = darkMode ? 'bg-gray-800' : 'bg-white'
    const textPrimary = darkMode ? 'text-white' : 'text-gray-900'
    const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600'
    const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200'
    const hoverBg = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'

    return (
        <div className={`w-full min-h-screen ${bgClass} pt-[100px] pb-[50px] px-4 transition-colors duration-300`}>
            <Nav darkMode={darkMode} setDarkMode={setDarkMode} />
            
            {/* Fixed Action Buttons - Right Side */}
            <div className='fixed top-24 right-6 z-40 flex flex-col gap-3'>
                {/* Theme Toggle Button */}
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`w-12 h-12 rounded-full ${cardBg} shadow-lg flex items-center justify-center ${hoverBg} transition-all duration-300 border-2 ${borderColor} group`}
                    title={darkMode ? 'Light Mode' : 'Dark Mode'}
                >
                    {darkMode ? (
                        <Sun className='w-5 h-5 text-yellow-400 group-hover:rotate-90 transition-transform duration-300' />
                    ) : (
                        <Moon className='w-5 h-5 text-indigo-600 group-hover:rotate-12 transition-transform duration-300' />
                    )}
                </button>

                {/* Architecture Button */}
                <button
                    onClick={() => navigate('/architecture')}
                    className={`w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg flex items-center justify-center hover:from-purple-700 hover:to-pink-700 transition-all duration-300 border-2 border-purple-400 group hover:scale-110`}
                    title='View Architecture'
                >
                    <Boxes className='w-5 h-5 text-white group-hover:rotate-180 transition-transform duration-500' />
                </button>
            </div>

            <div className='max-w-[900px] mx-auto flex flex-col gap-6'>
                {/* Enhanced Header Card */}
                <div className={`${cardBg} rounded-2xl shadow-lg border ${borderColor} overflow-hidden transition-all hover:shadow-xl`}>
                    <div className='relative overflow-hidden'>
                        <div className='absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-10'></div>
                        <div className='relative p-6 flex items-center justify-between'>
                            <div className='flex items-center gap-4'>
                                <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg'>
                                    <Bell className='w-7 h-7 text-white' />
                                </div>
                                <div>
                                    <h1 className={`text-3xl font-bold ${textPrimary}`}>Notifications</h1>
                                    <p className={`text-sm ${textSecondary} mt-1`}>
                                        {notificationData.length === 0 ? 'No new notifications' : `${notificationData.length} ${notificationData.length === 1 ? 'notification' : 'notifications'}`}
                                    </p>
                                </div>
                            </div>
                            
                            {notificationData.length > 0 && (
                                <button 
                                    className='px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold flex items-center gap-2 hover:from-red-600 hover:to-pink-700 transition-all shadow-lg shadow-red-500/30 transform hover:scale-105'
                                    onClick={handleClearAllNotification}
                                >
                                    <Trash2 className='w-4 h-4' />
                                    Clear All
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Notifications List */}
                {notificationData.length > 0 ? (
                    <div className={`${cardBg} rounded-2xl shadow-lg border ${borderColor} overflow-hidden transition-all hover:shadow-xl`}>
                        <div className='divide-y divide-gray-200'>
                            {notificationData.map((noti, index) => (
                                <div 
                                    key={index}
                                    className={`p-5 ${hoverBg} transition-all group relative`}
                                >
                                    <div className='flex gap-4'>
                                        {/* Icon Badge */}
                                        <div className='relative flex-shrink-0'>
                                            <div className='w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200 shadow-md'>
                                                <img 
                                                    src={noti.relatedUser?.profileImage || dp} 
                                                    alt="" 
                                                    className='w-full h-full object-cover' 
                                                />
                                            </div>
                                            <div className='absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg'>
                                                {getNotificationIcon(noti.type)}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className='flex-1 min-w-0'>
                                            <div className='flex items-start justify-between gap-3'>
                                                <div className='flex-1'>
                                                    <p className={`text-base ${textPrimary} font-medium leading-relaxed`}>
                                                        <span className='font-bold'>
                                                            {`${noti.relatedUser?.firstName} ${noti.relatedUser?.lastName}`}
                                                        </span>
                                                        {' '}
                                                        <span className={textSecondary}>
                                                            {handleMessage(noti.type)}
                                                        </span>
                                                    </p>
                                                    <p className='text-sm text-gray-500 mt-1'>
                                                        {getTimeAgo(noti.createdAt)}
                                                    </p>
                                                </div>

                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => handledeleteNotification(noti._id)}
                                                    className='opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full hover:bg-red-50 flex items-center justify-center transition-all'
                                                    title='Delete notification'
                                                >
                                                    <X className='w-4 h-4 text-red-500' />
                                                </button>
                                            </div>

                                            {/* Related Post Preview */}
                                            {noti.relatedPost && (
                                                <div className={`mt-3 p-3 rounded-xl border ${borderColor} ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} flex items-center gap-3`}>
                                                    {noti.relatedPost.image && (
                                                        <div className='w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 shadow-sm'>
                                                            <img 
                                                                src={noti.relatedPost.image} 
                                                                alt="" 
                                                                className='w-full h-full object-cover' 
                                                            />
                                                        </div>
                                                    )}
                                                    <p className={`text-sm ${textSecondary} line-clamp-2 flex-1`}>
                                                        {noti.relatedPost.description}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    // Empty State
                    <div className={`${cardBg} rounded-2xl shadow-lg border ${borderColor} p-16 text-center transition-all`}>
                        <div className='w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mx-auto mb-6'>
                            <CheckCircle className='w-12 h-12 text-blue-600' />
                        </div>
                        <h3 className={`text-2xl font-bold ${textPrimary} mb-2`}>All caught up!</h3>
                        <p className={`text-base ${textSecondary} max-w-md mx-auto`}>
                            You don't have any notifications right now. We'll let you know when something new arrives.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Notification