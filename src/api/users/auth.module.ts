import { Module } from "@nestjs/common";
import { AuthUserController } from "./auth.controller";
import { AuthUserService } from "./auth.service";


@Module({
    imports:[],
    controllers:[AuthUserController],
    providers: [AuthUserService],
    exports:[AuthUserService]
})

export class AuthUserModule{
    
}