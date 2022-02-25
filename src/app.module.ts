import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './auth/google.strategy';
import { MulterModule } from '@nestjs/platform-express';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    UserModule, 
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MulterModule.register({
      dest: './upload/image',
    }),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    StorageModule
  ],
  controllers: [AppController],
  providers: [AppService,GoogleStrategy],
})
export class AppModule {}
