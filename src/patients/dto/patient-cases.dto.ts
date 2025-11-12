import { IsInt, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreatePatientCaseDto {
  @IsInt()
  patientId: number;

  @IsString()
  @IsNotEmpty()
  caseDescription: string;

  @IsString()
  @IsNotEmpty()
  prescription: string;

  @IsString()
  @IsOptional()
  status?: string;
}
