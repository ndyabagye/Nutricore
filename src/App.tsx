import React, {useState, useEffect} from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SalesDashboard from "./pages/SalesDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import Landing from "./pages/Landing";
import Error from "./pages/Error";
import LoginModal from "./components/Modals/LoginModal";
import RegisterModal from "./components/Modals/RegisterModal";
import ProtectedRoute from './utils/ProtectedRoute';
import { AuthProvider } from "./context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const App = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            setCurrentUser(user);
        });
    }, []);
    return (
        <BrowserRouter>
            <LoginModal/>
            <RegisterModal/>

            <AuthProvider value={{currentUser}}>
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
            </AuthProvider>

        </BrowserRouter>
    )
}

export default App