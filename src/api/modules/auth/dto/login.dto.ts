import { IsEmail, IsEmpty, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmpty()
  @IsString()
  username?: string;

  @IsEmpty()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}