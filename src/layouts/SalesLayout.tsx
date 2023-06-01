import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Heading from '../components/Heading'

const SalesLayout = ({children}) => {
  return (
    <>
            <Navbar />
            <Heading title='Sales Dashboard'/>
            <div className="pt-28">
                {children}
            </div>
        </>
  )
}

export default SalesLayout