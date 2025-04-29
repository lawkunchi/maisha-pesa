import { createBrowserRouter } from "react-router-dom";
import authRoutes from "./authRoutes";
import adminRoutes from "./adminRoutes";
import ourderRoutes from "./orderRoutes";
import dashboardRoutes from "./dashboardRoutes";

const router = createBrowserRouter([
  authRoutes,
  adminRoutes,
  dashboardRoutes,
  ourderRoutes
]);

export default router;
