import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminOverview from './AdminOverview';
import UserProfile from './UserProfile';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const RoleCheck = () => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || roleLoading) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    switch (role) {
        case 'admin':
            return <AdminOverview />;
        case 'rider':
            return <UserProfile />;
        case 'user':
            return <UserProfile />;
        default:
            return <Navigate to="/unauthorized" replace />;
    }
};

export default RoleCheck;