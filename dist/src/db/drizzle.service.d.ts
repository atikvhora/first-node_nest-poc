import { OnModuleDestroy, OnApplicationShutdown } from '@nestjs/common';
export declare class DrizzleService implements OnModuleDestroy, OnApplicationShutdown {
    private pool;
    readonly db: any;
    constructor();
    onModuleDestroy(): Promise<void>;
    onApplicationShutdown(): Promise<void>;
}
