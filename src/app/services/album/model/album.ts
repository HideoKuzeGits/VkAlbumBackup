import {Observable} from "rxjs/Observable";

export interface Album {
  date: number;
  photos: string[];
  title: string;
  type: AlbumType;
};

export enum AlbumType {ALBUM, WALL};

export interface AlbumExtractor {
  extractAlbums(ownerId: number): Observable<Album>;
}
