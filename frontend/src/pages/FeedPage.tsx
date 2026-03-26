import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import Spinner from '../components/General/Spinner'
import {  logoutUser } from '../api/auth.api'
import { logout } from '../store/slices/authSlice'
import { toast } from 'sonner'
import { replace, useNavigate } from 'react-router'
import Navbar from '../components/General/Navbar'
import Sidebar from '../components/General/Sidebar'
import ChatBar from '../components/General/ChatBar'

import { getFeedPosts } from '../api/feed.api'
import type { FeedPostType } from '../types/feed'
import FeedPost from '../components/FeedPageComponents/FeedPost'

const Feedpage = () => {
   const [feedPosts, setFeedPosts] =useState<FeedPostType[]>([])
  const [loadingPosts, setLoadingPosts] = useState(false)
  const { loading } = useSelector((state: RootState) => state.auth);

  const [serverError, setServerError] = useState<string | null >(null)
  const user = useSelector((state: RootState)=> state.auth.user)
  if(loading){
    <Spinner/>
  }

  


  useEffect(()=>{
    const getPosts =async()=> {
      try {
        setLoadingPosts(true); 
        const posts = await getFeedPosts();
       
        console.log("API POSTS:", posts);
        setFeedPosts(posts);
      } catch (error: any) {
          setServerError(error.message)
          toast.error(error.message)
      }finally{
        setLoadingPosts(false)
      }
      
    }
    getPosts()
  },[])

  if(loading){
    return <Spinner/>
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container flex">
        <Sidebar />
        <div className='feed-container bg-white-500'>
        {loadingPosts ? (
          <Spinner />
        ) : (
          feedPosts.length !== 0 &&
          feedPosts.map((feedPost) => 
          <FeedPost key={feedPost._id} post={feedPost} />)
        )}
        </div>
        <ChatBar />
      </div>
    </div>
  );
}

export default Feedpage;