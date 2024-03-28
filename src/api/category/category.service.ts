import { BadRequestException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaDatabaseService } from "src/database/database.service";
import { createSlug } from "src/helpers/helpers";
import { CategoryProductProps } from "types/db.type";


@Injectable({})

export class CategoryService {

    public constructor(private readonly db: PrismaDatabaseService) { }

    public async getCategory(query?: string) {
        if(query){
            if(query === "true"){
                return await this.db.category.findMany({
                    include: {
                        product: true,
                    },
                    orderBy:{
                        craeted_at: "desc"
                    }
                })
            }
        }
        return await this.db.category.findMany()
    }

    public async storeCategory(body: CategoryProductProps) {
        try {
            return await this.db.category.create({
                data: {
                    slugh: createSlug(body.category_name),
                    category_name: body.category_name
                }
            })
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code == 'P2002') {
                    throw new BadRequestException("Duplicated Name Category...")
                }
        }
            throw new BadRequestException(err.message)
        }
    }

    public async deleteactegory(id: string) {
        try {
            return await this.db.category.delete({
                where: {
                    id: id
                }
            })
        } catch (err: any) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                throw new BadRequestException(err.meta)
            }
            throw new BadRequestException("Category id not Found...")
        }
    }

    public async updateCategory(id: string, body: CategoryProductProps) {
        try {
            return await this.db.category.update({
                where: { id: id },
                data: {
                    ...body,
                    slugh: createSlug(body.category_name)
                }
            });
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                throw new BadRequestException(err.meta)
            }
            throw new BadRequestException("Category updated failed...")
        }
    }

}