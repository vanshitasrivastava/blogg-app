import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Loader from './Components/Loader';
import Layout from './Components/Layout';
import ErrorPage from './page/ErrorPage'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './page/Home'
import PostDetail from './page/PostDetail'
import Register from './page/Register'
import LoginPage from './page/LoginPage'
import UserProfile from './page/UserProfile'
import Authors from './page/Authors'
import CreatePost from './page/CreatePosts'
import CategoryPosts from './page/CategoryPosts'
import AuthorPosts from './page/AuthorPosts'
import Dashboard from './page/Dashboard'
import EditPost from './page/EditPost'
import DeletePost from './page/DeletePost'
import Logout from './page/Logout'
import UserProvider from './context/userContext';
const router=createBrowserRouter([
  {
  path:"/",
  element:<UserProvider>
    <Layout/>
    </UserProvider>,
  errorElement:<ErrorPage/>,
  children:[
    {index:true , element:<Home/>},
    {path:"posts/:id",element:<PostDetail/>},
    {path:"register",element:<Register/>},
    {path:"login",element:<LoginPage/>},
    {path:"profile/:id",element:<UserProfile/>},
    {path:"authors",element:<Authors/>},
    {path:"create",element:<CreatePost/>},
    {path:"posts/categories/:category",element:<CategoryPosts/>},
    {path:"posts/users/:id",element:<AuthorPosts/>},
    {path:"myposts/:id",element:<Dashboard/>},
    {path:"posts/:id/edit",element:<EditPost/>},
    {path:"posts/:id/delete",element:<DeletePost/>},
    {path:"logout",element:<Logout/>},
  
  ]
}
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/> 
  </React.StrictMode>
);


 