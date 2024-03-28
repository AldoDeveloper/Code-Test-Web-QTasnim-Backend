import { ForbiddenException, HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request ,Response , NextFunction} from 'express'
import { RequestAuthProtected } from "types/db.type";

@Injectable({})
export class ProtectedAuthJWTMiddleware implements NestMiddleware{

    public constructor(
        private readonly jwt: JwtService,
        private readonly config: ConfigService){}

    public async use(req: RequestAuthProtected, res: Response, next: NextFunction){
        if(req.headers["authorization"]){
            const [type, token] = req.headers['authorization'].split(" ");
            if(type.toLocaleLowerCase() === 'bearer'){
                try{
                    const user = await this.jwt.verifyAsync(token, {
                        secret: this.config.get<string>("JWT.KEY_SECRET")
                    });
                    req.user = user
                    return next();
                }catch(err){
                    throw new ForbiddenException(err)
                }
            }
        }
        throw new HttpException("Unauthorized Token", HttpStatus.UNAUTHORIZED)
    }
}