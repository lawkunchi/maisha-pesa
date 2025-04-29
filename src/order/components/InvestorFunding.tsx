import { Box, Button, Typography } from "@mui/material";
import { updateOrderStatus } from "../services/OrderService";

export const InvestorFunding = ({
  order,
  user,
  bids,
  setOrder,
  setSuccessMessage,
}: any) => {
  const fundOrder = async () => {
    await updateOrderStatus({
      orderId: order.id,
      newStatus: "funded",
      actorId: user.uid,
      roleId: "Investor",
      actionTaken: "Investor funded the order",
      extraFields: {
        fundedBy: user.uid,
        fundedAt: new Date(),
      },
    });

    setOrder({ ...order, status: "funded", fundedBy: user.uid });
    setSuccessMessage("You have successfully funded this order.");
  };

  console.log('all bids', bids);
  const myAcceptedBids = bids.filter(
    (bid: any) => bid.investorId === user.uid && bid.status === "accepted"
  );

  console.log(myAcceptedBids);
  if (myAcceptedBids.length === 0) return null;

  return myAcceptedBids.map((bid: any) => (
    <Box key={bid.id} mt={4}>
      <Typography variant="h6">Your Bid Was Accepted</Typography>
      <Typography>Bid Amount: ${bid.amount}</Typography>
      {order.status === "investor_selected" && (
        <Button
          variant="contained"
          color="success"
          onClick={fundOrder}
          sx={{ mt: 2 }}
        >
          Fund Order
        </Button>
      )}
    </Box>
  ));
};
