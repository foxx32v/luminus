import { Inject } from '@nestjs/common';
import { Router, Query, Mutation, Input } from 'nestjs-trpc';
import { PrismaService } from '../prisma/prisma.service';
import { createPictureSchema } from '.';
import z from 'zod';

@Router()
export class PictureRouter {
    constructor(@Inject(PrismaService) private prisma: PrismaService) {}
    @Query()
    async getAll() {
    return this.prisma.picture.findMany();
    }

    @Mutation({ input: createPictureSchema })
    async create(@Input() input: z.infer<typeof createPictureSchema>) {
        return this.prisma.picture.create({ data: input });
    }
}