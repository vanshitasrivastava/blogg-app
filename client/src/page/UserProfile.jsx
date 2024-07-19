import React, { useContext, useState,useEffect} from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import Avatar from '../images/1.jpg'
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { UserContext } from '../context/userContext';
import axios from 'axios';

const UserProfile = () => {
  const [avatar,setAvatar]=useState('')
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [currentPassword,setCurrentPassword]=useState('')
  const [newPassword,setNewPassword]=useState('')
  const [confirmNewPassword,setConfirmNewPassword]=useState('')
  const [isAvatarTouched,setIsAvatarTouched]=useState(false)
  const navigate=useNavigate();
  const {currentUser}=useContext(UserContext)
  const token=currentUser?.token;
  const [error,setError]=useState('')
  //redirect to login page
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])
   //Beta zara link  dekho
  useEffect(()=>{
    const getUser=async()=>{
      const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${currentUser.id}`,{withCredentials:true,headers:{Authorization:`Bearer ${token}`}})
      const {name,email,avatar}=response.data;
      setName(name);
      setEmail(email);
      setAvatar(avatar);
    }
    getUser();
  },[])
  const changeAvatarHandler=async()=>{
    setIsAvatarTouched(false);
    try {
     const postData=new FormData();
     postData.set('avatar',avatar); 
     const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/users/changeavatar`,postData,{withCredentials:true,headers:{Authorization:`Bearer ${token}`}})
    } catch (error) {
      console.log(error);
    }
  }
  const updateUserDetails=async(e)=>{
   e.preventDefault();
   try {
    const userData=new FormData();
    userData.set('name',name);
    userData.set('email',email);
    userData.set('currentPassword',currentPassword);
    userData.set('newPassword',newPassword);
    userData.set('confirmNewPassword',confirmNewPassword);

    const response=await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/edit-user`,userData,{withCredentials:true,headers:{Authorization:`Bearer ${token}`}})
    if(response.status==200){
      //log user out
      navigate('/logout')
    }
   } catch (error) {
    setError(error.response.data.message);
   }
  }

  return (
    <section className='profile'>
     <div className="container profile__container">
      <Link to={`/myposts/${currentUser}`} className='btn'>My posts</Link>
      <div className="profile__details">
        <div className="avatar__wrapper">
          <div className="profile__avatar"> 
            <img src={`${process.env.REACT_APP_BASE_URL}/uploads/${avatar}`} alt="" />
          </div>
            <form className="avatar__form">
              <input type="file" name='avatar' id='avatar' onChange={e=> setAvatar(e.target.files[0])} accept='png ,jpg ,jpeg'/>
              <label htmlFor="avatar" onClick={()=> setIsAvatarTouched(true)}><FaEdit/></label>
            </form>
            {isAvatarTouched && <button className="profile__avatar-btn" onClick={changeAvatarHandler}><FaCheck /></button>}
          </div>
          <h1>{currentUser.name}</h1>

         
          <form className=" form profile__form" onSubmit={updateUserDetails}>
            {error && <p className="form_error-message"> {error}</p>}
            <input type="text" placeholder='Full Name' value={name} onChange={e=>setName(e.target.value)} />
            <input type="email" placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} />
            <input type="password" placeholder='Current password' value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} />
            <input type="password" placeholder='New password' value={newPassword} onChange={e=>setNewPassword(e.target.value)} />
            <input type="password" placeholder='Confirm password' value={confirmNewPassword} onChange={e=>setConfirmNewPassword(e.target.value)} />
          <button type="submit" className='btn primary'>Update details</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UserProfile