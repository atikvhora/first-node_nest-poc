// Loose drizzle-kit config (avoid strict types that vary by kit version)
const config = {
  schema: './src/db/schema.ts',
  out: './drizzle/migrations',
  driver: 'pg',
  dbCredentials: 'postgresql://postgres:atik%40123@localhost:5432/poc_patient_db',
};

export default config;
