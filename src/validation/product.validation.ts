import { Category, Product } from '@prisma/client'
import * as Joi from 'joi'

export const CategoryProductValidation = Joi.object<Category>({
    category_name : Joi.string().required().max(255),
})

export const CategoryUpdateProps = Joi.object({
    id   : Joi.string().required(),
    body : Joi.object({
        category_name : Joi.string().required()
    }).required()
})

export const ProductValidation = Joi.object<Product>({
    id_category: Joi.string().required(),
    product_name : Joi.string().required(),
    product_description : Joi.string().required(),
    product_stock: Joi.number().required(),
    product_sold: Joi.number().required(),
})

export const ProductRemoveProps = Joi.object({
    id_product   : Joi.string().required()
})

export const ProductUpdateProps = Joi.object({
    id_product : Joi.string().required(),
    body : Joi.object<Product>({
        id_category: Joi.string(),
        product_name : Joi.string(),
        product_description : Joi.string(),
        product_stock: Joi.number(),
        product_sold: Joi.number(),
    }).required()
})