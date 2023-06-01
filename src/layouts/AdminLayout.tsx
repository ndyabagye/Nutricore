import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Heading from '../components/Heading'

const AdminLayout = ({children}) => {
  return (
    <>
            <Navbar />
            <Heading title='Admin Dashboard'/>
            <div className="pt-28">
                {children}
            </div>
        </>
  )
}

export default AdminLayout