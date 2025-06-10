import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/forms.css';

const withDashboardButton = (WrappedComponent) => {
    return (props) => {
        const navigate = useNavigate();
        const [showDashboardButton, setShowDashboardButton] = useState(false);

        const handleDashboardNavigation = () => {
            navigate('/dashboard');
        };

        const onSubmitSuccess = () => {
            // Add a slight delay before showing the button to ensure the success message is seen
            setTimeout(() => {
                setShowDashboardButton(true);
            }, 500);
        };

        const onReset = () => {
            setShowDashboardButton(false);
        };

        return (
            <div>
                <WrappedComponent 
                    {...props} 
                    onSubmitSuccess={onSubmitSuccess}
                    onReset={onReset}
                />
                {showDashboardButton && (
                    <div className="dashboard-button-container">
                        <button
                            onClick={handleDashboardNavigation}
                            className="dashboard-button"
                        >
                            Return to Dashboard
                        </button>
                    </div>
                )}
            </div>
        );
    };
};

export default withDashboardButton; 