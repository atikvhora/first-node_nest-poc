import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateMedicalRecordDto {
  @IsOptional()
  @IsDateString()
  recordDate?: string;

  @IsOptional()
  @IsString()
  diagnosis?: string;

  @IsOptional()
  @IsString()
  treatment?: string;
}
