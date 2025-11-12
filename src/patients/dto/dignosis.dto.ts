import { IsInt, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class DignosisDto {
  @IsInt()
  patientId: number;

  @IsString()
  disease: string;

  @IsString()
  @IsNotEmpty()
  dignosisType: string;

  @IsString()
  @IsNotEmpty()
  doctorName: string;
}
