import React, {useCallback, useEffect, useMemo, useState} from 'react'
import Table from '../components/Table';
import Heading from "../components/Heading";
import {db} from '../firebase'
import {collection, getDocs} from 'firebase/firestore';
import Button from "../components/Button";
import useUserRegisterModal from "../hooks/useUserRegisterModal";
import {AiOutlinePlus} from "react-icons/ai";
import {toast} from "react-hot-toast";
import Layout from "../layouts/Layout";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const collectionRef = useMemo(() => collection(db, 'users'), []);

    const userRegisterModal = useUserRegisterModal();

    const fetchFirestoreUsers = useCallback(async () => {
        await getDocs(collectionRef).then((user) => {
            let userData = user.docs.map((doc) => ({...doc.data(), id: doc?.id}));
            setUsers(userData);
        }).catch((err) => {
            console.log(err);
            toast.error(err.message)
        })

    }, [collectionRef])

    useEffect(() => {
        fetchFirestoreUsers();
    }, [collectionRef, fetchFirestoreUsers]);

    const columns = [
        // {
        //     header: 'Image',
        //     accessorKey: 'image',
        //     // eslint-disable-next-line react/prop-types
        //     Cell: ({cell: {value}}) => (
        //         <div className="mr-3">
        //             eh
        //             <img
        //                 src={value} alt={value}
        //             />
        //         </div>
        //     )
        // },
        {header: 'Name', accessorKey: 'name'},
        {header: 'Email', accessorKey: 'email'},
        {header: 'Role', accessorKey: 'role'},
    ];


    return (
        <Layout>
            <Heading title="Admin Dashboard"/>
            <div className="flex flex-col px-6">
                <div className="w-full flex justify-end">
                    <div className="w-56 mb-3">
                        <Button label="Add Sales Person" icon={AiOutlinePlus} onClick={userRegisterModal.onOpen}/>
                    </div>
                </div>
                <Table columns={columns} data={users}/>
            </div>
        </Layout>
    )
}

export default AdminDashboard