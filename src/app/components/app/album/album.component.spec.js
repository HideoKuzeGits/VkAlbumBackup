"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var album_component_1 = require("./album.component");
describe('AlbumComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [album_component_1.AlbumComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(album_component_1.AlbumComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
});
