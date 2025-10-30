"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsService = void 0;
const common_1 = require("@nestjs/common");
const drizzle_service_1 = require("../db/drizzle.service");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
let PatientsService = class PatientsService {
    drizzleService;
    constructor(drizzleService) {
        this.drizzleService = drizzleService;
    }
    async create(data) {
        const { address1, city, pincode, country, ...patientData } = data;
        const created = await this.drizzleService.db.transaction(async (tx) => {
            const res = await tx.insert(schema_1.patients).values(patientData).returning();
            const patientRow = res[0];
            if (address1 || city || pincode || country) {
                await tx.insert(schema_1.addresses).values({ patientId: patientRow.id, address1, city, pincode, country });
            }
            return patientRow;
        });
        return created;
    }
    async findAll() {
        return (await this.drizzleService.db.select().from(schema_1.patients));
    }
    async findOne(id) {
        const rows = await this.drizzleService.db.select().from(schema_1.patients).where((0, drizzle_orm_1.eq)(schema_1.patients.id, id));
        const row = rows[0];
        if (!row)
            throw new common_1.NotFoundException('Patient not found');
        return row;
    }
    async update(id, data) {
        const { address1, city, pincode, country, addressId, ...patientData } = data;
        const updated = await this.drizzleService.db.transaction(async (tx) => {
            const res = await tx.update(schema_1.patients).set(patientData).where((0, drizzle_orm_1.eq)(schema_1.patients.id, id)).returning();
            if (!res || res.length === 0)
                throw new common_1.NotFoundException('Patient not found');
            const patientRow = res[0];
            const hasAddressInput = addressId !== undefined || address1 || city || pincode || country;
            if (hasAddressInput) {
                if (addressId !== undefined) {
                    const existing = await tx.select().from(schema_1.addresses).where((0, drizzle_orm_1.eq)(schema_1.addresses.id, addressId));
                    const e = existing[0];
                    if (!e || e.patientId !== id)
                        throw new common_1.NotFoundException('Address not found for this patient');
                    await tx.update(schema_1.addresses).set({ address1, city, pincode, country }).where((0, drizzle_orm_1.eq)(schema_1.addresses.id, addressId));
                }
                else {
                    const existing = await tx.select().from(schema_1.addresses).where((0, drizzle_orm_1.eq)(schema_1.addresses.patientId, id));
                    if (existing && existing.length > 0) {
                        await tx.update(schema_1.addresses).set({ address1, city, pincode, country }).where((0, drizzle_orm_1.eq)(schema_1.addresses.patientId, id));
                    }
                    else {
                        await tx.insert(schema_1.addresses).values({ patientId: id, address1, city, pincode, country });
                    }
                }
            }
            return patientRow;
        });
        return updated;
    }
    async remove(id) {
        const res = await this.drizzleService.db.delete(schema_1.patients).where((0, drizzle_orm_1.eq)(schema_1.patients.id, id)).returning();
        if (!res || res.length === 0)
            throw new common_1.NotFoundException('Patient not found');
        return true;
    }
};
exports.PatientsService = PatientsService;
exports.PatientsService = PatientsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [drizzle_service_1.DrizzleService])
], PatientsService);
//# sourceMappingURL=patients.service.js.map