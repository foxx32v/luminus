import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

export interface AnimateDTO {
    from: number[];
    to: number[];
    step: number;
}

@Injectable()
export class MatrixAnimate {
    constructor(@InjectQueue('animation') private bullMQ: Queue) {}

    async animate(data: AnimateDTO) {
        await this.bullMQ.add('transition', data)
    }
}