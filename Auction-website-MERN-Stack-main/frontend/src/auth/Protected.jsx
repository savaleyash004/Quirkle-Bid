import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector} from "react-redux";


const useAuth = () => {
  const token = Cookies.get("JwtToken");
  const { user, isLoading } = useSelector((state) => state.auth);
  const localUser = JSON.parse(localStorage.getItem("user"));

  // Only clear localStorage if we have no token AND no user in Redux state
  if(!token && !user){
    localStorage.removeItem("user")
  }
  
  // If we have a user in Redux state, consider them authenticated
  // This handles the case where user is logged in but token cookie is missing
  const isAuthenticated = user || (token && localUser);
  console.log('useAuth - Token:', !!token, 'Redux User:', !!user, 'Local User:', !!localUser, 'Authenticated:', isAuthenticated);
  
  return isAuthenticated;
};

const PublicRoute = () => {
  const auth = useAuth();
  const { isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth && !isLoading) {
      navigate("/dashboard");
    }
  }, [auth, isLoading, navigate]);

  // Don't render anything while loading
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return auth ? null : <Outlet />;
};


const AdminPublicRoute = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  //console.log(auth, "auth.,,,,,,,,.......public....");

  useEffect(() => {
    if (auth) {
      navigate("/admin/users");
    }
  }, [auth, navigate]);

  return auth ? null : <Outlet />;
};

const Protected = () => {
  const auth = useAuth();
  const { isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  
  console.log('Protected - Auth:', auth, 'Loading:', isLoading, 'Timeout:', loadingTimeout);
  
  useEffect(() => {
    if (!auth && !isLoading) {
      console.log('Protected - Redirecting to login');
      navigate("/login");
    }
  }, [auth, isLoading, navigate]);

  // Add timeout for loading state
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        console.log('Protected - Loading timeout reached');
        setLoadingTimeout(true);
      }, 5000); // 5 second timeout

      return () => clearTimeout(timer);
    } else {
      setLoadingTimeout(false);
    }
  }, [isLoading]);

  // Show loading or the protected content
  if (isLoading && !loadingTimeout) {
    console.log('Protected - Showing loading');
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  // If loading timeout reached, try to render anyway
  if (loadingTimeout) {
    console.log('Protected - Loading timeout, rendering anyway');
    return auth ? <Outlet /> : <div className="flex justify-center items-center min-h-screen text-white">Authentication timeout. Please refresh the page.</div>;
  }

  console.log('Protected - Rendering:', auth ? 'Outlet' : 'null');
  return auth ? <Outlet /> : null;
};

const AdminProtected = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  //console.log(auth, "auth.,,,,,,,,.......protected....");
  useEffect(() => {
    if (!auth) {
      navigate("/admin/login");
    }
  }, [auth, navigate]);

  return auth ? <Outlet /> : null;
};

const SellerRoutes=()=>{
const {user}=useSelector((state)=>state.auth);
  const auth = useAuth();
  const navigate = useNavigate();
//console.log(auth, "auth.,,,,,seller routes,,,...........");
  useEffect(() => {
    if (auth && user && user.userType !== "seller") {
      navigate("/dashboard");
    }
  }, [auth, navigate, user]);

  return auth && user && user.userType === "seller" ? <Outlet /> : null;
}

const AdminRoutes=()=>{
  const {user}=useSelector((state)=>state.auth);
    const auth = useAuth();
    const navigate = useNavigate();
  //console.log(auth, "auth.,,,,,seller routes,,,...........");
  if (auth && user && user.userType !== "admin") {
    navigate("/dashboard");
  }
    useEffect(() => {
      if (auth && user && user.userType !== "admin") {
        navigate("/dashboard");
      }
    }, [auth, navigate, user]);
  
    return auth && user && user.userType === "admin" ? <Outlet /> : null;
  }

export { PublicRoute,SellerRoutes, AdminRoutes,AdminProtected , AdminPublicRoute};
export default Protected;
