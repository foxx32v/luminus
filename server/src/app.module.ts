import { Module } from '@nestjs/common';
import { TRPCModule } from 'nestjs-trpc';
import { PrismaModule } from './prisma/prisma.module';
import { PictureRouter, PicturesController } from './pictures';
@Module({
  imports: [
    PrismaModule,
    TRPCModule.forRoot({basePath: '/trpc'}),
  ],
  controllers: [PicturesController],
  providers: [PictureRouter],
})
export class AppModule {}
