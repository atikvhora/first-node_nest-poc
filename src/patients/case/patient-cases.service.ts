import { Injectable, NotFoundException } from '@nestjs/common';
import { DrizzleService } from '../../db/drizzle.service'; // Your Drizzle database provider
import { patientCases } from '../../db/schema';
import { CreatePatientCaseDto } from '../dto/patient-cases.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class PatientCasesService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async create(dto: CreatePatientCaseDto) {
    const [{ id }] = await this.drizzleService.db
      .insert(patientCases)
      .values({
        patientId: dto.patientId,
        casedescription: dto.caseDescription,
        prescription: dto.prescription,
        status: dto.status || 'open',
      })
      .returning({ id: patientCases.id });
    return { id, ...dto };
  }

  async findAll() {
    return this.drizzleService.db.select().from(patientCases);
  }

  async findOne(id: number) {
    const cases = await this.drizzleService.db
      .select()
      .from(patientCases)
      .where(eq(patientCases.id, id));
    if (cases.length === 0) throw new NotFoundException('Case not found');
    return cases[0];
  }

  async update(id: number, dto: Partial<CreatePatientCaseDto>) {
    const updated = await this.drizzleService.db
      .update(patientCases)
      .set(dto)
      .where(eq(patientCases.id, id))
      .returning();

    if (updated.length === 0) throw new NotFoundException('Case not found');
    return updated[0];
  }

  async remove(id: number) {
    const deleted = await this.drizzleService.db
      .delete(patientCases)
      .where(eq(patientCases.id, id))
      .returning();
    if (deleted.length === 0) throw new NotFoundException('Case not found');
    return true;
  }

   async createPatientCaseWithFunction(patientId: number, casedescription: string, prescription: string, status: string = 'open') {
    // Execute the Function. The way to do this may vary depending on your Drizzle setup.
    // Access the underlying pool to use raw Postgres if needed:
    // @ts-ignore: access private for demonstration purpose, ideally expose it in your DrizzleService

    // raw query
    const result = await this.drizzleService.pool.query('SELECT fn_create_patient_case($1::int, $2::text, $3::text, $4::text) as id'
      ,[patientId, casedescription, prescription, status]);

    return { id: result.rows[0].id };
  }
}
