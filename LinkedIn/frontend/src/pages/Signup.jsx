import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { authDataContext } from '../context/AuthContext'
import axios from "axios"
import { userDataContext } from '../context/userContext'
import { Eye, EyeOff, User, Mail, Lock, UserPlus, Globe } from 'lucide-react'

function Signup() {
  let [show, setShow] = useState(false)
  let { serverUrl } = useContext(authDataContext)
  let { userData, setUserData } = useContext(userDataContext)
  let navigate = useNavigate()
  let [firstName, setFirstName] = useState("")
  let [lastName, setLastName] = useState("")
  let [userName, setUserName] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [loading, setLoading] = useState(false)
  let [err, setErr] = useState("")

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let result = await axios.post(serverUrl + "/api/auth/signup", {
        firstName,
        lastName,
        userName,
        email,
        password
      }, { withCredentials: true })
      console.log(result)
      setUserData(result.data)
      navigate("/")
      setErr("")
      setLoading(false)
      setFirstName("")
      setLastName("")
      setEmail("")
      setPassword("")
      setUserName("")
    } catch (error) {
      setErr(error.response.data.message)
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen w-full flex'>
      {/* Left Panel - Gradient Background */}
      <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden'>
        <div className='absolute inset-0 bg-black opacity-10'></div>
        <div className='absolute top-0 left-0 w-full h-full'>
          <div className='absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse'></div>
          <div className='absolute bottom-20 right-20 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-700'></div>
        </div>
        
        <div className='relative z-10 flex flex-col justify-center items-start p-16 text-white'>
          {/* CareerSphere Logo */}
          <div className='mb-8 flex items-center gap-3'>
            <div className='relative w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/30'>
              <div className='absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent rounded-xl'></div>
              <Globe className='w-7 h-7 text-white relative z-10' strokeWidth={2.5} />
            </div>
            <span className='text-2xl font-bold text-white'>CareerSphere</span>
          </div>

          <h1 className='text-5xl font-bold mb-6 leading-tight'>
            Connect with professionals worldwide
          </h1>
          <p className='text-xl text-blue-100 mb-8 leading-relaxed'>
            Join millions of professionals to grow your network, share insights, and advance your career.
          </p>
          <div className='flex gap-8'>
            <div>
              <div className='text-4xl font-bold'>500M+</div>
              <div className='text-blue-200'>Active Users</div>
            </div>
            <div>
              <div className='text-4xl font-bold'>200+</div>
              <div className='text-blue-200'>Countries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Signup Form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50'>
        <div className='w-full max-w-md'>
          {/* Logo for mobile */}
          <div className='lg:hidden mb-8 flex justify-center items-center gap-3'>
            <div className='relative w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg'>
              <div className='absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-xl'></div>
              <Globe className='w-7 h-7 text-white relative z-10' strokeWidth={2.5} />
            </div>
            <span className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
              CareerSphere
            </span>
          </div>

          <div className='bg-white rounded-2xl shadow-xl p-8 md:p-10'>
            <div className='mb-8'>
              <h2 className='text-3xl font-bold text-gray-900 mb-2'>Create Account</h2>
              <p className='text-gray-600'>Start your professional journey today</p>
            </div>

            <form onSubmit={handleSignUp} className='space-y-5'>
              {/* Name Fields Row */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='relative'>
                  <input
                    type="text"
                    placeholder='First name'
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className='w-full h-12 pl-11 pr-4 border-2 border-gray-200 rounded-lg text-gray-900 text-base focus:border-blue-500 focus:outline-none transition-colors'
                  />
                  <User className='absolute left-3 top-3 text-gray-400 w-5 h-5' />
                </div>
                <div className='relative'>
                  <input
                    type="text"
                    placeholder='Last name'
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className='w-full h-12 pl-11 pr-4 border-2 border-gray-200 rounded-lg text-gray-900 text-base focus:border-blue-500 focus:outline-none transition-colors'
                  />
                  <User className='absolute left-3 top-3 text-gray-400 w-5 h-5' />
                </div>
              </div>

              {/* Username */}
              <div className='relative'>
                <input
                  type="text"
                  placeholder='Username'
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className='w-full h-12 pl-11 pr-4 border-2 border-gray-200 rounded-lg text-gray-900 text-base focus:border-blue-500 focus:outline-none transition-colors'
                />
                <UserPlus className='absolute left-3 top-3 text-gray-400 w-5 h-5' />
              </div>

              {/* Email */}
              <div className='relative'>
                <input
                  type="email"
                  placeholder='Email address'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full h-12 pl-11 pr-4 border-2 border-gray-200 rounded-lg text-gray-900 text-base focus:border-blue-500 focus:outline-none transition-colors'
                />
                <Mail className='absolute left-3 top-3 text-gray-400 w-5 h-5' />
              </div>

              {/* Password */}
              <div className='relative'>
                <input
                  type={show ? "text" : "password"}
                  placeholder='Password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full h-12 pl-11 pr-12 border-2 border-gray-200 rounded-lg text-gray-900 text-base focus:border-blue-500 focus:outline-none transition-colors'
                />
                <Lock className='absolute left-3 top-3 text-gray-400 w-5 h-5' />
                <button
                  type="button"
                  onClick={() => setShow(prev => !prev)}
                  className='absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors'
                >
                  {show ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                </button>
              </div>

              {/* Error Message */}
              {err && (
                <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm'>
                  {err}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className='w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-blue-500/30'
              >
                {loading ? (
                  <div className='flex items-center justify-center gap-2'>
                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    Creating account...
                  </div>
                ) : (
                  'Sign Up'
                )}
              </button>

              {/* Sign In Link */}
              <div className='text-center pt-4'>
                <p className='text-gray-600'>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className='text-blue-600 hover:text-blue-700 font-semibold hover:underline'
                  >
                    Sign In
                  </button>
                </p>
              </div>

              {/* Terms */}
              <p className='text-xs text-gray-500 text-center pt-4'>
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup