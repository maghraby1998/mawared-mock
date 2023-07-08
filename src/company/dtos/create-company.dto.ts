import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateBusinessPartnerDto } from 'src/user/dtos/create-business-partner.dto';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @Type(() => CreateBusinessPartnerDto)
  businessPartners: CreateBusinessPartnerDto[];
}
