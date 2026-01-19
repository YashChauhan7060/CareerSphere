import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { authDataContext } from '../context/AuthContext'
import axios from "axios"
import { userDataContext } from '../context/userContext'
import { Eye, EyeOff, Mail, Lock, Globe } from 'lucide-react'

function Login() {
  let [show, setShow] = useState(false)
  let { serverUrl } = useContext(authDataContext)
  let { userData, setUserData } = useContext(userDataContext)
  let navigate = useNavigate()
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [loading, setLoading] = useState(false)
  let [err, setErr] = useState("")

  const handleSignIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let result = await axios.post(serverUrl + "/api/auth/login", {
        email,
        password
      }, { withCredentials: true })
      setUserData(result.data)
      navigate("/")
      setErr("")
      setLoading(false)
      setEmail("")
      setPassword("")
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
            Welcome back to CareerSphere
          </h1>
          <p className='text-xl text-blue-100 mb-8 leading-relaxed'>
            Continue your journey to find amazing opportunities and connect with top recruiters.
          </p>
          <div className='flex gap-8'>
            <div>
              <div className='text-4xl font-bold'>10K+</div>
              <div className='text-blue-200'>Job Openings</div>
            </div>
            <div>
              <div className='text-4xl font-bold'>500+</div>
              <div className='text-blue-200'>Companies</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
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
              <h2 className='text-3xl font-bold text-gray-900 mb-2'>Welcome Back</h2>
              <p className='text-gray-600'>Sign in to continue your career journey</p>
            </div>

            <form onSubmit={handleSignIn} className='space-y-5'>
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

              {/* Forgot Password */}
              <div className='flex justify-end'>
                <button
                  type="button"
                  className='text-sm text-blue-600 hover:text-blue-700 hover:underline'
                >
                  Forgot password?
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
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Sign Up Link */}
              <div className='text-center pt-4'>
                <p className='text-gray-600'>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate("/signup")}
                    className='text-blue-600 hover:text-blue-700 font-semibold hover:underline'
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login