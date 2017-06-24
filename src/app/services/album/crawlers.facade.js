"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
var Observable_1 = require("rxjs/Observable");
var album_1 = require("./model/album");
var core_1 = require("@angular/core");
var crawler_utils_1 = require("app/services/album/crawler.utils");
var CrawlersFacade = (function () {
    function CrawlersFacade(extractors) {
        this.extractors = extractors;
    }
    CrawlersFacade.prototype.extractAlbums = function (ownerId) {
        var photos = [
            'https://cdn.theatlantic.com/assets/media/img/photo/2017/03/photos-of-the-week-311317/w01_653601866/main_900.jpg?1489776464',
            'https://iso.500px.com/wp-content/uploads/2016/05/stock-photo-151040087-1500x1000.jpg',
            'http://i.telegraph.co.uk/multimedia/archive/03217/potd-woodpecker-_3217773k.jpg',
            'http://www.istockphoto.com/resources/images/PhotoFTLP/img_67920257.jpg',
            'https://static.pexels.com/photos/46710/pexels-photo-46710.jpeg',
            'https://static.pexels.com/photos/189349/pexels-photo-189349.jpeg',
            'http://i2.cdn.cnn.com/cnnnext/dam/assets/160825160953-05-week-in-photos-0826-super-169.jpg'
        ];
        var albums = photos.map(function (photo, index) { return ({
            title: "Album long title ".repeat(index),
            photos: [photo, 'https://static.pexels.com/photos/189349/pexels-photo-189349.jpeg', 'https://img-9gag-fun.9cache.com/photo/abpj8wE_700b.jpg'],
            date: photo.length,
            type: album_1.AlbumType.WALL
        }); });
        return Observable_1.Observable.from(albums);
        /* return Observable.merge(...this.extractors.map(extractor => extractor.extractAlbums(ownerId)))
           .do(album => {
             console.log(album);
           })
           .catch(e => {
             console.log(e);
             throw e;
           });*/
    };
    return CrawlersFacade;
}());
CrawlersFacade = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(crawler_utils_1.EXTRACTORS_TOKEN))
], CrawlersFacade);
exports.CrawlersFacade = CrawlersFacade;
