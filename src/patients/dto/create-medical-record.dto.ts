import { IsInt, IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateMedicalRecordDto {
  @IsInt()
  patientId: number;

  @IsDateString()
  recordDate: string;

  @IsString()
  @IsNotEmpty()
  diagnosis: string;

  @IsString()
  @IsNotEmpty()
  treatment: string;
}
