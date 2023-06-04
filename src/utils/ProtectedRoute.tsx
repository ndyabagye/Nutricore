import React from 'react';
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import { useAuthValue } from "../context/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode,
    redirectRoute: String,
    allowedRoles: string[] | any,
}

const ProtectedRoute:React.FC<ProtectedRouteProps> = ({children, redirectRoute, allowedRoles}) => {
    const {currentUser} = useAuthValue();
    const navigate = useNavigate();

    if (!currentUser) {
        return <Navigate to={redirectRoute} replace />
    }else{
        return allowedRoles.find((role) => currentUser.role.includes(role)) ? (
            children ? children : <Outlet />
          ) : currentUser?.name ? (
            <Navigate to={redirectRoute}  replace />
          ) : (
            <Navigate to="/"  replace />
          );
    }
};

export default ProtectedRoute;