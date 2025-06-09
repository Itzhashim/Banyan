import React, { useState } from 'react';
import '../styles/forms.css';

const AwarenessMeetingForm = () => {
    const initialFormData = {
        serialNo: '',
        dateOfProgram: '',
        typeOfProgram: '',
        topic: '',
        resourcePerson: '',
        numberOfParticipants: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
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
        if (!formData.serialNo) newErrors.serialNo = 'Serial number is required';
        if (!formData.dateOfProgram) newErrors.dateOfProgram = 'Date is required';
        if (!formData.typeOfProgram) newErrors.typeOfProgram = 'Program type is required';
        if (!formData.topic) newErrors.topic = 'Topic is required';
        if (!formData.resourcePerson) newErrors.resourcePerson = 'Resource person is required';
        if (!formData.numberOfParticipants) newErrors.numberOfParticipants = 'Number of participants is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length === 0) {
            try {
                // Get existing awareness meeting forms from localStorage
                const existingForms = JSON.parse(localStorage.getItem('awarenessMeetingForms') || '[]');
                
                // Add timestamp to the form data
                const formToSave = {
                    ...formData,
                    submittedAt: new Date().toISOString(),
                    id: Date.now().toString() // Simple unique ID
                };
                
                // Add new form to the array
                existingForms.push(formToSave);
                
                // Save back to localStorage
                localStorage.setItem('awarenessMeetingForms', JSON.stringify(existingForms));
                
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
        } else {
            setErrors(newErrors);
        }
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
                        />
                        {errors.numberOfParticipants && <span className="error-message">{errors.numberOfParticipants}</span>}
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-button">Submit</button>
                    <button type="button" className="cancel-button" onClick={() => setFormData(initialFormData)}>
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AwarenessMeetingForm; 