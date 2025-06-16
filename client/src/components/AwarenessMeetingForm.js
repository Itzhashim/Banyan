import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { awarenessMeetingService } from '../services/api';
import withDashboardButton from './withDashboardButton';
import '../styles/forms.css';

const AwarenessMeetingForm = ({ onSubmitSuccess, onReset }) => {
    const { user } = useAuth();
    const initialFormData = {
        serialNo: '',
        dateOfProgram: '',
        typeOfProgram: '',
        topic: '',
        resourcePerson: '',
        numberOfParticipants: '',
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
        if (!formData.serialNo) newErrors.serialNo = 'Serial number is required';
        if (!formData.dateOfProgram) newErrors.dateOfProgram = 'Date is required';
        if (!formData.typeOfProgram) newErrors.typeOfProgram = 'Program type is required';
        if (!formData.topic) newErrors.topic = 'Topic is required';
        if (!formData.resourcePerson) newErrors.resourcePerson = 'Resource person is required';
        if (!formData.numberOfParticipants) newErrors.numberOfParticipants = 'Number of participants is required';
        if (formData.numberOfParticipants && isNaN(formData.numberOfParticipants)) {
            newErrors.numberOfParticipants = 'Number of participants must be a number';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length === 0) {
            setIsSubmitting(true);
            try {
                await awarenessMeetingService.submitForm(formData);
                setSubmitStatus({
                    type: 'success',
                    message: 'Form submitted successfully!'
                });
                setFormData(initialFormData);
                onSubmitSuccess();
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
        onReset();
    };

    return (
        <div className="form-container">
            <h2>Awareness & Grievance Meeting Form</h2>
            
            {submitStatus.message && (
                <div className={`submit-status ${submitStatus.type}`}>
                    {submitStatus.message}
                </div>
            )}
            
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="serialNo">S.No *</label>
                        <input
                            type="number"
                            id="serialNo"
                            name="serialNo"
                            value={formData.serialNo}
                            onChange={handleChange}
                            className={errors.serialNo ? 'error' : ''}
                            disabled={isSubmitting}
                        />
                        {errors.serialNo && <span className="error-message">{errors.serialNo}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="dateOfProgram">Date of Program *</label>
                        <input
                            type="date"
                            id="dateOfProgram"
                            name="dateOfProgram"
                            value={formData.dateOfProgram}
                            onChange={handleChange}
                            className={errors.dateOfProgram ? 'error' : ''}
                            disabled={isSubmitting}
                        />
                        {errors.dateOfProgram && <span className="error-message">{errors.dateOfProgram}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="typeOfProgram">Type of Program *</label>
                        <select
                            id="typeOfProgram"
                            name="typeOfProgram"
                            value={formData.typeOfProgram}
                            onChange={handleChange}
                            className={errors.typeOfProgram ? 'error' : ''}
                            disabled={isSubmitting}
                        >
                            <option value="">Select program type</option>
                            <option value="Awareness program">Awareness program</option>
                            <option value="Grievance meeting">Grievance meeting</option>
                            <option value="MHRB">MHRB</option>
                        </select>
                        {errors.typeOfProgram && <span className="error-message">{errors.typeOfProgram}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="topic">Topic *</label>
                        <input
                            type="text"
                            id="topic"
                            name="topic"
                            value={formData.topic}
                            onChange={handleChange}
                            className={errors.topic ? 'error' : ''}
                            disabled={isSubmitting}
                        />
                        {errors.topic && <span className="error-message">{errors.topic}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="resourcePerson">Resource Person *</label>
                        <input
                            type="text"
                            id="resourcePerson"
                            name="resourcePerson"
                            value={formData.resourcePerson}
                            onChange={handleChange}
                            className={errors.resourcePerson ? 'error' : ''}
                            disabled={isSubmitting}
                        />
                        {errors.resourcePerson && <span className="error-message">{errors.resourcePerson}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="numberOfParticipants">Number of Participants *</label>
                        <input
                            type="number"
                            id="numberOfParticipants"
                            name="numberOfParticipants"
                            value={formData.numberOfParticipants}
                            onChange={handleChange}
                            className={errors.numberOfParticipants ? 'error' : ''}
                            disabled={isSubmitting}
                        />
                        {errors.numberOfParticipants && <span className="error-message">{errors.numberOfParticipants}</span>}
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
        </div>
    );
};

export default withDashboardButton(AwarenessMeetingForm); 