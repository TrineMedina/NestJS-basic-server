import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class AuthDto {
  //!This checks that the email is an email. You have to add useGlobalPipes in main.ts!
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
