import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InterestModule } from './interest/interest.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UserModule,
    InterestModule,
    AuthModule,
  ],
})
export class AppModule {}
