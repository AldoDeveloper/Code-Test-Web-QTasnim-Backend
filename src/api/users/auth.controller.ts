import { Bind, Body, Controller, Post, UsePipes } from "@nestjs/common";
import { AuthUserService } from "./auth.service";
import { PipeValidationRegitserAccount, PipeValidationSignUser } from "src/pipes/pipe.validation.user";
import { UserFromRegister } from "types/db.type";


@Controller({version: '1'})

export class AuthUserController{

    public constructor(private readonly authService: AuthUserService) {}

    @Post("login")
    @Bind(Body())
    @UsePipes(PipeValidationSignUser)
    public async loginUser(body: { email: string, password: string }) {
        return await this.authService.signAccount(body)
    }

    @Post("register")
    @Bind(Body())
    @UsePipes(PipeValidationRegitserAccount)
    public async register(body: UserFromRegister) {
        return await this.authService.registerAccount(body)
    }
}