import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import Spinner from '../components/General/Spinner'

const Home = () => {
  const user = useSelector((state: RootState)=> state.auth.user)
  const { loading } = useSelector((state: RootState) => state.auth);
  if(loading){
    <Spinner/>
  }

  return (
    <div>
      {
        user? (
          <h1>Welcome , {user.username}</h1>
        ) :
        (
          <h1>You r not logged in</h1>
        )
      }
    </div>
  )
}

export default Home