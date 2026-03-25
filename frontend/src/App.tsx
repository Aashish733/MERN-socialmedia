import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import Home from './pages/Home'
import DotCanvas from './components/DotCanvas'
import type { RootState } from './store/store'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from './api/auth.api'
import { setAuthLoad, setUser } from './store/slices/authSlice'

const App = () => {

  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getCurrentUser();
        dispatch(setUser(response.data));
      } catch (error: unknown) {
        if (error instanceof Error) 
        console.log(error.message);
      } finally {
        dispatch(setAuthLoad());
      }
    };

    loadUser();
  }, [dispatch]);
  return (
    
      
  <div>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
    
   

  );
}

export default App