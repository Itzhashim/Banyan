import React, { useState } from 'react';
import '../styles/forms.css';

const TransactionsForm = ({ onSubmitSuccess, onReset }) => {
  const initialFormData = {
    fileNo: '',
    name: '',
    typeOfTransaction: '',
    dateOfExit: null,
    dateOfReturn: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    // Clear submit status when user starts typing
    if (submitStatus.message) {
      setSubmitStatus({ type: '', message: '' });
    }
  };

  const handleDateChange = (date, name) => {
    setFormData(prev => ({
      ...prev,
      [name]: date
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (submitStatus.message) {
      setSubmitStatus({ type: '', message: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required field validation
    if (!formData.fileNo) newErrors.fileNo = 'File number is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.typeOfTransaction) newErrors.typeOfTransaction = 'Type of transaction is required';
    if (!formData.dateOfExit) newErrors.dateOfExit = 'Date of exit is required';
    
    // Conditional validation for date of return
    if (formData.typeOfTransaction === 'Left' && formData.dateOfReturn) {
      newErrors.dateOfReturn = 'Date of return should not be set for Left status';
    }
    if (formData.typeOfTransaction === 'Deceased' && formData.dateOfReturn) {
      newErrors.dateOfReturn = 'Date of return should not be set for Deceased status';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Get existing transaction forms from localStorage
        const existingForms = JSON.parse(localStorage.getItem('transactionForms') || '[]');
        
        // Add timestamp to the form data
        const formToSave = {
          ...formData,
          submittedAt: new Date().toISOString(),
          id: Date.now().toString() // Simple unique ID
        };
        
        // Add new form to the array
        existingForms.push(formToSave);
        
        // Save back to localStorage
        localStorage.setItem('transactionForms', JSON.stringify(existingForms));
        
        // Show success message
        setSubmitStatus({
          type: 'success',
          message: 'Form submitted successfully!'
        });
        
        // Reset form
        setFormData(initialFormData);
        
        // Call onSubmitSuccess to show the dashboard button
        onSubmitSuccess();
      } catch (error) {
        // Show error message
        setSubmitStatus({
          type: 'error',
          message: 'Failed to submit form. Please try again.'
        });
      }
    }
  };

  const handleClear = () => {
    setFormData(initialFormData);
    setErrors({});
    setSubmitStatus({ type: '', message: '' });
    onReset();
  };

  return (
    <div className="transactions-form-container">
      <h2>Transactions Form</h2>
      
      {submitStatus.message && (
        <div className={`submit-status ${submitStatus.type}`}>
          {submitStatus.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="transactions-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fileNo">File No</label>
            <input
              type="text"
              id="fileNo"
              name="fileNo"
              value={formData.fileNo}
              onChange={handleChange}
              className={errors.fileNo ? 'error' : ''}
            />
            {errors.fileNo && <span className="error-message">{errors.fileNo}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="typeOfTransaction">Type of Transaction</label>
            <select
              id="typeOfTransaction"
              name="typeOfTransaction"
              value={formData.typeOfTransaction}
              onChange={handleChange}
              className={errors.typeOfTransaction ? 'error' : ''}
            >
              <option value="">Select type</option>
              <option value="Left">Left</option>
              <option value="Deceased">Deceased</option>
              <option value="Readmission">Readmission</option>
            </select>
            {errors.typeOfTransaction && (
              <span className="error-message">{errors.typeOfTransaction}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="dateOfExit">Date of Exit</label>
            <input
              type="date"
              id="dateOfExit"
              name="dateOfExit"
              value={formData.dateOfExit || ''}
              onChange={(e) => handleDateChange(e.target.value, 'dateOfExit')}
              className={errors.dateOfExit ? 'error' : ''}
            />
            {errors.dateOfExit && (
              <span className="error-message">{errors.dateOfExit}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dateOfReturn">Date of Return (if applicable)</label>
            <input
              type="date"
              id="dateOfReturn"
              name="dateOfReturn"
              value={formData.dateOfReturn || ''}
              onChange={(e) => handleDateChange(e.target.value, 'dateOfReturn')}
              disabled={formData.typeOfTransaction === 'Deceased' || formData.typeOfTransaction === 'Left'}
              className={errors.dateOfReturn ? 'error' : ''}
            />
            {errors.dateOfReturn && (
              <span className="error-message">{errors.dateOfReturn}</span>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">Submit</button>
          <button type="button" className="cancel-button" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionsForm; 