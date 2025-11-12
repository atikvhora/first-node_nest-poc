import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePrescriptionDto {
  @IsInt()
  medicalRecordId: number;

  @IsString()
  @IsNotEmpty()
  medication: string;

  @IsString()
  @IsNotEmpty()
  dosage: string;

  @IsString()
  @IsNotEmpty()
  frequency: string;
}
