import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DoctorSignup from './components/auth/DoctorSignup';
import DoctorSignin from './components/auth/DoctorSignin';
import PatientSignup from './components/auth/PatientSignup';
import PatientSignin from './components/auth/PatientSignin';
import DoctorsList from './components/patient/DoctorsList';
import ConsultationForm from './components/patient/ConsultationForm';
import DoctorProfile from './components/doctor/DoctorProfile';
import { AuthProvider } from './context/AuthContext';
import PrescriptionPage from './components/doctor/PrescriptionPage';
import Navbar from './components/common/Navbar';

function App() {
  return (
     <AuthProvider>
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/doctor/signup" element={<DoctorSignup />} />
          <Route path="/doctor/signin" element={<DoctorSignin />} />
          <Route path="/patient/signup" element={<PatientSignup />} />
          <Route path="/patient/signin" element={<PatientSignin />} />
          <Route path="/doctors" element={<DoctorsList />} />
          <Route path="/consult/:doctorId" element={<ConsultationForm />} />
          <Route path="/doctor/profile/:id" element={<DoctorProfile />} />
          <Route path="/doctor/prescriptions/:doctorId" element={<PrescriptionPage />} />
          <Route path="/" element={<Navigate to="/patient/signin" />} />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;