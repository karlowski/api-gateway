import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtConstants } from '../../common/constants/jwt.constant';
import { JwtStrategy } from './jwt.strategy';
import { User } from '../../../lib/database/entities/user.entity';

@Module({
  imports: [
    JwtModule.registerAsync(JwtConstants.authConfigAsync),
    TypeOrmModule.forFeature([User]),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
