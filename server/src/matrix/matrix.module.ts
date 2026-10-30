import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { MatrixGateway } from './matrix.gateway';
import { MatrixService } from './matrix.service';
import { MatrixAnimate } from './matrix.animate';
import { MatrixWorker } from './matrix.worker';

@Module({
    imports: [BullModule.registerQueue({ name: 'animation' })],
    providers: [MatrixGateway, MatrixService, MatrixAnimate, MatrixWorker],
    exports: [MatrixAnimate, MatrixService],
})
export class MatrixModule {}