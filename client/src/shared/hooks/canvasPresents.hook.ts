import { tRPC } from '../';
import { picturesRestApi } from '../';

export function useCanvasPresets() {
    const utils = tRPC.useUtils();
    const { data, error, isLoading } = tRPC.pictureRouter.getAll.useQuery();

    const save = async (title: string, content: number[]) => {
        await picturesRestApi.create({title,content})
        await utils.pictureRouter.getAll.invalidate();
    };

    const remove = async (id: string) => {
        await picturesRestApi.remove({id})
        await utils.pictureRouter.getAll.invalidate();
    }

    return { data, error, isLoading, save, remove };
}