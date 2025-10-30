import { DrizzleService } from '../db/drizzle.service';
export declare class CatsService {
    private readonly drizzleService;
    constructor(drizzleService: DrizzleService);
    findAll(): Promise<any>;
}
