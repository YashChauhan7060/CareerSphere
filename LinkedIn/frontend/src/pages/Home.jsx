import React, { useContext, useEffect, useRef, useState } from 'react'
import Nav from '../components/Nav'
import dp from "../assets/dp.webp"
import { userDataContext } from '../context/userContext';
import EditProfile from '../components/EditProfile';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import Post from '../components/Post';
import { Camera, Plus, Pencil, X, Image, MapPin, Briefcase, Moon, Sun, TrendingUp, Users, Sparkles, Boxes } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Home() {
  let {userData, setUserData, edit, setEdit, postData, setPostData, getPost, handleGetProfile} = useContext(userDataContext)
  let {serverUrl} = useContext(authDataContext)
  let [frontendImage, setFrontendImage] = useState("")
  let [backendImage, setBackendImage] = useState("")
  let [description, setDescription] = useState("")
  let [uploadPost, setUploadPost] = useState(false)
  let image = useRef()
  let [posting, setPosting] = useState(false)
  let [suggestedUser, setSuggestedUser] = useState([])
  let [darkMode, setDarkMode] = useState(false)
  let [connectionCount, setConnectionCount] = useState(0);
  const navigate = useNavigate()

  function handleImage(e) {
    let file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

  async function handleUploadPost() {
    setPosting(true)
    try {
      let formdata = new FormData()
      formdata.append("description", description)
      if(backendImage) {
        formdata.append("image", backendImage)
      }
      let result = await axios.post(serverUrl + "/api/post/create", formdata, {withCredentials: true})
      console.log(result)
      setPosting(false)
      setUploadPost(false)
      setDescription("")
      setFrontendImage("")
      setBackendImage("")
    } catch (error) {
      setPosting(false)
      console.log(error);
    }
  }

  const handleSuggestedUsers = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/user/suggestedusers", {withCredentials: true})
      console.log(result.data)
      setSuggestedUser(result.data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleGetConnectionCount = async () => {
    try {
        const result = await axios.get(serverUrl + "/api/connection/count", { withCredentials: true });
        setConnectionCount(result.data.count);
    } catch (error) {
        console.log("Error fetching connection count:", error);
    }
}

  useEffect(() => {
    handleSuggestedUsers();
    handleGetConnectionCount();
  }, [])

  useEffect(() => {
    getPost()
  }, [uploadPost])

  // Theme classes
  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50'
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white'
  const textPrimary = darkMode ? 'text-white' : 'text-gray-900'
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600'
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200'
  const hoverBg = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'

  return (
    <div className={`w-full min-h-screen ${bgClass} pt-[80px] pb-[50px] transition-colors duration-300`}>
      {edit && <EditProfile darkMode={darkMode} />}
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

      <div className='max-w-[1400px] mx-auto px-4 lg:px-6 flex gap-6 lg:gap-8 flex-col lg:flex-row'>
        
        {/* Left Sidebar - Enhanced Profile Card */}
        <div className='w-full lg:w-[300px] lg:sticky lg:top-[100px] lg:self-start space-y-4'>
          {/* Main Profile Card */}
          <div className={`${cardBg} rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-2xl border ${borderColor}`}>
            {/* Cover with Gradient Overlay */}
            <div className='relative h-28 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 group cursor-pointer overflow-hidden' onClick={() => setEdit(true)}>
              {userData.coverImage && (
                <img src={userData.coverImage} alt="" className='w-full h-full object-cover'/>
              )}
              <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent'></div>
              <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center'>
                <Camera className='text-white opacity-0 group-hover:opacity-100 transition-all w-6 h-6'/>
              </div>
              {/* Decorative Elements */}
              <div className='absolute top-2 right-2 w-20 h-20 bg-white/10 rounded-full blur-2xl'></div>
            </div>

            {/* Profile Content */}
            <div className='relative px-6 pb-6'>
              {/* Profile Image with Ring */}
              <div className='relative -mt-14 mb-4 inline-block'>
                <div className='relative w-28 h-28 rounded-full border-4 border-white overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-600 cursor-pointer group shadow-xl' onClick={() => setEdit(true)}>
                  <img src={userData.profileImage || dp} alt="" className='w-full h-full object-cover'/>
                  <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center'>
                    <Camera className='text-white opacity-0 group-hover:opacity-100 transition-all w-6 h-6'/>
                  </div>
                </div>
                {/* Status Indicator */}
                <div className='absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white'></div>
              </div>

              {/* User Info */}
              <div className='space-y-2 mb-4'>
                <h2 className={`text-2xl font-bold ${textPrimary}`}>
                  {`${userData.firstName} ${userData.lastName}`}
                </h2>
                {userData.headline && (
                  <p className={`text-sm ${textSecondary} font-medium leading-relaxed`}>{userData.headline}</p>
                )}
                {userData.location && (
                  <div className={`flex items-center gap-2 text-xs ${textSecondary}`}>
                    <MapPin className='w-4 h-4 text-blue-500'/>
                    <span>{userData.location}</span>
                  </div>
                )}
              </div>

              {/* Stats Row */}
              <div className={`flex items-center justify-between py-3 border-y ${borderColor} mb-4`}>
                <div className='text-center'>
                  <div className={`text-lg font-bold ${textPrimary}`}>{connectionCount}</div>
                  <div className='text-xs text-gray-500'>Connections</div>
                </div>
                <div className='h-8 w-px bg-gray-300'></div>
                <div className='text-center'>
                  <div className={`text-lg font-bold ${textPrimary}`}>1.2k</div>
                  <div className='text-xs text-gray-500'>Followers</div>
                </div>
              </div>

              {/* Edit Profile Button */}
              <button 
                onClick={() => setEdit(true)}
                className='w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/30 transform hover:scale-[1.02]'
              >
                <Pencil className='w-4 h-4'/>
                Edit Profile
              </button>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className={`${cardBg} rounded-2xl shadow-lg p-5 border ${borderColor} transition-all hover:shadow-xl`}>
            <div className='flex items-center gap-2 mb-4'>
              <TrendingUp className='w-5 h-5 text-blue-600' />
              <h3 className={`font-bold ${textPrimary}`}>Your Impact</h3>
            </div>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className={`text-sm ${textSecondary}`}>Profile views</span>
                <span className={`font-semibold ${textPrimary}`}>892</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className={`text-sm ${textSecondary}`}>Post impressions</span>
                <span className={`font-semibold ${textPrimary}`}>3.4k</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className={`text-sm ${textSecondary}`}>Search appearances</span>
                <span className={`font-semibold ${textPrimary}`}>127</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Feed */}
        <div className='flex-1 max-w-[700px] space-y-5'>
          {/* Enhanced Create Post Card */}
          <div className={`${cardBg} rounded-2xl shadow-lg p-5 ${hoverBg} transition-all border ${borderColor}`}>
            <div className='flex items-center gap-4 mb-4'>
              <div className='relative w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-600 flex-shrink-0 shadow-md'>
                <img src={userData.profileImage || dp} alt="" className='w-full h-full object-cover'/>
              </div>
              <button 
                onClick={() => setUploadPost(true)}
                className={`flex-1 h-14 px-6 rounded-full border-2 ${borderColor} text-left ${textSecondary} hover:border-blue-400 transition-all font-medium shadow-sm`}
              >
                Share your thoughts...
              </button>
            </div>
            
            {/* Action Buttons */}
            <div className='flex items-center gap-3 pt-3 border-t border-gray-200'>
              <button onClick={() => setUploadPost(true)} className={`flex items-center gap-2 ${textSecondary} ${hoverBg} px-4 py-2 rounded-lg transition-colors`}>
                <Image className='w-5 h-5 text-blue-500'/>
                <span className='text-sm font-medium'>Photo</span>
              </button>
              <button className={`flex items-center gap-2 ${textSecondary} ${hoverBg} px-4 py-2 rounded-lg transition-colors`}>
                <Sparkles className='w-5 h-5 text-yellow-500'/>
                <span className='text-sm font-medium'>Article</span>
              </button>
            </div>
          </div>

          {/* Posts Feed */}
          {postData.map((post, index) => (
            <Post 
              key={index} 
              id={post._id} 
              description={post.description} 
              author={post.author} 
              image={post.image} 
              like={post.like} 
              comment={post.comment} 
              createdAt={post.createdAt}
              darkMode={darkMode}
            />
          ))}
        </div>

        {/* Right Sidebar - Suggested Users */}
        <div className='hidden lg:block w-[340px] lg:sticky lg:top-[100px] lg:self-start space-y-4'>
          {/* Suggested Users Card */}
          <div className={`${cardBg} rounded-2xl shadow-lg p-6 border ${borderColor} transition-all hover:shadow-xl`}>
            <div className='flex items-center justify-between mb-5'>
              <div className='flex items-center gap-2'>
                <Users className='w-5 h-5 text-blue-600' />
                <h3 className={`text-lg font-bold ${textPrimary}`}>Suggested for you</h3>
              </div>
            </div>
            
            {suggestedUser.length > 0 ? (
              <div className='space-y-2'>
                {suggestedUser.slice(0, 5).map((su, index) => (
                  <div 
                    key={index}
                    onClick={() => handleGetProfile(su.userName)}
                    className={`flex items-center gap-3 p-3 rounded-xl ${hoverBg} cursor-pointer transition-all group border ${borderColor} hover:border-blue-400`}
                  >
                    <div className='relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-600 flex-shrink-0 shadow-md'>
                      <img src={su.profileImage || dp} alt="" className='w-full h-full object-cover'/>
                      <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></div>
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h4 className={`text-sm font-semibold ${textPrimary} truncate group-hover:text-blue-600 transition-colors`}>
                        {`${su.firstName} ${su.lastName}`}
                      </h4>
                      {su.headline && (
                        <p className='text-xs text-gray-500 truncate'>{su.headline}</p>
                      )}
                    </div>
                    <button className='px-4 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-full border-2 border-blue-600 transition-all opacity-0 group-hover:opacity-100'>
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-8'>
                <Users className='w-12 h-12 text-gray-300 mx-auto mb-3' />
                <p className='text-sm text-gray-500'>No suggestions available</p>
              </div>
            )}
          </div>

          {/* Trending Topics Card */}
          <div className={`${cardBg} rounded-2xl shadow-lg p-6 border ${borderColor} transition-all hover:shadow-xl`}>
            <div className='flex items-center gap-2 mb-4'>
              <TrendingUp className='w-5 h-5 text-orange-500' />
              <h3 className={`text-lg font-bold ${textPrimary}`}>Trending</h3>
            </div>
            <div className='space-y-3'>
              {['#WebDevelopment', '#ReactJS', '#CareerGrowth', '#TechNews'].map((tag, i) => (
                <div key={i} className={`${hoverBg} p-2 rounded-lg cursor-pointer transition-colors`}>
                  <p className='text-sm font-semibold text-blue-600'>{tag}</p>
                  <p className='text-xs text-gray-500'>{Math.floor(Math.random() * 5000)} posts today</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Upload Post Modal */}
      {uploadPost && (
        <>
          <div 
            className='fixed inset-0 bg-black bg-opacity-70 z-50 backdrop-blur-sm transition-opacity'
            onClick={() => setUploadPost(false)}
          />
          
          <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
            <div className={`${cardBg} rounded-3xl shadow-2xl w-full max-w-[650px] max-h-[90vh] overflow-hidden flex flex-col border ${borderColor}`}>
              {/* Modal Header with Gradient */}
              <div className='relative overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-10'></div>
                <div className='relative flex items-center justify-between p-6 border-b border-gray-200'>
                  <h3 className={`text-2xl font-bold ${textPrimary}`}>Create a post</h3>
                  <button 
                    onClick={() => setUploadPost(false)}
                    className={`w-10 h-10 rounded-full ${hoverBg} flex items-center justify-center transition-all`}
                  >
                    <X className='w-5 h-5 text-gray-600'/>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className='flex-1 overflow-y-auto p-6 space-y-5'>
                <div className='flex items-center gap-4'>
                  <div className='w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-600 shadow-md'>
                    <img src={userData.profileImage || dp} alt="" className='w-full h-full object-cover'/>
                  </div>
                  <div>
                    <h4 className={`font-bold ${textPrimary}`}>{`${userData.firstName} ${userData.lastName}`}</h4>
                    <p className='text-xs text-gray-500'>Posting publicly</p>
                  </div>
                </div>

                <textarea 
                  className={`w-full min-h-[220px] outline-none resize-none text-lg ${textPrimary} placeholder-gray-400 bg-transparent`}
                  placeholder='What do you want to talk about?'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                {frontendImage && (
                  <div className='relative rounded-2xl overflow-hidden shadow-lg'>
                    <img src={frontendImage} alt="" className='w-full rounded-2xl'/>
                    <button 
                      onClick={() => {
                        setFrontendImage("")
                        setBackendImage("")
                      }}
                      className='absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-xl'
                    >
                      <X className='w-5 h-5 text-gray-700'/>
                    </button>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className='border-t border-gray-200 p-6 space-y-4 bg-gray-50'>
                <input type="file" ref={image} hidden onChange={handleImage} accept="image/*"/>
                
                <button 
                  onClick={() => image.current.click()}
                  className={`flex items-center gap-3 ${textSecondary} ${hoverBg} px-4 py-3 rounded-xl transition-all border ${borderColor}`}
                >
                  <Image className='w-6 h-6 text-blue-500'/>
                  <span className='font-semibold'>Add a photo</span>
                </button>

                <button 
                  onClick={handleUploadPost}
                  disabled={posting || (!description.trim() && !backendImage)}
                  className='w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 transform hover:scale-[1.02]'
                >
                  {posting ? (
                    <div className='flex items-center justify-center gap-2'>
                      <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'/>
                      Posting...
                    </div>
                  ) : (
                    'Post'
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Home