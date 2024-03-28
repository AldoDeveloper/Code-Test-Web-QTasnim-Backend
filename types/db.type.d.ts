import { Request } from 'express';

export type ProtectedAuthRequest = {
    user:{
        id: string,
        name: string,
        email: string,
        email_verified_at : Date | boolean
    }
}

export type RequestAuthProtected = Request & ProtectedAuthRequest

export type CategoryProductProps = {
    category_name?: string
    created_at ?: any,
    updated_at ?: any
}

export type ProductProps = {
    id_category  ?: string
    product_name ?: string;
    product_description ?: string;
    product_sold ?: number,
    product_stock ?: number;
}

export type UserFromRegister = {
    name        ?: string,
    email       ?: string,
    email_verified_at ?: Date,
    password    ?: string,
    confirm_password ?: string
}