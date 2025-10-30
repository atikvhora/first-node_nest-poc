-- create patients and addresses tables
CREATE TABLE IF NOT EXISTS patients (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  username TEXT NOT NULL,
  email TEXT,
  gender TEXT,
  phone TEXT
);

CREATE TABLE IF NOT EXISTS addresses (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER UNIQUE REFERENCES patients(id) ON DELETE CASCADE,
  address1 TEXT NOT NULL,
  city TEXT,
  pincode TEXT,
  country TEXT
);

-- ensure only one address per patient (patient_id unique)
CREATE UNIQUE INDEX IF NOT EXISTS uq_addresses_patient_id ON addresses(patient_id);
