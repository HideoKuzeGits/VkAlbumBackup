"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
require("hammerjs");
require("dotdotdot/src/js/jquery.dotdotdot.js");
var AlbumPreviewComponent = (function () {
    function AlbumPreviewComponent(router) {
        var _this = this;
        this.router = router;
        this.photoNum = 0;
        this.selected = false;
        this.titleTruncated = function (isTruncated, orgContent) {
            _this.tooltipDirective.disabled = !isTruncated;
        };
    }
    Object.defineProperty(AlbumPreviewComponent.prototype, "title", {
        set: function (titleRef) {
            this._title = titleRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    AlbumPreviewComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        $(document).ready(function () { return $(_this._title).dotdotdot({ height: 20, callback: _this.titleTruncated }); });
    };
    AlbumPreviewComponent.prototype.previous = function () {
        if (this.photoNum === 0) {
            return;
        }
        this.photoNum--;
    };
    AlbumPreviewComponent.prototype.next = function () {
        if (this.photoNum === this.album.photos.length - 1) {
            return;
        }
        this.photoNum++;
    };
    AlbumPreviewComponent.prototype.navigateToAlbum = function () {
        this.router.navigate(["album", this.album.date]);
    };
    return AlbumPreviewComponent;
}());
__decorate([
    core_1.Input()
], AlbumPreviewComponent.prototype, "album");
__decorate([
    core_1.ViewChild(material_1.MdTooltip)
], AlbumPreviewComponent.prototype, "tooltipDirective");
__decorate([
    core_1.ViewChild('title')
], AlbumPreviewComponent.prototype, "title");
AlbumPreviewComponent = __decorate([
    core_1.Component({
        selector: 'app-album-preview',
        templateUrl: './album-preview.component.html',
        styleUrls: ['./album-preview.component.css']
    })
], AlbumPreviewComponent);
exports.AlbumPreviewComponent = AlbumPreviewComponent;
