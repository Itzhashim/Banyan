import React from 'react';
import '../styles/forms.css';

const HospitalVisitsForm = ({
    values,
    errors,
    handleChange,
    onSubmit,
    onCancel,
    submitStatus
}) => {
    return (
        <form onSubmit={onSubmit} className="form-container">
            {submitStatus && submitStatus.message && (
                <div className={`submit-status ${submitStatus.type}`}>
                    {submitStatus.message}
                </div>
            )}

            <div className="form-group">
                <label htmlFor="fileNumber">File Number *</label>
                <input
                    type="text"
                    id="fileNumber"
                    name="fileNumber"
                    value={values.fileNumber}
                    onChange={handleChange}
                    className={errors.fileNumber ? 'error' : ''}
                    required
                />
                {errors.fileNumber && (
                    <span className="error-message">{errors.fileNumber}</span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                    required
                />
                {errors.name && (
                    <span className="error-message">{errors.name}</span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="typeOfVisit">Type of Visit *</label>
                <select
                    id="typeOfVisit"
                    name="typeOfVisit"
                    value={values.typeOfVisit}
                    onChange={handleChange}
                    required
                >
                    <option value="IP">In-Patient</option>
                    <option value="OP">Out-Patient</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="hospitalName">Hospital Name *</label>
                <input
                    type="text"
                    id="hospitalName"
                    name="hospitalName"
                    value={values.hospitalName}
                    onChange={handleChange}
                    className={errors.hospitalName ? 'error' : ''}
                    required
                />
                {errors.hospitalName && (
                    <span className="error-message">{errors.hospitalName}</span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="dateOfVisit">Date of Visit *</label>
                <input
                    type="date"
                    id="dateOfVisit"
                    name="dateOfVisit"
                    value={values.dateOfVisit}
                    onChange={handleChange}
                    className={errors.dateOfVisit ? 'error' : ''}
                    required
                />
                {errors.dateOfVisit && (
                    <span className="error-message">{errors.dateOfVisit}</span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="reason">Reason for Visit *</label>
                <textarea
                    id="reason"
                    name="reason"
                    value={values.reason}
                    onChange={handleChange}
                    className={errors.reason ? 'error' : ''}
                    required
                    rows={4}
                />
                {errors.reason && (
                    <span className="error-message">{errors.reason}</span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="costToOrganization">Cost to Organization (₹)</label>
                <input
                    type="number"
                    id="costToOrganization"
                    name="costToOrganization"
                    value={values.costToOrganization}
                    onChange={handleChange}
                    className={errors.costToOrganization ? 'error' : ''}
                    min="0"
                />
                {errors.costToOrganization && (
                    <span className="error-message">{errors.costToOrganization}</span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={values.location}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="residingPlace">Residing Place</label>
                <input
                    type="text"
                    id="residingPlace"
                    name="residingPlace"
                    value={values.residingPlace}
                    onChange={handleChange}
                />
            </div>

            <div className="form-actions">
                <button type="button" onClick={onCancel} className="cancel-button">
                    Cancel
                </button>
                <button type="submit" className="submit-button">
                    Submit
                </button>
            </div>
        </form>
    );
};

export default HospitalVisitsForm; 