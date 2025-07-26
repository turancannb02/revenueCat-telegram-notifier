"use strict";
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
exports.BuildShipBase64File = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var uuid_1 = require("uuid");
var constants_js_1 = require("./constants.js");
var buildship_file_buffer_file_js_1 = require("./buildship-file-buffer-file.js");
var buildship_local_file_js_1 = require("./buildship-local-file.js");
var BuildShipBase64File = /** @class */ (function () {
    function BuildShipBase64File(workflowExecutionId, b64Encoding, meta) {
        this.type = "base64";
        this._workflowExecutionId = workflowExecutionId;
        this.file = b64Encoding.startsWith("data:")
            ? b64Encoding.split(";base64,").pop()
            : b64Encoding;
        this.metadata = meta;
    }
    BuildShipBase64File.prototype.convertTo = function (desiredType) {
        var _this = this;
        switch (desiredType) {
            case "base64":
                return function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, this];
                }); }); };
            case "local-file":
                return function (destinationPath) { return __awaiter(_this, void 0, void 0, function () {
                    var localPath;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.saveAsLocalFile(destinationPath)];
                            case 1:
                                localPath = _a.sent();
                                return [2 /*return*/, new buildship_local_file_js_1.BuildShipLocalFile(this._workflowExecutionId, localPath, this.metadata)];
                        }
                    });
                }); };
            case "file-buffer":
                return function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _a = buildship_file_buffer_file_js_1.BuildShipFileBufferFile.bind;
                                _b = [void 0, this._workflowExecutionId];
                                return [4 /*yield*/, this.generateFileBuffer()];
                            case 1: return [2 /*return*/, new (_a.apply(buildship_file_buffer_file_js_1.BuildShipFileBufferFile, _b.concat([_c.sent(), this.metadata])))()];
                        }
                    });
                }); };
            default:
                throw new Error("Invalid desired type: Trying to convert from type \"".concat(this.type, "\" to type \"").concat(desiredType, "\""));
        }
    };
    BuildShipBase64File.prototype.saveAsLocalFile = function (destinationPath) {
        return __awaiter(this, void 0, void 0, function () {
            var pathToUse, base64Data;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        pathToUse = destinationPath !== null && destinationPath !== void 0 ? destinationPath : constants_js_1.TEMP_FOLDER_PATH +
                            this._workflowExecutionId +
                            "/" +
                            (0, uuid_1.v4)() +
                            (((_a = this.metadata) === null || _a === void 0 ? void 0 : _a.mimetype) ? ".".concat(this.metadata.mimetype.split("/").pop()) : "");
                        return [4 /*yield*/, fs_1.promises.mkdir(path_1.default.dirname(pathToUse), { recursive: true })];
                    case 1:
                        _b.sent();
                        base64Data = this.file.split(";base64,").pop();
                        return [4 /*yield*/, fs_1.promises.writeFile(pathToUse, Buffer.from(base64Data, "base64"))];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, pathToUse];
                }
            });
        });
    };
    BuildShipBase64File.prototype.generateFileBuffer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var base64Data;
            return __generator(this, function (_a) {
                base64Data = this.file.split(";base64,").pop();
                return [2 /*return*/, Buffer.from(base64Data, "base64")];
            });
        });
    };
    return BuildShipBase64File;
}());
exports.BuildShipBase64File = BuildShipBase64File;
