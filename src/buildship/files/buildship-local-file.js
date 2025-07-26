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
exports.BuildShipLocalFile = void 0;
var fs_1 = require("fs");
var uuid_1 = require("uuid");
var path_1 = require("path");
var constants_js_1 = require("./constants.js");
var storage_js_1 = require("../storage.js");
var buildship_file_buffer_file_js_1 = require("./buildship-file-buffer-file.js");
var buildship_base64_file_js_1 = require("./buildship-base64-file.js");
var BuildShipLocalFile = /** @class */ (function () {
    function BuildShipLocalFile(workflowExecutionId, absoluteLocalPath, meta) {
        this.type = "local-file";
        this._workflowExecutionId = workflowExecutionId;
        this.file = absoluteLocalPath;
        this.fileName = this.file.split("/").pop();
        this.pathInBucket = this.file.startsWith(process.env.BUCKET_FOLDER_PATH)
            ? this.file.split(process.env.BUCKET_FOLDER_PATH + "/").pop()
            : undefined;
        this.metadata = meta;
    }
    BuildShipLocalFile.prototype.getFileBuffer = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs_1.promises.readFile(this.file)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BuildShipLocalFile.prototype.getSize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getFileBuffer()];
                    case 1: return [2 /*return*/, (_a.sent()).byteLength];
                }
            });
        });
    };
    BuildShipLocalFile.prototype.getPublicUrl = function () {
        return __awaiter(this, void 0, void 0, function () {
            var file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.file.startsWith("/tmp/"))
                            throw new Error("Temp file cannot be made public: ".concat(this.file));
                        if (!this.pathInBucket)
                            throw new Error("File does not lie in a bucket: ".concat(this.file));
                        file = storage_js_1.bucket.file(this.pathInBucket);
                        return [4 /*yield*/, file.makePublic()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, file.publicUrl()];
                }
            });
        });
    };
    BuildShipLocalFile.prototype.convertTo = function (desiredType) {
        var _this = this;
        switch (desiredType) {
            case "local-file":
                return function (destinationPath) { return __awaiter(_this, void 0, void 0, function () {
                    var localPath;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!destinationPath)
                                    return [2 /*return*/, this];
                                return [4 /*yield*/, this.saveAsLocalFile(destinationPath)];
                            case 1:
                                localPath = _a.sent();
                                return [2 /*return*/, new BuildShipLocalFile(this._workflowExecutionId, localPath, __assign(__assign({}, this.metadata), { path: localPath }))];
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
                                return [4 /*yield*/, this.getFileBuffer()];
                            case 1: return [2 /*return*/, new (_a.apply(buildship_file_buffer_file_js_1.BuildShipFileBufferFile, _b.concat([_c.sent(), this.metadata])))()];
                        }
                    });
                }); };
            case "base64":
                return function () { return __awaiter(_this, void 0, void 0, function () {
                    var buffer;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.getFileBuffer()];
                            case 1:
                                buffer = _a.sent();
                                return [2 /*return*/, new buildship_base64_file_js_1.BuildShipBase64File(this._workflowExecutionId, buffer.toString("base64"), this.metadata)];
                        }
                    });
                }); };
            default:
                throw new Error("Invalid desired type: Trying to convert from type \"".concat(this.type, "\" to type \"").concat(desiredType, "\""));
        }
    };
    BuildShipLocalFile.prototype.saveAsLocalFile = function (destinationPath) {
        return __awaiter(this, void 0, void 0, function () {
            var pathToUse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pathToUse = destinationPath !== null && destinationPath !== void 0 ? destinationPath : constants_js_1.TEMP_FOLDER_PATH + this._workflowExecutionId + "/" + (0, uuid_1.v4)();
                        return [4 /*yield*/, fs_1.promises.mkdir(path_1.default.dirname(pathToUse), { recursive: true })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, fs_1.promises.copyFile(this.file, pathToUse)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, pathToUse];
                }
            });
        });
    };
    return BuildShipLocalFile;
}());
exports.BuildShipLocalFile = BuildShipLocalFile;
