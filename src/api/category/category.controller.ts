import { Bind, Body, Controller, Delete, Get, Post, Put, Query, UsePipes } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryProductProps } from "types/db.type";
import { PipeValidationCategory, ValidationRemoveCategory, ValidationUpdateCategory } from "src/pipes/pie.validation.category";

@Controller({version: '1'})

export class CategoryController{

    public constructor(private readonly categoryService: CategoryService) {}

    @Get("find")
    @Bind(Query())
    public async findCategory(query: {product?: string}) {
        return await this.categoryService.getCategory(query?.product);
    }

    @Post("store")
    @Bind(Body())
    @UsePipes(PipeValidationCategory)
    public async storeCategory(body: CategoryProductProps) {
        return await this.categoryService.storeCategory({
            category_name: body.category_name
        })
    }

    @Delete("remove")
    @Bind(Body())
    @UsePipes(ValidationRemoveCategory)
    public async removeCategory(body: {id: string}){
        return await this.categoryService.deleteactegory(body.id);
    }

    @Put("update")
    @Bind(Body())
    @UsePipes(ValidationUpdateCategory)
    public async updateCategory(body: {id: string, body: CategoryProductProps}){
        return await this.categoryService.updateCategory(body.id, body.body)
    }
}