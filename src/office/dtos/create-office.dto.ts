import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOfficeDto {
  @IsNumber()
  @IsOptional()
  id: string;

  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsNumber()
  currencyId: number;
}
