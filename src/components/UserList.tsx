import React, { useEffect } from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios'
import { CheckCircle, Edit2, Loader2, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { User } from '@/types/interface';
import { useUserContext } from '@/lib/context';
import { ActiveYn } from '@/types/enum'
import dynamic from 'next/dynamic'
import DataTable from '@/pages/DataTable'
import { columns } from '@/pages/columns'


const EditUserForm = dynamic(() => import('./EditUserForm'), {
    loading: () => <p className='text-center'>Loading...</p>,
})

const UserList = ({ data }: { data: User[] }) => {

    const { users, setUsers, isLoading } = useUserContext();

    const handleDelete = async (username: string) => {
        try {
            await axios.delete(process.env.NEXT_PUBLIC_SERVER_URL! + "/users/" + username);
            toast.success("Delete user successfully !!!")
            setUsers(users.filter(user => user.username !== username));
        } catch (ex) {
            console.error(ex);
        }
    }

    return (
        <>
            {
                isLoading ? <div className="flex justify-center">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                </div> : <DataTable columns={columns} data={data} />

            }
        </>
    )
}

export default UserList;
