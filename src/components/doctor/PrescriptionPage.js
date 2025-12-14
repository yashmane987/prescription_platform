import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import API from "../../services/api";
import { useParams } from "react-router-dom";

const PrescriptionPage = () => {
  const { doctorId } = useParams();
  const [consultations, setConsultations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [care, setCare] = useState("");
  const [medicines, setMedicines] = useState("");

  useEffect(() => {
    API.get(`/prescriptions/consultations/${doctorId}`)
      .then((res) => setConsultations(res.data))
      .catch((err) => console.error(err));
  }, [doctorId]);

  const handleSelect = async (consult) => {
    setSelected(consult);

    try {
      const res = await API.get(`/prescriptions/${consult._id}`);

      if (res.data) {
        setCare(res.data.care);
        setMedicines(res.data.medicines);
      } else {
        setCare("");
        setMedicines("");
      }
    } catch {
      setCare("");
      setMedicines("");
    }
  };

  const handleSubmit = async () => {
    if (!selected) return;

    try {
      const res = await API.post("/prescriptions", {
        consultationId: selected._id,
        care,
        medicines,
      });

      alert("Prescription saved and sent to patient");

      // Doctor can view latest PDF
      window.open(`http://localhost:5000${res.data.pdfUrl}`);
    } catch (err) {
      alert("Failed to save prescription");
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 4, mt: 4 }}>
      {/* LEFT SIDE - PATIENT LIST */}
      <Paper sx={{ width: "40%", p: 2 }}>
        <Typography variant="h6">Patient Consultations</Typography>
        <List>
          {consultations.map((consult) => (
            <ListItem
              key={consult._id}
              button
              onClick={() => handleSelect(consult)}
            >
              <ListItemText
                primary={consult.patientId?.name || "Unknown Patient"}
                secondary={new Date(consult.submittedAt).toLocaleDateString()}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {selected && (
        <Paper sx={{ width: "60%", p: 3 }}>
          <Typography variant="h6">
            Prescription for {selected.patientId?.name}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography>
            <b>Current Illness:</b> {selected.currentIllness}
          </Typography>
          <Typography>
            <b>Recent Surgery:</b> {selected.recentSurgery || "None"}
          </Typography>
          <Typography>
            <b>Family Diabetes:</b> {selected.familyDiabetes}
          </Typography>
          <Typography>
            <b>Allergies:</b> {selected.allergies || "None"}
          </Typography>
          <Typography>
            <b>Other Notes:</b> {selected.others}
          </Typography>
          <Typography><b>Transaction ID:</b> {selected.transactionId}</Typography>

          <Divider sx={{ my: 2 }} />

          <TextField
            fullWidth
            label="Care to be taken"
            multiline
            rows={4}
            value={care}
            onChange={(e) => setCare(e.target.value)}
            required
            sx={{ mt: 2 }}
          />

          <TextField
            fullWidth
            label="Medicines"
            multiline
            rows={6}
            value={medicines}
            onChange={(e) => setMedicines(e.target.value)}
            sx={{ mt: 2 }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 2 }}
          >
            Save & Resend Prescription
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default PrescriptionPage;
