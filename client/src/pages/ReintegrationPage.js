import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReintegrationForm from '../components/ReintegrationForm';
import '../styles/pages.css';

const ReintegrationPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [entries, setEntries] = useState([]);

    const handleSubmit = async (formData) => {
        try {
            const response = await fetch('/api/reintegration', {
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
            const response = await fetch('/api/reintegration', {
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
                    <h1>Reintegration Cases</h1>
                    <Link to="/dashboard" className="back-link">Back to Dashboard</Link>
                </div>
                <button 
                    className="add-button"
                    onClick={() => setShowForm(true)}
                >
                    Add New Case
                </button>
            </header>

            {showForm ? (
                <div className="form-section">
                    <ReintegrationForm 
                        onSubmit={handleSubmit}
                        onCancel={() => setShowForm(false)}
                    />
                </div>
            ) : (
                <div className="entries-section">
                    <h2>Recent Cases</h2>
                    <div className="entries-grid">
                        {entries.map((entry, index) => (
                            <div key={index} className="entry-card">
                                <h3>{entry.name}</h3>
                                <p>File Number: {entry.fileNumber}</p>
                                <p>Status: {entry.status}</p>
                                <p>Date: {entry.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReintegrationPage; 