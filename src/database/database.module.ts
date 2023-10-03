import { Module } from '@nestjs/common';
import { Course } from '../courses/entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from '../courses/entities/tag.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configSevice: ConfigService) => {
        return {
          type: 'postgres',
          host: configSevice.get('DB_HOST'),
          port: Number(configSevice.get('DB_PORT')),
          username: configSevice.get('DB_USER_NAME'),
          password: configSevice.get('DB_PASSWORD'),
          database: configSevice.get('DB_NAME'),
          entities: [Course, Tag],
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
