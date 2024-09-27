import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const entitiesPath = __dirname + "/../**/entities/*.entity{.ts,.js}";
        console.log("Entities Path:", entitiesPath);
        return {
          type: "postgres",
          host: configService.get("DATABASE_HOST"),
          port: configService.get("DATABASE_PORT"),
          username: configService.get("DATABASE_USERNAME"),
          password: configService.get("DATABASE_PASSWORD"),
          database: configService.get("DATABASE_NAME"),
          entities: [entitiesPath],
          synchronize: process.env.NODE_ENV !== "production",
        };
      },
    }),
  ],
})
export class DatabaseModule {}
