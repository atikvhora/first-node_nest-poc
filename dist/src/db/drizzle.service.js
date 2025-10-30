"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrizzleService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const node_postgres_1 = require("drizzle-orm/node-postgres");
let DrizzleService = class DrizzleService {
    pool;
    db;
    constructor() {
        const connectionString = process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/postgres';
        this.pool = new pg_1.Pool({ connectionString });
        this.db = (0, node_postgres_1.drizzle)(this.pool);
    }
    async onModuleDestroy() {
        try {
            await this.pool.end();
        }
        catch (e) {
        }
    }
    async onApplicationShutdown() {
        await this.onModuleDestroy();
    }
};
exports.DrizzleService = DrizzleService;
exports.DrizzleService = DrizzleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DrizzleService);
//# sourceMappingURL=drizzle.service.js.map