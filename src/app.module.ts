import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './config/configuration';
import { PrismaDatabseModule } from './database/database.module';
import { ApiModule } from './api/api.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/src/environment/${process.env.NODE_ENV}.env`,
      load:[configuration]
    }),

    PrismaDatabseModule.register({
      isGlobal: true,
      username: "aldo.ratmawan9999@gmail.com",
      password: "aldo1234"
    }),

    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      global: true,
      useFactory: (config: ConfigService) => ({
         global: true,
         secret : config.get<string>("JWT.KEY_SECRET"),
         signOptions:{
           expiresIn: "10 days"
         }
      })
    }),
    ApiModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
  ],
})

export class AppModule {}
