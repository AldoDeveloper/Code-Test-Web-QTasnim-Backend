import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from '@prisma/client'

@Injectable({})

export class PrismaDatabaseService extends PrismaClient implements OnModuleInit{

    private logger : Logger = new Logger(PrismaDatabaseService.name);
    
    public constructor(@Inject("PRISMA_MODULE") private readonly option: Record<string, any>){
        super()
    }

    public async onModuleInit() : Promise<void> {
        this.logger.log("Prisma Database Connected");
        await this.$connect();
    }

    public async disconected() {
        return await this.$disconnect();
    }
}