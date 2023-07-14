import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBusinessPartnerDto {
  @IsString()
  // @IsNotEmpty()
  name: string;

  @IsString()
  // @IsNotEmpty()
  email: string;
}
