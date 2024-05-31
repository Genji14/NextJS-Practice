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
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios'
import { CheckCircle, Edit2, Loader2, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { EditUserForm } from './EditUserForm';
import { User } from '@/types/interface';
import { useUserContext } from '@/lib/context';

const UserList = () => {

    const { users, isLoading } = useUserContext();

    const handleDelete = async (username: string) => {
        try {
            await axios.delete(process.env.NEXT_PUBLIC_SERVER_URL! + "/users/" + username);
            toast.success("Delete user successfully !!!")
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
                                                {user.activeYn === "Y" ? <CheckCircle className='text-lime-500 w-5 h-5' /> : <X className='text-destructive w-5 h-5' />}
                                            </TableCell>
                                            <TableCell className="w-40 flex gap-2">
                                                <Dialog>
                                                    <DialogTrigger>
                                                        <Button className="w-fit h-fit p-2">
                                                            <Edit2 className="w-4 h-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <EditUserForm user={user} />
                                                    </DialogContent>
                                                </Dialog>
                                                <Button onClick={() => handleDelete(user.username)} className="w-fit h-fit p-2" variant={"destructive"}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
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
