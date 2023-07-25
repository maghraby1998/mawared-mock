import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  // @IsString()
  // @MinLength(8)
  // password: string;

  @IsNumber()
  @IsOptional()
  managerId: number;

  @IsString()
  officeId: number;

  @IsString()
  departmentId: number;

  @IsString()
  positionId: number;

  // @IsBoolean()
  @IsOptional()
  removeImage: boolean;
}
