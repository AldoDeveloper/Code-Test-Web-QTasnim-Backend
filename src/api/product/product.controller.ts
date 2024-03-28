import { Bind, Body, Controller, Delete, Get, Post, Put, Query, Req, UsePipes } from "@nestjs/common";
import { ProductService } from "./product.service";
import { PipeValidationRemoveProduct, PipeValidationStoreProduct, PipeValidationUpdateProduct } from "src/pipes/pipe.validation.product";
import { ProductProps, RequestAuthProtected } from "types/db.type";

@Controller({version: '1'})

export class ProductController{

    public constructor(private readonly productService: ProductService ){}

    @Get("find")
    @Bind(Query())
    public async findProduct(query: {search?: string, take?: string, sort?: "asc" | "desc"}) {
        return await 
            this
                .productService
                .findProduct(query?.search, query?.take, query.sort)
    }

    @Post("store")
    @Bind(Body())
    @UsePipes(PipeValidationStoreProduct)
    public async storeProduct(body: ProductProps) {
        return await this.productService.storeProduct(body)
    }

    @Delete("remove")
    @Bind(Body())
    @UsePipes(PipeValidationRemoveProduct)
    public async removeProduct(body: {id_product?: string}) {
        return await this.productService.removeProduct(body!.id_product)
    }

    @Put("update")
    @Bind(Body())
    @UsePipes(PipeValidationUpdateProduct)
    public async updateProduct(body: {id_product?: string, body?: ProductProps}){
        return await this.productService.updateProduct(body.id_product, body.body)
    }

    @Get("transaction")
    @Bind(Query())
    public async gruopProduct(query: {start?: string | number, end?: string | number}) {
        return await this.productService.gropBySold(query?.start, query?.end);
    }

    @Get("user")
    @Bind(Req())
    public async getProductUser(req: RequestAuthProtected) {
        return {
            ...req.user
        }
    }
}