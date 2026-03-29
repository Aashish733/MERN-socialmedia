import React from 'react'
import Navbar from '../components/General/Navbar';

import ChatBar from '../components/General/ChatBar';
import Sidebar from '../components/General/Sidebar';
import UserProfileContainer from '../components/ProfilePageComponents/UserProfileContainer';

const ProfilePage = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 ">
        <Sidebar/>
        <UserProfileContainer/>
        <ChatBar />
      </div>
    </div>
  );
}

export default ProfilePage