import {Component, QueryList, ViewChildren} from "@angular/core";
import {CrawlersFacade} from "../../../services/album/crawlers.facade";
import {Album} from "../../../services/album/model/album";
import {AlbumPreviewComponent} from "../album-preview/album-preview.component";
import {Oauth} from "../../../services/g_drive/oauth";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css'],
})
export class AlbumsComponent {
  private albums: Album[];

  @ViewChildren(AlbumPreviewComponent)
  private albumComponents: QueryList<AlbumPreviewComponent>;

  constructor(crawler: CrawlersFacade, ouath: Oauth) {
    crawler.extractAlbums(221225862)
      .toArray()
      .subscribe(albums => this.albums = albums);
  }

  delete() {
    this.albumComponents
      .filter(albumComponent => albumComponent.selected)
      .map(albumComponent => albumComponent.album)
      .forEach(album => this.removeAlbum(album));
  }

  load() {
    gapi.auth2.getAuthInstance().signIn();
  }

  private removeAlbum(album: Album) {
    const index = this.albums.indexOf(album, 0);
    if (index > -1) {
      this.albums.splice(index, 1);
    }
  }
}
