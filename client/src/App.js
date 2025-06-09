import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import OutreachForm from './components/OutreachForm';
import ReintegrationForm from './components/ReintegrationForm';
import TransactionsForm from './components/TransactionsForm';
import AwarenessMeetingForm from './components/AwarenessMeetingForm';
import HospitalVisitsFormContainer from './components/HospitalVisitsFormContainer';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (adminOnly && user?.role !== 'admin') {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />

                    <Route path="/admin" element={
                        <ProtectedRoute adminOnly={true}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } />

                    <Route path="/outreach" element={
                        <ProtectedRoute>
                            <OutreachForm />
                        </ProtectedRoute>
                    } />

                    <Route path="/reintegration" element={
                        <ProtectedRoute>
                            <ReintegrationForm />
                        </ProtectedRoute>
                    } />

                    <Route path="/transactions" element={
                        <ProtectedRoute>
                            <TransactionsForm />
                        </ProtectedRoute>
                    } />

                    <Route path="/awareness" element={
                        <ProtectedRoute>
                            <AwarenessMeetingForm />
                        </ProtectedRoute>
                    } />

                    <Route path="/hospital-visits" element={
                        <ProtectedRoute>
                            <HospitalVisitsFormContainer />
                        </ProtectedRoute>
                    } />

                    <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
