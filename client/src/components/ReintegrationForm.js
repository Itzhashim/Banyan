import React, { useState } from 'react';
import '../styles/forms.css';

const ReintegrationForm = () => {
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
    treatmentOption: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        // Get existing reintegration forms from localStorage
        const existingForms = JSON.parse(localStorage.getItem('reintegrationForms') || '[]');
        
        // Add timestamp to the form data
        const formToSave = {
          ...formData,
          submittedAt: new Date().toISOString(),
          id: Date.now().toString() // Simple unique ID
        };
        
        // Add new form to the array
        existingForms.push(formToSave);
        
        // Save back to localStorage
        localStorage.setItem('reintegrationForms', JSON.stringify(existingForms));
        
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
              />
            </div>
          </div>
        </div>

        <div className="button-group">
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReintegrationForm; 