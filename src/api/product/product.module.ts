import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";

@Module({
    imports: [],
    exports: [],
    controllers:[ProductController],
    providers:[
        ProductService
    ]
})

export class ProductModule{

}