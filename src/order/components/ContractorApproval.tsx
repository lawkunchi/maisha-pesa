import {  Button, Stack } from "@mui/material";
import { updateOrderStatus } from "../services/OrderService";

export const ContractorApproval = ({ order, setOrder, setSuccessMessage }: any) => {
  const handleApproval = async (status: "approved" | "rejected") => {
    await updateOrderStatus({
      orderId: order.id,
      newStatus: status,
      actorId: order.contractorId,
      roleId: "Contractor",
      actionTaken: `Contractor ${status} the order`,
    });
    setOrder({ ...order, status });
    setSuccessMessage(`Order ${status}`);
  };

  return (
    <Stack direction="row" spacing={2} py={4}>
      <Button variant="contained" color="success" onClick={() => handleApproval("approved")}>
        Approve
      </Button>
      <Button variant="contained" color="error" onClick={() => handleApproval("rejected")}>
        Reject
      </Button>
    </Stack>
  );
};


