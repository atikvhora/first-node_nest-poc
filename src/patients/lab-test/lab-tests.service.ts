import { Injectable, NotFoundException } from '@nestjs/common';
import { DrizzleService } from '../../db/drizzle.service';
import { labTests } from '../../db/schema';
import { CreateLabTestDto } from '../dto/lab_test/create-lab-test.dto';
import { UpdateLabTestDto } from '../dto/lab_test/update-lab-test.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class LabTestsService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async create(dto: CreateLabTestDto) {
    const [{ id }] = await this.drizzleService.db
      .insert(labTests)
      .values({
        patientId: dto.patientId,
        testName: dto.testName,
        testDate: new Date(dto.testDate),
        results: dto.results,
        test_description: dto.test_description,
        test1: dto.test1,
      })
      .returning({ id: labTests.id });
    return { id, ...dto };
  }

  async findAll() {
    return this.drizzleService.db.select().from(labTests);
  }

  async findOne(id: number) {
    const rows = await this.drizzleService.db
      .select()
      .from(labTests)
      .where(eq(labTests.id, id));
    if (rows.length === 0) {
      throw new NotFoundException('Lab Test not found');
    }
    return rows[0];
  }

  async update(id: number, dto: UpdateLabTestDto) {
    const updated = await this.drizzleService.db
      .update(labTests)
      .set({
        ...(dto.testName && { testName: dto.testName }),
        ...(dto.testDate && { testDate: new Date(dto.testDate) }),
        ...(dto.results && { results: dto.results }),
      })
      .where(eq(labTests.id, id))
      .returning();

    if (updated.length === 0) throw new NotFoundException('Lab Test not found');
    return updated[0];
  }

  async remove(id: number) {
    const deleted = await this.drizzleService.db
      .delete(labTests)
      .where(eq(labTests.id, id))
      .returning();
    if (deleted.length === 0) throw new NotFoundException('Lab Test not found');
    return true;
  }
}
