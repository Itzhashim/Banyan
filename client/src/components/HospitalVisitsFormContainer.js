import React, { useState } from 'react';
import HospitalVisitsForm from './HospitalVisitsForm';

const HospitalVisitsFormContainer = () => {
    const initialFormData = {
        fileNumber: '',
        name: '',
        typeOfVisit: 'IP',
        dateOfVisit: '',
        reasonForVisit: '',
        costToOrganization: '',
        location: '',
        residingPlace: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        // Clear submit status when user starts typing
        if (submitStatus.message) {
            setSubmitStatus({ type: '', message: '' });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Required field validation
        if (!formData.fileNumber) newErrors.fileNumber = 'File number is required';
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.dateOfVisit) newErrors.dateOfVisit = 'Date of visit is required';
        
        // Number validation
        if (formData.costToOrganization && isNaN(formData.costToOrganization)) {
            newErrors.costToOrganization = 'Must be a number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                // Get existing hospital visit forms from localStorage
                const existingForms = JSON.parse(localStorage.getItem('hospitalVisitForms') || '[]');
                
                // Add timestamp to the form data
                const formToSave = {
                    ...formData,
                    submittedAt: new Date().toISOString(),
                    id: Date.now().toString() // Simple unique ID
                };
                
                // Add new form to the array
                existingForms.push(formToSave);
                
                // Save back to localStorage
                localStorage.setItem('hospitalVisitForms', JSON.stringify(existingForms));
                
                // Show success message
                setSubmitStatus({
                    type: 'success',
                    message: 'Form submitted successfully!'
                });
                
                // Reset form
                setFormData(initialFormData);
            } catch (error) {
                // Show error message
                setSubmitStatus({
                    type: 'error',
                    message: 'Failed to submit form. Please try again.'
                });
            }
        }
    };

    const handleCancel = () => {
        setFormData(initialFormData);
        setErrors({});
        setSubmitStatus({ type: '', message: '' });
    };

    return (
        <HospitalVisitsForm
            values={formData}
            errors={errors}
            handleChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitStatus={submitStatus}
        />
    );
};

export default HospitalVisitsFormContainer; 