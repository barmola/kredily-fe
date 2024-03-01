import PropTypes from "prop-types";
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
// components
import LoadingScreen from "../components/loading-screen";
//
import Login from "../pages/auth/LoginPage";
import { useAuthContext } from "./useAuthContext";

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized, user = "emp" } = useAuthContext();

  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);
  let authPath = pathname.replace(/\/[^/]+-dashboard/, `/${user?.role}-dashboard`);

  console.log("Auth Guard Authenticated:", isAuthenticated);

  console.log("Auth Path", authPath, pathname, requestedLocation);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (isAuthenticated && authPath !== pathname) {
    return <Navigate to={authPath} />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <> {children} </>;
}
