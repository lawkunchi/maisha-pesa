import { Chip } from "@mui/material";
import {
  CheckCircleOutline,
  HourglassBottom,
  CancelOutlined,
  PaidOutlined,
  AssignmentTurnedInOutlined,
  LocalShippingOutlined,
  DoneAllOutlined,
} from "@mui/icons-material";
import { FC } from "react";

interface OrderStatusChipProps {
  status: string;
}

const OrderStatusChip: FC<OrderStatusChipProps> = ({ status }) => {
  const getChipProps = () => {
    switch (status) {
      case "pending_approval":
        return { color: "warning" as const, icon: <HourglassBottom fontSize="small" />, label: "Pending Approval" };
      case "approved":
        return { color: "success" as const, icon: <CheckCircleOutline fontSize="small" />, label: "Approved" };
      case "rejected":
        return { color: "error" as const, icon: <CancelOutlined fontSize="small" />, label: "Rejected" };
      case "investor_selected":
        return { color: "info" as const, icon: <AssignmentTurnedInOutlined fontSize="small" />, label: "Investor Selected" };
      case "funded":
        return { color: "primary" as const, icon: <PaidOutlined fontSize="small" />, label: "Funded" };
      case "allocated":
        return { color: "secondary" as const, icon: <LocalShippingOutlined fontSize="small" />, label: "Allocated" };
      case "fulfilled":
        return { color: "success" as const, icon: <DoneAllOutlined fontSize="small" />, label: "Fulfilled" };
      default:
        return { color: "default" as const, label: status };
    }
  };

  const chipProps = getChipProps();

  return (
    <Chip
      variant="outlined"
      sx={{ mt: 2 }}
      {...chipProps}
    />
  );
};

export default OrderStatusChip;
