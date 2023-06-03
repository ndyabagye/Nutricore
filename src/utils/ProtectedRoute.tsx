import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {auth} from "./firebase";

interface ProtectedRouteProps {
    children: React.ReactNode,
    redirectRoute: String,
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children, redirectRoute}) => {

    const user = auth.currentUser;

    if (!user) {
        return <Navigate to={redirectRoute} replace />
    }
    return children ? children : <Outlet />;
};

export default ProtectedRoute;