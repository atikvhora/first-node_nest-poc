import { pgTable, check, serial, text, uniqueIndex, foreignKey, unique, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const patients = pgTable("patients", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	username: text().notNull(),
	email: text(),
	gender: text(),
	phone: text(),
}, (table) => [
	check("patients_id_not_null", sql`NOT NULL id`),
	check("patients_name_not_null", sql`NOT NULL name`),
	check("patients_username_not_null", sql`NOT NULL username`),
]);

export const addresses = pgTable("addresses", {
	id: serial().primaryKey().notNull(),
	patientId: integer("patient_id"),
	address1: text().notNull(),
	city: text(),
	pincode: text(),
	country: text(),
}, (table) => [
	uniqueIndex("uq_addresses_patient_id").using("btree", table.patientId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.patientId],
			foreignColumns: [patients.id],
			name: "addresses_patient_id_fkey"
		}).onDelete("cascade"),
	unique("addresses_patient_id_key").on(table.patientId),
	check("addresses_id_not_null", sql`NOT NULL id`),
	check("addresses_address1_not_null", sql`NOT NULL address1`),
]);

export const tempTable = pgTable("temp_table", {
	id: serial("Id").primaryKey().notNull(),
	name: text(),
	desc: text("Desc"),
}, (table) => [
	check("temp_table_Id_not_null", sql`NOT NULL "Id"`),
]);
