import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import API from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PatientSignin = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/patient/signin', formData);
      login(res.data.patient, res.data.token);
      navigate('/doctors');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" align="center">Patient Sign In</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
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

          <Typography align="center" sx={{ mt: 1 }}>
            If not signup then first{' '}
            <Link to="/patient/signup" style={{ fontWeight: 'bold' }}>
              Signup
            </Link>
          </Typography>

          <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default PatientSignin;
