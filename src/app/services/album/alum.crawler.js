"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var node_vk_sdk_1 = require("node-vk-sdk");
var Rx_1 = require("rxjs/Rx");
var album_1 = require("./model/album");
var crawler_utils_1 = require("./crawler.utils");
var core_1 = require("@angular/core");
var api = new node_vk_sdk_1.VKApi({
    logger: new node_vk_sdk_1.ConsoleLogger()
});
var AlbumCrawler = (function () {
    function AlbumCrawler() {
    }
    AlbumCrawler.prototype.extractAlbums = function (ownerId) {
        var _this = this;
        return Rx_1.Observable.from(api.photosGetAlbums({ ownerId: ownerId }))
            .flatMap(function (albums) { return Rx_1.Observable.from(albums.items); })
            .flatMap(function (album) { return _this.processVkAlbum(album); });
    };
    AlbumCrawler.prototype.processVkAlbum = function (vkAlbum) {
        var _this = this;
        return Rx_1.Observable.from(api.photosGet({ ownerId: vkAlbum.ownerId, albumId: vkAlbum.id.toString() }))
            .flatMap(function (photos) { return Rx_1.Observable.from(photos.items); })
            .map(function (photo) { return crawler_utils_1.highestResolution(photo); })
            .toArray()
            .map(function (photos) {
            return {
                type: album_1.AlbumType.ALBUM,
                date: vkAlbum.created,
                title: _this.constructTitle(vkAlbum),
                photos: photos
            };
        });
    };
    AlbumCrawler.prototype.constructTitle = function (vkAlbum) {
        return [vkAlbum.description, vkAlbum.title]
            .filter(function (value) { return value; })
            .join(' - ');
    };
    return AlbumCrawler;
}());
AlbumCrawler = __decorate([
    core_1.Injectable()
], AlbumCrawler);
exports.AlbumCrawler = AlbumCrawler;
