import { PictureRouter } from './picture.router';
import { PrismaService } from '../prisma/prisma.service';

describe('PictureRouter (integration)', () => {
    it('getAll возвращает массив из Prisma', async () => {
        const mockPrisma = {
            picture: {
                findMany: jest.fn().mockResolvedValue([
                    { id: '1', title: 'Test', content: Array(256).fill(0) },
                ]),
            },
        } as unknown as PrismaService;
        const router = new PictureRouter(mockPrisma);
        const result = await router.getAll();
        expect(result).toHaveLength(1);
        expect(result[0].title).toBe('Test');
        expect(mockPrisma.picture.findMany).toHaveBeenCalled();
    });
});