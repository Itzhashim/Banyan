import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FACILITIES, getFacilityDisplayName } from '../constants/facilities';
import '../styles/admin-dashboard.css';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [selectedFacility, setSelectedFacility] = useState(null);

    const handleLogout = () => {
        logout();
    };

    const handleFacilitySelect = (facility) => {
        setSelectedFacility(facility);
    };

    const handleFormClick = (formType) => {
        navigate(`/admin/forms/${formType}?facility=${selectedFacility}`);
    };

    const forms = [
        { name: 'Outreach Form', type: 'outreach' },
        { name: 'Reintegration Form', type: 'reintegration' },
        { name: 'Transactions Form', type: 'transactions' },
        { name: 'Awareness Meeting Form', type: 'awareness' },
        { name: 'Hospital Visits Form', type: 'hospital-visits' },
        { name: 'Mastersheet Form', type: 'mastersheet' }
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
                            <button 
                                key={index} 
                                onClick={() => handleFormClick(form.type)}
                                className="form-card"
                            >
                                <h3>{form.name}</h3>
                                <p>View {form.name} for {getFacilityDisplayName(selectedFacility)}</p>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard; 