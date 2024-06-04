"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "./ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "./ui/switch"
import axios from "axios"
import { toast } from "sonner"
import { User } from "@/types/interface"
import { ActiveYn } from "@/types/enum"
import { useUserContext } from "@/lib/context"
import React, { useState } from "react"
import { X } from "lucide-react"

const FormSchema = z.object({
    fullname: z.string().min(1, {
        message: "Full name is required"
    }),
    username: z.string().min(1, {
        message: "Username is required"
    }),
    role: z.string().min(1, {
        message: "Role is required"
    }),
    activeYn: z.enum([ActiveYn.Y, ActiveYn.N], {
        required_error: "Active is required"
    }),
    projects: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one project.",
    }),
})

const EditUserForm = ({ user }: { user: User }) => {

    const { params, fetchUsers } = useUserContext();

    const [proj, setProj] = useState<string>("");

    const [isHidden, setIsHidden] = useState(true);

    const updateForm = useForm<User>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fullname: user.fullname,
            username: user.username,
            role: user.role,
            activeYn: user.activeYn,
            projects: user.projects,
        },
    })


    const handleDeleteProject = (name: string) => {
        updateForm.setValue("projects", updateForm.getValues("projects").filter(proj => proj !== name));
    }

    const handleAddProject = (name: string) => {
        if (name && !updateForm.getValues("projects").includes(name.toUpperCase())) {
            updateForm.setValue("projects", [...updateForm.getValues("projects"), name.toUpperCase()]);
            setProj("");
        }
    }

    async function onSubmit(data: User) {
        try {
            const res = await axios.patch(process.env.NEXT_PUBLIC_SERVER_URL! + "/users/" + user.username, data);
            if (res.status === 200) {
                toast.success("Update User Successfully !!");
                fetchUsers(params);
            }
        } catch (ex) {
            console.error(ex);
        }
    }

    return (
        <Form {...updateForm}>
            <form onSubmit={updateForm.handleSubmit(onSubmit)} className="gap-4  flex flex-col">
                <FormField
                    control={updateForm.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-base">Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Type username..."  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={updateForm.control}
                    name="fullname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-base">Full name</FormLabel>
                            <FormControl>
                                <Input placeholder="Type full name..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={updateForm.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-base">Role</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Developer">Developer</SelectItem>
                                        <SelectItem value="Tester">Tester</SelectItem>
                                        <SelectItem value="Devops">Devops</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={updateForm.control}
                    name="activeYn"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Active</FormLabel>
                                <FormDescription>
                                    Active status let user can login.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value === ActiveYn.Y}
                                    onCheckedChange={(checked) =>
                                        field.onChange(checked ? ActiveYn.Y : ActiveYn.N)
                                    }
                                    aria-readonly
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={updateForm.control}
                    name="projects"
                    render={() => (
                        <FormItem className="my-2">
                            <div className="flex items-center gap-2">
                                <Button variant="outline" type="button" onClick={() => setIsHidden(prev => !prev)}>Add Project</Button>
                                {
                                    !isHidden &&
                                    <>
                                        <Input value={proj} placeholder="Project Name" className="w-full" onChange={(evt) => setProj(evt.target.value)} />
                                        <Button type="button" onClick={() => handleAddProject(proj)}>Add</Button>
                                    </>
                                }
                            </div>

                            <div className="flex flex-wrap items-center gap-2 my-2">
                                {updateForm.getValues("projects").length > 0 && updateForm.getValues("projects").map((project, index: number) => (
                                    <React.Fragment key={index}>
                                        <span className="font-semibold text-xs">
                                            {project}
                                        </span>
                                        <Button type="button" onClick={() => handleDeleteProject(project)} variant={"destructive"} className="w-fit h-fit p-1">
                                            <X className="w-3 h-3" />
                                        </Button>
                                    </React.Fragment>
                                ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Edit User</Button>
            </form>
        </Form>
    )
}

export default EditUserForm;