"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var AlbumComponent = (function () {
    function AlbumComponent(crawler, router, route) {
        var _this = this;
        this.crawler = crawler;
        this.router = router;
        route.params.subscribe(function (param) { return _this.initAlbum(param.date); });
    }
    AlbumComponent.prototype.initAlbum = function (date) {
        var _this = this;
        this.crawler.extractAlbums(221225862)
            .filter(function (album) { return album.date === Number(date); })
            .subscribe(function (album) { return _this.photos = album.photos; });
    };
    AlbumComponent.prototype.navigateToAlbums = function () {
        this.router.navigate(["/albums"]);
    };
    return AlbumComponent;
}());
AlbumComponent = __decorate([
    core_1.Component({
        selector: 'app-album',
        templateUrl: './album.component.html',
        styleUrls: ['./album.component.css']
    })
], AlbumComponent);
exports.AlbumComponent = AlbumComponent;
