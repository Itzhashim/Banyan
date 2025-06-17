import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getFacilityDisplayName } from '../constants/facilities';
import '../styles/form-view.css';

const FormView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formType = location.pathname.split('/').pop();
    const searchParams = new URLSearchParams(location.search);
    const facility = searchParams.get('facility');

    useEffect(() => {
        const fetchForms = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/forms/${formType}?facility=${facility}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch forms');
                }

                const data = await response.json();
                setForms(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchForms();
    }, [formType, facility]);

    const handleBack = () => {
        navigate('/admin/dashboard');
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="form-view">
            <div className="form-view-header">
                <h1>{getFacilityDisplayName(facility)} - {formType.charAt(0).toUpperCase() + formType.slice(1)} Forms</h1>
                <button onClick={handleBack} className="back-button">
                    Back to Dashboard
                </button>
            </div>

            <div className="forms-table-container">
                <table className="forms-table">
                    <thead>
                        <tr>
                            {Object.keys(forms[0] || {}).map((key) => (
                                key !== 'createdBy' && key !== '__v' && key !== 'updatedAt' && (
                                    <th key={key}>{key}</th>
                                )
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {forms.map((form, index) => (
                            <tr key={index}>
                                {Object.entries(form).map(([key, value]) => (
                                    key !== 'createdBy' && key !== '__v' && key !== 'updatedAt' && (
                                        <td key={key}>
                                            {value instanceof Date ? value.toLocaleDateString() : value}
                                        </td>
                                    )
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FormView; 