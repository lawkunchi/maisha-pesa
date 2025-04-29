import { Box, Button, TextField, Typography } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../common/services/firebase";

export const InvestorBid = ({ order, user, bidAmount, setBidAmount, setSuccessMessage }: any) => {
    const handleBid = async () => {
      await addDoc(collection(db, "bids"), {
        orderId: order.id,
        investorId: user.uid,
        amount: Number(bidAmount),
        createdAt: new Date(),
        status: "pending",
      });
      setBidAmount("");
      setSuccessMessage("Bid submitted successfully");
    };
  
    return (
      <Box mt={4}>
        <Typography variant="h6">Place Your Bid</Typography>
        <TextField
          fullWidth
          type="number"
          label="Bid Amount"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" onClick={handleBid}>
          Submit Bid
        </Button>
      </Box>
    );
  };
  