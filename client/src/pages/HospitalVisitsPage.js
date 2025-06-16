import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HospitalVisitsForm from '../components/HospitalVisitsForm';
import TableFilters from '../components/TableFilters';
import { useFormValidation, validationRules } from '../hooks/useFormValidation';
import '../styles/pages.css';

const HospitalVisitsPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [entries, setEntries] = useState([]);
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [filters, setFilters] = useState({
        searchTerm: '',
        type: '',
        dateRange: {
            startDate: '',
            endDate: ''
        },
        sort: ''
    });

    // Custom validation rules for hospital visits
    const hospitalVisitRules = {
        fileNumber: validationRules.fileNumber,
        name: validationRules.name,
        hospitalName: {
            required: 'Hospital name is required',
            minLength: {
                value: 2,
                message: 'Hospital name must be at least 2 characters'
            }
        },
        dateOfVisit: validationRules.date,
        dateOfDischarge: validationRules.date,
        reason: {
            required: 'Reason is required',
            minLength: {
                value: 5,
                message: 'Please provide a more detailed reason'
            }
        },
        costToOrganization: {
            min: {
                value: 0,
                message: 'Cost cannot be negative'
            }
        }
    };

    const {
        values,
        errors,
        handleChange,
        resetForm,
        validate,
        isValid
    } = useFormValidation({
        fileNumber: '',
        name: '',
        typeOfVisit: 'IP',
        hospitalName: '',
        dateOfVisit: '',
        dateOfDischarge: '',
        reason: '',
        costToOrganization: '',
        location: '',
        residingPlace: ''
    }, hospitalVisitRules);

    useEffect(() => {
        fetchEntries();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [entries, filters]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await fetch('/api/hospital-visits', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(values)
                });

                if (response.ok) {
                    setShowForm(false);
                    resetForm();
                    fetchEntries();
                }
            } catch (error) {
                console.error('Failed to submit form:', error);
            }
        }
    };

    const fetchEntries = async () => {
        try {
            const response = await fetch('/api/hospital-visits', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setEntries(data);
                setFilteredEntries(data);
            }
        } catch (error) {
            console.error('Failed to fetch entries:', error);
        }
    };

    const applyFilters = () => {
        let filtered = [...entries];

        // Search filter
        if (filters.searchTerm) {
            const searchLower = filters.searchTerm.toLowerCase();
            filtered = filtered.filter(entry =>
                entry.name.toLowerCase().includes(searchLower) ||
                entry.fileNumber.toLowerCase().includes(searchLower) ||
                entry.hospitalName.toLowerCase().includes(searchLower)
            );
        }

        // Type filter
        if (filters.type) {
            filtered = filtered.filter(entry => entry.typeOfVisit === filters.type);
        }

        // Date range filter
        if (filters.dateRange.startDate && filters.dateRange.endDate) {
            const start = new Date(filters.dateRange.startDate);
            const end = new Date(filters.dateRange.endDate);
            filtered = filtered.filter(entry => {
                const visitDate = new Date(entry.dateOfVisit);
                return visitDate >= start && visitDate <= end;
            });
        }

        // Apply sorting
        if (filters.sort) {
            filtered.sort((a, b) => {
                switch (filters.sort) {
                    case 'date':
                        return new Date(b.dateOfVisit) - new Date(a.dateOfVisit);
                    case 'name':
                        return a.name.localeCompare(b.name);
                    case 'cost':
                        return b.costToOrganization - a.costToOrganization;
                    default:
                        return 0;
                }
            });
        }

        setFilteredEntries(filtered);
    };

    const sortOptions = [
        { value: 'date', label: 'Date (Latest First)' },
        { value: 'name', label: 'Name (A-Z)' },
        { value: 'cost', label: 'Cost (Highest First)' }
    ];

    return (
        <div className="page-container">
            <header className="page-header">
                <div className="header-content">
                    <h1>Hospital Visits</h1>
                    <Link to="/dashboard" className="back-link">Back to Dashboard</Link>
                </div>
                <button 
                    className="add-button"
                    onClick={() => setShowForm(true)}
                >
                    Add New Visit
                </button>
            </header>

            {!showForm && (
                <TableFilters
                    filters={filters}
                    setFilters={setFilters}
                    sortOptions={sortOptions}
                    onSort={(value) => setFilters(prev => ({ ...prev, sort: value }))}
                    searchFields={['name', 'fileNumber', 'hospital']}
                />
            )}

            {showForm ? (
                <div className="form-section">
                    <HospitalVisitsForm />
                </div>
            ) : (
                <div className="entries-section">
                    <h2>Recent Visits ({filteredEntries.length})</h2>
                    <div className="entries-grid">
                        {filteredEntries.map((entry, index) => (
                            <div key={index} className="entry-card">
                                <h3>{entry.name}</h3>
                                <p>File Number: {entry.fileNumber}</p>
                                <p>Hospital: {entry.hospitalName}</p>
                                <p>Visit Type: {entry.typeOfVisit}</p>
                                <p>Date: {new Date(entry.dateOfVisit).toLocaleDateString()}</p>
                                <p>Reason: {entry.reason}</p>
                                {entry.dateOfDischarge && (
                                    <p>Discharge Date: {new Date(entry.dateOfDischarge).toLocaleDateString()}</p>
                                )}
                                {entry.costToOrganization && (
                                    <p>Cost: ₹{entry.costToOrganization.toLocaleString()}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HospitalVisitsPage; 