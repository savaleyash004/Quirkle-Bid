import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector} from "react-redux";


const useAuth = () => {
  const token = Cookies.get("JwtToken");
  const { user, isLoading } = useSelector((state) => state.auth);
  const localUser = JSON.parse(localStorage.getItem("user"));

  if(!token){
    localStorage.removeItem("user")
  }
  
  const isAuthenticated = token && (user || localUser);
  console.log('useAuth - Token:', !!token, 'Redux User:', !!user, 'Local User:', !!localUser, 'Authenticated:', isAuthenticated);
  
  // Return true if we have both token and user (either from Redux state or localStorage)
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
  
  console.log('Protected - Auth:', auth, 'Loading:', isLoading);
  
  useEffect(() => {
    if (!auth && !isLoading) {
      console.log('Protected - Redirecting to login');
      navigate("/login");
    }
  }, [auth, isLoading, navigate]);

  // Show loading or the protected content
  if (isLoading) {
    console.log('Protected - Showing loading');
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
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
    if (auth && user.userType !== "seller") {
      navigate("/dashboard");
    }
  }, [auth, navigate]);

  return auth && user.userType === "seller" ? <Outlet /> : null;
}

const AdminRoutes=()=>{
  const {user}=useSelector((state)=>state.auth);
    const auth = useAuth();
    const navigate = useNavigate();
  //console.log(auth, "auth.,,,,,seller routes,,,...........");
  if (auth && user.userType !== "admin") {
    navigate("/dashboard");
  }
    useEffect(() => {
      if (auth && user.userType !== "admin") {
        navigate("/dashboard");
      }
    }, [auth, navigate]);
  
    return auth && user.userType === "admin" ? <Outlet /> : null;
  }

export { PublicRoute,SellerRoutes, AdminRoutes,AdminProtected , AdminPublicRoute};
export default Protected;
