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
import SearchMedicalDataPage from "./pages/viewData";
import ProfilePage from "./pages/user/Profile";
import ChangePasswordPage from "./pages/user/ChangePassword";
import ForgotPasswordPage from "./pages/auth/ForgotPassword";
import ResetPasswordValidatePage from "./pages/auth/ResetPasswordValidate";
import ResetPasswordConfirmPage from "./pages/auth/ResetPasswordConfirm";
import MedicalDashboard from "./pages/viewData/MedicalDashboard";
import { CAN_USERS_REGISTER } from "./lib/consts";

const AuthRoutes = [
  {
    path: "register",
    element: <Register />,
  },
];

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
            element: <MedicalDashboard />,
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
          ...(CAN_USERS_REGISTER ? AuthRoutes : []),
          {
            path: "forgot-password",
            element: <ForgotPasswordPage />,
          },
          {
            path: "reset-password-validate",
            element: <ResetPasswordValidatePage />,
          },
          {
            path: "reset-password-confirm/:code",
            element: <ResetPasswordConfirmPage />,
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
            element: <ChangePasswordPage />,
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
