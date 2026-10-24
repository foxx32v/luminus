import { Inject, Param } from '@nestjs/common';
import { Router, Query, Input } from 'nestjs-trpc';
import { PrismaService } from '../prisma/prisma.service';
import { createPictureSchema } from '.';
import z from 'zod';

@Router()
export class PictureRouter {
    constructor(@Inject(PrismaService) private prisma: PrismaService) {}
    @Query()
    async getAll() {
    return await this.prisma.picture.findMany();   
    }
}