import { Suspense, lazy } from "react";
// components
import LoadingScreen from "../components/loading-screen";

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

// AUTH
export const LoginPage = Loadable(lazy(() => import("../pages/auth/LoginPage")));
export const RegisterPage = Loadable(lazy(() => import("../pages/auth/RegisterPage")));

//Employee
export const LeavesRequested = Loadable(lazy(() => import("../pages/dashboard/employee/LeavesRequested")));
export const AddEditLeaveRequest = Loadable(lazy(() => import("../pages/dashboard/employee/AddEditLeaveRequest")));

//HR
export const HRLeaveList = Loadable(lazy(() => import("../pages/dashboard/hr/HRLeaveList")));

//Manager
export const ManagerLeaveList = Loadable(lazy(() => import("../pages/dashboard/manager/ManagerLeaveList")));

export const Page404 = Loadable(lazy(() => import("../pages/Page404")));
