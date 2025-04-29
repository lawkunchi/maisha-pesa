import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import {Container, Box } from "@mui/material";
import { useAuth } from "../../auth/context/ AuthContext";
import TopNav from "../components/TopNav";

const AuthLayout: FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <Box sx={{ display: "flex", width: "100vw", minHeight: "100vh" }}>
      <Box
        sx={{
          flexGrow: 1,
          width: `calc(100vw - 240px)`,
          transition: "width 0.3s ease-in-out",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TopNav />

        <Container maxWidth={false} sx={{ width: "100%", padding: 0 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default AuthLayout;
