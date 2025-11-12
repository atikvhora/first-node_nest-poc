import { IsInt, IsNotEmpty, IsString, IsDateString, isString } from 'class-validator';

export class CreateLabTestDto {
  @IsInt()
  patientId: number;

  @IsString()
  @IsNotEmpty()
  testName: string;

  @IsDateString()
  testDate: string;

  @IsString()
  @IsNotEmpty()
  results: string;

  @IsString()
  test_description: string;

  @IsString()
  test1: string;
}
