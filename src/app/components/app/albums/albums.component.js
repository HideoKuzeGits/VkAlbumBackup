"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var album_preview_component_1 = require("../album-preview/album-preview.component");
var gapi = require("google-api");
var AlbumsComponent = (function () {
    function AlbumsComponent(crawler, ouath) {
        var _this = this;
        crawler.extractAlbums(221225862)
            .toArray()
            .subscribe(function (albums) { return _this.albums = albums; });
    }
    AlbumsComponent.prototype["delete"] = function () {
        var _this = this;
        this.albumComponents
            .filter(function (albumComponent) { return albumComponent.selected; })
            .map(function (albumComponent) { return albumComponent.album; })
            .forEach(function (album) { return _this.removeAlbum(album); });
    };
    AlbumsComponent.prototype.load = function () {
        gapi.auth2.getAuthInstance().signIn();
    };
    AlbumsComponent.prototype.removeAlbum = function (album) {
        var index = this.albums.indexOf(album, 0);
        if (index > -1) {
            this.albums.splice(index, 1);
        }
    };
    return AlbumsComponent;
}());
__decorate([
    core_1.ViewChildren(album_preview_component_1.AlbumPreviewComponent)
], AlbumsComponent.prototype, "albumComponents");
AlbumsComponent = __decorate([
    core_1.Component({
        selector: 'app-albums',
        templateUrl: './albums.component.html',
        styleUrls: ['./albums.component.css']
    })
], AlbumsComponent);
exports.AlbumsComponent = AlbumsComponent;
