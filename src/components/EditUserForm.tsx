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
import { Switch } from "./ui/switch"
import axios from "axios"
import { toast } from "sonner"
import { User } from "@/types/interface"
import { ActiveYn } from "@/types/enum"

const projects = [
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
    },
] as const


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

export function EditUserForm({ user }: { user: User }) {


    const form = useForm<User>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fullname: user.fullname,
            username: user.username,
            role: user.role,
            activeYn: user.activeYn,
            projects: user.projects,
        },
    })

    async function onSubmit(data: User) {
        const updateUser: User = { ...data, activeYn: data.activeYn ? ActiveYn.Y : ActiveYn.N };
        try {
            const res = await axios.patch(process.env.NEXT_PUBLIC_SERVER_URL! + "/users/" + user.username, updateUser);
            console.log(res)
            if (res.status === 200) {
                toast.success("Update User Successfully !!");
            }
        } catch (ex) {
            console.error(ex);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="gap-4  flex flex-col">
                <FormField
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
                    name="projects"
                    render={() => (
                        <FormItem>
                            <div className="mb-4">
                                <FormLabel className="text-base font-semibold">Projects</FormLabel>
                                <FormDescription>
                                    Select the projects.
                                </FormDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                {projects.map((item) => (
                                    <FormField
                                        key={item.id}
                                        control={form.control}
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
