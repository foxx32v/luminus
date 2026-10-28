import { CONSTANTS_CONFIG, type PictureCreateApi, type PictureRemoveApi } from '../'
const URL = CONSTANTS_CONFIG.SERVER_URL_PICTURES
class PicturesRestApi {
    async create(dto: PictureCreateApi) {
        await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dto),
        })}
    async remove (dto: PictureRemoveApi) {
        await fetch(`${URL}/${dto.id}`,
            { method: 'DELETE' });
    }
}

export const picturesRestApi = new PicturesRestApi