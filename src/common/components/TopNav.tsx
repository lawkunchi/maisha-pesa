import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import { signOut } from "firebase/auth";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { auth } from "../services/firebase";
import { useAuth } from "../../auth/context/ AuthContext";

const TopNav = () => {
  const navigate = useNavigate();
  const { role } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/auth/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          Maisha Pesa
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button component={RouterLink} to="/order" color="inherit">
            Orders
          </Button>

          {role === "Admin" && (
            <>
              <Button component={RouterLink} to="/admin/users" color="inherit">
                Users
              </Button>

              <Button component={RouterLink} to="/admin/revenue" color="inherit">
                Revenue
              </Button>
            </>
          )}

          <Button variant="outlined" color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
