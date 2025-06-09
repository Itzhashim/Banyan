import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/forms.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'user'
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const result = await login(formData);
            if (result.success) {
                // Redirect based on role
                if (formData.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
            } else {
                setError(result.error || 'Invalid credentials');
            }
        } catch (err) {
            setError('Failed to login. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-header">
                    <h2>Welcome Back</h2>
                    <p>Please login to continue</p>
                </div>

                <div className="role-selector">
                    <button 
                        className={`role-button ${formData.role === 'user' ? 'active' : ''}`}
                        onClick={() => handleChange({ target: { name: 'role', value: 'user' } })}
                        type="button"
                    >
                        User Login
                    </button>
                    <button 
                        className={`role-button ${formData.role === 'admin' ? 'active' : ''}`}
                        onClick={() => handleChange({ target: { name: 'role', value: 'admin' } })}
                        type="button"
                    >
                        Admin Login
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && <div className="error-message">{error}</div>}
                    
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button type="submit" className="submit-button">
                        Login as {formData.role === 'admin' ? 'Admin' : 'User'}
                    </button>

                    <p className="auth-link">
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login; 