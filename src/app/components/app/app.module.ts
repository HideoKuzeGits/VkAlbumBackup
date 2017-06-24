import {BrowserModule} from "@angular/platform-browser";
import {APP_INITIALIZER, NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {AppComponent} from "./app.component";


import {AlbumPreviewComponent} from "./album-preview/album-preview.component";
import {AlbumsComponent} from "./albums/albums.component";
import {MdTooltipModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule, Routes} from "@angular/router";
import {AlbumComponent} from "./album/album.component";
import {EXTRACTORS_TOKEN} from "../../services/album/crawler.utils";
import {AlbumCrawler} from "../../services/album/alum.crawler";
import {CrawlersFacade} from "../../services/album/crawlers.facade";
import {Oauth} from "../../services/g_drive/oauth";
import {StartupService} from "../../services/StartupService";
import {InitGrdiveApi} from "../../services/g_drive/InitGrdiveApi";

const appRoutes: Routes = [
  {path: 'album/:date', component: AlbumComponent},
  {path: '**', component: AlbumsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    AlbumPreviewComponent,
    AlbumComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdTooltipModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: EXTRACTORS_TOKEN, useClass: AlbumCrawler, multi: true},
    {provide: EXTRACTORS_TOKEN, useClass: AlbumCrawler, multi: true},
    CrawlersFacade,
    Oauth,
    {
      provide: APP_INITIALIZER,
      useFactory: AppModule.startupFunction,
      multi: true,
      deps: [StartupService]
    },
    StartupService,
    InitGrdiveApi
  ]
})
export class AppModule {
  static startupFunction(startupService: StartupService): Function {
    return () => startupService.load();
  }
}
