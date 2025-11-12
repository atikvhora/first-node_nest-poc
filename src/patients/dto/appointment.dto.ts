import { IsInt, IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class AppointmentDto {
  @IsInt()
  patientId: number;

  @IsInt()
  doctorId: number;

  @IsDateString()
  appointmentDate: string;

  @IsString()
  status?: string;
}
