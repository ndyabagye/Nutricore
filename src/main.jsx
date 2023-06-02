import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css';

import AdminDashboard from "./pages/AdminDashboard";
import SalesDashboard from "./pages/SalesDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import Error from "./pages/Error"
import Landing from "./pages/Landing";
import ProtectedRoute from "./utils/ProtectedRoute";
import RegisterModal from "./components/Modals/RegisterModal";


const user = false
const router = createBrowserRouter([
    {
        path: "/", element:

            <Landing/>
    },
    {
        path: 'admin', element:
            <ProtectedRoute isAllowed={!!user}>
                <AdminDashboard/>
            </ProtectedRoute>
    },
    {
        path: 'sales', element:
            <ProtectedRoute isAllowed={!!user}>
                <SalesDashboard/>
            </ProtectedRoute>
    },
    {
        path: 'customer', element:
            <ProtectedRoute isAllowed={!!user}>
                <CustomerDashboard/>
            </ProtectedRoute>
    },
    {path: '*', element: <Error/>},
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RegisterModal/>

        <RouterProvider router={router}/>

    </React.StrictMode>,
)
