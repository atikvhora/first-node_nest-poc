import { Injectable, NotFoundException } from '@nestjs/common';
import { DrizzleService } from '../../db/drizzle.service'; // Your Drizzle database provider
import { medicalRecords } from '../../db/schema';
import { CreateMedicalRecordDto } from '../dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from '../dto/update-medical-record.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class MedicalRecordsService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async create(dto: CreateMedicalRecordDto) {
    const [{ id }] = await this.drizzleService.db
      .insert(medicalRecords)
      .values({
        patientId: dto.patientId,
        recordDate: new Date(dto.recordDate),
        diagnosis: dto.diagnosis,
        treatment: dto.treatment,
      })
      .returning({ id: medicalRecords.id });
    return { id, ...dto };
  }

  async findAll() {
    return this.drizzleService.db.select().from(medicalRecords);
  }

  async findOne(id: number) {
    const rows = await this.drizzleService.db
      .select()
      .from(medicalRecords)
      .where(eq(medicalRecords.id, id));
    if (rows.length === 0) {
      throw new NotFoundException('Medical Record not found');
    }
    return rows[0];
  }

  async update(id: number, dto: UpdateMedicalRecordDto) {
    const updated = await this.drizzleService.db
      .update(medicalRecords)
      .set({
        ...(dto.recordDate && { recordDate: new Date(dto.recordDate) }),
        ...(dto.diagnosis && { diagnosis: dto.diagnosis }),
        ...(dto.treatment && { treatment: dto.treatment }),
      })
      .where(eq(medicalRecords.id, id))
      .returning();

    if (updated.length === 0) throw new NotFoundException('Medical Record not found');
    return updated[0];
  }

  async remove(id: number) {
    const deleted = await this.drizzleService.db
      .delete(medicalRecords)
      .where(eq(medicalRecords.id, id))
      .returning();
    if (deleted.length === 0) throw new NotFoundException('Medical Record not found');
    return true;
  }
}
