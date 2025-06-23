import api from '../config/api';

// Outreach Form API calls
export const outreachService = {
    submitForm: (data) => api.post('/forms/outreach', data),
    getForms: (facility) => api.get(`/forms/outreach${facility ? `?facility=${facility}` : ''}`),
    updateForm: (id, data) => api.put(`/forms/outreach/${id}`, data),
    deleteForm: (id) => api.delete(`/forms/outreach/${id}`)
};

// Reintegration Form API calls
export const reintegrationService = {
    submitForm: (data) => api.post('/forms/reintegration', data),
    getForms: (facility) => api.get(`/forms/reintegration${facility ? `?facility=${facility}` : ''}`),
    updateForm: (id, data) => api.put(`/forms/reintegration/${id}`, data),
    deleteForm: (id) => api.delete(`/forms/reintegration/${id}`)
};

// Transactions Form API calls
export const transactionsService = {
    submitForm: (data) => api.post('/forms/transactions', data),
    getForms: (facility) => api.get(`/forms/transactions${facility ? `?facility=${facility}` : ''}`),
    updateForm: (id, data) => api.put(`/forms/transactions/${id}`, data),
    deleteForm: (id) => api.delete(`/forms/transactions/${id}`)
};

// Awareness Meeting Form API calls
export const awarenessService = {
    submitForm: (data) => api.post('/forms/awareness', data),
    getForms: (facility) => api.get(`/forms/awareness${facility ? `?facility=${facility}` : ''}`),
    updateForm: (id, data) => api.put(`/forms/awareness/${id}`, data),
    deleteForm: (id) => api.delete(`/forms/awareness/${id}`)
};

// Hospital Visits Form API calls
export const hospitalVisitsService = {
    submitForm: (data) => api.post('/forms/hospital-visits', data),
    getForms: (facility) => api.get(`/forms/hospital-visits${facility ? `?facility=${facility}` : ''}`),
    updateForm: (id, data) => api.put(`/forms/hospital-visits/${id}`, data),
    deleteForm: (id) => api.delete(`/forms/hospital-visits/${id}`)
};

// Mastersheet Form API calls
export const mastersheetService = {
    submitForm: (data) => api.post('/forms/mastersheet', data),
    getForms: (facility) => api.get(`/forms/mastersheet${facility ? `?facility=${facility}` : ''}`),
    updateForm: (id, data) => api.put(`/forms/mastersheet/${id}`, data),
    deleteForm: (id) => api.delete(`/forms/mastersheet/${id}`)
};

// Export facility data as Excel
export const exportFacilityData = async (facilityId) => {
    const response = await api.get(`/forms/export/facility/${facilityId}`, {
        responseType: 'blob',
    });
    return response;
};

// Export all facilities data as Excel
export const exportAllFacilitiesData = async () => {
    const response = await api.get('/forms/export/all-facilities', {
        responseType: 'blob',
    });
    return response;
};

// Export current user's forms data as Excel
export const exportUserFormsData = async () => {
    const response = await api.get('/forms/export/user-forms', {
        responseType: 'blob',
    });
    return response;
}; 