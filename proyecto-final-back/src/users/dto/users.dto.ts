import { IsInt, IsString } from 'class-validator';

export class UsersDto {
  @IsString({ message: 'debes colocar un nombre' })
  name: string;

  @IsString({ message: 'debes colocar un mail' })
  email: string;

  @IsString({ message: 'debes colocar una contraseña' })
  password: string;
}

