import React, { useState, useEffect } from "react";
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
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { auth, db, doc, getDoc } from "./firebase";


const App = () => {
    const [currentUser, setCurrentUser] = useState(null);

    const getUserData = async (uid: string | undefined) => {
        if (!uid) return;

        const userRef = doc(db, "users", uid);
        const docSnap = await getDoc(userRef);
        return docSnap.data();
    }

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            const formattedUser = await getUserData(user?.uid);
            setCurrentUser(formattedUser);
        });
    }, [auth]);

    return (
        <BrowserRouter>

            <AuthProvider value={{ currentUser }}>
                <LoginModal />
                <RegisterModal />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                        <Route path="/admin" element={<AdminDashboard/>}/>
                    </Route>
                    <Route element={<ProtectedRoute allowedRoles={["sales"]} />}>
                        <Route path="/sales" element={<SalesDashboard/>}/>
                    </Route>
                    <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
                        <Route path="/customer" element={<CustomerDashboard/>}/>
                    </Route>
                    <Route path="*" element={<Error />} />
                </Routes>
            </AuthProvider>

        </BrowserRouter>
    )
}

export default App