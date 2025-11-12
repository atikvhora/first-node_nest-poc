import { Module } from '@nestjs/common';
import { PatientDignosisService } from './patient-dignosis.service';
import { PatientDignosisController } from './patient-dignosis.controller';

@Module({
  providers: [PatientDignosisService],
  controllers: [PatientDignosisController],
})
export class PatientDignosisModule {}
