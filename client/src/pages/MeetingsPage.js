import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AwarenessMeetingForm from '../components/AwarenessMeetingForm';
import '../styles/pages.css';

const MeetingsPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [entries, setEntries] = useState([]);

    const handleSubmit = async (formData) => {
        try {
            const response = await fetch('/api/meetings', {
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
            const response = await fetch('/api/meetings', {
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
                    <h1>Awareness & Grievance Meetings</h1>
                    <Link to="/dashboard" className="back-link">Back to Dashboard</Link>
                </div>
                <button 
                    className="add-button"
                    onClick={() => setShowForm(true)}
                >
                    Add New Meeting
                </button>
            </header>

            {showForm ? (
                <div className="form-section">
                    <AwarenessMeetingForm 
                        onSubmit={handleSubmit}
                        onCancel={() => setShowForm(false)}
                    />
                </div>
            ) : (
                <div className="entries-section">
                    <h2>Recent Meetings</h2>
                    <div className="entries-grid">
                        {entries.map((entry, index) => (
                            <div key={index} className="entry-card">
                                <h3>{entry.topic}</h3>
                                <p>Type: {entry.typeOfProgram}</p>
                                <p>Date: {entry.dateOfProgram}</p>
                                <p>Resource Person: {entry.resourcePerson}</p>
                                <p>Participants: {entry.numberOfParticipants}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MeetingsPage; 