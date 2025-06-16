import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { transactionsService } from '../services/api';
import '../styles/forms.css';

const TransactionsForm = () => {
  const { user } = useAuth();
  const initialFormData = {
    sno: '',
    date: '',
    month: '',
    year: '',
    name: '',
    age: '',
    gender: '',
    amount: '',
    purpose: '',
    modeOfPayment: '',
    status: '',
    notes: '',
    facility: user?.facility || '' // Add facility field
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
    
    if (!formData.sno) newErrors.sno = 'Serial number is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.amount) newErrors.amount = 'Amount is required';
    if (!formData.purpose) newErrors.purpose = 'Purpose is required';
    if (!formData.modeOfPayment) newErrors.modeOfPayment = 'Mode of payment is required';
    
    if (formData.sno && isNaN(formData.sno)) {
      newErrors.sno = 'Must be a number';
    }
    if (formData.age && isNaN(formData.age)) {
      newErrors.age = 'Must be a number';
    }
    if (formData.amount && isNaN(formData.amount)) {
      newErrors.amount = 'Must be a number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await transactionsService.submitForm(formData);
        
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
    }
  };

  return (
    <div className="form-container">
      <h2>Transactions Form</h2>
      
      {submitStatus.message && (
        <div className={`submit-status ${submitStatus.type}`}>
          {submitStatus.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-row">
            <div className="form-group required-field">
              <label htmlFor="sno">Serial No.</label>
              <input
                type="text"
                id="sno"
                name="sno"
                value={formData.sno}
                onChange={handleChange}
                className={errors.sno ? 'error' : ''}
                disabled={isSubmitting}
              />
              {errors.sno && <span className="error-message">{errors.sno}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="number"
                id="date"
                name="date"
                min="1"
                max="31"
                value={formData.date}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="month">Month</label>
              <input
                type="number"
                id="month"
                name="month"
                min="1"
                max="12"
                value={formData.month}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="year">Year</label>
              <input
                type="number"
                id="year"
                name="year"
                min="2000"
                value={formData.year}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Name</label>
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
            <label htmlFor="age">Age</label>
            <input
              type="text"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={errors.age ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.age && <span className="error-message">{errors.age}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={errors.gender ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.gender && <span className="error-message">{errors.gender}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className={errors.amount ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.amount && <span className="error-message">{errors.amount}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="purpose">Purpose</label>
            <input
              type="text"
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className={errors.purpose ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.purpose && <span className="error-message">{errors.purpose}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="modeOfPayment">Mode of Payment</label>
            <input
              type="text"
              id="modeOfPayment"
              name="modeOfPayment"
              value={formData.modeOfPayment}
              onChange={handleChange}
              className={errors.modeOfPayment ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.modeOfPayment && <span className="error-message">{errors.modeOfPayment}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={errors.status ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.status && <span className="error-message">{errors.status}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <input
              type="text"
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className={errors.notes ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.notes && <span className="error-message">{errors.notes}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="facility">Facility</label>
            <input
              type="text"
              id="facility"
              name="facility"
              value={formData.facility}
              onChange={handleChange}
              className={errors.facility ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.facility && <span className="error-message">{errors.facility}</span>}
          </div>
        </div>

        <div className="button-group">
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Form'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionsForm; 