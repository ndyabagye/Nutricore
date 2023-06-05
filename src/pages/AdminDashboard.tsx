import React, {useEffect, useState} from 'react'
import Layout from '../layouts/Layout';
import Table from '../components/Table';
import {fetchdata } from '../hooks/fetchData'

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);


  const fetchProducts = async () => {
    const res = await fetchdata()
    setProducts([...res])
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const columns = [
    {header: 'Image',
      accessorKey: 'image',
      // eslint-disable-next-line react/prop-types
      Cell: ({ cell: { value }}) => (
          <div className="mr-3">
            eh
            <img
                src={value} alt={value}
            />
          </div>
      )
    },
    {header: 'Product ', accessorKey: 'name'},
    {header: 'Active', accessorKey: 'active'},
    {header: 'Type', accessorKey: 'role'},
  ];


  return (
      <Layout>
        <div className="flex">
          <Table columns={columns} data={products}/>
        </div>
      </Layout>
  )
}

export default AdminDashboard