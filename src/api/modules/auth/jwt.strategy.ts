import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConstants } from '../../common/constants/jwt.constant';
import { IJwtPayload } from '../../common/interfaces/jwt-payload.interface';
import { IPassportUser } from '../../common/interfaces/passport-user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtConstants.authConfig.secret,
    });
  }

  async validate(payload: IJwtPayload): Promise<IPassportUser> {
    return { 
      id: payload.id, 
      email: payload.email, 
    };
  }
}
