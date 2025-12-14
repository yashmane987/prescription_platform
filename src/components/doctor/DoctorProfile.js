import React, { useEffect, useState } from 'react';
import { Container, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import API from '../../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/doctors/${id}`).then(res => setDoctor(res.data));
  }, [id]);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card>
        {doctor.profilePic && (
          <CardMedia component="img" height="300" image={`http://localhost:5000/${doctor.profilePic}`} />
        )}
        <CardContent>
          <Typography variant="h4">{doctor.name}</Typography>
          <Typography color="textSecondary">{doctor.specialty}</Typography>
          <Typography>{doctor.experience} years of experience</Typography>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }}
            onClick={() => navigate(`/doctor/prescriptions/${id}`)}>
            View Prescriptions
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DoctorProfile;