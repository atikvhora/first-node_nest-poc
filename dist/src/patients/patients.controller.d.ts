import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
export declare class PatientsController {
    private readonly svc;
    constructor(svc: PatientsService);
    create(body: CreatePatientDto): Promise<import("./patients.service").Patient>;
    findAll(): Promise<import("./patients.service").Patient[]>;
    findOne(id: number): Promise<import("./patients.service").Patient>;
    update(id: number, body: UpdatePatientDto): Promise<import("./patients.service").Patient>;
    remove(id: number): Promise<boolean>;
}
