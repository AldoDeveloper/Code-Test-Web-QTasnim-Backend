import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ProductRemoveProps, ProductUpdateProps, ProductValidation } from "src/validation/product.validation";


@Injectable({})
export class PipeValidationStoreProduct implements PipeTransform{
    public async transform(value: any, metadata: ArgumentMetadata) {
        try{
            const valueValidation = await ProductValidation.validateAsync(value);
            return valueValidation;
        }catch(err){
            throw new BadRequestException(err?.message)
        }
    }
}

@Injectable({})
export class PipeValidationRemoveProduct implements PipeTransform{
    public async transform(value: any, metadata: ArgumentMetadata) {
        try{
            const valueValidation = await ProductRemoveProps.validateAsync(value);
            return valueValidation;
        }catch(err){
            throw new BadRequestException(err?.message)
        }
    }
}

@Injectable({})
export class PipeValidationUpdateProduct implements PipeTransform{
    public async transform(value: any, metadata: ArgumentMetadata) {
        try{
            const valueValidation = await ProductUpdateProps.validateAsync(value);
            return valueValidation;
        }catch(err){
            throw new BadRequestException(err?.message)
        }
    }
}