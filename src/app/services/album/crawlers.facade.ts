import {Observable} from "rxjs/Observable";
import {Album, AlbumExtractor, AlbumType} from "./model/album";
import {Inject, Injectable} from "@angular/core";
import {EXTRACTORS_TOKEN} from "app/services/album/crawler.utils";

@Injectable()
export class CrawlersFacade implements AlbumExtractor {
  constructor(@Inject(EXTRACTORS_TOKEN) private extractors: AlbumExtractor[]) {
  }

  extractAlbums(ownerId: number): Observable<Album> {
    const photos: string[] = [
      'https://cdn.theatlantic.com/assets/media/img/photo/2017/03/photos-of-the-week-311317/w01_653601866/main_900.jpg?1489776464',
      'https://iso.500px.com/wp-content/uploads/2016/05/stock-photo-151040087-1500x1000.jpg',
      'http://i.telegraph.co.uk/multimedia/archive/03217/potd-woodpecker-_3217773k.jpg',
      'http://www.istockphoto.com/resources/images/PhotoFTLP/img_67920257.jpg',
      'https://static.pexels.com/photos/46710/pexels-photo-46710.jpeg',
      'https://static.pexels.com/photos/189349/pexels-photo-189349.jpeg',
      'http://i2.cdn.cnn.com/cnnnext/dam/assets/160825160953-05-week-in-photos-0826-super-169.jpg'];

    const albums: Album[] = photos.map((photo, index) => ({
      title: "Album long title ".repeat(index),
      photos: [photo, 'https://static.pexels.com/photos/189349/pexels-photo-189349.jpeg', 'https://img-9gag-fun.9cache.com/photo/abpj8wE_700b.jpg'],
      date: photo.length,
      type: AlbumType.WALL
    }));
    return Observable.from(albums);
    /* return Observable.merge(...this.extractors.map(extractor => extractor.extractAlbums(ownerId)))
       .do(album => {
         console.log(album);
       })
       .catch(e => {
         console.log(e);
         throw e;
       });*/
  }
}
