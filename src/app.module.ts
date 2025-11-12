import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { PatientsModule } from './patients/patients.module';
import { DrizzleModule } from './db/drizzle.module';
import { PushNotficationModule } from './notification/push-notification.module';
import { PatientCasesModule } from './patients/case/patient-case.module';
import { PatientDignosisModule } from './patients/digonsis/patient-case.module';
import { AppointmentsModule } from './patients/appointment/appointment.module';
import { MedicalRecordsModule } from './patients/medical-records/medical-records.module';
import { PrescriptionsModule } from './patients/prescription/prescription.module';
import { LabTestsModule } from './patients/lab-test/lab-test.module';

@Module({
  imports: [DrizzleModule, CatsModule, PatientsModule, PushNotficationModule, PatientCasesModule
    , PatientDignosisModule, AppointmentsModule, MedicalRecordsModule, PrescriptionsModule,LabTestsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
