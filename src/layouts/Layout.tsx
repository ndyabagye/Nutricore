import React, {useEffect, useState} from 'react';
import Navbar from "../components/navbar/Navbar";
import {useLocation} from "react-router-dom";

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({children}: {
    children: React.ReactNode
}) => {
    const [landing, setLanding] = useState(false);
    const url = useLocation()

    useEffect(() => {
        if (url.pathname === '/') {
            setLanding(true)
        }else{
        setLanding(false)
        }
    }, [url])
    return (
        <>
            <Navbar landing={landing}/>
            <div className={`${landing ? '' : 'pt-28 flex flex-col h-screen'}`}
            >
                {children}
            </div>
        </>
    );
};

export default Layout;