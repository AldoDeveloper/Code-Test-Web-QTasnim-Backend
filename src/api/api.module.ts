import { Logger, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { ProductModule } from "./product/product.module";
import { CategoryModule } from "./category/category.module";
import { Request, Response, NextFunction} from 'express';
import { CategoryController } from "./category/category.controller";
import { ProductController } from "./product/product.controller";
import { ProtectedAuthJWTMiddleware } from "src/middleware/protected.auth.middleware";
import { AuthUserModule } from "./users/auth.module";

@Module({
    imports:[
        ProductModule,
        CategoryModule,
        AuthUserModule,
        RouterModule.register([
            {
                path: "product",
                module: ProductModule
            },
            {
                path: "category",
                module: CategoryModule
            },
            {
                path : "auth",
                module: AuthUserModule
            }
        ])
    ]
})
export class ApiModule implements NestModule {

    private log : Logger = new Logger(ApiModule.name);

    public configure(consumer: MiddlewareConsumer) {
        consumer.apply(async(req: Request, res: Response, next: NextFunction) => {
            next();
        }, ProtectedAuthJWTMiddleware).forRoutes(
            CategoryController,
            ProductController
        )
    }
}