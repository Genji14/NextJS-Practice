import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import { UserPlus2 } from 'lucide-react';
import SearchToolbar from './SearchToolbar';

const HandleBar = () => {
    return (
        <div className="w-full flex justify-end gap-2">
            <SearchToolbar />
            <Link href="/add">
                <Button className="gap-2">
                    <UserPlus2 className="w-5 h-5" />
                    <span>Add User</span>
                </Button>
            </Link>
        </div>
    )
}

export default HandleBar;
