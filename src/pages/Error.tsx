import React from 'react';
import {Link} from "react-router-dom";

const Error = () => {
    return (
        <div className="bg-red-50/30 h-screen flex flex-col items-center justify-center">
            <div className="animate-pulse text-3xl font-sans text-rose-800">
            404 - Page not Found
            </div>

            <div className="mt-4 text-blue-500">
                <Link to="/">
                    Go Back
                </Link>
            </div>
        </div>
    );
};

export default Error;