import { lazy } from "react";
import AuthLayout from "../layouts/AuthLayout";

const Dashboard = lazy(() => import("../../common/pages/Dashboard"));

const dashboardRoutes = {
  path: "/",
  element: <AuthLayout />,
  children: [
    { path: "", element: <Dashboard /> },
  ],
};

export default dashboardRoutes;
