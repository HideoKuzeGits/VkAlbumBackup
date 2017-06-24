import {AfterViewInit, Component, ElementRef, Input, ViewChild} from "@angular/core";
import {Album} from "../../../services/album/model/album";
import {MdTooltip} from "@angular/material";

import "hammerjs";
import "dotdotdot/src/js/jquery.dotdotdot.js";
import {Router} from "@angular/router";

@Component({
  selector: 'app-album-preview',
  templateUrl: './album-preview.component.html',
  styleUrls: ['./album-preview.component.css']
})
export class AlbumPreviewComponent implements AfterViewInit {
  @Input() album: Album;
  @ViewChild(MdTooltip) private tooltipDirective: MdTooltip;

  private _title: HTMLParagraphElement;

  private photoNum = 0;
  selected = false;


  @ViewChild('title')
  set title(titleRef: ElementRef) {
    this._title = titleRef.nativeElement;
  }

  constructor(private router: Router) {}

  private titleTruncated = (isTruncated: boolean, orgContent: any): void => {
    this.tooltipDirective.disabled = !isTruncated;
  }

  ngAfterViewInit(): void {
    $(document).ready(() => $(this._title).dotdotdot({height: 20, callback: this.titleTruncated}));
  }

  previous(): void {
    if (this.photoNum === 0) {
      return;
    }

    this.photoNum--;
  }

  next(): void {
    if (this.photoNum === this.album.photos.length - 1) {
      return;
    }

    this.photoNum++;
  }

  navigateToAlbum() {
    this.router.navigate(["album", this.album.date]);
  }
}
