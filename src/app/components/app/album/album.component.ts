import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {CrawlersFacade} from "../../../services/album/crawlers.facade";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent {
  photos: String[];

  constructor(private crawler: CrawlersFacade, private router: Router, route: ActivatedRoute) {
    route.params.subscribe(param => this.initAlbum(param.date));
  }

  private initAlbum(date: string) {
    this.crawler.extractAlbums(221225862)
      .filter(album => album.date === Number(date))
      .subscribe(album => this.photos = album.photos);
  }

  navigateToAlbums() {
    this.router.navigate(["/albums"]);
  }
}
