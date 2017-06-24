"use strict";
exports.__esModule = true;
exports.EXTRACTORS_TOKEN = 'AlbumExtractor';
function highestResolution(photo) {
    var photosKeys = Object.keys(photo)
        .filter(function (key) { return key.startsWith('photo'); })
        .filter(function (key) { return photo[key]; })
        .sort();
    return photo[photosKeys[0]];
}
exports.highestResolution = highestResolution;
