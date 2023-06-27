import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  managerId: number;
}
