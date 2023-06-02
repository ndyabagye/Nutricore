import React from 'react';
import Navbar from "../components/navbar/Navbar";
import useRegisterModal from "../hooks/useRegisterModal";

const Landing = () => {

    const registerModal = useRegisterModal()

    console.log("The data",registerModal.isOpen);
    return (
        <>
            <Navbar landing/>
        <div className="bg-emerald-50 h-screen flex items-center justify-center text-4xl ">
            <div className="animate-bounce underline">
                Welcome to Nutricore
            </div>
        </div>
        </>
    );
};

export default Landing;