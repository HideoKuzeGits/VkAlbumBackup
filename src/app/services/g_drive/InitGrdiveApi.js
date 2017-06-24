"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var gapi = require("google-api");
var CLIENT_ID = '127453201722-h3trgmnpsk2alq72a7e3fqbsoh938inq.apps.googleusercontent.com';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/drive.file';
var InitGrdiveApi = (function () {
    function InitGrdiveApi() {
    }
    InitGrdiveApi.prototype.init = function () {
        return new Promise(function (resolve, reject) {
            $.getScript("https://apis.google.com/js/api.js")
                .then(resolve, reject);
        }).then(function () {
            gapi.client.init({
                discoveryDocs: DISCOVERY_DOCS,
                clientId: CLIENT_ID,
                scope: SCOPES
            });
        });
    };
    return InitGrdiveApi;
}());
InitGrdiveApi = __decorate([
    core_1.Injectable()
], InitGrdiveApi);
exports.InitGrdiveApi = InitGrdiveApi;
