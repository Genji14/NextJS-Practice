import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import { FilterX, UserPlus2 } from 'lucide-react';
import SearchToolbar from './SearchToolbar';
import { useUserContext } from '@/lib/context';

const HandleBar = () => {

    const { setParams, params } = useUserContext();

    function isEmpty(obj: object) {
        return Object.keys(obj).length === 0;
    }


    return (
        <div className="w-full flex justify-between">
            <SearchToolbar />
            <div className="flex gap-2 items-center">
                {
                    !isEmpty(params) && <Button onClick={() => setParams({})} variant="destructive" className="gap-2">
                        <FilterX className="w-5 h-5" />
                        <span>Remove Filter</span>
                    </Button>
                }

                <Link href="/add">
                    <Button className="gap-2">
                        <UserPlus2 className="w-5 h-5" />
                        <span>Add User</span>
                    </Button>
                </Link>
            </div>

        </div>
    )
}

export default HandleBar;
