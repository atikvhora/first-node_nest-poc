import { relations } from "drizzle-orm/relations";
import { patients, addresses } from "./schema";

export const addressesRelations = relations(addresses, ({one}) => ({
	patient: one(patients, {
		fields: [addresses.patientId],
		references: [patients.id]
	}),
}));

export const patientsRelations = relations(patients, ({many}) => ({
	addresses: many(addresses),
}));