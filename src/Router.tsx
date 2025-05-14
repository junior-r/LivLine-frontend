import { createBrowserRouter } from "react-router";
import App from "./App";
import { MainLayout } from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import AccountLayout from "./layouts/AccountLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import UsersDashboard from "./pages/dashboard/users";
import ManageUserData from "./pages/dashboard/users/data";
import DashboardPage from "./pages/dashboard";
import ViewDataPage from "./pages/viewData/Data";
import SearchMedicalDataPage from "./pages/viewData";
import ProfilePage from "./pages/user/Profile";
// import ChangePasswordPage from "./pages/user/ChangePassword";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>404</div>,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/about-us",
        element: <div>Quienes somos</div>,
      },
      {
        path: "/contacts",
        element: <div>Contacts</div>,
      },
      {
        path: "/privacy-policy",
        element: <div>Privacy Policy</div>,
      },
      {
        path: "/terms-and-conditions",
        element: <div>Terms and Conditions</div>,
      },
      {
        path: "/viewData",
        children: [
          {
            index: true,
            element: <SearchMedicalDataPage />,
          },
          {
            path: ":pk",
            element: <ViewDataPage />,
          },
        ],
      },
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
      {
        path: "/account",
        element: <AccountLayout />,
        children: [
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "change-password",
            // element: <ChangePasswordPage />,
            element: <>Change Password</>,
          },
        ],
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "users",
            children: [
              {
                index: true,
                element: <UsersDashboard />,
              },
              {
                path: ":pk",
                element: <ManageUserData />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
