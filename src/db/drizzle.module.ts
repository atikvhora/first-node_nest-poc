import { Global, Module } from '@nestjs/common';
import { DrizzleService } from './drizzle.service';

// Provider token (kept for backward compatibility)
export const DRIZZLE = 'DRIZZLE';

@Global()
@Module({
  providers: [DrizzleService, { provide: DRIZZLE, useExisting: DrizzleService }],
  exports: [DrizzleService, DRIZZLE],
})
export class DrizzleModule {}
