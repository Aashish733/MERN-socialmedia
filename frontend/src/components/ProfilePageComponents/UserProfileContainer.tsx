import { useEffect, useState } from 'react'

import { getUserProfileInfo, getUserProfilePosts } from '../../api/userProfile.api'
import { useParams } from 'react-router'
import type { userProfileInfoType } from '../../types/userprofile'
import Spinner from '../General/Spinner'
import UserInfo from './UserInfo'
import UserPosts from './UserPosts'
import type { UserPostType } from '../../types/userPost'

const UserProfileContainer = () => {
  const { username } = useParams<{ username: string }>();

  const [userProfileInfo, setUserProfileInfo] =useState<userProfileInfoType | null>(null)
  const [loading, setLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(true);
  const [userPosts, setUserPosts] = useState<UserPostType[]>([]);


   useEffect(() => {
     if (!username) return;

     const getUserProfileData = async () => {
       try {
         const userProfileInfo = await getUserProfileInfo(username);
         setUserProfileInfo(userProfileInfo);
         console.log(userProfileInfo)
       } catch (error) {
         console.log("Failed to fetch profile: ", error);
       } finally {
         setLoading(false);
       }
     };

     getUserProfileData();
   }, [username]);

     useEffect(() => {
       if (!username) return;

       const getUserPosts = async () => {
         try {
           const response = await getUserProfilePosts(username);
           setUserPosts(response);
         } catch (error) {
           console.log("Failed to fetch posts: ", error);
         } finally {
           setPostLoading(false);
         }
       };

       getUserPosts();
     }, [username]);
  
     if (loading) return <Spinner />;
    if (!userProfileInfo) return <div>User not found</div>;

  return (
    <div className='min-w-[64vw]'>
      <UserInfo user={userProfileInfo} />
      {
        postLoading ? 
        <Spinner /> : 
        <UserPosts userPosts={userPosts} />
      }
    </div>
  )
}

export default UserProfileContainer