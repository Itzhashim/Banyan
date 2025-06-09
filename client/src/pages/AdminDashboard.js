import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/forms.css';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState({
        outreach: 0,
        reintegration: 0,
        transactions: 0,
        awareness: 0,
        hospital: 0
    });
    const [formData, setFormData] = useState([]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Redirect if not admin
    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    // Load statistics
    useEffect(() => {
        const loadStats = () => {
            const outreachForms = JSON.parse(localStorage.getItem('outreachForms') || '[]');
            const reintegrationForms = JSON.parse(localStorage.getItem('reintegrationForms') || '[]');
            const transactionForms = JSON.parse(localStorage.getItem('transactionForms') || '[]');
            const awarenessForms = JSON.parse(localStorage.getItem('awarenessMeetingForms') || '[]');
            const hospitalForms = JSON.parse(localStorage.getItem('hospitalVisitForms') || '[]');

            setStats({
                outreach: outreachForms.length,
                reintegration: reintegrationForms.length,
                transactions: transactionForms.length,
                awareness: awarenessForms.length,
                hospital: hospitalForms.length
            });
        };

        loadStats();
    }, []);

    // Load form data based on active tab
    useEffect(() => {
        if (activeTab === 'overview') return;

        const loadData = () => {
            try {
                let data = [];
                switch (activeTab) {
                    case 'outreach':
                        data = JSON.parse(localStorage.getItem('outreachForms') || '[]');
                        break;
                    case 'reintegration':
                        data = JSON.parse(localStorage.getItem('reintegrationForms') || '[]');
                        break;
                    case 'transactions':
                        data = JSON.parse(localStorage.getItem('transactionForms') || '[]');
                        break;
                    case 'awareness':
                        data = JSON.parse(localStorage.getItem('awarenessMeetingForms') || '[]');
                        break;
                    case 'hospital':
                        data = JSON.parse(localStorage.getItem('hospitalVisitForms') || '[]');
                        break;
                    default:
                        data = [];
                }
                setFormData(data);
            } catch (error) {
                console.error('Error loading data:', error);
                setFormData([]);
            }
        };

        loadData();
    }, [activeTab]);

    const renderOverview = () => (
        <div className="stats-grid">
            <div className="stat-card" onClick={() => setActiveTab('outreach')}>
                <h3>Outreach Forms</h3>
                <div className="stat-number">{stats.outreach}</div>
                <p>Total submissions</p>
            </div>
            <div className="stat-card" onClick={() => setActiveTab('reintegration')}>
                <h3>Reintegration Forms</h3>
                <div className="stat-number">{stats.reintegration}</div>
                <p>Total submissions</p>
            </div>
            <div className="stat-card" onClick={() => setActiveTab('transactions')}>
                <h3>Transaction Forms</h3>
                <div className="stat-number">{stats.transactions}</div>
                <p>Total submissions</p>
            </div>
            <div className="stat-card" onClick={() => setActiveTab('awareness')}>
                <h3>Awareness Forms</h3>
                <div className="stat-number">{stats.awareness}</div>
                <p>Total submissions</p>
            </div>
            <div className="stat-card" onClick={() => setActiveTab('hospital')}>
                <h3>Hospital Visit Forms</h3>
                <div className="stat-number">{stats.hospital}</div>
                <p>Total submissions</p>
            </div>
        </div>
    );

    const renderTable = () => {
        if (formData.length === 0) {
            return <p className="no-data">No data available</p>;
        }

        const headers = Object.keys(formData[0]).filter(key => key !== 'id');

        return (
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            {headers.map(header => (
                                <th key={header}>
                                    {header.charAt(0).toUpperCase() + header.slice(1).replace(/([A-Z])/g, ' $1')}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {formData.map((item, index) => (
                            <tr key={item.id || index}>
                                {headers.map(header => (
                                    <td key={header}>{item[header]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

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

            <div className="tab-container">
                <div className="tabs">
                    <button
                        className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'outreach' ? 'active' : ''}`}
                        onClick={() => setActiveTab('outreach')}
                    >
                        Outreach Forms
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'reintegration' ? 'active' : ''}`}
                        onClick={() => setActiveTab('reintegration')}
                    >
                        Reintegration Forms
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'transactions' ? 'active' : ''}`}
                        onClick={() => setActiveTab('transactions')}
                    >
                        Transaction Forms
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'awareness' ? 'active' : ''}`}
                        onClick={() => setActiveTab('awareness')}
                    >
                        Awareness Forms
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'hospital' ? 'active' : ''}`}
                        onClick={() => setActiveTab('hospital')}
                    >
                        Hospital Visit Forms
                    </button>
                </div>

                <div className="tab-content">
                    {activeTab === 'overview' ? renderOverview() : renderTable()}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard; 