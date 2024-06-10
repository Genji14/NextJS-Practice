import React from 'react'

import { useUserContext } from '@/lib/context'

import { Loader2 } from 'lucide-react'
import DataTable from './DataTable';
import { columns } from './Columns';

const UserList = () => {

    const { users, isLoading } = useUserContext();

    return (
        <>
            {
                isLoading ? <div className="flex justify-center mt-10 ">
                    <Loader2 className="w-6 h-16 text-primary animate-spin" />
                </div> : <DataTable columns={columns} data={users} />

            }
        </>
    )
}

export default UserList;
