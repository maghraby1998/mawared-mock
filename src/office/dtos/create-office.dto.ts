import { IsNumber, IsString } from 'class-validator';

export class CreateOfficeDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsNumber()
  companyId: number;
}
