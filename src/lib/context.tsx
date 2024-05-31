
import { useDebounce } from '@/hooks/userDebounce';
import { SearchParams, User } from '@/types/interface';
import axios from 'axios';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';

interface IUserContext {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    params: SearchParams;
    setParams: React.Dispatch<React.SetStateAction<SearchParams>>;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [params, setParams] = useState<SearchParams>({});

    const debounceParams = useDebounce(params, 500);

    useEffect(() => {
        fetchUsers(debounceParams);
    }, [debounceParams])

    const fetchUsers = async (params?: SearchParams) => {
        setIsLoading(true);
        try {
            const res = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL! + "/users/search", {
                params: params
            });
            setUsers(res.data.data);
        } catch (ex) {
            toast.error("Network Error");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <UserContext.Provider value={{ users, setUsers, isLoading, setIsLoading, params, setParams }}>
            {children}
        </UserContext.Provider>
    );
};


export const useUserContext = (): IUserContext => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext phải được dùng trong UserProvider');
    }
    return context;
};
