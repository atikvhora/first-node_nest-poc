import { IsString, IsOptional } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  address1: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  pincode?: string;

  @IsOptional()
  @IsString()
  country?: string;
}
