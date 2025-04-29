import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../common/services/firebase";
import { Link as RouterLink } from "react-router-dom";
import OrderStatusChip from "../components/OrderStatusChip";
import { useAuth } from "../../auth/context/ AuthContext";

const OrderList = () => {
  const { user, role } = useAuth();
  const [orders, setOrders] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      let q;

      if (role === "Contractor") {
        q = query(
          collection(db, "orders"),
          where("contractorId", "==", user.uid)
        );
      } else if (role === "Investor") {
        q = query(collection(db, "orders"));

        const snapshot = await getDocs(q);
        const list = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter(
            (order) =>
              order.status === "approved" ||
              order.investorId === user.uid
          );
        setOrders(list);
        return;
      } else {
        q = query(collection(db, "orders"));
      }

      const snapshot = await getDocs(q);
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrders(list);
    };

    fetchOrders();
  }, [user.uid, role]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Order List</Typography>
        {role === "Broker" && (
          <Button
            variant="contained"
            component={RouterLink}
            to="/order/create"
          >
            + Create Order
          </Button>
        )}
      </Box>

      {orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          }}
          gap={3}
        >
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {order.title}
                </Typography>
                <Typography variant="body2">{order.description}</Typography>
                <Typography variant="body2" mt={1}>
                  Amount: ${order.amount}
                </Typography>
                <OrderStatusChip status={order.status} />

                <Button
                  component={RouterLink}
                  to={`/order/${order.id}`}
                  size="small"
                  sx={{ mt: 2 }}
                >
                  View
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default OrderList;
