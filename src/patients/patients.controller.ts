import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { Patient, PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiResponse } from './dto/api-response.dto';

@Controller('patients')
export class PatientsController {
  constructor(private readonly svc: PatientsService) {}

  @Post("AddPatient")
  create(@Body() body: CreatePatientDto) {
    return this.svc.create(body);
  }

  @Get("GetAllPatient")
  findAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) : Promise<ApiResponse<Patient>> {
    const patientData = await this.svc.findOne(id);
    return new ApiResponse(200,"Patient Found", patientData);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatePatientDto) {
    return this.svc.update(id, body);
  }

  @Delete('DeletePatient/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }

  @Post('sp_add_patient')
  async spAddPatient(
    @Body('Name') Name: string,
    @Body('UserName') UserName: string,
    @Body('Email') Email: string,
    @Body('Gender') Gender: string,
    @Body('Phone') Phone: string
  ) {
      return this.svc.spAddPatient(Name, UserName, Email, Gender, Phone);
  }
}
