import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const AuthDebug = () => {
  const { user, isLoading, isError, message } = useSelector((state) => state.auth);
  const token = Cookies.get("JwtToken");
  const localUser = JSON.parse(localStorage.getItem("user"));

  // Always show debug info for now to help with troubleshooting
  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">Auth Debug Info:</h3>
      <div className="space-y-1">
        <div>Token: {token ? '✅ Present' : '❌ Missing'}</div>
        <div>Redux User: {user ? '✅ Present' : '❌ Missing'}</div>
        <div>Local User: {localUser ? '✅ Present' : '❌ Missing'}</div>
        <div>Loading: {isLoading ? '✅ Yes' : '❌ No'}</div>
        <div>Error: {isError ? '✅ Yes' : '❌ No'}</div>
        {message && <div>Message: {message}</div>}
        {user && (
          <div>
            <div>User Type: {user.userType}</div>
            <div>User ID: {user._id}</div>
          </div>
        )}
        {localUser && (
          <div>
            <div>Local User Type: {localUser.userType}</div>
            <div>Local User ID: {localUser._id}</div>
          </div>
        )}
        <div className="mt-2 text-yellow-300">
          <div>Token Value: {token ? token.substring(0, 20) + '...' : 'None'}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthDebug; 