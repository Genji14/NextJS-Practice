import EditUserForm from "@/components/EditUserForm"
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
import { Button } from "@/components/ui/button"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useUserContext } from "@/lib/context"
import { ActiveYn } from "@/types/enum"

import { User } from "@/types/interface"
import { ColumnDef } from "@tanstack/react-table"
import axios from "axios"
import { ArrowUpDown, CheckCircle, Edit2, Trash2, X } from "lucide-react"
import { toast } from "sonner"

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "fullname",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Full name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "projects",
        header: "Projects",
        cell: ({ getValue }) => {
            const projects = getValue<string[]>();
            return (
                <ul>
                    {projects.map((project, index) => (
                        <li key={index}>{project}</li>
                    ))}
                </ul>
            );
        }
    },
    {
        accessorKey: "activeYn",
        header: "Active",
        cell: ({ row }) => {
            const activeYn = row.original.activeYn;
            return (
                <>
                    {activeYn === ActiveYn.Y ? <CheckCircle className='text-lime-500 w-5 h-5' /> : <X className='text-destructive w-5 h-5' />}
                </>
            )
        }
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row, table }) => {
            const user = row.original;
            const { users, setUsers } = useUserContext();

            const handleDelete = async (username: string) => {
                try {
                    await axios.delete(process.env.NEXT_PUBLIC_SERVER_URL! + "/users/" + username);
                    toast.success("Delete user successfully !!!")
                    setUsers(users.filter(user => user.username !== username));
                    table.setPageIndex(0);
                } catch (ex) {
                    console.error(ex);
                }
            }
            return (
                <div className="flex items-center gap-1">
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
                            <EditUserForm user={user} table={table} />
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
                </div>
            )
        },
    },
]