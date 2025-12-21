import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  public async signUp(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  public async login(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }
}
