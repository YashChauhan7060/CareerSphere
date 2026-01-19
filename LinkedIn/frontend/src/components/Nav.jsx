import React, { useContext, useEffect, useState, useRef } from 'react'
import { Search, Home, Users, Bell, LogOut, User, X, Moon, Sun, Globe } from 'lucide-react'
import dp from "../assets/dp.webp"
import { userDataContext } from '../context/userContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

function Nav({ darkMode, setDarkMode }) {
    let [activeSearch, setActiveSearch] = useState(false)
    let { userData, setUserData, handleGetProfile } = useContext(userDataContext)
    let [showPopup, setShowPopup] = useState(false)
    let navigate = useNavigate()
    let location = useLocation()
    let { serverUrl } = useContext(authDataContext)
    let [searchInput, setSearchInput] = useState("")
    let [searchData, setSearchData] = useState([])
    let searchRef = useRef(null)
    let popupRef = useRef(null)

    const handleSignOut = async () => {
        try {
            let result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
            setUserData(null)
            navigate("/login")
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearch = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/user/search?query=${searchInput}`, { withCredentials: true })
            setSearchData(result.data)
        } catch (error) {
            setSearchData([])
            console.log(error)
        }
    }

    useEffect(() => {
        handleSearch()
    }, [searchInput])

    // Close search and popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setActiveSearch(false)
                setSearchInput("")
                setSearchData([])
            }
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowPopup(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const isActive = (path) => location.pathname === path

    // Theme classes
    const navBg = darkMode ? 'bg-gray-900 border-b border-gray-800' : 'bg-white'
    const textPrimary = darkMode ? 'text-white' : 'text-gray-900'
    const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600'
    const searchBg = darkMode ? 'bg-gray-800' : 'bg-gray-100'
    const hoverBg = darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
    const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200'
    const dropdownBg = darkMode ? 'bg-gray-800' : 'bg-white'

    return (
        <nav className={`w-full h-20 ${navBg} fixed top-0 shadow-lg backdrop-blur-md bg-opacity-95 flex justify-between md:justify-around items-center px-4 md:px-6 left-0 z-[80] transition-all duration-500 ease-in-out`}>
            {/* Left Section - Logo & Search */}
            <div className='flex items-center gap-4' ref={searchRef}>
                <div 
                    onClick={() => {
                        setActiveSearch(false)
                        navigate("/")
                    }}
                    className='cursor-pointer hover:scale-105 transition-transform flex items-center gap-2'
                >
                    {/* Modern CareerSphere Logo */}
                    <div className='relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg'>
                        <div className='absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-xl'></div>
                        <svg className='w-6 h-6 text-white relative z-10' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                    </div>
                    <span className={`hidden lg:block text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent`}>
                        CareerSphere
                    </span>
                </div>

                {/* Mobile Search Toggle */}
                {!activeSearch && (
                    <button 
                        className={`lg:hidden w-10 h-10 rounded-full ${hoverBg} flex items-center justify-center transition-colors`}
                        onClick={() => setActiveSearch(true)}
                    >
                        <Search className={`w-5 h-5 ${textSecondary}`} />
                    </button>
                )}

                {/* Search Bar */}
                <div className={`relative ${!activeSearch ? "hidden lg:block" : "block"}`}>
                    <div className={`flex items-center gap-2 ${searchBg} rounded-full px-4 py-2 w-[200px] md:w-[300px] lg:w-[400px] transition-all focus-within:ring-2 focus-within:ring-blue-500`}>
                        <Search className='w-5 h-5 text-gray-500 flex-shrink-0' />
                        <input 
                            type="text" 
                            className={`flex-1 bg-transparent outline-none border-0 ${textPrimary} placeholder-gray-500`}
                            placeholder='Search users...'
                            onChange={(e) => setSearchInput(e.target.value)}
                            value={searchInput}
                        />
                        {activeSearch && (
                            <button 
                                onClick={() => {
                                    setActiveSearch(false)
                                    setSearchInput("")
                                    setSearchData([])
                                }}
                                className='lg:hidden'
                            >
                                <X className='w-5 h-5 text-gray-500' />
                            </button>
                        )}
                    </div>

                    {/* Search Results Dropdown */}
                    {searchData.length > 0 && (
                        <div className={`absolute top-14 left-0 w-full md:w-[400px] ${dropdownBg} rounded-2xl shadow-2xl border ${borderColor} max-h-[500px] overflow-auto z-50`}>
                            {searchData.map((user, index) => (
                                <div 
                                    key={index}
                                    className={`flex items-center gap-4 p-4 ${hoverBg} cursor-pointer transition-all first:rounded-t-2xl last:rounded-b-2xl border-b ${borderColor} last:border-b-0`}
                                    onClick={() => {
                                        handleGetProfile(user.userName)
                                        setSearchInput("")
                                        setSearchData([])
                                        setActiveSearch(false)
                                    }}
                                >
                                    <div className='w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-600 flex-shrink-0 ring-2 ring-gray-200'>
                                        <img src={user.profileImage || dp} alt="" className='w-full h-full object-cover' />
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                        <h4 className={`text-sm font-bold ${textPrimary} truncate`}>
                                            {`${user.firstName} ${user.lastName}`}
                                        </h4>
                                        {user.headline && (
                                            <p className={`text-xs ${textSecondary} truncate mt-0.5`}>
                                                {user.headline}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Section - Navigation & Profile */}
            <div className='flex items-center gap-2 md:gap-4'>
                {/* Navigation Icons */}
                <button
                    onClick={() => navigate("/")}
                    className={`hidden lg:flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all ${
                        isActive("/") 
                            ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30' 
                            : `${textSecondary} ${hoverBg}`
                    }`}
                >
                    <Home className={`w-6 h-6 ${isActive("/") ? 'fill-current' : ''}`} />
                    <span className='text-xs font-semibold'>Home</span>
                </button>

                <button
                    onClick={() => navigate("/network")}
                    className={`hidden md:flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all ${
                        isActive("/network") 
                            ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30' 
                            : `${textSecondary} ${hoverBg}`
                    }`}
                >
                    <Users className={`w-6 h-6 ${isActive("/network") ? 'fill-current' : ''}`} />
                    <span className='text-xs font-semibold'>Networks</span>
                </button>

                <button
                    onClick={() => navigate("/notification")}
                    className={`flex flex-col items-center justify-center gap-1 px-3 md:px-4 py-2 rounded-xl transition-all relative ${
                        isActive("/notification") 
                            ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30' 
                            : `${textSecondary} ${hoverBg}`
                    }`}
                >
                    <Bell className={`w-6 h-6 ${isActive("/notification") ? 'fill-current' : ''}`} />
                    <span className='text-xs font-semibold hidden md:block'>Notifications</span>
                    {/* Notification Badge */}
                    <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
                </button>

                {/* Profile Dropdown */}
                <div className='relative' ref={popupRef}>
                    <button
                        onClick={() => setShowPopup(prev => !prev)}
                        className={`w-12 h-12 rounded-full overflow-hidden ring-2 transition-all hover:ring-4 ${
                            showPopup 
                                ? 'ring-blue-500' 
                                : 'ring-gray-300 hover:ring-gray-400'
                        }`}
                    >
                        <img src={userData.profileImage || dp} alt="" className='w-full h-full object-cover' />
                    </button>

                    {/* Profile Dropdown Menu */}
                    {showPopup && (
                        <div className={`absolute top-16 right-0 w-80 ${dropdownBg} rounded-2xl shadow-2xl border ${borderColor} overflow-hidden z-50`}>
                            {/* Profile Header */}
                            <div className='relative p-6 bg-gradient-to-r from-blue-600 to-indigo-600'>
                                <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
                                <div className='relative flex flex-col items-center gap-3'>
                                    <div className='w-20 h-20 rounded-full overflow-hidden ring-4 ring-white/30 bg-white'>
                                        <img src={userData.profileImage || dp} alt="" className='w-full h-full object-cover' />
                                    </div>
                                    <div className='text-center'>
                                        <h3 className='text-lg font-bold text-white'>
                                            {`${userData.firstName} ${userData.lastName}`}
                                        </h3>
                                        {userData.headline && (
                                            <p className='text-sm text-blue-100 mt-1'>{userData.headline}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className='p-3'>
                                <button
                                    onClick={() => {
                                        handleGetProfile(userData.userName)
                                        setShowPopup(false)
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${hoverBg} transition-all group`}
                                >
                                    <div className='w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform'>
                                        <User className='w-5 h-5 text-blue-600' />
                                    </div>
                                    <div className='text-left flex-1'>
                                        <p className={`text-sm font-semibold ${textPrimary}`}>View Profile</p>
                                        <p className='text-xs text-gray-500'>See your profile page</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => {
                                        navigate("/network")
                                        setShowPopup(false)
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${hoverBg} transition-all group`}
                                >
                                    <div className='w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover:scale-110 transition-transform'>
                                        <Users className='w-5 h-5 text-green-600' />
                                    </div>
                                    <div className='text-left flex-1'>
                                        <p className={`text-sm font-semibold ${textPrimary}`}>My Networks</p>
                                        <p className='text-xs text-gray-500'>Manage connections</p>
                                    </div>
                                </button>

                                {/* Mobile Theme Toggle */}
                                <button
                                    onClick={() => {
                                        setDarkMode(!darkMode)
                                        setShowPopup(false)
                                    }}
                                    className={`md:hidden w-full flex items-center gap-3 px-4 py-3 rounded-xl ${hoverBg} transition-all group`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform ${
                                        darkMode ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-indigo-100 dark:bg-indigo-900/30'
                                    }`}>
                                        {darkMode ? (
                                            <Sun className='w-5 h-5 text-yellow-600' />
                                        ) : (
                                            <Moon className='w-5 h-5 text-indigo-600' />
                                        )}
                                    </div>
                                    <div className='text-left flex-1'>
                                        <p className={`text-sm font-semibold ${textPrimary}`}>
                                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                                        </p>
                                        <p className='text-xs text-gray-500'>Change theme</p>
                                    </div>
                                </button>

                                <div className={`h-px bg-gray-200 dark:bg-gray-700 my-2`}></div>

                                <button
                                    onClick={handleSignOut}
                                    className='w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all group'
                                >
                                    <div className='w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center group-hover:scale-110 transition-transform'>
                                        <LogOut className='w-5 h-5 text-red-600' />
                                    </div>
                                    <div className='text-left flex-1'>
                                        <p className='text-sm font-semibold text-red-600'>Sign Out</p>
                                        <p className='text-xs text-gray-500'>Logout from your account</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Nav