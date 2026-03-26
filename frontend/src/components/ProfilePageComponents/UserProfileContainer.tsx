import { useEffect, useState } from 'react'

import { getUserProfileInfo } from '../../api/userProfile.api'
import { useParams } from 'react-router'
import type { userProfileInfoType } from '../../types/userprofile'
import Spinner from '../General/Spinner'
import UserInfo from './UserInfo'

const UserProfileContainer = () => {
  const { username } = useParams<{ username: string }>();

  const [userProfileInfo, setUserProfileInfo] =useState<userProfileInfoType | null>(null)
  const [loading, setLoading] = useState(true);

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

     if (loading) return <Spinner />;
    if (!userProfileInfo) return <div>User not found</div>;

  return (
    <div className='min-w-[64vw]'>
      <UserInfo user={userProfileInfo} />
    </div>
  )
}

export default UserProfileContainer