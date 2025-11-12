import { Injectable, NotFoundException } from '@nestjs/common';
import { DrizzleService } from '../../db/drizzle.service'; // Your Drizzle database provider
import { patientDignosis } from '../../db/schema';
import { DignosisDto } from '../dto/dignosis.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class PatientDignosisService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async create(dto: DignosisDto) {
    console.log("createdignosis", dto)
    const [{ id }] = await this.drizzleService.db
      .insert(patientDignosis)
      .values({
        patient_id: dto.patientId,
        disease: dto.disease,
        dignosisType: dto.dignosisType,
        doctorName: dto.doctorName,
      })
      .returning({ id: patientDignosis.id });
    return { id, ...dto };
  }

  async findAll() {
    return this.drizzleService.db.select().from(patientDignosis);
  }

  async findOne(id: number) {
    const cases = await this.drizzleService.db
      .select()
      .from(patientDignosis)
      .where(eq(patientDignosis.id, id));
    if (cases.length === 0) throw new NotFoundException('Case not found');
    return cases[0];
  }

  async update(id: number, dto: Partial<DignosisDto>) {
    const updated = await this.drizzleService.db
      .update(patientDignosis)
      .set(dto)
      .where(eq(patientDignosis.id, id))
      .returning();

    if (updated.length === 0) throw new NotFoundException('Case not found');
    return updated[0];
  }

  async remove(id: number) {
    const deleted = await this.drizzleService.db
      .delete(patientDignosis)
      .where(eq(patientDignosis.id, id))
      .returning();
    if (deleted.length === 0) throw new NotFoundException('Case not found');
    return true;
  }
}
