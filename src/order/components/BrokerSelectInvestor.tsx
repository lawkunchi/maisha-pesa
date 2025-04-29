import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../common/services/firebase";
import { Box, Button, Typography } from "@mui/material";
import { updateOrderStatus } from "../services/OrderService";

export const BrokerSelectInvestor = ({ order, bids, setOrder, setSuccessMessage, userId }: any) => {
    const selectInvestor = async (bid: any) => {
     
      await updateDoc(doc(db, "bids", bid.id), { status: "accepted" });
  
      const otherBids = bids.filter((b: any) => b.id !== bid.id);
      for (const other of otherBids) {
        await updateDoc(doc(db, "bids", other.id), { status: "declined" });
      }
  
      await updateOrderStatus({
        orderId: order.id,
        newStatus: "investor_selected",
        actorId: userId,
        roleId: "Broker",
        actionTaken: `Broker selected investor ${bid.investorId}`,
        extraFields: {
          acceptedBidId: bid.id,
          investorId: bid.investorId,
        },
      });

      setOrder({ ...order, status: "investor_selected", investorId: bid.investorId });
      setSuccessMessage("Investor selected. Awaiting funding.");
    };
  
    return (
      <>
        {bids.map((bid: any) => (
          <Box key={bid.id} mt={1} p={2} border="1px solid #ccc" borderRadius={1}>
            <Typography>Investor ID: {bid.investorId}</Typography>
            <Typography>Amount: ${bid.amount}</Typography>
            <Typography>Status: {bid.status}</Typography>
  
            {order.status === "approved" && bid.status === "pending" && (
              <Button
                size="small"
                variant="outlined"
                onClick={() => selectInvestor(bid)}
                sx={{ mt: 1 }}
              >
                Select as Winning Investor
              </Button>
            )}
          </Box>
        ))}
      </>
    );
  };