import React from 'react'
import Navbar from '../components/General/Navbar'
import Sidebar from '../components/General/Sidebar'
import ChatBar from '../components/General/ChatBar'
import UploadPostContainer from '../components/UploadPostPageComponents/UploadPostContainer'

const UploadPostPage = () => {
  return (
    <div className="h-screen flex flex-col">
          <Navbar />
          <div className="flex flex-1 ">
            <Sidebar/>
            <UploadPostContainer/>
            <ChatBar />
          </div>
        </div>
  )
}

export default UploadPostPage