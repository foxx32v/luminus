import { Module } from '@nestjs/common';
import { TRPCModule } from 'nestjs-trpc';
import { RedisModule } from '@nestjs-modules/ioredis';
import { BullModule } from '@nestjs/bullmq';
import { PrismaModule } from './prisma/prisma.module';
import { PictureRouter } from './pictures';
import { PicturesController } from './pictures';
import { MatrixModule } from './matrix/matrix.module';

@Module({
    imports: [
        PrismaModule,
        MatrixModule,
        TRPCModule.forRoot({ basePath: '/trpc' }),
        RedisModule.forRoot({
            type: 'single',
            url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || '6379'}`,
        }),
        BullModule.forRoot({
            connection: {
                host: process.env.REDIS_HOST || 'localhost',
                port: Number(process.env.REDIS_PORT) || 6379,
        }})
    ],
    controllers: [PicturesController],
    providers: [PictureRouter],
})
export class AppModule {}