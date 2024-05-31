import { CreateUserForm } from '@/components/CreateUserForm';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react'

const AddUserPage: NextPage = () => {
    return (
        <>
            <Head key="add-user">
                <title>Add User</title>
            </Head>
            <h1 className="text-center font-bold text-2xl text-primary uppercase">Create New User</h1>
            <CreateUserForm />
        </>
    )
}

export default AddUserPage;
