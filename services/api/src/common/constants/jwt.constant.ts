import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import type { StringValue } from 'ms';

interface IAuthConfig {
  secret: string;
  expiresIn: StringValue;
}

const secret = process.env.AUTH_SECRET_KEY ?? (() => {
  throw new Error('AUTH_SECRET_KEY missing');
})();

export class JwtConstants {
  public static get authConfig(): IAuthConfig {
    return {
      secret,
      expiresIn: '24h',
    };
  }

  public static get authConfigAsync(): JwtModuleAsyncOptions {
    return {
      useFactory: () => {
        return {
          secret: this.authConfig.secret,
          signOptions: { expiresIn: this.authConfig.expiresIn },
        };
      },
    };
  }
}
