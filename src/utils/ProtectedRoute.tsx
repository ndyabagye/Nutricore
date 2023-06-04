import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import { useAuthValue } from "../context/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode,
    redirectRoute: String,
}

const ProtectedRoute:React.FC<ProtectedRouteProps> = ({children, redirectRoute}) => {
    const {currentUser} = useAuthValue();

    if (!currentUser) {
        return <Navigate to={redirectRoute} replace />
    }
    return children ? children : <Outlet />;
};

export default ProtectedRoute;