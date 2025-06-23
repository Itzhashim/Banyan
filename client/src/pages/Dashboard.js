import React from 'react';
import { useAuth } from '../context/AuthContext';
import { getFacilityDisplayName } from '../constants/facilities';
import '../styles/dashboard.css';
import { exportUserFormsData } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const forms = [
        { name: 'Outreach Form', path: '/outreach' },
        { name: 'Reintegration Form', path: '/reintegration' },
        { name: 'Transactions Form', path: '/transactions' },
        { name: 'Awareness Meeting Form', path: '/awareness' },
        { name: 'Hospital Visits Form', path: '/hospital-visits' },
        { name: 'Mastersheet Form', path: '/mastersheet' }
    ];

    const handleDownloadUserExcel = async () => {
        try {
            const response = await exportUserFormsData();
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `my_forms_data.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            alert('Failed to download Excel file.');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Welcome, {user?.name}!</h1>
                <h2>{getFacilityDisplayName(user?.facility)} Facility Dashboard</h2>
                <button onClick={handleDownloadUserExcel} className="download-excel-button">
                    Download My Forms as Excel
                </button>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>

            <div className="forms-grid">
                {forms.map((form, index) => (
                    <a 
                        key={index} 
                        href={form.path} 
                        className="form-card"
                    >
                        <h3>{form.name}</h3>
                        <p>Click to access the form</p>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Dashboard; 