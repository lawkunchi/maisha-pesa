import {
  Typography,
  Container,
  Box,
  Alert,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../common/services/firebase";
import { useAuth } from "../../auth/context/ AuthContext";

interface UserRecord {
  id: string;
  email: string;
  role: string;
  approved: boolean;
}

export default function Users() {
  const { role } = useAuth();
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users"));
      console.log('snapshot', snapshot);
      const list: UserRecord[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<UserRecord, "id">),
      }));
      setUsers(list);
    } catch (err: any) {
      console.log('errssss', err);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const toggleApproval = async (user: UserRecord) => {
    await updateDoc(doc(db, "users", user.id), {
      approved: !user.approved,
    });
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, approved: !u.approved } : u))
    );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (role !== "Admin") {
    return (
      <Container maxWidth="sm">
        <Alert severity="error" sx={{ mt: 4 }}>
          Access denied. Only admins can view this page.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom mt={4}>
        Users Management
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Box mt={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {user.approved ? "Approved" : ""}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => toggleApproval(user)}
                    >
                      {user.approved ? "Disapprove" : "Approve"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </Container>
  );
}
