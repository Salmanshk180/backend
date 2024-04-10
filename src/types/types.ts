
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

export interface Cart_Product{
    product_variant_id: string;
    quantity: number;
    subtotal: number;
}

export enum SizeType {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
    EXTRA_LARGE = 'extra large'
}
