import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
    const { user, initializing } = useAuth();

    if (initializing) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-lg"></span>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
