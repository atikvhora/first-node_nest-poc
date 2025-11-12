import { Injectable, NotFoundException } from '@nestjs/common';
import { DrizzleService } from '../../db/drizzle.service'; // Your Drizzle database provider
import { appointments } from '../../db/schema';
import { AppointmentDto } from '../dto/appointment.dto';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class AppointmentsService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async create(dto: AppointmentDto) {
    console.log('createappintment', dto)
    const [{ id }] = await this.drizzleService.db
      .insert(appointments)
      .values({
        patientId: dto.patientId,
        doctorId: dto.doctorId,
        appointmentDate: new Date(dto.appointmentDate),
        status: dto.status || 'Scheduled',
      })
      .returning({ id: appointments.id });
    return { id, ...dto };
  }

  async findAll() {
    return this.drizzleService.db.select().from(appointments);
  }

  async findOne(id: number) {
    const rows = await this.drizzleService.db
      .select()
      .from(appointments)
      .where(eq(appointments.id, id));
    if (rows.length === 0) {
      throw new NotFoundException('Appointment not found');
    }
    return rows[0];
  }

  async update(id: number, dto: UpdateAppointmentDto) {
    const updated = await this.drizzleService.db
      .update(appointments)
      .set({
        ...(dto.appointmentDate && { appointmentDate: new Date(dto.appointmentDate) }),
        ...(dto.status && { status: dto.status }),
      })
      .where(eq(appointments.id, id))
      .returning();

    if (updated.length === 0) throw new NotFoundException('Appointment not found');
    return updated[0];
  }

  async remove(id: number) {
    const deleted = await this.drizzleService.db
      .delete(appointments)
      .where(eq(appointments.id, id))
      .returning();
    if (deleted.length === 0) throw new NotFoundException('Appointment not found');
    return true;
  }
}
