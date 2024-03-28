import { DynamicModule, Module } from "@nestjs/common";
import { PrismaDatabaseService } from "./database.service";

export type OptionModuleDB = {
    isGlobal ?: boolean,
    username ?: string,
    password ?: string
}

@Module({})
export class PrismaDatabseModule{

    public static register(options: OptionModuleDB) : DynamicModule{
        return{
            module  : PrismaDatabaseService,
            global  : options?.isGlobal,
            imports :[],
            providers: [
                {
                    provide: "PRISMA_MODULE",
                    useValue: options
                },
                PrismaDatabaseService
            ],
            exports: [PrismaDatabaseService]
        }
    }
}