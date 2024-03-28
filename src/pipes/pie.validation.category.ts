import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import * as Joi from "joi";
import { CategoryProductValidation, CategoryUpdateProps } from "src/validation/product.validation";


@Injectable({})

export class PipeValidationCategory implements PipeTransform {

    public async transform(value: any, metadata: ArgumentMetadata) {
        try {
            const validation = await CategoryProductValidation.validateAsync(value);
            return validation
        } catch (err) {
            throw new BadRequestException(err?.message)
        }
    }
}

export class ValidationRemoveCategory implements PipeTransform {

    public async transform(value: any, metadata: ArgumentMetadata) {
        try {
            const valueValidation = await Joi.object({id: Joi.string().required()}).validateAsync(value);
            return valueValidation
        } catch (err) {
            throw new BadRequestException(err?.message)
        }
    }
}

export class ValidationUpdateCategory implements PipeTransform {

    public async transform(value: any, metadata: ArgumentMetadata) {
        try {
            const valueValidation = await CategoryUpdateProps.validateAsync(value)
            return valueValidation
        } catch (err) {
            throw new BadRequestException(err?.message)
        }
    }
}