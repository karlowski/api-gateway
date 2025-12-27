import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../../../lib/database/entities/user.entity';
import { IJwtPayload } from '../../common/interfaces/jwt-payload.interface';
import { AuthTokensDto } from './dto/auth-tokens.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) { }

  public async validateUser(
    password: string,
    username?: string,
    email?: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.findUser(username, email);
    if (!user) {
      return null;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return null;
    }

    const { password: _, ...userData } = user;
    return userData;
  }

  public async signUp(signUpDto: SignUpDto): Promise<AuthTokensDto> {
    const { username, email, password } = signUpDto;
    const userByEmail = await this.userRepository.findOneBy({ email });
    const userByUsername = await this.userRepository.findOneBy({ username });

    if (userByEmail || userByUsername) {
      throw new ConflictException('Username or email is already taken (or both)');
    }

    const saltRounds = Number(
      this.configService.get<number>('PASSWORD_SALT_ROUNDS'),
    );
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userEntity = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(userEntity);

    return this.login({ email, password });
  }

  public async login(loginDto: LoginDto): Promise<AuthTokensDto> {
    const { email, username, password } = loginDto;
    const user = await this.validateUser(password, username, email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.generateTokens(user);
  }

  private generateTokens(user: Partial<User>): AuthTokensDto {
    const payload: IJwtPayload = {
      id: Number(user.id),
      email: String(user.email),
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  private async findUser(username?: string, email?: string): Promise<User | null> {
    if (!!username && !!email) {
      return this.userRepository.findOneBy({
        username,
        email,
      });
    }

    if (!!username) {
      return this.userRepository.findOneBy({
        username,
      });
    }

    if (!!email) {
      return this.userRepository.findOneBy({
        email,
      });
    }

    return null;
  }
}
