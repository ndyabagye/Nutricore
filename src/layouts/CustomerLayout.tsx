import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Heading from '../components/Heading'


const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <Heading title='CustomerDashboard'/>
            <div className="pt-28">
                {children}
            </div>
        </>
    )
}

export default Layout