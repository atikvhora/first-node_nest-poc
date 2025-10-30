import { Injectable, OnModuleDestroy, OnApplicationShutdown } from '@nestjs/common';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

@Injectable()
export class DrizzleService implements OnModuleDestroy, OnApplicationShutdown {
  private pool: Pool;
  // `db` is the Drizzle client created from the pool
  public readonly db: any;

  constructor() {
    const connectionString =
      process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/postgres';

    this.pool = new Pool({ connectionString });
    this.db = drizzle(this.pool);
  }

  async onModuleDestroy() {
    try {
      await this.pool.end();
    } catch (e) {
      // ignore close errors
    }
  }

  async onApplicationShutdown() {
    await this.onModuleDestroy();
  }
}
