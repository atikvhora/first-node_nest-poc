import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

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

export const patientCases = pgTable('patient_cases', {
  id: serial('id').primaryKey(),
  patientId: integer('patient_id').notNull(),
  casedescription: text('casedescription').notNull(),
  status: text('status').default('open'),
  prescription: text('prescription'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const patientDignosis = pgTable('patient_dignosis', {
  id: serial('id').primaryKey(),
  patientId: integer('patient_id').notNull(),
  disease: text('disease').notNull(),
  dignosisType: text('dignosisType').notNull(),
  doctorName: text('doctorName').notNull(),
});

export const appointments = pgTable('appointments', {
  id: serial('id').primaryKey(),
  patientId: integer('patient_id').notNull(),
  doctorId: integer('doctor_id').notNull(),
  appointmentDate: timestamp('appointment_date').notNull(),
  status: text('status').default('Scheduled'), // e.g., Scheduled, Completed, Cancelled
});

export const medicalRecords = pgTable('medical_records', {
  id: serial('id').primaryKey(),
  patientId: integer('patient_id').notNull(),
  recordDate: timestamp('record_date').notNull(),
  diagnosis: text('diagnosis').notNull(),
  treatment: text('treatment').notNull(),
});

export const prescriptions = pgTable('prescriptions', {
  id: serial('id').primaryKey(),
  medicalRecordId: integer('medical_record_id').notNull(),
  medication: text('medication').notNull(),
  dosage: text('dosage').notNull(),
  frequency: text('frequency').notNull(),
});

export const labTests = pgTable('lab_tests', {
  id: serial('id').primaryKey(),
  patientId: integer('patient_id').notNull(),
  testName: text('test_name').notNull(),
  testDate: timestamp('test_date').notNull(),
  results: text('results').notNull(),
  test_description: text('test_description'),
  test1: text('test1'),
});