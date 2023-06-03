import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './index.css';

import AdminDashboard from "./pages/AdminDashboard";
import SalesDashboard from "./pages/SalesDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import Error from "./pages/Error"
import Landing from "./pages/Landing";
import ProtectedRoute from "./utils/ProtectedRoute";
import LoginModal from "./components/Modals/LoginModal";
import RegisterModal from "./components/Modals/RegisterModal";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <LoginModal/>
            <RegisterModal/>

            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/admin" element={
                    <ProtectedRoute redirectRoute='/admin'>
                    <AdminDashboard />
                    </ProtectedRoute>
                } />
                <Route path="/sales" element={
                    <ProtectedRoute redirectRoute='/sales'>
                    <SalesDashboard />
                    </ProtectedRoute>
                    } />
                <Route path="/customer" element={
                    <ProtectedRoute redirectRoute='/customer'>
                    <CustomerDashboard />
                    </ProtectedRoute>
                } />
                <Route path="*" element={<Error />} />
            </Routes>

        </BrowserRouter>
    </React.StrictMode>,
)
