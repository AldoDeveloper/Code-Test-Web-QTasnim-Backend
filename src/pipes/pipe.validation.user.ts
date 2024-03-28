import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { ValidationRegitserAccount } from "src/validation/user.validation";
import * as Joi from 'joi'

@Injectable({})

export class PipeValidationRegitserAccount implements PipeTransform{

    public async transform(value: any, metadata: ArgumentMetadata) {
        try{
            const values = await ValidationRegitserAccount.validateAsync(value);
            return values;
        }catch(err){
            throw new HttpException(err?.message, HttpStatus.BAD_REQUEST)
        }
    }
}

export class PipeValidationSignUser implements PipeTransform{
    public async transform(value: any, metadata: ArgumentMetadata) {
        try{
            const values = await Joi.object({
                email  : Joi.string().required(),
                password: Joi.string().required()
            }).validateAsync(value);

            return values
        }catch(err){
            throw new HttpException(err?.message, HttpStatus.BAD_REQUEST)
        }
    }
}