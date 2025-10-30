import { DrizzleService } from '../db/drizzle.service';
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
export declare class PatientsService {
    private readonly drizzleService;
    constructor(drizzleService: DrizzleService);
    create(data: CreatePatientDto): Promise<Patient>;
    findAll(): Promise<Patient[]>;
    findOne(id: number): Promise<Patient>;
    update(id: number, data: UpdatePatientDto): Promise<Patient>;
    remove(id: number): Promise<boolean>;
}
