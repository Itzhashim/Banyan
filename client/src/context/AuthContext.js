import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        const userInfo = localStorage.getItem('user');
        
        if (token && userInfo) {
            setUser(JSON.parse(userInfo));
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            // Get registered users from localStorage
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            
            // Find user with matching email
            const user = registeredUsers.find(u => u.email === credentials.email);
            
            if (!user) {
                return { success: false, error: 'User not found' };
            }

            // Check if role matches
            if (user.role !== credentials.role) {
                return { success: false, error: `Invalid login. Please use ${user.role} login.` };
            }

            // In a real app, we would verify the password here
            const mockToken = 'mock-jwt-token';

            // Store user info in localStorage
            localStorage.setItem('token', mockToken);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            
            return { success: true };
        } catch (error) {
            return { success: false, error: 'Login failed' };
        }
    };

    const register = async (userData) => {
        try {
            // Get existing users
            const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            
            // Check if email already exists
            if (existingUsers.some(user => user.email === userData.email)) {
                return { success: false, error: 'Email already registered' };
            }

            // Create new user object (excluding confirmPassword and adminKey)
            const newUser = {
                name: userData.name,
                email: userData.email,
                password: userData.password, // In a real app, this should be hashed
                facility: userData.facility,
                role: userData.role
            };

            // Add new user to the list
            existingUsers.push(newUser);
            
            // Save updated user list
            localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
            
            return { success: true };
        } catch (error) {
            return { success: false, error: 'Registration failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
        register,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 