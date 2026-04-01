import React, { useEffect, useState } from 'react'
import Navbar from '../components/General/Navbar'
import { Sidebar } from 'lucide-react'
import Spinner from '../components/General/Spinner'
import ChatBar from '../components/General/ChatBar'
import EditPostContainer from '../components/EditPostPageComponents/EditPostContainer'
import { getUserPostById } from '../api/post.api'
import { toast } from 'sonner'
import { useParams } from 'react-router-dom'

const EditPostPage = () => {
   const [content, setContent] = useState<string | null>(null);
   const { postId } = useParams();
   useEffect(() => {
     if (!postId) {
       toast.error("Post id not found");
       return;
     }
     const getPostData = async () => {
       const response = await getUserPostById(postId);
       console.log({ response });
       setContent(response.content);
     };

     getPostData();
   }, [postId]);
  return (
     <div className="min-h-screen">
          <Navbar />
          <div className="container flex">
            <Sidebar />
            <div className='feed-container bg-white-500'>
            <EditPostContainer content={content}/>
            </div>
            <ChatBar />
          </div>
        </div>
  )
}

export default EditPostPage