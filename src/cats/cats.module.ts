import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { DrizzleModule } from '../db/drizzle.module';

@Module({
  imports: [DrizzleModule],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
