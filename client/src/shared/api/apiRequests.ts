import type { PictureCreateApi, PictureRemoveApi } from '../'

class PicturesRestApi {
    async create(dto: PictureCreateApi) {
        await fetch('http://localhost:3000/pictures', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dto),
        })}
    async remove (dto: PictureRemoveApi) {
        await fetch(`http://localhost:3000/pictures/${dto.id}`, { method: 'DELETE' });
    }
}

export const picturesRestApi = new PicturesRestApi