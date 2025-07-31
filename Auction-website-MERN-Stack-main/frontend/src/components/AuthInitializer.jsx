import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../store/auth/authSlice';
import Cookies from 'js-cookie';

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if user token exists
    const token = Cookies.get("JwtToken");
    
    console.log('AuthInitializer - Token:', !!token, 'User:', !!user);
    
    // Only try to get current user if we have a token but no user in Redux state
    if (token && !user) {
      console.log('AuthInitializer - Dispatching getCurrentUser');
      dispatch(getCurrentUser());
    }
  }, []); // Only run once when component mounts

  return children;
};

export default AuthInitializer; 