import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FACILITIES, getFacilityDisplayName } from '../constants/facilities';
import '../styles/admin-dashboard.css';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [selectedFacility, setSelectedFacility] = useState(null);

    const handleLogout = () => {
        logout();
    };

    const handleFacilitySelect = (facility) => {
        setSelectedFacility(facility);
    };

    const forms = [
        { name: 'Outreach Form', path: '/outreach' },
        { name: 'Reintegration Form', path: '/reintegration' },
        { name: 'Transactions Form', path: '/transactions' },
        { name: 'Awareness Meeting Form', path: '/awareness' },
        { name: 'Hospital Visits Form', path: '/hospital-visits' },
        { name: 'Mastersheet Form', path: '/mastersheet' }
    ];

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <div className="header-content">
                    <div>
                        <h1>Admin Dashboard</h1>
                        <p>Welcome, {user?.name}</p>
                    </div>
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                </div>
            </div>

            <div className="facilities-grid">
                {FACILITIES.map((facility) => (
                    <button
                        key={facility}
                        className={`facility-button ${selectedFacility === facility ? 'selected' : ''}`}
                        onClick={() => handleFacilitySelect(facility)}
                    >
                        {getFacilityDisplayName(facility)}
                    </button>
                ))}
            </div>

            {selectedFacility && (
                <div className="facility-dashboard">
                    <h2>{getFacilityDisplayName(selectedFacility)} Facility Forms</h2>
                    <div className="forms-grid">
                        {forms.map((form, index) => (
                            <a 
                                key={index} 
                                href={`${form.path}?facility=${selectedFacility}`}
                                className="form-card"
                            >
                                <h3>{form.name}</h3>
                                <p>View {form.name} for {getFacilityDisplayName(selectedFacility)}</p>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard; 