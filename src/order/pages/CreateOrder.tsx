import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/context/ AuthContext";
import { db } from "../../common/services/firebase";

const CreateOrder = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | string>("");
  const [contractorId, setContractorId] = useState("");
  const [contractors, setContractors] = useState<any[]>([]);

  useEffect(() => {
    const fetchContractors = async () => {
      const q = query(
        collection(db, "users"),
        where("role", "==", "Contractor"),
        where("approved", "==", true)
      );
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContractors(list);
    };

    fetchContractors();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await addDoc(collection(db, "orders"), {
      title,
      description,
      amount: Number(amount),
      contractorId,
      brokerId: user.uid,
      status: "pending_approval",
      createdAt: new Date(),
      tracking: [
        {
          status: "pending_approval",
          actionTaken: "Broker created order",
          roleId: "Broker",
          userId: user.uid,
          timestamp: new Date(),
        },
      ],
    });
    

    navigate("/order");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" mt={4} mb={2}>
        Create Order
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          margin="normal"
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          margin="normal"
        />

        <TextField
          fullWidth
          label="Total Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          margin="normal"
        />

        <FormControl fullWidth required margin="normal">
          <InputLabel>Select Contractor</InputLabel>
          <Select
            value={contractorId}
            label="Select Contractor"
            onChange={(e) => setContractorId(e.target.value)}
          >
            {contractors.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.email}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Submit Order
        </Button>
      </Box>
    </Container>
  );
};

export default CreateOrder;
