import React from 'react';
import Navbar from "../components/navbar/Navbar";

const Landing = () => {
    return (
        <>
            <Navbar landing />
            <div className="bg-emerald-50 h-screen flex items-center justify-center text-4xl ">
                <div className="animate-bounce shadow-sm">
                    Welcome to Nutricore
                </div>
            </div>
        </>
    );
};

export default Landing;