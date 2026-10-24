import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPictureSchema } from './schemes/picture.schemes';

@Controller('pictures')
export class PicturesController {
    constructor(private prisma: PrismaService) {}

    @Post()
    async create(@Body() body: unknown) {
        const input = createPictureSchema.parse(body);
        return this.prisma.picture.create({ data: input });
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.prisma.picture.delete({ where: { id } });
    }
}