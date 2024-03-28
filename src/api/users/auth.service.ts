import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaDatabaseService } from "src/database/database.service";
import { UserFromRegister } from "types/db.type";
import { hash, compare} from 'bcrypt'
import { Prisma } from "@prisma/client";
import { ConfigService } from "@nestjs/config";

const SALT_ARROUND = 10;

@Injectable({})
export class AuthUserService {

    public constructor(
        private readonly db: PrismaDatabaseService,
        private readonly jwt: JwtService,
        private readonly config : ConfigService) {

    }

    public async signAccount({email, password}: {email : string, password: string}) {

        const findUser = await this.db.user.findFirst({
            where:{ email: email }
        });

        if(findUser){
            const comparePassword = await compare(password, findUser.password);
            if(comparePassword){
                const access_token =  await this.jwt.signAsync({
                    id: findUser.id,
                    name: findUser.name,
                    email: findUser.email,
                    email_verified_at : findUser.email_verified_at
                }, { secret: this.config.get<string>("JWT.KEY_SECRET") });

                return{
                    code: "200",
                    error: false,
                    access_token
                }
            }
            throw new HttpException("password tidak benar", HttpStatus.BAD_REQUEST)
        }
        throw new HttpException("user tidak ada", HttpStatus.BAD_REQUEST)
    }

    public async registerAccount(body: UserFromRegister) {
        try {
            const hashingPassword = await hash(body!.password, SALT_ARROUND);
            return await this.db.user.create({
                data: {
                    name: body.name,
                    email: body.email,
                    email_verified_at: body.email_verified_at,
                    password: hashingPassword
                }
            })
        }catch(err){
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                throw new BadRequestException(err.meta)
            }
            throw new BadRequestException(err?.message)
        }
    }
}