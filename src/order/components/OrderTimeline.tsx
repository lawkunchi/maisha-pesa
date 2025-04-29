import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import { Typography } from "@mui/material";
import { AccessTime } from "@mui/icons-material";

const statusColorMap: Record<
  string,
  "success" | "warning" | "error" | "info" | "primary" | "secondary"
> = {
  approved: "success",
  rejected: "error",
  funded: "primary",
  investor_selected: "info",
  allocated: "secondary",
  fulfilled: "success",
  pending_approval: "warning",
};

const OrderTimeline = ({ tracking = [] }: { tracking: any[] }) => {
  return (
    <Timeline position="alternate">
      {tracking.map((item, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent color="text.secondary">
            {new Date(item.timestamp.seconds * 1000).toLocaleString()}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color={statusColorMap[item.status] || "grey"}>
              <AccessTime />
            </TimelineDot>
            {index < tracking.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="body1">{item.status}</Typography>
            <Typography variant="caption">
              by {item.role} (User: {item.changedBy})
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default OrderTimeline;
