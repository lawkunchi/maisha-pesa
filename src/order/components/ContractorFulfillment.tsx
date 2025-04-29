import { Box, Button, Typography } from "@mui/material";
import { updateOrderStatus } from "../services/OrderService";


export const ContractorFulfillment = ({ order, setOrder, setSuccessMessage }: any) => {
    const confirmFulfillment = async () => {
      await updateOrderStatus({
        orderId: order.id,
        newStatus: "fulfilled",
        actorId: order.contractorId,
        roleId: "Contractor",
        actionTaken: "Contractor fulfilled the order",
        extraFields: {
          fulfilledAt: new Date(),
          revenue: {
            contractor: order.amount * 0.2,
            broker: order.amount * 0.1,
            investor: order.amount * 0.4,
            admin: order.amount * 0.3,
          },
        },
      });
      setOrder({
        ...order,
        status: "fulfilled",
        fulfilledAt: new Date(),
        revenue: {
          contractor: order.amount * 0.2,
          broker: order.amount * 0.1,
          investor: order.amount * 0.4,
          admin: order.amount * 0.3,
        },
      });
      setSuccessMessage("Order marked as fulfilled. Well done!");
    };
  
    return (
      <Box mt={4}>
        <Typography variant="h6">Confirm Fulfillment</Typography>
        <Typography mb={2}>
          Items have been allocated by the Sourcing Agent. Please confirm if everything is received and correct.
        </Typography>
        <Button variant="contained" color="primary" onClick={confirmFulfillment}>
          Confirm Fulfillment
        </Button>
      </Box>
    );
  };
  