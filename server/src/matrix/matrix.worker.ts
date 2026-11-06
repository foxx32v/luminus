import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MatrixGateway } from './matrix.gateway';
import type { AnimateDTO } from './matrix.animate';

@Processor('animation')
export class MatrixWorker extends WorkerHost {
    constructor(private gateway: MatrixGateway) {
        super();
    }
    async process(job:Job<AnimateDTO>) {
        const {from, to, step} = job.data
        for(let i=1;i<=step;i++) {
            const frame = this.interpolate(from, to, i / step)
            this.gateway.handleMatrixUpdate({matrix:frame})
            await new Promise((r) => setTimeout(r,10))
        }
    }

    interpolate(a:number[],b:number[],t:number):number[] {
        return a.map((ca,i)=>{
            const cb = b[i];
            const red = Math.round(((ca >> 16) & 0xff) * (1 - t) + ((cb >> 16) & 0xff) * t);
            const green = Math.round(((ca >> 8) & 0xff) * (1 - t) + ((cb >> 8) & 0xff) * t);
            const blue = Math.round((ca & 0xff) * (1 - t) + (cb & 0xff) * t);
            return (red << 16) | (green << 8) | blue;
        })
    }
}