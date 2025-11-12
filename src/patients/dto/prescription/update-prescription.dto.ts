import { IsOptional, IsString } from 'class-validator';

export class UpdatePrescriptionDto {
  @IsOptional()
  @IsString()
  medication?: string;

  @IsOptional()
  @IsString()
  dosage?: string;

  @IsOptional()
  @IsString()
  frequency?: string;
}
