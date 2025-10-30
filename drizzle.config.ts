// Loose drizzle-kit config (avoid strict types that vary by kit version)
const config = {
  schema: './src/db/schema.ts',
  out: './drizzle/migrations',
  driver: 'pg',
  dbCredentials: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/postgres',
};

export default config;
