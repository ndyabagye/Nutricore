import React from 'react';
import Navbar from "../components/navbar/Navbar";
import Heading from "../components/Heading";

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({children}: {
    children: React.ReactNode
}) => {
    return (
        <>
            <Navbar/>
            <Heading title='Dashboard'/>
            <div className="pb-20 pt-28 flex items-center justify-center h-screen">
                {children}
            </div>
        </>
    );
};

export default Layout;