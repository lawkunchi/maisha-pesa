import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../common/services/firebase";
import { useAuth } from "../../auth/context/ AuthContext";

export default function Revenue() {
  const { role } = useAuth();
  const [revenueData, setRevenueData] = useState({
    contractor: 0,
    broker: 0,
    investor: 0,
    admin: 0,
  });

  useEffect(() => {
    const fetchFulfilledOrders = async () => {
      const q = query(collection(db, "orders"), where("status", "==", "fulfilled"));
      const snapshot = await getDocs(q);
      const data = { contractor: 0, broker: 0, investor: 0, admin: 0 };

      snapshot.docs.forEach((doc) => {
        const rev = doc.data().revenue;
        if (rev) {
          data.contractor += rev.contractor || 0;
          data.broker += rev.broker || 0;
          data.investor += rev.investor || 0;
          data.admin += rev.admin || 0;
        }
      });

      setRevenueData(data);
    };

    if (role === "Admin") fetchFulfilledOrders();
  }, [role]);

  if (role !== "Admin") {
    return <Typography>You do not have access to this page.</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Revenue Summary
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role</TableCell>
              <TableCell>Total Revenue ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(revenueData).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell>{key.charAt(0).toUpperCase() + key.slice(1)}</TableCell>
                <TableCell>{value.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
