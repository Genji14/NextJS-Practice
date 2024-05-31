"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Switch } from "./ui/switch"
import axios from "axios"
import { toast } from "sonner"
import { useState } from "react"
import { X } from "lucide-react"
import { ActiveYn } from "@/types/enum"
import { User } from "@/types/interface"

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

type Project = { id: string, label: string }

export function CreateUserForm() {

    const [projects, setProjects] = useState<Project[]>(
        [
            {
                id: "D&D",
                label: "D&D",
            },
            {
                id: "OPUS",
                label: "OPUS",
            },
            {
                id: "Tiger",
                label: "Tiger",
            }
        ]
    );

    const [proj, setProj] = useState<Project>({
        id: "",
        label: ""
    });

    const [isHidden, setIsHidden] = useState(true);

    const forms = useForm<User>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fullname: "",
            username: "",
            role: "",
            activeYn: ActiveYn.Y,
            projects: [],
        },
    })

    async function onSubmit(data: User) {
        try {
            const res = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL! + "/users/insert", data);
            if (res.status === 201) {
                toast.success("Create User Successfully !!");
                forms.reset();
            }
        } catch (ex) {
            console.error(ex);
        }
    }

    const handleDeleteProject = (id: string) => {
        setProjects(prev => prev.filter(proj => proj.id !== id));
    }

    const handleAddProject = (proj: Project) => {
        if (proj.id && proj) {
            if (!projects.some(project => proj.id === project.id)) {
                setProjects(prev => [...prev, proj]);
                setProj({
                    id: "",
                    label: ""
                })
            }

        }
    }

    return (
        <Form {...forms}>
            <form onSubmit={forms.handleSubmit(onSubmit)} className="gap-4  flex flex-col w-1/2 container">
                <FormField
                    control={forms.control}
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
                    control={forms.control}
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
                    control={forms.control}
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
                    control={forms.control}
                    name="activeYn"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Active</FormLabel>
                                <FormDescription>
                                    Active status let user can login
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
                    control={forms.control}
                    name="projects"
                    render={() => (
                        <FormItem>
                            {/* <div className="flex justify-between mb-4">
                                <div>
                                    <FormLabel className="text-base font-semibold">Projects</FormLabel>
                                    <FormDescription>
                                        Select the projects.
                                    </FormDescription>
                                </div>
                                <Button variant="outline" type="button" onClick={() => setIsHidden(prev => !prev)}>Add Project</Button>
                            </div> */}
                            {/* {!isHidden &&
                                <div className="grid grid-cols-5 gap-2">
                               
                                </div>
                            } */}

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" type="button">Add Project</Button>

                                </PopoverTrigger>
                                <PopoverContent className="w-96 flex flex-col items-center gap-2">
                                    <h4 className="text-center font-semibold text-lg">Add Projects</h4>
                                    <Input value={proj.id} placeholder="ID" className="w-full" onChange={(evt) => setProj(prev => {
                                        return {
                                            ...prev,
                                            id: evt.target.value
                                        }
                                    })} />
                                    <Input value={proj.label} placeholder="Project Name" className="w-full" onChange={(evt) => setProj(prev => {
                                        return {
                                            ...prev,
                                            label: evt.target.value
                                        }
                                    })} />
                                    <Button className="w-1/2" onClick={() => handleAddProject(proj)} >Add</Button>
                                </PopoverContent>
                            </Popover>
                            <div className="flex flex-wrap items-center gap-2 ">
                                {projects.length > 0 && projects.map((item) => (
                                    <>
                                        <FormField
                                            key={item.id}
                                            control={forms.control}
                                            name="projects"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={item.id}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(item.id)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([...field.value, item.id])
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (value) => value !== item.id
                                                                            )
                                                                        )
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            {item.label}
                                                        </FormLabel>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                        <Button onClick={() => handleDeleteProject(item.id)} variant={"destructive"} className="w-fit h-fit p-1">
                                            <X className="w-3 h-3" />
                                        </Button>
                                    </>

                                ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Create User</Button>
            </form>
        </Form>
    )
}
