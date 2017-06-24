import {ConsoleLogger, VKApi} from "node-vk-sdk";
import {Observable} from "rxjs/Rx";
import {PhotosPhotoAlbumFull} from "node-vk-sdk/distr/src/Models";
import {Album, AlbumExtractor, AlbumType} from "./model/album";
import {highestResolution} from "./crawler.utils";
import {Injectable} from "@angular/core";

const api: VKApi = new VKApi({
  logger: new ConsoleLogger()
});

@Injectable()
export class AlbumCrawler implements AlbumExtractor {

  extractAlbums(ownerId: number) {
    return Observable.from(api.photosGetAlbums({ownerId: ownerId}))
      .flatMap(albums => Observable.from(albums.items))
      .flatMap(album => this.processVkAlbum(album));
  }

  private processVkAlbum(vkAlbum: PhotosPhotoAlbumFull): Observable<Album> {
    return Observable.from(api.photosGet({ownerId: vkAlbum.ownerId, albumId: vkAlbum.id.toString()}))
      .flatMap(photos => Observable.from(photos.items))
      .map(photo => highestResolution(photo))
      .toArray()
      .map(photos => {
        return {
          type: AlbumType.ALBUM,
          date: vkAlbum.created,
          title: this.constructTitle(vkAlbum),
          photos: photos
        };
      });
  }

  private constructTitle(vkAlbum: PhotosPhotoAlbumFull): string {
    return [vkAlbum.description, vkAlbum.title]
      .filter(value => value)
      .join(' - ');
  }
}
