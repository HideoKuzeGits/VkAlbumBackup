"use strict";
exports.__esModule = true;
var StartupService = (function () {
    function StartupService(initGdiveApi) {
        this.initGdiveApi = initGdiveApi;
    }
    StartupService.prototype.load = function () {
        return this.initGdiveApi.init();
    };
    return StartupService;
}());
exports.StartupService = StartupService;
