
export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    address?: string;
    phone_number?: number;
    role: string;
    created_at: Date;
    updated_at: Date;
}

export enum Currency{
    USD = "USD",
    INR = "INR",
}