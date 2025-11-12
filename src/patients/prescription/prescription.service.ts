import { Injectable, NotFoundException } from '@nestjs/common';
import { DrizzleService } from '../../db/drizzle.service';
import { prescriptions } from '../../db/schema';
import { CreatePrescriptionDto } from '../dto/prescription/create-prescription.dto';
import { UpdatePrescriptionDto } from '../dto/prescription/update-prescription.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class PrescriptionService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async create(dto: CreatePrescriptionDto) {
    const [{ id }] = await this.drizzleService.db
      .insert(prescriptions)
      .values({
        medicalRecordId: dto.medicalRecordId,
        medication: dto.medication,
        dosage: dto.dosage,
        frequency: dto.frequency,
      })
      .returning({ id: prescriptions.id });
    return { id, ...dto };
  }

  async findAll() {
    return this.drizzleService.db.select().from(prescriptions);
  }

  async findOne(id: number) {
    const rows = await this.drizzleService.db
      .select()
      .from(prescriptions)
      .where(eq(prescriptions.id, id));
    if (rows.length === 0) {
      throw new NotFoundException('Prescription not found');
    }
    return rows[0];
  }

  async update(id: number, dto: UpdatePrescriptionDto) {
    const updated = await this.drizzleService.db
      .update(prescriptions)
      .set(dto)
      .where(eq(prescriptions.id, id))
      .returning();

    if (updated.length === 0) throw new NotFoundException('Prescription not found');
    return updated[0];
  }

  async remove(id: number) {
    const deleted = await this.drizzleService.db
      .delete(prescriptions)
      .where(eq(prescriptions.id, id))
      .returning();
    if (deleted.length === 0) throw new NotFoundException('Prescription not found');
    return true;
  }
}
