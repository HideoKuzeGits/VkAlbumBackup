import {ConsoleLogger, VKApi} from "node-vk-sdk";
import {Observable} from "rxjs/Rx";
import {WallWallpost, WallWallpostAttachment, WallWallpostFull} from "node-vk-sdk/distr/src/Models";
import {Album, AlbumExtractor, AlbumType} from "./model/album";
import {highestResolution} from "./crawler.utils";
import {DatePipe} from "@angular/common";
import {WallGetResponse} from "node-vk-sdk/distr/src/Responses";
import {Injectable} from "@angular/core";

const chunkSize = 100;

const api: VKApi = new VKApi({
  logger: new ConsoleLogger()
});

@Injectable()
export class WallCrawler implements AlbumExtractor {

  extractAlbums(ownerId: number): Observable<Album> {
    return this.getPosts(ownerId, chunkSize, 0)
      .flatMap(response => {
        const pages = Math.floor(response.count / chunkSize);
        const observables: Observable<WallGetResponse>[] = Array(pages)
          .fill(null)
          .map((v, i) => this.getPosts(ownerId, chunkSize, (i + 1) * 100));
        observables.push(Observable.of(response));
        return Observable.merge(...observables);
      })
      .flatMap(response => Observable.from(response.items))
      .map(post => this.flatCopyHistory(post))
      .flatMap(posts => Observable.from(posts))
      .map(post => this.extractAlbum(post))
      .filter(album => album.photos.length > 3);
  }

  private getPosts(ownerId: number, count: number, offset2: number): Observable<WallGetResponse> {
    return Observable.from(api.wallGet({ownerId: ownerId, offset: offset2, count: count}));
  }

  private extractAlbum(post: WallWallpost): Album {
    return {
      title: this.extractTitle(post),
      date: post.date,
      type: AlbumType.WALL,
      photos: this.extractPhotos(post)
    };
  }

  private extractTitle(post: WallWallpost): string {
    return post.text || new DatePipe('en-US').transform(new Date(post.date * 1000), 'dd.mm.yyyy hh:mm');
  }

  private flatCopyHistory(post: WallWallpostFull): WallWallpost[] {
    if (!post.copyHistory) {
      return [post];
    }

    const postWithCopies: WallWallpost[] = post.copyHistory as WallWallpost[];
    postWithCopies.push(post);
    return postWithCopies;
  }

  private extractPhotos(post: WallWallpost): string[] {
    if (!post.attachments) {
      return [];
    }

    const attachments: WallWallpostAttachment[] = post.attachments as WallWallpostAttachment[];
    return attachments.filter(attachment => attachment.type === 'photo')
      .map(attachment => highestResolution(attachment.photo));
  }
}
