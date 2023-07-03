import { IsString } from 'class-validator';

export class CreateBusinessPartnerDto {
  @IsString()
  name: string;

  @IsString()
  email: string;
}
