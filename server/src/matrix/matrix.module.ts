import { Module } from '@nestjs/common';
import { MatrixGateway } from './matrix.gateway';

@Module({providers: [MatrixGateway],})
export class MatrixModule{}