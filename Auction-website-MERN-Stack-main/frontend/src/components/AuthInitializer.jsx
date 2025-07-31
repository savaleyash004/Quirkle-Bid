import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../store/auth/authSlice';
import Cookies from 'js-cookie';

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if user token exists
    const token = Cookies.get("JwtToken");
    
    console.log('AuthInitializer - Token:', !!token, 'User:', !!user, 'Loading:', isLoading);
    
    if (token && !isLoading) {
      // If we have a token but no user in Redux state, fetch the current user
      if (!user) {
        console.log('AuthInitializer - Dispatching getCurrentUser');
        dispatch(getCurrentUser());
      }
    }
  }, [dispatch, user, isLoading]);

  return children;
};

export default AuthInitializer; 