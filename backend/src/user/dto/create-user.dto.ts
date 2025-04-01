import { EGender } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2, {
    message: 'Имя должно содержать хотя бы 2 символа',
  })
  name: string;

  @IsString()
  @MinLength(2, {
    message: 'Фамилия должна содержать хотя бы 2 символа',
  })
  lastname: string;

  @IsString()
  growth: string;

  @IsString()
  weight: string;

  @IsEnum(EGender, {
    message: 'Значение male или female',
  })
  @Transform(({ value }) => ('' + value).toLowerCase())
  gender: EGender;

  @IsString()
  residence: string;
}
