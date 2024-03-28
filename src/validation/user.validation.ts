import * as Joi from "joi";
import { UserFromRegister } from "types/db.type";

export const ValidationRegitserAccount = Joi.object<UserFromRegister>({
    name: Joi.string().required(),
    email: Joi.string().required().email({ tlds: { allow: ['com', 'id', 'net'] } }),
    email_verified_at : Joi.date().default(new Date(Date.now())),
    password: Joi.string().required(),
    confirm_password: Joi.ref("password")
});
