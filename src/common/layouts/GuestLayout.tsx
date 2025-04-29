import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../auth/context/ AuthContext";
import { Box } from "@mui/material";

const GuestLayout: FC = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <Box sx={{ display: "flex", width: "100vw", minHeight: "100vh" }}>
        <Outlet />
    </Box>
  );
};

export default GuestLayout;
