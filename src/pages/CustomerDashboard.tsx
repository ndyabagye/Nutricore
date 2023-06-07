import React from 'react'
import Table from '../components/Table';
import Heading from "../components/Heading";
import Layout from "../layouts/Layout";
import {db} from '../firebase';
import {collection, getDocs} from "firebase/firestore";
import {toast} from "react-hot-toast";
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