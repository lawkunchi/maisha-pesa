import { Box, Button, TextField, Typography } from "@mui/material";
import { updateOrderStatus } from "../services/OrderService";

export const SourcingAgentAllocate = ({ order, userId, setOrder, setSuccessMessage }: any) => {
  const allocateItems = async () => {
    await updateOrderStatus({
      orderId: order.id,
      newStatus: "allocated",
      actorId: userId,
      roleId: "Sourcing Agent",
      actionTaken: "Sourcing Agent allocated items",
      extraFields: {
        allocation: order.allocation || "",
        allocatedAt: new Date(),
      },
    });
    
    setOrder({ ...order, status: "allocated" });
    setSuccessMessage("Order items allocated successfully.");
  };

  return (
    <Box mt={4}>
      <Typography variant="h6">Allocate Items</Typography>
      <TextField
        fullWidth
        label="Allocated Items"
        multiline
        rows={3}
        margin="normal"
        onChange={(e) => setOrder({ ...order, allocation: e.target.value })}
      />
      <Button variant="contained" onClick={allocateItems}>
        Mark as Allocated
      </Button>
    </Box>
  );
};
