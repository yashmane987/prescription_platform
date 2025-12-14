import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const DoctorSignup = () => {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFile = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (file) data.append("profilePic", file);

    try {
      await API.post("/auth/doctor/signup", data);
      navigate("/doctor/signin");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" align="center">
          Doctor Signup
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Specialty"
            name="specialty"
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            name="phone"
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Experience (years)"
            name="experience"
            type="number"
            inputProps={{
              step: "0.1", 
              min: 0,
            }}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            onChange={handleChange}
            required
          />
          <Button fullWidth variant="contained" component="label">
            Upload Profile Picture
            <input type="file" hidden accept="image/*" onChange={handleFile} />
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Signup
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default DoctorSignup;
