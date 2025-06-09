import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/dashboard.css';

const FacilityDashboard = () => {
    const { user, logout } = useAuth();

    const menuItems = [
        { title: 'Outreach Activities', path: '/outreach', icon: '📋' },
        { title: 'Reintegration Cases', path: '/reintegration', icon: '🤝' },
        { title: 'Transactions', path: '/transactions', icon: '📊' },
        { title: 'Meetings & Programs', path: '/meetings', icon: '👥' },
        { title: 'Hospital Visits', path: '/hospital-visits', icon: '🏥' },
    ];

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome, {user?.name}</h1>
                <div className="user-info">
                    <span>{user?.facility}</span>
                    <button onClick={logout} className="logout-button">Logout</button>
                </div>
            </header>

            <div className="dashboard-content">
                <div className="menu-grid">
                    {menuItems.map((item, index) => (
                        <Link to={item.path} key={index} className="menu-item">
                            <span className="menu-icon">{item.icon}</span>
                            <h3>{item.title}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FacilityDashboard; 