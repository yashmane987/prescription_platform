import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, TextField, RadioGroup, FormControlLabel, Radio, Box, Typography } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import API from '../../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const steps = ['Current Illness', 'Family History', 'Payment'];

const ConsultationForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNext = () => setActiveStep(prev => prev + 1);
  const handleBack = () => setActiveStep(prev => prev - 1);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await API.post('/consultations', { ...formData, patientId: user.id, doctorId });
      alert('Consultation submitted!');
      navigate('/doctors');
    } catch (err) {
      alert('Error submitting');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Stepper activeStep={activeStep}>
        {steps.map(label => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
      </Stepper>

      {activeStep === 0 && (
        <Box mt={3}>
          <TextField fullWidth label="Current Illness History" name="currentIllness" multiline rows={4} onChange={handleChange} />
          <TextField fullWidth label="Recent Surgery (with time span)" name="recentSurgery" sx={{ mt: 2 }} onChange={handleChange} />
        </Box>
      )}

      {activeStep === 1 && (
        <Box mt={3}>
          <Typography>Family Medical History - Diabetes</Typography>
          <RadioGroup name="familyDiabetes" onChange={handleChange}>
            <FormControlLabel value="Diabetic" control={<Radio />} label="Diabetic" />
            <FormControlLabel value="Non-Diabetic" control={<Radio />} label="Non-Diabetic" />
          </RadioGroup>
          <TextField fullWidth label="Any Allergies" name="allergies" sx={{ mt: 2 }} onChange={handleChange} />
          <TextField fullWidth label="Others" name="others" sx={{ mt: 2 }} onChange={handleChange} />
        </Box>
      )}

      {activeStep === 2 && (
        <Box mt={3} textAlign="center">
          <Typography variant="h6">Scan to Pay (Demo QR)</Typography>
        <QRCodeSVG value="https://example.com/pay" size={200} />
          <TextField fullWidth label="Transaction ID" name="transactionId" sx={{ mt: 3 }} onChange={handleChange} required />
        </Box>
      )}

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
        {activeStep === steps.length - 1 ? (
          <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
        ) : (
          <Button variant="contained" onClick={handleNext}>Next</Button>
        )}
      </Box>
    </Box>
  );
};

export default ConsultationForm;