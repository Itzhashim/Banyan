import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mastersheetService } from '../services/api';
import '../styles/forms.css';

const yesNoOptions = [
  { value: '', label: 'Select' },
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' }
];

const genderOptions = [
  { value: '', label: 'Select' },
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' }
];

const maritalStatusOptions = [
  { value: '', label: 'Select' },
  { value: 'Single', label: 'Single' },
  { value: 'Married', label: 'Married' },
  { value: 'Divorced', label: 'Divorced' },
  { value: 'Separated', label: 'Separated' },
  { value: 'Widow', label: 'Widow' }
];

const currentStatusOptions = [
  { value: '', label: 'Select' },
  { value: 'IP', label: 'IP' },
  { value: 'Family reintegration', label: 'Family reintegration' },
  { value: 'NGO reintegration', label: 'NGO reintegration' },
  { value: 'Home again reintegration', label: 'Home again reintegration' },
  { value: 'Left by choice', label: 'Left by choice' },
  { value: 'Expired', label: 'Expired' }
];

const MastersheetForm = () => {
  const { user } = useAuth();
  const initialFormData = {
    district: '',
    fileNo: '',
    name: '',
    dateOfAdmission: '',
    age: '',
    ageCategory: '',
    gender: '',
    maritalStatus: '',
    psychiatricDiagnosis: '',
    comorbid: '',
    psychiatricComorbidity: '',
    generalHealthComorbidity: '',
    placeOfOrigin: '',
    stateCategory: '',
    sourceOfReferral: '',
    placeOfRescueArea: '',
    placeOfRescueDistrict: '',
    durationOfHomelessnessMonths: '',
    episodesOfHomelessness: '',
    reasonsForHomelessness: '',
    unemployed: '',
    wanderingBehaviour: '',
    substanceAbuse: '',
    intellectualDisability: '',
    abandonedByFamily: '',
    lackOfAccessToMHCare: '',
    lossOfContactWithFamily: '',
    lackOfAcceptanceByFamily: '',
    mentalIllness: '',
    familyDispute: '',
    communityDispute: '',
    lossOfPrimaryCaregiver: '',
    abuse: '',
    physicalInjury: '',
    lackOfMedicalCompliance: '',
    romanticRelationship: '',
    spiritualPathways: '',
    financialLoss: '',
    poverty: '',
    historyOfEmployment: '',
    historyOfEmploymentCleaned: '',
    incomePM: '',
    previousTreatment: '',
    historyOfAbuse: '',
    typeOfAbuse: '',
    currentStatus: '',
    dateOfExit: '',
    dos: '',
    reintegratedTo: '',
    reintegratedState: '',
    reintegratedDistrict: '',
    followUpStatus: '',
    familyStructure: '',
    noOfChildren: '',
    childrenGenderAndAge: '',
    genderOfParentsWithMI: '',
    primaryCG: '',
    cgRelationship: '',
    cgAge: '',
    occupationOfCG: '',
    incomeCG: '',
    currentOccupationOfClient: '',
    clientIncome: '',
    socialEntitlement: '',
    aadharCard: '',
    disabilityCard: '',
    rationCard: '',
    voterID: '',
    bankAccount: '',
    drivingLicense: '',
    aftercareStatus: '',
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
    if (submitStatus.message) {
      setSubmitStatus({ type: '', message: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.district) newErrors.district = 'District is required';
    if (!formData.fileNo) newErrors.fileNo = 'File No is required';
    if (!formData.dateOfAdmission) newErrors.dateOfAdmission = 'Date of Admission is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (formData.age && isNaN(formData.age)) newErrors.age = 'Age must be a number';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.maritalStatus) newErrors.maritalStatus = 'Marital Status is required';
    if (!formData.psychiatricDiagnosis) newErrors.psychiatricDiagnosis = 'Psychiatric Diagnosis is required';
    if (!formData.currentStatus) newErrors.currentStatus = 'Current Status is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await mastersheetService.submitForm(formData);
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
      <h2>Mastersheet Form</h2>
      {submitStatus.message && (
        <div className={`submit-status ${submitStatus.type}`}>
          {submitStatus.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-section">
          <div className="form-row">
            <div className="form-group required-field">
              <label>District</label>
              <input type="text" name="district" value={formData.district} onChange={handleChange} className={errors.district ? 'error' : ''} disabled={isSubmitting} />
              {errors.district && <span className="error-message">{errors.district}</span>}
            </div>
            <div className="form-group required-field">
              <label>File No</label>
              <input type="text" name="fileNo" value={formData.fileNo} onChange={handleChange} className={errors.fileNo ? 'error' : ''} disabled={isSubmitting} />
              {errors.fileNo && <span className="error-message">{errors.fileNo}</span>}
            </div>
            <div className="form-group required-field">
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className={errors.name ? 'error' : ''} disabled={isSubmitting} />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            <div className="form-group required-field">
              <label>Date of Admission</label>
              <input type="date" name="dateOfAdmission" value={formData.dateOfAdmission} onChange={handleChange} className={errors.dateOfAdmission ? 'error' : ''} disabled={isSubmitting} />
              {errors.dateOfAdmission && <span className="error-message">{errors.dateOfAdmission}</span>}
            </div>
            <div className="form-group required-field">
              <label>Age (in years)</label>
              <input type="text" name="age" value={formData.age} onChange={handleChange} className={errors.age ? 'error' : ''} disabled={isSubmitting} />
              {errors.age && <span className="error-message">{errors.age}</span>}
            </div>
            <div className="form-group">
              <label>Age Category</label>
              <input type="text" name="ageCategory" value={formData.ageCategory} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group required-field">
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className={errors.gender ? 'error' : ''} disabled={isSubmitting}>
                {genderOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
              {errors.gender && <span className="error-message">{errors.gender}</span>}
            </div>
            <div className="form-group required-field">
              <label>Marital Status</label>
              <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className={errors.maritalStatus ? 'error' : ''} disabled={isSubmitting}>
                {maritalStatusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
              {errors.maritalStatus && <span className="error-message">{errors.maritalStatus}</span>}
            </div>
            <div className="form-group required-field">
              <label>Psychiatric Diagnosis</label>
              <input type="text" name="psychiatricDiagnosis" value={formData.psychiatricDiagnosis} onChange={handleChange} className={errors.psychiatricDiagnosis ? 'error' : ''} disabled={isSubmitting} />
              {errors.psychiatricDiagnosis && <span className="error-message">{errors.psychiatricDiagnosis}</span>}
            </div>
            <div className="form-group">
              <label>Comorbid</label>
              <input type="text" name="comorbid" value={formData.comorbid} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Psychiatric Comorbidity</label>
              <input type="text" name="psychiatricComorbidity" value={formData.psychiatricComorbidity} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>General Health Comorbidity</label>
              <input type="text" name="generalHealthComorbidity" value={formData.generalHealthComorbidity} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Place of Origin</label>
              <input type="text" name="placeOfOrigin" value={formData.placeOfOrigin} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>State-Category</label>
              <input type="text" name="stateCategory" value={formData.stateCategory} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Source of Referral</label>
              <input type="text" name="sourceOfReferral" value={formData.sourceOfReferral} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Place of rescue - Area</label>
              <input type="text" name="placeOfRescueArea" value={formData.placeOfRescueArea} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Place of rescue - District</label>
              <input type="text" name="placeOfRescueDistrict" value={formData.placeOfRescueDistrict} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Duration of homelessness in months</label>
              <input type="number" name="durationOfHomelessnessMonths" value={formData.durationOfHomelessnessMonths} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Episodes of homelessness</label>
              <input type="text" name="episodesOfHomelessness" value={formData.episodesOfHomelessness} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Reasons for homelessness</label>
              <input type="text" name="reasonsForHomelessness" value={formData.reasonsForHomelessness} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Unemployed</label>
              <select name="unemployed" value={formData.unemployed} onChange={handleChange} disabled={isSubmitting}>
                {yesNoOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Wandering Behaviour</label>
              <select name="wanderingBehaviour" value={formData.wanderingBehaviour} onChange={handleChange} disabled={isSubmitting}>
                {yesNoOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Substance Abuse</label>
              <input type="text" name="substanceAbuse" value={formData.substanceAbuse} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Intellectual Disability</label>
              <select name="intellectualDisability" value={formData.intellectualDisability} onChange={handleChange} disabled={isSubmitting}>
                {yesNoOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Abandoned by the family</label>
              <select name="abandonedByFamily" value={formData.abandonedByFamily} onChange={handleChange} disabled={isSubmitting}>
                {yesNoOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Lack of access to MH care</label>
              <select name="lackOfAccessToMHCare" value={formData.lackOfAccessToMHCare} onChange={handleChange} disabled={isSubmitting}>
                {yesNoOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Loss of contact with family member</label>
              <select name="lossOfContactWithFamily" value={formData.lossOfContactWithFamily} onChange={handleChange} disabled={isSubmitting}>
                {yesNoOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Lack of acceptance by family</label>
              <select name="lackOfAcceptanceByFamily" value={formData.lackOfAcceptanceByFamily} onChange={handleChange} disabled={isSubmitting}>
                {yesNoOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Mental Illness</label>
              <select name="mentalIllness" value={formData.mentalIllness} onChange={handleChange} disabled={isSubmitting}>
                {yesNoOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Family Dispute</label>
              <select name="familyDispute" value={formData.familyDispute} onChange={handleChange} disabled={isSubmitting}>
                {yesNoOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Community Dispute</label>
              <select name="communityDispute" value={formData.communityDispute} onChange={handleChange} disabled={isSubmitting}>
                {yesNoOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Loss of Primary Caregiver</label>
              <select name="lossOfPrimaryCaregiver" value={formData.lossOfPrimaryCaregiver} onChange={handleChange} disabled={isSubmitting}>
                {yesNoOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Abuse</label>
              <select name="abuse" value={formData.abuse} onChange={handleChange} disabled={isSubmitting}>
                {yesNoOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Physical Injury</label>
              <input type="text" name="physicalInjury" value={formData.physicalInjury} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Lack of medical compliance</label>
              <select name="lackOfMedicalCompliance" value={formData.lackOfMedicalCompliance} onChange={handleChange} disabled={isSubmitting}>
                {yesNoOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Romantic relationship</label>
              <select name="romanticRelationship" value={formData.romanticRelationship} onChange={handleChange} disabled={isSubmitting}>
                {yesNoOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Spiritual Pathways</label>
              <input type="text" name="spiritualPathways" value={formData.spiritualPathways} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Financial loss</label>
              <select name="financialLoss" value={formData.financialLoss} onChange={handleChange} disabled={isSubmitting}>
                {yesNoOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Poverty</label>
              <select name="poverty" value={formData.poverty} onChange={handleChange} disabled={isSubmitting}>
                {yesNoOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>History of employment</label>
              <input type="text" name="historyOfEmployment" value={formData.historyOfEmployment} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>History of employment - cleaned</label>
              <input type="text" name="historyOfEmploymentCleaned" value={formData.historyOfEmploymentCleaned} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Income (PM)</label>
              <input type="text" name="incomePM" value={formData.incomePM} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Previous treatment</label>
              <input type="text" name="previousTreatment" value={formData.previousTreatment} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>History of abuse</label>
              <select name="historyOfAbuse" value={formData.historyOfAbuse} onChange={handleChange} disabled={isSubmitting}>
                {yesNoOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Type of abuse</label>
              <input type="text" name="typeOfAbuse" value={formData.typeOfAbuse} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group required-field">
              <label>Current Status</label>
              <select name="currentStatus" value={formData.currentStatus} onChange={handleChange} className={errors.currentStatus ? 'error' : ''} disabled={isSubmitting}>
                {currentStatusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
              {errors.currentStatus && <span className="error-message">{errors.currentStatus}</span>}
            </div>
            <div className="form-group">
              <label>Date of exit</label>
              <input type="date" name="dateOfExit" value={formData.dateOfExit} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>DOS</label>
              <input type="text" name="dos" value={formData.dos} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Reintegrated to</label>
              <input type="text" name="reintegratedTo" value={formData.reintegratedTo} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Reintegrated_State</label>
              <input type="text" name="reintegratedState" value={formData.reintegratedState} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Reintegrated_District</label>
              <input type="text" name="reintegratedDistrict" value={formData.reintegratedDistrict} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Follow up status</label>
              <input type="text" name="followUpStatus" value={formData.followUpStatus} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Family structure</label>
              <input type="text" name="familyStructure" value={formData.familyStructure} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>No of children</label>
              <input type="text" name="noOfChildren" value={formData.noOfChildren} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Children Gender and age</label>
              <input type="text" name="childrenGenderAndAge" value={formData.childrenGenderAndAge} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Gender of parents with MI</label>
              <input type="text" name="genderOfParentsWithMI" value={formData.genderOfParentsWithMI} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Primary -CG</label>
              <input type="text" name="primaryCG" value={formData.primaryCG} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>CG-Relationship</label>
              <input type="text" name="cgRelationship" value={formData.cgRelationship} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>CG- Age</label>
              <input type="text" name="cgAge" value={formData.cgAge} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Occupation of CG</label>
              <input type="text" name="occupationOfCG" value={formData.occupationOfCG} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Income -CG</label>
              <input type="text" name="incomeCG" value={formData.incomeCG} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Current Occupation of client</label>
              <input type="text" name="currentOccupationOfClient" value={formData.currentOccupationOfClient} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Client Income</label>
              <input type="text" name="clientIncome" value={formData.clientIncome} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Social Entitlement</label>
              <input type="text" name="socialEntitlement" value={formData.socialEntitlement} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Aadhar Card</label>
              <input type="text" name="aadharCard" value={formData.aadharCard} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Disability Card</label>
              <input type="text" name="disabilityCard" value={formData.disabilityCard} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Ration Card</label>
              <input type="text" name="rationCard" value={formData.rationCard} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Voter ID</label>
              <input type="text" name="voterID" value={formData.voterID} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Bank Account</label>
              <input type="text" name="bankAccount" value={formData.bankAccount} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Driving license</label>
              <input type="text" name="drivingLicense" value={formData.drivingLicense} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Aftercare Status</label>
              <input type="text" name="aftercareStatus" value={formData.aftercareStatus} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Treatment option</label>
              <input type="text" name="treatmentOption" value={formData.treatmentOption} onChange={handleChange} disabled={isSubmitting} />
            </div>
          </div>
        </div>
        <div className="button-group">
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Form'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MastersheetForm; 