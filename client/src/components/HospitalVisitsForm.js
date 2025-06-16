import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { hospitalVisitsService } from '../services/api';
import '../styles/forms.css';

const HospitalVisitsForm = () => {
    const { user } = useAuth();
    const initialFormData = {
        fileNumber: '',
        name: '',
        typeOfVisit: '',
        hospitalName: '',
        dateOfVisit: '',
        dateOfDischarge: '',
        reason: '',
        costToOrganization: '',
        location: '',
        residingPlace: '',
        facility: user?.facility || ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        if (submitStatus.message) {
            setSubmitStatus({ type: '', message: '' });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fileNumber) newErrors.fileNumber = 'File number is required';
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.typeOfVisit) newErrors.typeOfVisit = 'Type of visit is required';
        if (!formData.hospitalName) newErrors.hospitalName = 'Hospital name is required';
        if (!formData.dateOfVisit) newErrors.dateOfVisit = 'Date of visit is required';
        if (!formData.reason) newErrors.reason = 'Reason for visit is required';
        if (formData.costToOrganization && isNaN(formData.costToOrganization)) {
            newErrors.costToOrganization = 'Cost must be a number';
        }
        if (formData.dateOfDischarge && new Date(formData.dateOfDischarge) < new Date(formData.dateOfVisit)) {
            newErrors.dateOfDischarge = 'Discharge date cannot be before visit date';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length === 0) {
            setIsSubmitting(true);
            try {
                await hospitalVisitsService.submitForm(formData);
                setSubmitStatus({
                    type: 'success',
                    message: 'Form submitted successfully!'
                });
                setFormData(initialFormData);
            } catch (error) {
                setSubmitStatus({
                    type: 'error',
                    message: error.response?.data?.message || 'Failed to submit form. Please try again.'
                });
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setErrors(newErrors);
        }
    };

    const handleClear = () => {
        setFormData(initialFormData);
        setErrors({});
        setSubmitStatus({ type: '', message: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>Hospital Visits Form</h2>
            
            {submitStatus.message && (
                <div className={`submit-status ${submitStatus.type}`}>
                    {submitStatus.message}
                </div>
            )}
            
            <div className="form-grid">
                <div className="form-group">
                    <label htmlFor="fileNumber">File Number *</label>
                    <input
                        type="text"
                        id="fileNumber"
                        name="fileNumber"
                        value={formData.fileNumber}
                        onChange={handleChange}
                        className={errors.fileNumber ? 'error' : ''}
                        disabled={isSubmitting}
                    />
                    {errors.fileNumber && <span className="error-message">{errors.fileNumber}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? 'error' : ''}
                        disabled={isSubmitting}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="typeOfVisit">Type of Visit *</label>
                    <select
                        id="typeOfVisit"
                        name="typeOfVisit"
                        value={formData.typeOfVisit}
                        onChange={handleChange}
                        className={errors.typeOfVisit ? 'error' : ''}
                        disabled={isSubmitting}
                    >
                        <option value="">Select type</option>
                        <option value="IP">In-Patient</option>
                        <option value="OP">Out-Patient</option>
                    </select>
                    {errors.typeOfVisit && <span className="error-message">{errors.typeOfVisit}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="hospitalName">Hospital Name *</label>
                    <input
                        type="text"
                        id="hospitalName"
                        name="hospitalName"
                        value={formData.hospitalName}
                        onChange={handleChange}
                        className={errors.hospitalName ? 'error' : ''}
                        disabled={isSubmitting}
                    />
                    {errors.hospitalName && <span className="error-message">{errors.hospitalName}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="dateOfVisit">Date of Visit *</label>
                    <input
                        type="date"
                        id="dateOfVisit"
                        name="dateOfVisit"
                        value={formData.dateOfVisit}
                        onChange={handleChange}
                        className={errors.dateOfVisit ? 'error' : ''}
                        disabled={isSubmitting}
                    />
                    {errors.dateOfVisit && <span className="error-message">{errors.dateOfVisit}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="dateOfDischarge">Date of Discharge</label>
                    <input
                        type="date"
                        id="dateOfDischarge"
                        name="dateOfDischarge"
                        value={formData.dateOfDischarge}
                        onChange={handleChange}
                        className={errors.dateOfDischarge ? 'error' : ''}
                        disabled={isSubmitting}
                    />
                    {errors.dateOfDischarge && <span className="error-message">{errors.dateOfDischarge}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="reason">Reason for Visit *</label>
                    <textarea
                        id="reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        className={errors.reason ? 'error' : ''}
                        rows={4}
                        disabled={isSubmitting}
                    />
                    {errors.reason && <span className="error-message">{errors.reason}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="costToOrganization">Cost to Organization (₹)</label>
                    <input
                        type="number"
                        id="costToOrganization"
                        name="costToOrganization"
                        value={formData.costToOrganization}
                        onChange={handleChange}
                        className={errors.costToOrganization ? 'error' : ''}
                        min="0"
                        disabled={isSubmitting}
                    />
                    {errors.costToOrganization && <span className="error-message">{errors.costToOrganization}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="residingPlace">Residing Place</label>
                    <input
                        type="text"
                        id="residingPlace"
                        name="residingPlace"
                        value={formData.residingPlace}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />
                </div>
            </div>

            <div className="form-actions">
                <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
                <button type="button" className="cancel-button" onClick={handleClear} disabled={isSubmitting}>
                    Clear
                </button>
            </div>
        </form>
    );
};

export default HospitalVisitsForm; 