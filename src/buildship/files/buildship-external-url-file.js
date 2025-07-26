"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildShipExternalUrlFile = void 0;
var fs_1 = require("fs");
var stream_1 = require("stream");
var uuid_1 = require("uuid");
var path_1 = require("path");
var constants_js_1 = require("./constants.js");
var buildship_local_file_js_1 = require("./buildship-local-file.js");
var buildship_file_buffer_file_js_1 = require("./buildship-file-buffer-file.js");
var buildship_base64_file_js_1 = require("./buildship-base64-file.js");
var BuildShipExternalUrlFile = /** @class */ (function () {
    function BuildShipExternalUrlFile(workflowExecutionId, externalUrl, meta) {
        this.type = "external-url";
        this._workflowExecutionId = workflowExecutionId;
        this.file = externalUrl;
        this.metadata = meta;
    }
    BuildShipExternalUrlFile.prototype.convertTo = function (desiredType) {
        var _this = this;
        switch (desiredType) {
            case "external-url":
                return function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, this];
                }); }); };
            case "file-buffer":
                return function () { return __awaiter(_this, void 0, void 0, function () {
                    var fileBuffer, metadata, _a, _b;
                    var _c;
                    var _d, _e;
                    return __generator(this, function (_f) {
                        switch (_f.label) {
                            case 0: return [4 /*yield*/, this.generateFileBuffer()];
                            case 1:
                                fileBuffer = _f.sent();
                                _a = [__assign({}, this.metadata)];
                                _c = {};
                                if (!((_e = (_d = this.metadata) === null || _d === void 0 ? void 0 : _d.mimetype) !== null && _e !== void 0)) return [3 /*break*/, 2];
                                _b = _e;
                                return [3 /*break*/, 4];
                            case 2: return [4 /*yield*/, this.getMimeType()];
                            case 3:
                                _b = (_f.sent());
                                _f.label = 4;
                            case 4:
                                metadata = __assign.apply(void 0, _a.concat([(_c.mimetype = _b, _c)]));
                                return [2 /*return*/, new buildship_file_buffer_file_js_1.BuildShipFileBufferFile(this._workflowExecutionId, fileBuffer, metadata)];
                        }
                    });
                }); };
            case "local-file": {
                return function (destinationPath) { return __awaiter(_this, void 0, void 0, function () {
                    var localPath, metadata, _a, _b;
                    var _c;
                    var _d, _e;
                    return __generator(this, function (_f) {
                        switch (_f.label) {
                            case 0: return [4 /*yield*/, this.saveAsLocalFile(destinationPath)];
                            case 1:
                                localPath = _f.sent();
                                _a = [__assign({}, this.metadata)];
                                _c = {};
                                if (!((_e = (_d = this.metadata) === null || _d === void 0 ? void 0 : _d.mimetype) !== null && _e !== void 0)) return [3 /*break*/, 2];
                                _b = _e;
                                return [3 /*break*/, 4];
                            case 2: return [4 /*yield*/, this.getMimeType()];
                            case 3:
                                _b = (_f.sent());
                                _f.label = 4;
                            case 4:
                                metadata = __assign.apply(void 0, _a.concat([(_c.mimetype = _b, _c)]));
                                return [2 /*return*/, new buildship_local_file_js_1.BuildShipLocalFile(this._workflowExecutionId, localPath, metadata)];
                        }
                    });
                }); };
            }
            case "base64":
                return function () { return __awaiter(_this, void 0, void 0, function () {
                    var fileBuffer, metadata, _a, _b;
                    var _c;
                    var _d, _e;
                    return __generator(this, function (_f) {
                        switch (_f.label) {
                            case 0: return [4 /*yield*/, this.generateFileBuffer()];
                            case 1:
                                fileBuffer = _f.sent();
                                _a = [__assign({}, this.metadata)];
                                _c = {};
                                if (!((_e = (_d = this.metadata) === null || _d === void 0 ? void 0 : _d.mimetype) !== null && _e !== void 0)) return [3 /*break*/, 2];
                                _b = _e;
                                return [3 /*break*/, 4];
                            case 2: return [4 /*yield*/, this.getMimeType()];
                            case 3:
                                _b = (_f.sent());
                                _f.label = 4;
                            case 4:
                                metadata = __assign.apply(void 0, _a.concat([(_c.mimetype = _b, _c)]));
                                return [2 /*return*/, new buildship_base64_file_js_1.BuildShipBase64File(this._workflowExecutionId, fileBuffer.toString("base64"), metadata)];
                        }
                    });
                }); };
            default:
                throw new Error("Invalid desired type: Trying to convert from type \"".concat(this.type, "\" to type \"").concat(desiredType, "\""));
        }
    };
    BuildShipExternalUrlFile.prototype.getMimeType = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resp, error_1, resp2, error2_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 7]);
                        return [4 /*yield*/, fetch(this.file, { method: "HEAD" })];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, resp.headers.get("content-type")];
                    case 2:
                        error_1 = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, fetch(this.file)];
                    case 4:
                        resp2 = _a.sent();
                        return [2 /*return*/, resp2.headers.get("content-type")];
                    case 5:
                        error2_1 = _a.sent();
                        return [2 /*return*/, null];
                    case 6: return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    BuildShipExternalUrlFile.prototype.saveAsLocalFile = function (destinationPath) {
        return __awaiter(this, void 0, void 0, function () {
            var pathToUse, wStream, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pathToUse = destinationPath !== null && destinationPath !== void 0 ? destinationPath : constants_js_1.TEMP_FOLDER_PATH + this._workflowExecutionId + "/" + (0, uuid_1.v4)();
                        return [4 /*yield*/, fs_1.promises.mkdir(path_1.default.dirname(pathToUse), { recursive: true })];
                    case 1:
                        _a.sent();
                        wStream = fs_1.default.createWriteStream(pathToUse);
                        return [4 /*yield*/, fetch(this.file)];
                    case 2:
                        body = (_a.sent()).body;
                        if (!body) {
                            throw new Error("Error while converting External URL file to Local File: Failed to fetch file from external URL.");
                        }
                        return [4 /*yield*/, stream_1.promises.finished(stream_1.Readable.fromWeb(body).pipe(wStream))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, pathToUse];
                }
            });
        });
    };
    BuildShipExternalUrlFile.prototype.generateFileBuffer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body, rStream;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(this.file)];
                    case 1:
                        body = (_a.sent()).body;
                        if (!body) {
                            throw new Error("Error while converting External URL file to File Buffer: Failed to fetch file from external URL.");
                        }
                        rStream = stream_1.Readable.fromWeb(body);
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                var chunks = [];
                                rStream.on("data", function (chunk) { return chunks.push(chunk); });
                                rStream.on("end", function () { return resolve(Buffer.concat(chunks)); });
                                rStream.on("error", reject);
                            })];
                }
            });
        });
    };
    return BuildShipExternalUrlFile;
}());
exports.BuildShipExternalUrlFile = BuildShipExternalUrlFile;
