import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import dp from "../assets/dp.webp"
import { CheckCircle2, XCircle, Users, UserPlus, Clock, Sparkles, TrendingUp, Moon, Sun } from 'lucide-react'
import io from "socket.io-client"

const socket = io("https://careersphere-backend3.onrender.com")

function Network() {
  let { serverUrl } = useContext(authDataContext)
  let [connections, setConnections] = useState([])
  let [darkMode, setDarkMode] = useState(false)
  let [processingId, setProcessingId] = useState(null)
  let [stats, setStats] = useState({
    totalConnections: 0,
    followers: 0,
    weeklyViews: 0
  })
  let [connectionCount, setConnectionCount] = useState(0);

  const handleGetRequests = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/connection/requests`, { withCredentials: true })
      setConnections(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAcceptConnection = async (requestId) => {
    setProcessingId(requestId)
    try {
      let result = await axios.put(`${serverUrl}/api/connection/accept/${requestId}`, {}, { withCredentials: true })
      setConnections(connections.filter((con) => con._id != requestId))
      setProcessingId(null)
    } catch (error) {
      console.log(error)
      setProcessingId(null)
    }
  }

  const handleRejectConnection = async (requestId) => {
    setProcessingId(requestId)
    try {
      let result = await axios.put(`${serverUrl}/api/connection/reject/${requestId}`, {}, { withCredentials: true })
      setConnections(connections.filter((con) => con._id != requestId))
      setProcessingId(null)
    } catch (error) {
      console.log(error)
      setProcessingId(null)
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
    handleGetRequests();
    handleGetConnectionCount();
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

      {/* Theme Toggle Button */}
      <div className='fixed top-24 right-6 z-40'>
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
      </div>

      <div className='max-w-[1200px] mx-auto space-y-6'>
        {/* Hero Header Card */}
        <div className={`${cardBg} rounded-2xl shadow-lg overflow-hidden border ${borderColor} transition-all hover:shadow-xl`}>
          <div className='relative h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 overflow-hidden'>
            <div className='absolute inset-0 bg-black/10'></div>
            <div className='absolute top-4 left-4 w-32 h-32 bg-white/10 rounded-full blur-3xl'></div>
            <div className='absolute bottom-4 right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl'></div>
          </div>
          
          <div className='relative px-8 pb-6 -mt-10'>
            <div className='flex items-end justify-between flex-wrap gap-4'>
              <div className='flex items-end gap-4'>
                <div className='w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-2xl flex items-center justify-center border-4 border-white'>
                  <Users className='w-10 h-10 text-white' />
                </div>
                <div className='pb-2'>
                  <h1 className={`text-3xl font-bold ${textPrimary} mb-1`}>My Network</h1>
                  <p className={`text-sm ${textSecondary}`}>Manage your professional connections</p>
                </div>
              </div>
              
              <div className='flex items-center gap-4 pb-2'>
                <div className='text-center px-6 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200'>
                  <div className={`text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent`}>
                    {connections.length}
                  </div>
                  <div className='text-xs text-gray-600'>Pending</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className={`${cardBg} rounded-2xl shadow-lg p-6 border ${borderColor} ${hoverBg} transition-all cursor-pointer group`}>
            <div className='flex items-center gap-4'>
              <div className='w-14 h-14 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform'>
                <UserPlus className='w-7 h-7 text-white' />
              </div>
              <div>
                <div className={`text-2xl font-bold ${textPrimary}`}>{connectionCount}</div>
                <div className='text-sm text-gray-500'>Connections</div>
              </div>
            </div>
          </div>

          <div className={`${cardBg} rounded-2xl shadow-lg p-6 border ${borderColor} ${hoverBg} transition-all cursor-pointer group`}>
            <div className='flex items-center gap-4'>
              <div className='w-14 h-14 rounded-xl bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform'>
                <TrendingUp className='w-7 h-7 text-white' />
              </div>
              <div>
                <div className={`text-2xl font-bold ${textPrimary}`}>1.2k</div>
                <div className='text-sm text-gray-500'>Followers</div>
              </div>
            </div>
          </div>

          <div className={`${cardBg} rounded-2xl shadow-lg p-6 border ${borderColor} ${hoverBg} transition-all cursor-pointer group`}>
            <div className='flex items-center gap-4'>
              <div className='w-14 h-14 rounded-xl bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform'>
                <Sparkles className='w-7 h-7 text-white' />
              </div>
              <div>
                <div className={`text-2xl font-bold ${textPrimary}`}>42</div>
                <div className='text-sm text-gray-500'>This week</div>
              </div>
            </div>
          </div>
        </div>

        {/* Invitations Section */}
        <div className={`${cardBg} rounded-2xl shadow-lg border ${borderColor} overflow-hidden transition-all hover:shadow-xl`}>
          <div className='p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50/50 to-indigo-50/50'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center'>
                  <Clock className='w-5 h-5 text-white' />
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${textPrimary}`}>
                    Invitations
                  </h2>
                  <p className='text-sm text-gray-500'>
                    {connections.length === 0 ? 'No pending invitations' : `${connections.length} waiting for your response`}
                  </p>
                </div>
              </div>
              {connections.length > 0 && (
                <div className='px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold'>
                  {connections.length} new
                </div>
              )}
            </div>
          </div>

          {connections.length > 0 ? (
            <div className='divide-y divide-gray-200'>
              {connections.map((connection, index) => (
                <div
                  key={index}
                  className={`p-6 ${hoverBg} transition-all group`}
                >
                  <div className='flex items-center justify-between gap-4 flex-wrap'>
                    <div className='flex items-center gap-4 flex-1 min-w-0'>
                      <div className='relative flex-shrink-0'>
                        <div className='w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-600 shadow-lg ring-4 ring-white group-hover:ring-blue-100 transition-all'>
                          <img
                            src={connection.sender.profileImage || dp}
                            alt=""
                            className='w-full h-full object-cover'
                          />
                        </div>
                        <div className='absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center'>
                          <UserPlus className='w-3 h-3 text-white' />
                        </div>
                      </div>

                      <div className='flex-1 min-w-0'>
                        <h3 className={`text-lg font-bold ${textPrimary} truncate group-hover:text-blue-600 transition-colors`}>
                          {`${connection.sender.firstName} ${connection.sender.lastName}`}
                        </h3>
                        {connection.sender.headline && (
                          <p className='text-sm text-gray-500 truncate'>{connection.sender.headline}</p>
                        )}
                        {connection.sender.location && (
                          <p className='text-xs text-gray-400 mt-1'>{connection.sender.location}</p>
                        )}
                      </div>
                    </div>

                    <div className='flex items-center gap-3'>
                      <button
                        onClick={() => handleAcceptConnection(connection._id)}
                        disabled={processingId === connection._id}
                        className='px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105'
                      >
                        <CheckCircle2 className='w-5 h-5' />
                        Accept
                      </button>
                      <button
                        onClick={() => handleRejectConnection(connection._id)}
                        disabled={processingId === connection._id}
                        className='px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105'
                      >
                        <XCircle className='w-5 h-5' />
                        Ignore
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='p-12 text-center'>
              <div className='w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center'>
                <Users className='w-12 h-12 text-blue-500' />
              </div>
              <h3 className={`text-xl font-bold ${textPrimary} mb-2`}>No pending invitations</h3>
              <p className='text-gray-500 mb-6 max-w-md mx-auto'>
                When people send you connection requests, they'll appear here. Keep building your network!
              </p>
              <button className='px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/30 transform hover:scale-105'>
                Discover People
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Network
