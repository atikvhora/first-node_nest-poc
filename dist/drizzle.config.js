"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    schema: './src/db/schema.ts',
    out: './drizzle/migrations',
    driver: 'pg',
    dbCredentials: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/postgres',
};
exports.default = config;
//# sourceMappingURL=drizzle.config.js.map