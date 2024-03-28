import { BadRequestException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaDatabaseService } from "src/database/database.service";
import { ProductProps } from "types/db.type";

@Injectable({})

export class ProductService {

    public constructor(private readonly db: PrismaDatabaseService) { }

    public async findProduct(search: string, take?: string, sort?: "asc" | "desc") {
        return this.db.product.findMany({
            take: take ? parseInt(take) : 10,
            where: {
                OR: search ? [
                    {
                        product_name: {
                            contains: search,
                        },
                    },
                    {
                        product_description: {
                            contains: search
                        }
                    }
                ] : undefined,
            },
            include: {
                category: true,
                media: true
            },
            orderBy: {
                craeted_at: sort
            }
        })
    }

    public async storeProduct(body: ProductProps) {

        try {
            return await this.db.product.create({
                data: {
                    id_category: body.id_category,
                    product_name: body.product_name,
                    product_description: body.product_description,
                    product_sold: body.product_sold,
                    product_stock: body.product_stock,
                }
            })
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code == 'P2003' || err.code == "P2002") {
                    throw new BadRequestException(err.meta)
                }
            }
            throw new BadRequestException(err.message)
        }
    }

    public async removeProduct(id_product: string) {
        try {
            return await this.db.product.delete({
                where: { id: id_product }
            })
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                throw new BadRequestException(err.meta)
            }
            throw new BadRequestException(err?.message)
        }
    }

    public async updateProduct(id_product: string, body: ProductProps) {
        try {
            return await this.db.product.update({
                where: {
                    id: id_product
                },
                data: { ...body }
            })
        }
        catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                throw new BadRequestException(err.meta)
            }
            throw new BadRequestException(err?.message)
        }
    }

    public async gropBySold(start?: string | number | Date, end?: string | number | Date) {

        const group = await this.db.product.aggregate({
            where: {
                craeted_at: start && end ? {
                    gte: new Date(start),
                    lte: new Date(end)
                } : undefined
            },

            _count: {
                product_sold: true,
                product_stock: true
            },

            _min: {
                product_sold: true,
                product_stock: true
            },

            _avg: {
                product_sold: true,
                product_stock: true
            },

            _max: {
                product_sold: true,
                product_stock: true
            },
            _sum: {
                product_sold: true,
                product_stock: true
            },
        });

        if (group._max.product_sold === null || group._min.product_sold == null || group._max.product_stock == null || group._min.product_stock == null) {
            return {
                group,
                penjual_terbanyak: [],
                penjual_terndah: [],
                stock_terbanyak: [],
                stock_terendah: [],
            }
        } else {
            
            const penjual_terbanyak = await this.db.product.findMany({
                where: { product_sold: group._max.product_sold ? group._max.product_sold : undefined },
            });

            const penjual_terndah = await this.db.product.findMany({
                where: { product_sold: group._min.product_sold ? group._min.product_sold : undefined }
            });

            const stock_terbanyak = await this.db.product.findMany({
                where: { product_stock: group._max.product_stock ? group._max.product_stock : undefined }
            });

            const stock_terendah = await this.db.product.findMany({
                where: { product_stock: group._min.product_stock ? group._min.product_stock : undefined }
            });

            return { group, penjual_terbanyak, penjual_terndah, stock_terbanyak, stock_terendah }
        }
    }
}