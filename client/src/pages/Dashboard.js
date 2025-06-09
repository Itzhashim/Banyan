import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/forms.css';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const formLinks = [
        {
            title: 'Outreach Form',
            description: 'Record outreach activities and interactions',
            path: '/outreach',
            icon: '🤝'
        },
        {
            title: 'Reintegration Form',
            description: 'Document reintegration processes and outcomes',
            path: '/reintegration',
            icon: '🏠'
        },
        {
            title: 'Transactions Form',
            description: 'Record financial transactions and expenses',
            path: '/transactions',
            icon: '💰'
        },
        {
            title: 'Awareness Meeting Form',
            description: 'Log awareness meetings and participants',
            path: '/awareness',
            icon: '📢'
        },
        {
            title: 'Hospital Visits Form',
            description: 'Track hospital visits and medical care',
            path: '/hospital-visits',
            icon: '🏥'
        }
    ];

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <div className="header-content">
                    <div>
                        <h1>Welcome to Banyan Portal</h1>
                        <p>Hello, {user?.name}</p>
                    </div>
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                </div>
            </div>

            <div className="dashboard-grid">
                {formLinks.map((link, index) => (
                    <Link to={link.path} key={index} className="dashboard-card">
                        <span className="card-icon">{link.icon}</span>
                        <h3>{link.title}</h3>
                        <p>{link.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Dashboard; 