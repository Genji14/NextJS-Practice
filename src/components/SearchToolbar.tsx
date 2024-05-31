import React from 'react'
import { Input } from './ui/input';
import { useUserContext } from '@/lib/context';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const SearchToolbar = () => {

    const { setParams, params } = useUserContext();

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

    return (
        <div className="flex-auto grid gap-2 grid-cols-4">
            <Input name="username" value={params.username ?? ""} placeholder='Search by username...' onChange={(evt) => handleParamsChange(evt.target.name, evt.target.value)} />
            <Input name="fullname" value={params.fullname ?? ""} placeholder='Search by full name ...' onChange={(evt) => handleParamsChange(evt.target.name, evt.target.value)} />
            <Select onValueChange={(value) => handleParamsChange("role", value)} defaultValue={params.role}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Developer">Developer</SelectItem>
                    <SelectItem value="Tester">Tester</SelectItem>
                    <SelectItem value="Devops">Devops</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default SearchToolbar;