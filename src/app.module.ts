import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';
import { Movie } from './movie/entities/movie.entity';
// import { Redis } from 'ioredis';
// import {UserModule}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'docker',
      username: 'postgres',
      entities: [User, Movie],
      database: 'nest-clean',
      synchronize: true,
      logging: false,
    }),
    UserModule,
    AuthModule,
    MovieModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: 'REDIS_CLIENT',
    //   useFactory: () => {
    //     return new Redis({
    //       host: 'localhost',
    //       port: 6379,
    //     });
    //   },
    // },
  ],
  // exports: ['REDIS_CLIENT'],
})
export class AppModule {}
