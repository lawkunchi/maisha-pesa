import { Container, Typography, Alert, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { db } from "../../common/services/firebase";
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/context/ AuthContext";
import OrderStatusChip from "../components/OrderStatusChip";
import { ContractorApproval } from "../components/ContractorApproval";
import { InvestorBid } from "../components/InvestorBid";
import { BrokerSelectInvestor } from "../components/BrokerSelectInvestor";
import { InvestorFunding } from "../components/InvestorFunding";
import { SourcingAgentAllocate } from "../components/SourcingAgentAllocate";
import { ContractorFulfillment } from "../components/ContractorFulfillment";
import OrderTimeline from "../components/OrderTimeline";

const Order = () => {
  const { orderId } = useParams();
  const { user, role } = useAuth();
  const [order, setOrder] = useState<any>(null);
  const [bidAmount, setBidAmount] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [bids, setBids] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrder = async () => {
      const ref = doc(db, "orders", orderId!);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setOrder({ id: snap.id, ...snap.data() });
      }
    };

    fetchOrder();
  }, [orderId]);

  useEffect(() => {
    const fetchBids = async () => {
      if (!role) return;
      if (!order?.id || !["Admin", "Broker", "Investor"].includes(role)) return;

      const q = query(collection(db, "bids"), where("orderId", "==", order.id));
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBids(list);
    };

    fetchBids();
  }, [order?.id, role]);

  if (!order) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {order.title}
      </Typography>
      <Typography>{order.description}</Typography>
      <Typography mt={1}>Amount: ${order.amount}</Typography>
      <OrderStatusChip status={order.status} />

      {successMessage && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {successMessage}
        </Alert>
      )}

      {/* Contractor actions */}
      {role === "Contractor" &&
        order.contractorId === user.uid &&
        order.status === "pending_approval" && (
          <ContractorApproval
            order={order}
            setOrder={setOrder}
            setSuccessMessage={setSuccessMessage}
          />
        )}

      {/* Investor bid action */}
      {role === "Investor" && order.status === "approved" && (
        <InvestorBid
          order={order}
          user={user}
          bidAmount={bidAmount}
          setBidAmount={setBidAmount}
          setSuccessMessage={setSuccessMessage}
        />
      )}

      {/* Broker selects winning investor */}
      {role && ["Admin", "Broker"].includes(role) && (
        <BrokerSelectInvestor
          order={order}
          bids={bids}
          userId={user.uid}
          setOrder={setOrder}
          setSuccessMessage={setSuccessMessage}
        />
      )}

      {/* Investor funds */}
      {role === "Investor" && (
        <InvestorFunding
          order={order}
          user={user}
          bids={bids}
          setOrder={setOrder}
          setSuccessMessage={setSuccessMessage}
        />
      )}

      {/* Sourcing agent allocates */}
      {role === "Sourcing Agent" && order.status === "funded" && (
        <SourcingAgentAllocate
        order={order}
        userId={user.uid}
        setOrder={setOrder}
        setSuccessMessage={setSuccessMessage}
      />
      
      )}

      {/* Contractor confirms fulfillment */}
      {role === "Contractor" && order.status === "allocated" && (
        <ContractorFulfillment
          order={order}
          setOrder={setOrder}
          setSuccessMessage={setSuccessMessage}
        />
      )}

      {order.status === "fulfilled" && order.revenue && (
        <Box mt={4}>
          <Typography variant="h6">Revenue Allocation</Typography>
          <Typography>
            Contractor: ${order.revenue.contractor.toFixed(2)}
          </Typography>
          <Typography>Broker: ${order.revenue.broker.toFixed(2)}</Typography>
          <Typography>
            Investor: ${order.revenue.investor.toFixed(2)}
          </Typography>
          <Typography>Admin: ${order.revenue.admin.toFixed(2)}</Typography>
        </Box>
      )}

      {order.tracking && (
        <Box mt={4}>
          <Typography variant="h6">Order Timeline</Typography>
          <OrderTimeline tracking={order.tracking} />
        </Box>
      )}
    </Container>
  );
};

export default Order;
