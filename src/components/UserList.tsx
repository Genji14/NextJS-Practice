import React, { useEffect, useState } from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import axios from 'axios'
import { Check, CheckCircle, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';

export enum ActiveYn {
    Y = "Y",
    N = "N"
}

export interface User {
    username: string;
    fullname: string;
    role: string;
    projects: string[];
    activeYn: ActiveYn;
}


const UserList = () => {

    const [isClient, setIsClient] = useState(false);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        setIsClient(true);
        fetchUsers();
    }, [])

    const fetchUsers = async (username?: string, fullname?: string, role?: string, activeYn?: ActiveYn, projects?: string[]) => {
        // const projectsReq = projects.length > 0 ? projects.map(proj => proj) : { projects: "" };
        try {
            const res = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL! + "/users/search", {
                params: {
                    username: username,
                    fullname: fullname,
                    role: role,
                    activeYn: activeYn,
                    projects: projects,
                }
            });
            setUsers(res.data.data);
        } catch (ex) {
            toast.error("Network Error");
        }
    }

    const handleDelete = async (username: string) => {
        try {
            await axios.delete(process.env.NEXT_PUBLIC_SERVER_URL! + "/users/" + username);
            toast.success("Delete user successfully !!!")
            fetchUsers();
        } catch (ex) {
            console.error(ex);
        }
    }

    return (
        <>
            {
                isClient && <Table className="bg-card">
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
                                        <TableCell className="w-20">
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
