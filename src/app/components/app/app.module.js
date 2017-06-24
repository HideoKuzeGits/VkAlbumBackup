"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var album_preview_component_1 = require("./album-preview/album-preview.component");
var albums_component_1 = require("./albums/albums.component");
var material_1 = require("@angular/material");
var animations_1 = require("@angular/platform-browser/animations");
var router_1 = require("@angular/router");
var album_component_1 = require("./album/album.component");
var crawler_utils_1 = require("../../services/album/crawler.utils");
var alum_crawler_1 = require("../../services/album/alum.crawler");
var crawlers_facade_1 = require("../../services/album/crawlers.facade");
var oauth_1 = require("../../services/g_drive/oauth");
var StartupService_1 = require("../../services/StartupService");
var InitGrdiveApi_1 = require("../../services/g_drive/InitGrdiveApi");
var appRoutes = [
    { path: 'album/:date', component: album_component_1.AlbumComponent },
    { path: '**', component: albums_component_1.AlbumsComponent }
];
function startupFunction(startupService) {
    return startupService.load;
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            albums_component_1.AlbumsComponent,
            album_preview_component_1.AlbumPreviewComponent,
            album_component_1.AlbumComponent,
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            material_1.MdTooltipModule,
            animations_1.BrowserAnimationsModule,
            router_1.RouterModule.forRoot(appRoutes)
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [
            { provide: crawler_utils_1.EXTRACTORS_TOKEN, useClass: alum_crawler_1.AlbumCrawler, multi: true },
            { provide: crawler_utils_1.EXTRACTORS_TOKEN, useClass: alum_crawler_1.AlbumCrawler, multi: true },
            crawlers_facade_1.CrawlersFacade,
            oauth_1.Oauth,
            {
                provide: core_1.APP_INITIALIZER,
                useFactory: startupFunction,
                multi: true
            },
            StartupService_1.StartupService,
            InitGrdiveApi_1.InitGrdiveApi
        ]
    })
], AppModule);
exports.AppModule = AppModule;
