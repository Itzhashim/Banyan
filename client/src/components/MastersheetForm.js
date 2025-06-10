import React, { useState } from 'react';
import '../styles/forms.css';

const MastersheetForm = ({ onSubmitSuccess, onReset }) => {
  const initialFormData = {
    // Personal Information
    name: '',
    age: '',
    gender: '',
    contactInfo: '',
    address: '',
    district: '',
    
    // Health Information
    diagnosis: '',
    medication: '',
    hospitalization: '',
    lastHospitalization: '',
    
    // Family Information
    familyMembers: '',
    primaryCaregiver: '',
    monthlyIncome: '',
    
    // Support Services
    govtSchemes: '',
    disabilityCard: '',
    disabilityPercentage: '',
    
    // Follow-up Details
    followUpDate: '',
    followUpNotes: '',
    status: '',
    
    // Additional Information
    remarks: '',
    doneBy: '',
    lastUpdated: ''
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
    
    // Required fields validation
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    
    // Number validation
    if (formData.age && isNaN(formData.age)) {
      newErrors.age = 'Must be a number';
    }
    if (formData.monthlyIncome && isNaN(formData.monthlyIncome)) {
      newErrors.monthlyIncome = 'Must be a number';
    }
    if (formData.disabilityPercentage && isNaN(formData.disabilityPercentage)) {
      newErrors.disabilityPercentage = 'Must be a number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        // Get existing mastersheet forms from localStorage
        const existingForms = JSON.parse(localStorage.getItem('mastersheetForms') || '[]');
        
        // Add timestamp and ID to the form data
        const formToSave = {
          ...formData,
          submittedAt: new Date().toISOString(),
          id: Date.now().toString()
        };
        
        // Add new form to the array
        existingForms.push(formToSave);
        
        // Save back to localStorage
        localStorage.setItem('mastersheetForms', JSON.stringify(existingForms));
        
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
    <div className="form-container">
      <h2>Mastersheet Form</h2>
      
      {submitStatus.message && (
        <div className={`submit-status ${submitStatus.type}`}>
          {submitStatus.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-section">
          <h3>Personal Information</h3>
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
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={errors.age ? 'error' : ''}
              />
              {errors.age && <span className="error-message">{errors.age}</span>}
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

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="contactInfo">Contact Information</label>
              <input
                type="text"
                id="contactInfo"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
              />
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

            <div className="form-group">
              <label htmlFor="district">District</label>
              <input
                type="text"
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Health Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="diagnosis">Diagnosis</label>
              <textarea
                id="diagnosis"
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="medication">Current Medication</label>
              <textarea
                id="medication"
                name="medication"
                value={formData.medication}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="hospitalization">Hospitalization History</label>
              <textarea
                id="hospitalization"
                name="hospitalization"
                value={formData.hospitalization}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastHospitalization">Last Hospitalization</label>
              <input
                type="date"
                id="lastHospitalization"
                name="lastHospitalization"
                value={formData.lastHospitalization}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Family Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="familyMembers">Family Members</label>
              <textarea
                id="familyMembers"
                name="familyMembers"
                value={formData.familyMembers}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="primaryCaregiver">Primary Caregiver</label>
              <input
                type="text"
                id="primaryCaregiver"
                name="primaryCaregiver"
                value={formData.primaryCaregiver}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="monthlyIncome">Monthly Income</label>
              <input
                type="number"
                id="monthlyIncome"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleChange}
                className={errors.monthlyIncome ? 'error' : ''}
              />
              {errors.monthlyIncome && (
                <span className="error-message">{errors.monthlyIncome}</span>
              )}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Support Services</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="govtSchemes">Government Schemes</label>
              <textarea
                id="govtSchemes"
                name="govtSchemes"
                value={formData.govtSchemes}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="disabilityCard">Disability Card</label>
              <select
                id="disabilityCard"
                name="disabilityCard"
                value={formData.disabilityCard}
                onChange={handleChange}
              >
                <option value="">Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="In Process">In Process</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="disabilityPercentage">Disability Percentage</label>
              <input
                type="number"
                id="disabilityPercentage"
                name="disabilityPercentage"
                value={formData.disabilityPercentage}
                onChange={handleChange}
                min="0"
                max="100"
                className={errors.disabilityPercentage ? 'error' : ''}
              />
              {errors.disabilityPercentage && (
                <span className="error-message">{errors.disabilityPercentage}</span>
              )}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Follow-up Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="followUpDate">Follow-up Date</label>
              <input
                type="date"
                id="followUpDate"
                name="followUpDate"
                value={formData.followUpDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="followUpNotes">Follow-up Notes</label>
              <textarea
                id="followUpNotes"
                name="followUpNotes"
                value={formData.followUpNotes}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Additional Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="remarks">Remarks</label>
              <textarea
                id="remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
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
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastUpdated">Last Updated</label>
              <input
                type="date"
                id="lastUpdated"
                name="lastUpdated"
                value={formData.lastUpdated}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Submit
          </button>
          <button type="button" className="cancel-button" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default MastersheetForm; 