import { Injectable, NotFoundException } from '@nestjs/common';
import { DrizzleService } from '../db/drizzle.service';
import { patients, addresses as addressesTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

export interface Patient {
  id?: number;
  name: string;
  username: string;
  email?: string;
  gender?: string;
  phone?: string;
}

export interface Address {
  id?: number;
  patientId: number;
  address1: string;
  city?: string;
  pincode?: string;
  country?: string;
}

@Injectable()
export class PatientsService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async create(data: CreatePatientDto): Promise<Patient> {
    // extract top-level address fields if provided
    const { address1, city, pincode, country, ...patientData } = data as any;
    const created = await this.drizzleService.db.transaction(async (tx) => {
      const res = await tx.insert(patients).values(patientData).returning();
      const patientRow = res[0];
      const patientRes = { id: patientRow.id };
      // if any address field is present, insert a single address row
      if (address1 || city || pincode || country) {
        await tx.insert(addressesTable).values({ patientId: patientRow.id, address1, city, pincode, country } as any);
      }
      return patientRes;
    });
    return created as Patient;
  }

  async findAll(): Promise<Patient[]> {
    return (await this.drizzleService.db.select().from(patients)) as Patient[];
  }

  async findOne(id: number): Promise<Patient> {
    const rows = await this.drizzleService.db.select().from(patients).where(eq(patients.id, id));
    const row = rows[0];
    if (!row) throw new NotFoundException('Patient not found');
    return row as Patient;
  }

  async update(id: number, data: UpdatePatientDto): Promise<Patient> {
    const { address1, city, pincode, country, addressId, ...patientData } = data as any;
    const updated = await this.drizzleService.db.transaction(async (tx) => {
      const res = await tx.update(patients).set(patientData).where(eq(patients.id, id)).returning();
      if (!res || res.length === 0) throw new NotFoundException('Patient not found');
      const patientRow = res[0];

      // Upsert semantics for single address
      const hasAddressInput = addressId !== undefined || address1 || city || pincode || country;
      if (hasAddressInput) {
        if (addressId !== undefined) {
          // update the address by id, but ensure it belongs to this patient
          const existing = await tx.select().from(addressesTable).where(eq(addressesTable.id, addressId));
          const e = existing[0];
          if (!e || e.patientId !== id) throw new NotFoundException('Address not found for this patient');
          await tx.update(addressesTable).set({ address1, city, pincode, country } as any).where(eq(addressesTable.id, addressId));
        } else {
          // find existing address for patient
          const existing = await tx.select().from(addressesTable).where(eq(addressesTable.patientId, id));
          if (existing && existing.length > 0) {
            // update that address
            await tx.update(addressesTable).set({ address1, city, pincode, country } as any).where(eq(addressesTable.patientId, id));
          } else {
            // insert new address
            await tx.insert(addressesTable).values({ patientId: id, address1, city, pincode, country } as any);
          }
        }
      }

      return patientRow;
    });

    return updated as Patient;
  }

  async remove(id: number): Promise<boolean> {
    const res = await this.drizzleService.db.delete(patients).where(eq(patients.id, id)).returning();
    if (!res || res.length === 0) throw new NotFoundException('Patient not found');
    return true;
  }
  
}
