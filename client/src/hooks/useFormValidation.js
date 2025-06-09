import { useState } from 'react';

export const useFormValidation = (initialState, validationRules) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});

    const validate = (fieldValues = values) => {
        let tempErrors = { ...errors };
        
        // Only validate fields that are in fieldValues
        Object.keys(fieldValues).forEach(field => {
            if (validationRules[field]) {
                const rules = validationRules[field];
                
                // Required field validation
                if (rules.required && !fieldValues[field]) {
                    tempErrors[field] = rules.required;
                }
                
                // Pattern validation (regex)
                else if (rules.pattern && fieldValues[field] && !rules.pattern.value.test(fieldValues[field])) {
                    tempErrors[field] = rules.pattern.message;
                }
                
                // Min length validation
                else if (rules.minLength && fieldValues[field] && fieldValues[field].length < rules.minLength.value) {
                    tempErrors[field] = rules.minLength.message;
                }
                
                // Max length validation
                else if (rules.maxLength && fieldValues[field] && fieldValues[field].length > rules.maxLength.value) {
                    tempErrors[field] = rules.maxLength.message;
                }
                
                // Min value validation
                else if (rules.min && fieldValues[field] && Number(fieldValues[field]) < rules.min.value) {
                    tempErrors[field] = rules.min.message;
                }
                
                // Max value validation
                else if (rules.max && fieldValues[field] && Number(fieldValues[field]) > rules.max.value) {
                    tempErrors[field] = rules.max.message;
                }
                
                // Custom validation
                else if (rules.custom && !rules.custom.isValid(fieldValues[field], values)) {
                    tempErrors[field] = rules.custom.message;
                }
                
                // If no errors, remove the field from errors object
                else {
                    delete tempErrors[field];
                }
            }
        });

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
        validate({ [name]: value });
    };

    const resetForm = () => {
        setValues(initialState);
        setErrors({});
    };

    return {
        values,
        errors,
        handleChange,
        resetForm,
        setValues,
        validate: () => validate(),
        isValid: Object.keys(errors).length === 0
    };
};

// Example validation rules
export const validationRules = {
    email: {
        required: 'Email is required',
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
        }
    },
    password: {
        required: 'Password is required',
        minLength: {
            value: 6,
            message: 'Password must be at least 6 characters'
        }
    },
    name: {
        required: 'Name is required',
        minLength: {
            value: 2,
            message: 'Name must be at least 2 characters'
        }
    },
    fileNumber: {
        required: 'File number is required',
        pattern: {
            value: /^[A-Za-z0-9-]+$/,
            message: 'File number can only contain letters, numbers, and hyphens'
        }
    },
    date: {
        required: 'Date is required',
        custom: {
            isValid: (value) => !isNaN(Date.parse(value)),
            message: 'Invalid date format'
        }
    },
    phoneNumber: {
        pattern: {
            value: /^[0-9]{10}$/,
            message: 'Phone number must be 10 digits'
        }
    },
    age: {
        min: {
            value: 0,
            message: 'Age cannot be negative'
        },
        max: {
            value: 150,
            message: 'Invalid age'
        }
    }
}; 