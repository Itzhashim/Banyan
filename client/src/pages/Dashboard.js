import React from 'react';
import { useAuth } from '../context/AuthContext';
import { getFacilityDisplayName } from '../constants/facilities';
import '../styles/dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();

    const forms = [
        { name: 'Outreach Form', path: '/outreach' },
        { name: 'Reintegration Form', path: '/reintegration' },
        { name: 'Transactions Form', path: '/transactions' },
        { name: 'Awareness Meeting Form', path: '/awareness' },
        { name: 'Hospital Visits Form', path: '/hospital-visits' },
        { name: 'Mastersheet Form', path: '/mastersheet' }
    ];

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Welcome, {user?.name}!</h1>
                <h2>{getFacilityDisplayName(user?.facility)} Facility Dashboard</h2>
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