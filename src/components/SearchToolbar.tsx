import React from 'react'
import { Input } from './ui/input';
import { useUserContext } from '@/lib/context';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./ui/popover"
import { Button } from './ui/button';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { ActiveYn } from '@/types/enum';

const SearchToolbar = () => {

    const { setParams, params } = useUserContext();
    const [projectQuery, setProjectQuery] = React.useState('');

    const handleParamsChange = (field: string, value: any) => {
        if (value) {
            setParams((current: any) => {
                return {
                    ...current,
                    [field]: value,
                }
            })
        } else {
            setParams((current: any) => {
                const { [field]: _, ...newParam } = current;
                return newParam;
            })
        }

    }

    const handleAddFilterProject = (query: string) => {
        setParams((current: any) => ({
            ...current,
            projects: [
                ...(current.projects || []),
                query.toUpperCase()
            ]
        }));
        setProjectQuery('');
    }


    return (
        <div className="flex-auto grid gap-2 grid-cols-4">
            <Input name="username" value={params.username ?? ""} placeholder='Search by username...' onChange={(evt) => handleParamsChange(evt.target.name, evt.target.value)} />
            <Input name="fullname" value={params.fullname ?? ""} placeholder='Search by full name ...' onChange={(evt) => handleParamsChange(evt.target.name, evt.target.value)} />
            <Select onValueChange={(value) => handleParamsChange("role", value)} value={params.role ?? ""}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Developer">Developer</SelectItem>
                    <SelectItem value="Tester">Tester</SelectItem>
                    <SelectItem value="Devops">Devops</SelectItem>
                </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-fit">Active</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                        <div className="grid gap-2">
                            <RadioGroup value={params.activeYn ?? undefined} onValueChange={(value) => handleParamsChange("activeYn", value)}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value={ActiveYn.Y} id="activeY" />
                                    <Label htmlFor="activeY">Yes</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value={ActiveYn.N} id="activeN" />
                                    <Label htmlFor="activeN">No</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </PopoverContent>
                </Popover>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-fit">Projects</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-96">
                        <div className="grid gap-2">
                            <div className='flex items-center space-x-2'>
                                <Input onChange={(evt) => setProjectQuery(evt.target.value)} placeholder='Filters by project name...' />
                                <Button onClick={() => handleAddFilterProject(projectQuery)} className='w-fit h-fit'>Filter</Button>
                            </div>
                            <div className="flex flex-wrap gap-2 items-center">
                                <>
                                    {
                                        params.projects && params.projects.map((project: string, index: number) => {
                                            return (
                                                <span key={index} className="px-2.5 py-1.5 bg-primary font-semibold text-white text-xs rounded-md">
                                                    {project}
                                                </span>
                                            )
                                        })
                                    }
                                </>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

        </div>
    )
}

export default SearchToolbar;