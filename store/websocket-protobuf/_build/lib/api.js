"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileType = exports.Api = void 0;
var Api;
(function (Api) {
    Api[Api["eList"] = 0] = "eList";
    Api[Api["eTree"] = 1] = "eTree";
    Api[Api["eRead"] = 2] = "eRead";
    Api[Api["eEdit"] = 3] = "eEdit";
})(Api = exports.Api || (exports.Api = {}));
var FileType;
(function (FileType) {
    FileType[FileType["Dir"] = 0] = "Dir";
    FileType[FileType["File"] = 1] = "File";
    FileType[FileType["Symlink"] = 2] = "Symlink";
})(FileType = exports.FileType || (exports.FileType = {}));
