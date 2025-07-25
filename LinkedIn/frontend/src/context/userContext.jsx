import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { authDataContext } from './AuthContext'
import { useEffect } from 'react'
import axios from 'axios'
export const userDataContext=createContext()

function UserContext({children}) {
let [userData,setUserData]=useState(null)
let {serverUrl}=useContext(authDataContext)
let [edit,setEdit]=useState(false)
let [postData,setPostData]=useState([])

const getCurrentUser = async () => {
  try {
    let result = await axios.get(serverUrl + "/api/user/currentuser", { withCredentials: true });
    // If result.data is an array, use the first user
    setUserData(Array.isArray(result.data) ? result.data[0] : result.data);
  } catch (error) {
    console.log(error);
    setUserData(null);
  }
}

const getPost=async ()=>{
  try {
    let result=await axios.get(serverUrl+"/api/post/getpost",{
      withCredentials:true
    })
    console.log(result)
    setPostData(result.data)
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
  getCurrentUser()
  getPost()
},[])


  const value={
    userData,setUserData,edit,setEdit,postData,setPostData,getPost
  }
  return (
    <div>
      <userDataContext.Provider value={value}>
      {children}
      </userDataContext.Provider>
    </div>
  )
}

export default UserContext