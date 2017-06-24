import {PhotosPhoto} from "node-vk-sdk/distr/src/Models";

export const EXTRACTORS_TOKEN = 'AlbumExtractor';

export function highestResolution(photo: PhotosPhoto): string {
  const photosKeys: string[] = Object.keys(photo)
    .filter(key => key.startsWith('photo'))
    .filter(key => photo[key])
    .sort();
  return photo[photosKeys[0]];
}
