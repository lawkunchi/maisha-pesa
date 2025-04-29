import { lazy } from "react";
import GuestLayout from "../layouts/GuestLayout";

const LoginPage = lazy(() => import("../../auth/pages/Login"));
const RegisterPage = lazy(() => import("../../auth/pages/Register"));

const authRoutes = {
  path: "/auth",
  element: <GuestLayout />,
  children: [
    { path: "login", element: <LoginPage /> },
    { path: "register", element: <RegisterPage /> },
  ],
};

export default authRoutes;
