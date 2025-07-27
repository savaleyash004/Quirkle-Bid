import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetNewPassword from "./pages/auth/ResetNewPassword";
import UploadItem from "./pages/UploadItem";
import Dashboard from "./pages/Dashboard";
import SingleAuctionDetail from "./pages/SingleAuctionDetail";
import UserProfile from "./pages/UserProfile";
import EditAuction from "./pages/EditAuction";
import ErrorPage from "./pages/ErrorPage";
import Protected, { PublicRoute, SellerRoutes, AdminRoutes } from "./auth/Protected";
import PaymentSuccess from "./pages/PaymentSuccess";
import Admin from "./admin/Admin";
import { useSelector, useDispatch } from "react-redux";
import AdminFooter from "./admin/components/Footer";
import AdminHeader from "./admin/components/Header";
import AdminLogin from "./admin/pages/Login";
import AdminDashboard from "./admin/Admin";
import ManageItems from "./components/ManageItems";
import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { setUser } from "./store/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Restore user from backend if cookie is present but localStorage is empty
  useEffect(() => {
    const token = Cookies.get("JwtToken");
    let user = JSON.parse(localStorage.getItem("user"));
    if (token && !user) {
      axios.get("https://quirkle-bid-2.onrender.com/api/v1/users/current-user", { withCredentials: true })
        .then(res => {
          if (res.data.data.user) {
            localStorage.setItem("user", JSON.stringify(res.data.data.user));
            dispatch(setUser(res.data.data.user));
          }
        });
    } else if (user) {
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        {user && user.userType === "admin" ? <AdminHeader /> : <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/single-auction-detail/:id" element={<SingleAuctionDetail />} />
          <Route path="*" element={<ErrorPage />} />
          <Route element={<PublicRoute />}>
            <Route path="/reset-password/:id/:token" element={<ResetNewPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<Protected />}>
            <Route path="/user-profile/*" element={<UserProfile />} />
            <Route path="/edit-auction/:id" element={<EditAuction />} />
            <Route path="/success/:id" element={<PaymentSuccess />} />
            <Route element={<SellerRoutes />}>
              <Route path="/create-auction" element={<UploadItem />} />
            </Route>
          </Route>
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
        {user && user.userType === "admin" ? <AdminFooter /> : <Footer />}
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
