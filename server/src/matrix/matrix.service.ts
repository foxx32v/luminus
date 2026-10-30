import { Injectable } from "@nestjs/common";
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class MatrixService {
    constructor(
        @InjectRedis() private redis:Redis,
    ) {}

    async get(): Promise<number[]|null> {
        const data = await this.redis.get('matrix')
        if (!data) return null
        return data.split(' ,').map(Number)
    }

    async save(matrix: number[]) {
    if (matrix.length !== 256) return;
    await this.redis.set('matrix', matrix.join(','));
    }
}