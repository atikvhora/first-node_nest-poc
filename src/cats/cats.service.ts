import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../db/drizzle.service';
import { cats } from '../db/schema';

@Injectable()
export class CatsService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async findAll() {
    // Use Drizzle's query builder with the example `cats` table
    try {
      return await this.drizzleService.db.select().from(cats);
    } catch (e) {
      // Return empty array on error to avoid throwing during simple demos
      return [];
    }
  }
}
