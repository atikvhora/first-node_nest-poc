import { POSTGRESQL_DATABASE_URL } from "src/Common/Enums";

// Loose drizzle-kit config (avoid strict types that vary by kit version)
const config = {
  schema: './src/db/schema.ts',
  out: './drizzle/migrations',
  driver: 'pg',
  dbCredentials: process.env.DATABASE_URL ?? POSTGRESQL_DATABASE_URL,
};

export default config;
