import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

import useAuthStore from "../store/useAuthStore";

function AppContainer() {
  const { checkAuth, user, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return isCheckingAuth ? (
    <div className="flex items-center justify-center h-screen">
      <LoaderCircle className="size-10 animate-spin" />
    </div>
  ) : user ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ redirectUrl: window.location.pathname }}
    />
  );
}
export default AppContainer;
