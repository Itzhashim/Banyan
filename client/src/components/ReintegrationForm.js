import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { reintegrationService } from '../services/api';
import '../styles/forms.css';

const ReintegrationForm = ({ onSubmitSuccess, onReset }) => {
  const { user } = useAuth();
  const initialFormData = {
    sno: '',
    district: '',
    fileno: '',
    name: '',
    gender: '',
    dateOfAdmission: '',
    dateOfReintegration: '',
    daysOfStay: '',
    reintegratedWith: '',
    address: '',
    contact: '',
    state: '',
    reintegratedToDistrict: '',
    acStatus: '',
    reasons: '',
    treatmentOption: '',
    facility: user?.facility || ''
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
    // Clear submit status when user starts typing
    if (submitStatus.message) {
      setSubmitStatus({ type: '', message: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required field validation
    if (!formData.sno) newErrors.sno = 'Serial number is required';
    if (!formData.district) newErrors.district = 'District is required';
    if (!formData.fileno) newErrors.fileno = 'File number is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    
    // Number validation
    if (formData.sno && isNaN(formData.sno)) {
      newErrors.sno = 'Must be a number';
    }
    if (formData.contact && isNaN(formData.contact)) {
      newErrors.contact = 'Must be a valid contact number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await reintegrationService.submitForm(formData);
        
        setSubmitStatus({
          type: 'success',
          message: 'Form submitted successfully!'
        });
        
        setFormData(initialFormData);
        
        // Call onSubmitSuccess to show the dashboard button
        onSubmitSuccess();
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

  const handleClear = () => {
    setFormData(initialFormData);
    setErrors({});
    setSubmitStatus({ type: '', message: '' });
    onReset();
  };

  return (
    <div className="form-container">
      <h2>Reintegration Form</h2>
      
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

            <div className="form-group required-field">
              <label htmlFor="fileno">File No.</label>
              <input
                type="text"
                id="fileno"
                name="fileno"
                value={formData.fileno}
                onChange={handleChange}
                className={errors.fileno ? 'error' : ''}
                disabled={isSubmitting}
              />
              {errors.fileno && <span className="error-message">{errors.fileno}</span>}
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
          </div>
        </div>

        <div className="form-section">
          <h3>Reintegration Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dateOfAdmission">Date of Admission</label>
              <input
                type="date"
                id="dateOfAdmission"
                name="dateOfAdmission"
                value={formData.dateOfAdmission}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="dateOfReintegration">Date of Reintegration</label>
              <input
                type="date"
                id="dateOfReintegration"
                name="dateOfReintegration"
                value={formData.dateOfReintegration}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="daysOfStay">Days of Stay</label>
              <input
                type="number"
                id="daysOfStay"
                name="daysOfStay"
                value={formData.daysOfStay}
                onChange={handleChange}
                min="0"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="reintegratedWith">Reintegrated With</label>
              <select
                id="reintegratedWith"
                name="reintegratedWith"
                value={formData.reintegratedWith}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="">Select option</option>
                <option value="Family">Family</option>
                <option value="NGO">NGO</option>
                <option value="Home Again">Home Again</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Additional Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="contact">Contact</label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className={errors.contact ? 'error' : ''}
                disabled={isSubmitting}
              />
              {errors.contact && <span className="error-message">{errors.contact}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="reintegratedToDistrict">Reintegrated to District</label>
              <input
                type="text"
                id="reintegratedToDistrict"
                name="reintegratedToDistrict"
                value={formData.reintegratedToDistrict}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="acStatus">AC Status</label>
              <select
                id="acStatus"
                name="acStatus"
                value={formData.acStatus}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="reasons">Reasons</label>
              <textarea
                id="reasons"
                name="reasons"
                value={formData.reasons}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="treatmentOption">Treatment Option</label>
              <input
                type="text"
                id="treatmentOption"
                name="treatmentOption"
                value={formData.treatmentOption}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          <button type="button" className="cancel-button" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReintegrationForm; 