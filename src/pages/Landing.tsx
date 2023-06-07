import React from 'react';
import Navbar from "../components/navbar/Navbar";
import Layout from '../layouts/Layout'

const Landing = () => {
    return (
        <Layout>
            <div className="bg-emerald-50 h-screen flex items-center justify-center text-4xl ">
                <div className="animate-bounce shadow-sm">
                    Welcome to Nutricore
                </div>
            </div>
        </Layout>
    );
};

export default Landing;