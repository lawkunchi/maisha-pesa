import { lazy } from "react";
import AuthLayout from "../layouts/AuthLayout";


const CreateOrder = lazy(() => import("../../order/pages/CreateOrder"));
const OrderList = lazy(() => import("../../order/pages/OrderList"));
const Order = lazy(() => import("../../order/pages/Order"));

const ourderRoutes = {
  path: "/order",
  element: <AuthLayout />,
  children: [
    { path: "", element: <OrderList /> },
    { path: "create", element: <CreateOrder /> },
    { path: ":orderId", element: <Order /> },
  ],
};

export default ourderRoutes;
