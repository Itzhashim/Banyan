import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { outreachService } from '../services/api';
import '../styles/forms.css';

const OutreachForm = () => {
  const { user } = useAuth();
  const initialFormData = {
    sno: '',
    district: '',
    date: '',
    month: '',
    year: '',
    age: '',
    area: '',
    taluk: '',
    name: '',
    gender: '',
    personWithMentalIllness: '',
    serviceProvided: '',
    category: '',
    tier: '',
    notes: '',
    doneBy: '',
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
    if (!formData.district) newErrors.district = 'District is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    
    if (formData.sno && isNaN(formData.sno)) {
      newErrors.sno = 'Must be a number';
    }
    if (formData.age && isNaN(formData.age)) {
      newErrors.age = 'Must be a number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await outreachService.submitForm(formData);
        
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
      <h2>Outreach Form</h2>
      
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

            <div className="form-group required-field">
              <label htmlFor="district">District</label>
              <input
                type="text"
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className={errors.district ? 'error' : ''}
                disabled={isSubmitting}
              />
              {errors.district && <span className="error-message">{errors.district}</span>}
            </div>
          </div>

          <div className="form-row">
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

        <div className="form-section">
          <h3>Personal Details</h3>
          <div className="form-row">
            <div className="form-group required-field">
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
                type="number"
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
            <div className="form-group required-field">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={errors.gender ? 'error' : ''}
                disabled={isSubmitting}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <span className="error-message">{errors.gender}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="area">Area</label>
              <input
                type="text"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="taluk">Taluk</label>
              <input
                type="text"
                id="taluk"
                name="taluk"
                value={formData.taluk}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Support Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="personWithMentalIllness">Person with Mental Illness</label>
              <select
                id="personWithMentalIllness"
                name="personWithMentalIllness"
                value={formData.personWithMentalIllness}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="">Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="">Select category</option>
                <option value="Crisis Support">Crisis Support</option>
                <option value="Continued follow up">Continued follow up</option>
                <option value="One time support">One time support</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tier">Tier</label>
              <select
                id="tier"
                name="tier"
                value={formData.tier}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="">Select tier</option>
                <option value="Tier-1">Tier-1</option>
                <option value="Tier-2">Tier-2</option>
                <option value="Tier-3">Tier-3</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="serviceProvided">Service Provided</label>
              <textarea
                id="serviceProvided"
                name="serviceProvided"
                value={formData.serviceProvided}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Additional Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="doneBy">Done By</label>
              <input
                type="text"
                id="doneBy"
                name="doneBy"
                value={formData.doneBy}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
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

export default OutreachForm; 