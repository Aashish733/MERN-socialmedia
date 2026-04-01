import React from 'react'
import Navbar from '../components/General/Navbar'
import { Sidebar } from 'lucide-react'
import Spinner from '../components/General/Spinner'
import ChatBar from '../components/General/ChatBar'

const EditPostPage = () => {
  return (
     <div className="min-h-screen">
          <Navbar />
          <div className="container flex">
            <Sidebar />
            <div className='feed-container bg-white-500'>
            
            </div>
            <ChatBar />
          </div>
        </div>
  )
}

export default EditPostPage