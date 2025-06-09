import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OutreachForm from '../components/OutreachForm';
import '../styles/pages.css';

const OutreachPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [entries, setEntries] = useState([]);

    const handleSubmit = async (formData) => {
        try {
            const response = await fetch('/api/outreach', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setShowForm(false);
                // Refresh the list
                fetchEntries();
            }
        } catch (error) {
            console.error('Failed to submit form:', error);
        }
    };

    const fetchEntries = async () => {
        try {
            const response = await fetch('/api/outreach', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setEntries(data);
            }
        } catch (error) {
            console.error('Failed to fetch entries:', error);
        }
    };

    return (
        <div className="page-container">
            <header className="page-header">
                <div className="header-content">
                    <h1>Outreach Activities</h1>
                    <Link to="/dashboard" className="back-link">Back to Dashboard</Link>
                </div>
                <button 
                    className="add-button"
                    onClick={() => setShowForm(true)}
                >
                    Add New Entry
                </button>
            </header>

            {showForm ? (
                <div className="form-section">
                    <OutreachForm 
                        onSubmit={handleSubmit}
                        onCancel={() => setShowForm(false)}
                    />
                </div>
            ) : (
                <div className="entries-section">
                    <h2>Recent Entries</h2>
                    <div className="entries-grid">
                        {entries.map((entry, index) => (
                            <div key={index} className="entry-card">
                                <h3>{entry.name}</h3>
                                <p>District: {entry.district}</p>
                                <p>Date: {entry.date}</p>
                                {/* Add more fields as needed */}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OutreachPage; 