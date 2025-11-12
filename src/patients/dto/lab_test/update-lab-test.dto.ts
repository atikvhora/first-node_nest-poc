import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateLabTestDto {
  @IsOptional()
  @IsString()
  testName?: string;

  @IsOptional()
  @IsDateString()
  testDate?: string;

  @IsOptional()
  @IsString()
  results?: string;
}
