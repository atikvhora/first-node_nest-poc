"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addresses = exports.patients = exports.cats = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.cats = (0, pg_core_1.pgTable)('cats', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
});
exports.patients = (0, pg_core_1.pgTable)('patients', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
    username: (0, pg_core_1.text)('username').notNull(),
    email: (0, pg_core_1.text)('email'),
    gender: (0, pg_core_1.text)('gender'),
    phone: (0, pg_core_1.text)('phone'),
});
exports.addresses = (0, pg_core_1.pgTable)('addresses', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    patientId: (0, pg_core_1.integer)('patient_id').references(() => exports.patients.id),
    address1: (0, pg_core_1.text)('address1').notNull(),
    city: (0, pg_core_1.text)('city'),
    pincode: (0, pg_core_1.text)('pincode'),
    country: (0, pg_core_1.text)('country'),
});
//# sourceMappingURL=schema.js.map