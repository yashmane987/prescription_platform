import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/doctors').then(res => setDoctors(res.data));
  }, []);

  return (
    <Grid container spacing={4}>
      {doctors.map(doctor => (
        <Grid item xs={12} sm={6} md={4} key={doctor._id}>
          <Card>
            {doctor.profilePic && (
              <CardMedia
                component="img"
                height="200"
                image={`http://localhost:5000/${doctor.profilePic}`}
                alt={doctor.name}
              />
            )}
            <CardContent>
              <Typography variant="h5">{doctor.name}</Typography>
              <Typography color="textSecondary">{doctor.specialty}</Typography>
              <Typography>{doctor.experience} years experience</Typography>
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}
                onClick={() => navigate(`/consult/${doctor._id}`)}>
                Consult
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DoctorsList;