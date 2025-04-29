import { Typography, Container, Box, Alert, Button } from "@mui/material";
import { useAuth } from "../../auth/context/ AuthContext";
import { Link as RouterLink } from "react-router-dom";

export default function Dashboard() {
  const { role, approved } = useAuth();

  if (!approved) {
    return (
      <Container maxWidth="sm">
        <Alert severity="warning" sx={{ mt: 4 }}>
          Your account is pending admin approval. Please wait until you're
          verified.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom mt={4}>
        Welcome {role}
      </Typography>

      <Box mt={3}>
        {role === "Broker" && (
          <>
            <Typography>
               Broker View: You can create and manage orders.
            </Typography>
            <Button
            variant="contained"
            component={RouterLink}
            to="/order/create"
          >
            + Create Order
          </Button>
          </>
        )}

        {role === "Contractor" && (
          <Typography>
            Contractor View: You can approve or reject orders.
          </Typography>
        )}

        {role === "Investor" && (
          <Typography>
            💰 Investor View: You can view and bid on orders.
          </Typography>
        )}

        {role === "Sourcing Agent" && (
          <Typography>
           Sourcing Agent View: You can allocate order items.
          </Typography>
        )}

        {role === "Client" && (
          <Typography>Client View: You can track order statuses.</Typography>
        )}

        {role === "Admin" && (
          <Typography>
           Admin View: You can approve users and oversee the platform.
          </Typography>
        )}
      </Box>
    </Container>
  );
}
