import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

// Example table definition for 'cats'
export const cats = pgTable('cats', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

// Patients table
export const patients = pgTable('patients', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  username: text('username').notNull(),
  email: text('email'),
  gender: text('gender'),
  phone: text('phone'),
});

// Addresses table
export const addresses = pgTable('addresses', {
  id: serial('id').primaryKey(),
  // patient_id column references patients.id
  patientId: integer('patient_id').references(() => patients.id),
  address1: text('address1').notNull(),
  city: text('city'),
  pincode: text('pincode'),
  country: text('country'),
});
