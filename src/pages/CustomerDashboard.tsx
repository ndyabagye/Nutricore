import React from 'react'
import Heading from "../components/Heading";
import Layout from "../layouts/Layout";
import PricingTable from "../components/PricingTable";

const CustomerDashboard = () => {
  return (
      <Layout>
        <Heading title="Select a subscription plan"/>
          <div className="h-full bg-gradient-to-r from-emerald-200 to-emerald-50 p-12 ">
          <PricingTable/>
          </div>
      </Layout>
  )
}

export default CustomerDashboard
