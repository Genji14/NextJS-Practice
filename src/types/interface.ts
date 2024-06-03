import { ActiveYn } from "./enum";

export interface User {
    username: string;
    fullname: string;
    role: string;
    projects: string[];
    activeYn: ActiveYn;
}

export interface SearchParams {
    username?: string,
    fullname?: string,
    role?: string,
    activeYn?: ActiveYn,
    projects?: string[]
}