import React, { useContext, useRef, useState } from 'react'
import { X, Camera, Plus, MapPin, Briefcase, GraduationCap, Award, Sparkles } from 'lucide-react'
import { userDataContext } from '../context/userContext'
import dp from "../assets/dp.webp"
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'

function EditProfile({ darkMode }) {
  let { edit, setEdit, userData, setUserData } = useContext(userDataContext)
  let { serverUrl } = useContext(authDataContext)
  
  let [firstName, setFirstName] = useState(userData.firstName || "")
  let [lastName, setLastName] = useState(userData.lastName || "")
  let [userName, setUserName] = useState(userData.userName || "")
  let [headline, setHeadline] = useState(userData.headline || "")
  let [location, setLocation] = useState(userData.location || "")
  let [gender, setGender] = useState(userData.gender || "")
  let [skills, setSkills] = useState(userData.skills || [])
  let [newSkills, setNewSkills] = useState("")
  let [education, setEducation] = useState(userData.education || [])
  let [newEducation, setNewEducation] = useState({
    college: "",
    degree: "",
    fieldOfStudy: ""
  })
  let [experience, setExperience] = useState(userData.experience || [])
  let [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    description: ""
  })

  let [frontendProfileImage, setFrontendProfileImage] = useState(userData.profileImage || dp)
  let [backendProfileImage, setBackendProfileImage] = useState(null)
  let [frontendCoverImage, setFrontendCoverImage] = useState(userData.coverImage || null)
  let [backendCoverImage, setBackendCoverImage] = useState(null)
  let [saving, setSaving] = useState(false)
  
  const profileImage = useRef()
  const coverImage = useRef()

  // Theme classes
  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50'
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white'
  const textPrimary = darkMode ? 'text-white' : 'text-gray-900'
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600'
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200'
  const inputBg = darkMode ? 'bg-gray-700' : 'bg-gray-50'
  const inputBorder = darkMode ? 'border-gray-600' : 'border-gray-300'

  function addSkill(e) {
    e.preventDefault()
    if (newSkills && !skills.includes(newSkills)) {
      setSkills([...skills, newSkills])
    }
    setNewSkills("")
  }

  function removeSkill(skill) {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill))
    }
  }

  function addEducation(e) {
    e.preventDefault()
    if (newEducation.college && newEducation.degree && newEducation.fieldOfStudy) {
      setEducation([...education, newEducation])
    }
    setNewEducation({
      college: "",
      degree: "",
      fieldOfStudy: ""
    })
  }

  function addExperience(e) {
    e.preventDefault()
    if (newExperience.title && newExperience.company && newExperience.description) {
      setExperience([...experience, newExperience])
    }
    setNewExperience({
      title: "",
      company: "",
      description: ""
    })
  }

  function removeEducation(edu) {
    if (education.includes(edu)) {
      setEducation(education.filter((e) => e !== edu))
    }
  }

  function removeExperience(exp) {
    if (experience.includes(exp)) {
      setExperience(experience.filter((e) => e !== exp))
    }
  }

  function handleProfileImage(e) {
    let file = e.target.files[0]
    setBackendProfileImage(file)
    setFrontendProfileImage(URL.createObjectURL(file))
  }

  function handleCoverImage(e) {
    let file = e.target.files[0]
    setBackendCoverImage(file)
    setFrontendCoverImage(URL.createObjectURL(file))
  }

  const handleSaveProfile = async () => {
    setSaving(true)
    try {
      let formdata = new FormData()
      formdata.append("firstName", firstName)
      formdata.append("lastName", lastName)
      formdata.append("userName", userName)
      formdata.append("headline", headline)
      formdata.append("location", location)
      formdata.append("gender", gender)
      formdata.append("skills", JSON.stringify(skills))
      formdata.append("education", JSON.stringify(education))
      formdata.append("experience", JSON.stringify(experience))

      if (backendProfileImage) {
        formdata.append("profileImage", backendProfileImage)
      }
      if (backendCoverImage) {
        formdata.append("coverImage", backendCoverImage)
      }

      let result = await axios.put(serverUrl + "/api/user/updateprofile", formdata, { withCredentials: true })
      setUserData(result.data)
      setSaving(false)
      setEdit(false)
    } catch (error) {
      console.log(error)
      setSaving(false)
    }
  }

  return (
    <div className='w-full h-screen fixed top-0 left-0 z-[100] flex justify-center items-center p-4'>
      <input type="file" accept='image/*' hidden ref={profileImage} onChange={handleProfileImage} />
      <input type="file" accept='image/*' hidden ref={coverImage} onChange={handleCoverImage} />
      
      {/* Backdrop */}
      <div className='w-full h-full bg-black/70 backdrop-blur-sm absolute top-0 left-0' onClick={() => setEdit(false)}></div>
      
      {/* Modal Container */}
      <div className={`w-full max-w-[900px] h-[90vh] ${cardBg} relative overflow-hidden z-[200] shadow-2xl rounded-3xl flex flex-col border-2 ${borderColor}`}>
        
        {/* Header with Gradient */}
        <div className='relative overflow-hidden border-b border-gray-200'>
          <div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-10'></div>
          <div className='relative flex items-center justify-between p-6'>
            <div>
              <h2 className={`text-3xl font-bold ${textPrimary} flex items-center gap-3`}>
                <Sparkles className='w-8 h-8 text-blue-600' />
                Edit Your Profile
              </h2>
              <p className={`text-sm ${textSecondary} mt-1`}>Update your professional information</p>
            </div>
            <button 
              onClick={() => setEdit(false)}
              className={`w-12 h-12 rounded-full ${inputBg} hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-all shadow-lg`}
            >
              <X className={`w-6 h-6 ${textPrimary}`} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className='flex-1 overflow-y-auto px-6 py-6'>
          
          {/* Cover & Profile Images Section */}
          <div className='mb-8'>
            <div className='relative'>
              {/* Cover Image */}
              <div 
                className='w-full h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl overflow-hidden cursor-pointer group relative shadow-xl'
                onClick={() => coverImage.current.click()}
              >
                {frontendCoverImage && (
                  <img src={frontendCoverImage} alt="" className='w-full h-full object-cover' />
                )}
                <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent'></div>
                <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center'>
                  <div className='flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-all'>
                    <Camera className='text-white w-8 h-8' />
                    <span className='text-white font-semibold'>Change Cover</span>
                  </div>
                </div>
              </div>

              {/* Profile Image */}
              <div className='absolute -bottom-16 left-8'>
                <div 
                  className='relative w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-600 cursor-pointer group shadow-2xl'
                  onClick={() => profileImage.current.click()}
                >
                  <img src={frontendProfileImage} alt="" className='w-full h-full object-cover' />
                  <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center'>
                    <Camera className='text-white opacity-0 group-hover:opacity-100 transition-all w-7 h-7' />
                  </div>
                  <div className='absolute bottom-2 right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg'>
                    <Plus className='text-white w-5 h-5' />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Info Section */}
          <div className={`${cardBg} rounded-2xl p-6 mb-6 border ${borderColor} shadow-lg`}>
            <h3 className={`text-xl font-bold ${textPrimary} mb-4 flex items-center gap-2`}>
              <div className='w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center'>
                <span className='text-white text-sm'>👤</span>
              </div>
              Basic Information
            </h3>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className={`text-sm font-semibold ${textSecondary} mb-2 block`}>First Name</label>
                <input 
                  type="text" 
                  placeholder='Enter first name' 
                  className={`w-full h-12 ${inputBg} border ${inputBorder} ${textPrimary} px-4 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              
              <div>
                <label className={`text-sm font-semibold ${textSecondary} mb-2 block`}>Last Name</label>
                <input 
                  type="text" 
                  placeholder='Enter last name' 
                  className={`w-full h-12 ${inputBg} border ${inputBorder} ${textPrimary} px-4 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              
              <div>
                <label className={`text-sm font-semibold ${textSecondary} mb-2 block`}>Username</label>
                <input 
                  type="text" 
                  placeholder='@username' 
                  className={`w-full h-12 ${inputBg} border ${inputBorder} ${textPrimary} px-4 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                  value={userName} 
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              
              <div>
                <label className={`text-sm font-semibold ${textSecondary} mb-2 block`}>Gender</label>
                <select 
                  className={`w-full h-12 ${inputBg} border ${inputBorder} ${textPrimary} px-4 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                  value={gender} 
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className='md:col-span-2'>
                <label className={`text-sm font-semibold ${textSecondary} mb-2 flex items-center gap-2`}>
                  <MapPin className='w-4 h-4 text-blue-600' />
                  Location
                </label>
                <input 
                  type="text" 
                  placeholder='City, Country' 
                  className={`w-full h-12 ${inputBg} border ${inputBorder} ${textPrimary} px-4 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              
              <div className='md:col-span-2'>
                <label className={`text-sm font-semibold ${textSecondary} mb-2 block`}>Headline</label>
                <textarea 
                  placeholder='Professional headline (e.g., Software Engineer at Company)' 
                  className={`w-full h-24 ${inputBg} border ${inputBorder} ${textPrimary} px-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none`}
                  value={headline} 
                  onChange={(e) => setHeadline(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className={`${cardBg} rounded-2xl p-6 mb-6 border ${borderColor} shadow-lg`}>
            <h3 className={`text-xl font-bold ${textPrimary} mb-4 flex items-center gap-2`}>
              <div className='w-8 h-8 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center'>
                <Award className='w-5 h-5 text-white' />
              </div>
              Skills
            </h3>
            
            {skills.length > 0 && (
              <div className='flex flex-wrap gap-2 mb-4'>
                {skills.map((skill, index) => (
                  <div key={index} className='flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-full px-4 py-2 group hover:border-blue-400 transition-all'>
                    <span className={`text-sm font-medium ${textPrimary}`}>{skill}</span>
                    <button 
                      onClick={() => removeSkill(skill)}
                      className='w-5 h-5 rounded-full bg-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all'
                    >
                      <X className='w-3 h-3 text-white' />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className='flex gap-3'>
              <input 
                type="text" 
                placeholder='Add a new skill' 
                value={newSkills} 
                onChange={(e) => setNewSkills(e.target.value)}
                className={`flex-1 h-12 ${inputBg} border ${inputBorder} ${textPrimary} px-4 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
              />
              <button 
                className='px-8 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/30'
                onClick={addSkill}
              >
                Add
              </button>
            </div>
          </div>

          {/* Education Section */}
          <div className={`${cardBg} rounded-2xl p-6 mb-6 border ${borderColor} shadow-lg`}>
            <h3 className={`text-xl font-bold ${textPrimary} mb-4 flex items-center gap-2`}>
              <div className='w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center'>
                <GraduationCap className='w-5 h-5 text-white' />
              </div>
              Education
            </h3>
            
            {education.length > 0 && (
              <div className='space-y-3 mb-4'>
                {education.map((edu, index) => (
                  <div key={index} className={`${inputBg} border ${borderColor} rounded-xl p-4 group hover:border-purple-400 transition-all`}>
                    <div className='flex justify-between items-start'>
                      <div className='flex-1'>
                        <div className={`font-bold ${textPrimary}`}>{edu.college}</div>
                        <div className={`text-sm ${textSecondary}`}>{edu.degree} • {edu.fieldOfStudy}</div>
                      </div>
                      <button 
                        onClick={() => removeEducation(edu)}
                        className='w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all'
                      >
                        <X className='w-4 h-4 text-white' />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className='space-y-3'>
              <input 
                type="text" 
                placeholder='College/University' 
                value={newEducation.college} 
                onChange={(e) => setNewEducation({ ...newEducation, college: e.target.value })}
                className={`w-full h-12 ${inputBg} border ${inputBorder} ${textPrimary} px-4 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
              />
              <input 
                type="text" 
                placeholder='Degree' 
                value={newEducation.degree} 
                onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                className={`w-full h-12 ${inputBg} border ${inputBorder} ${textPrimary} px-4 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
              />
              <input 
                type="text" 
                placeholder='Field of Study' 
                value={newEducation.fieldOfStudy} 
                onChange={(e) => setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })}
                className={`w-full h-12 ${inputBg} border ${inputBorder} ${textPrimary} px-4 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
              />
              <button 
                className='w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/30'
                onClick={addEducation}
              >
                Add Education
              </button>
            </div>
          </div>

          {/* Experience Section */}
          <div className={`${cardBg} rounded-2xl p-6 mb-6 border ${borderColor} shadow-lg`}>
            <h3 className={`text-xl font-bold ${textPrimary} mb-4 flex items-center gap-2`}>
              <div className='w-8 h-8 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center'>
                <Briefcase className='w-5 h-5 text-white' />
              </div>
              Experience
            </h3>
            
            {experience.length > 0 && (
              <div className='space-y-3 mb-4'>
                {experience.map((exp, index) => (
                  <div key={index} className={`${inputBg} border ${borderColor} rounded-xl p-4 group hover:border-orange-400 transition-all`}>
                    <div className='flex justify-between items-start'>
                      <div className='flex-1'>
                        <div className={`font-bold ${textPrimary}`}>{exp.title}</div>
                        <div className={`text-sm ${textSecondary}`}>{exp.company}</div>
                        <div className={`text-sm ${textSecondary} mt-1`}>{exp.description}</div>
                      </div>
                      <button 
                        onClick={() => removeExperience(exp)}
                        className='w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all'
                      >
                        <X className='w-4 h-4 text-white' />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className='space-y-3'>
              <input 
                type="text" 
                placeholder='Job Title' 
                value={newExperience.title} 
                onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                className={`w-full h-12 ${inputBg} border ${inputBorder} ${textPrimary} px-4 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
              />
              <input 
                type="text" 
                placeholder='Company' 
                value={newExperience.company} 
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                className={`w-full h-12 ${inputBg} border ${inputBorder} ${textPrimary} px-4 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
              />
              <textarea 
                placeholder='Job Description' 
                value={newExperience.description} 
                onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                className={`w-full h-24 ${inputBg} border ${inputBorder} ${textPrimary} px-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none`}
              />
              <button 
                className='w-full h-12 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-red-700 transition-all shadow-lg shadow-orange-500/30'
                onClick={addExperience}
              >
                Add Experience
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-900/50'>
          <button 
            onClick={handleSaveProfile}
            disabled={saving}
            className='w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 transform hover:scale-[1.02] flex items-center justify-center gap-2'
          >
            {saving ? (
              <>
                <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                Saving Changes...
              </>
            ) : (
              <>
                <Sparkles className='w-5 h-5' />
                Save Profile
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditProfile