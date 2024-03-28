import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaDatabaseService } from './database/database.service';

@Controller()
export class AppController {
  
  public constructor(private readonly prisma: PrismaDatabaseService) { }

  @Get('/')

  public async getHello() {
    return {
      name: "Aldo Ratmawan"
    }
  }
}
