import React from 'react'

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


const EditUserForm = dynamic(() => import('./EditUserForm'), {
    loading: () => <p className='text-center'>Loading...</p>,
})

const UserList = () => {

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
                </div>
                    : <Table className="bg-accent shadow-lg mt-5">
                        <TableCaption>A list of users.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Username</TableHead>
                                <TableHead>Full Name</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Projects</TableHead>
                                <TableHead>Active</TableHead>
                                <TableHead className="w-20"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                users.length > 0 && users.map((user: User, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell className="font-bold">{user.username}</TableCell>
                                            <TableCell>{user.fullname}</TableCell>
                                            <TableCell>{user.role}</TableCell>
                                            <TableCell className="w-36">
                                                <ul className=' list-disc'>
                                                    {
                                                        user.projects.length > 0 && user.projects.map((proj, index) => {
                                                            return <li key={index}>
                                                                {proj}
                                                            </li>
                                                        })
                                                    }
                                                </ul>
                                            </TableCell>
                                            <TableCell>
                                                {user.activeYn === ActiveYn.Y ? <CheckCircle className='text-lime-500 w-5 h-5' /> : <X className='text-destructive w-5 h-5' />}
                                            </TableCell>
                                            <TableCell className="w-40 flex gap-2">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button className="w-fit h-fit p-2">
                                                            <Edit2 className="w-4 h-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="gap-0">
                                                        <DialogHeader>
                                                            <span className="font-bold text-lg">
                                                                Edit User
                                                            </span>
                                                        </DialogHeader>
                                                        <DialogDescription>Change user information.</DialogDescription>
                                                        <hr className="my-4 w-full h-[1px] bg-border" />
                                                        <EditUserForm user={user} />
                                                    </DialogContent>
                                                </Dialog>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button className="w-fit h-fit p-2" variant={"destructive"}>
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently delete user
                                                                and remove your data from our servers.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction className="bg-destructive/90 hover:bg-destructive" onClick={() => handleDelete(user.username)}>Delete</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table >
            }
        </>
    )
}

export default UserList;
