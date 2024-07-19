import React from 'react'
import { useState,useContext,useEffect } from 'react';
import { UserContext } from '../context/userContext';
import { Link, useNavigate } from 'react-router-dom';
import {useLocation} from 'react-router-dom'
import axios from 'axios';
import Loader from '../Components/Loader';
const DeletePost = ({postId:id}) => {

  const navigate=useNavigate();
  const [isLoading,setIsLoading]=useState(false)
  const {currentUser}=useContext(UserContext)
  const token=currentUser?.token;
  const location=useLocation();

  //redirect to login page
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])
  const removePost=async()=>{
    try {
      const response=axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`,{withCredentials:true,headers:{Authorization:`Bearer ${token}`}})
      if(response.status==200){
        if(location.pathname==`/myposts/${currentUser.id}`){
          navigate(0)
        }else{
          navigate('/')
        }
      }
      setIsLoading(false)
    } catch (error) {
      console.log("Couldn't delete post.")
    }
  }
  if(isLoading){
    return <Loader/>
  }
  return (
    <Link className='btn sm danger' onClick={()=>removePost(id)}>Delete</Link>
  )
}

export default DeletePost