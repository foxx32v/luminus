import { Module } from '@nestjs/common';
import { TRPCModule } from 'nestjs-trpc';
import { PrismaModule } from './prisma/prisma.module';
import { PictureRouter } from './pictures';
@Module({
  imports: [
    PrismaModule,
    TRPCModule.forRoot({basePath: '/trpc'}),
  ],
  controllers: [],
  providers: [PictureRouter],
})
export class AppModule {}
