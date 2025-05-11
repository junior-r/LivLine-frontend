import { createBrowserRouter } from "react-router";
import App from "./App";
import { MainLayout } from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import AccountLayout from "./layouts/AccountLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

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
            element: <>Profile</>,
          },
        ],
      },
    ],
  },
]);
