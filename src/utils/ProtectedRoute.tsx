import React from 'react';
import {Navigate, Outlet} from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode,
    isAllowed: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({isAllowed, children, redirectPath = '/'}) => {
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace/>
    }
    return children ? children : <Outlet />;
};

export default ProtectedRoute;