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
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var chunkSize = 100;
var api = new node_vk_sdk_1.VKApi({
    logger: new node_vk_sdk_1.ConsoleLogger()
});
var WallCrawler = (function () {
    function WallCrawler() {
    }
    WallCrawler.prototype.extractAlbums = function (ownerId) {
        var _this = this;
        return this.getPosts(ownerId, chunkSize, 0)
            .flatMap(function (response) {
            var pages = Math.floor(response.count / chunkSize);
            var observables = Array(pages)
                .fill(null)
                .map(function (v, i) { return _this.getPosts(ownerId, chunkSize, (i + 1) * 100); });
            observables.push(Rx_1.Observable.of(response));
            return Rx_1.Observable.merge.apply(Rx_1.Observable, observables);
        })
            .flatMap(function (response) { return Rx_1.Observable.from(response.items); })
            .map(function (post) { return _this.flatCopyHistory(post); })
            .flatMap(function (posts) { return Rx_1.Observable.from(posts); })
            .map(function (post) { return _this.extractAlbum(post); })
            .filter(function (album) { return album.photos.length > 3; });
    };
    WallCrawler.prototype.getPosts = function (ownerId, count, offset2) {
        return Rx_1.Observable.from(api.wallGet({ ownerId: ownerId, offset: offset2, count: count }));
    };
    WallCrawler.prototype.extractAlbum = function (post) {
        return {
            title: this.extractTitle(post),
            date: post.date,
            type: album_1.AlbumType.WALL,
            photos: this.extractPhotos(post)
        };
    };
    WallCrawler.prototype.extractTitle = function (post) {
        return post.text || new common_1.DatePipe('en-US').transform(new Date(post.date * 1000), 'dd.mm.yyyy hh:mm');
    };
    WallCrawler.prototype.flatCopyHistory = function (post) {
        if (!post.copyHistory) {
            return [post];
        }
        var postWithCopies = post.copyHistory;
        postWithCopies.push(post);
        return postWithCopies;
    };
    WallCrawler.prototype.extractPhotos = function (post) {
        if (!post.attachments) {
            return [];
        }
        var attachments = post.attachments;
        return attachments.filter(function (attachment) { return attachment.type === 'photo'; })
            .map(function (attachment) { return crawler_utils_1.highestResolution(attachment.photo); });
    };
    return WallCrawler;
}());
WallCrawler = __decorate([
    core_1.Injectable()
], WallCrawler);
exports.WallCrawler = WallCrawler;
