import { Navigate, useRoutes } from "react-router-dom";
// auth
import AuthGuard from "../auth/AuthGuard";
import GuestGuard from "../auth/GuestGuard";
// layouts
import MainLayout from "../layouts/main";
import SimpleLayout from "../layouts/simple";
import CompactLayout from "../layouts/compact";
import DashboardLayout from "../layouts/dashboard";
// config
import { PATH_AFTER_LOGIN } from "../config-global";
//
import {
  // Auth
  LoginPage,
  RegisterPage,
  LeavesRequested,
  AddEditLeaveRequest,
  HRLeaveList,
  ManagerLeaveList,
  Page404,
} from "./elements";

// ----------------------------------------------------------------------

const AuthLayout = () => (
  <AuthGuard>
    <DashboardLayout />
  </AuthGuard>
);

export default function Router() {
  return useRoutes([
    // Auth
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: "register",
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: "/",
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [{ element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true }],
    },
    //Employee
    {
      path: "emp-dashboard/leave",
      element: <AuthLayout />,
      children: [
        { path: "list", element: <LeavesRequested /> },
        { path: "add", element: <AddEditLeaveRequest /> },
        { path: "edit/:leaveId", element: <AddEditLeaveRequest /> },
      ],
    },
    //HR
    {
      path: "hr-dashboard/leave",
      element: <AuthLayout />,
      children: [{ path: "list", element: <HRLeaveList /> }],
    },
    //Manager
    {
      path: "manager-dashboard/leave",
      element: <AuthLayout />,
      children: [{ path: "list", element: <ManagerLeaveList /> }],
    },
    {
      element: <CompactLayout />,
      children: [{ path: "404", element: <Page404 /> }],
    },
    { path: "*", element: <Navigate to='/404' replace /> },
  ]);
}
