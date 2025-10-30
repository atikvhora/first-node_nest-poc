import { Injectable, OnModuleDestroy, OnApplicationShutdown } from '@nestjs/common';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { POSTGRESQL_DATABASE_URL } from 'src/Common/Enums';

@Injectable()
export class DrizzleService implements OnModuleDestroy, OnApplicationShutdown {
  private pool: Pool;
  // `db` is the Drizzle client created from the pool
  public readonly db: any;

  constructor() {
    const connectionString =
      process.env.DATABASE_URL ?? POSTGRESQL_DATABASE_URL;

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
