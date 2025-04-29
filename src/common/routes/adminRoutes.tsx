import { lazy } from "react";
import AdminLayout from "../layouts/AdminLayout";

const Users = lazy(() => import("../../admin/pages/Users"));
const Revenue = lazy(() => import("../../admin/pages/Revenue"));

const adminRoutes = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    { path: "users", element: <Users /> },
    { path: "revenue", element: <Revenue /> },
  ],
};

export default adminRoutes;
