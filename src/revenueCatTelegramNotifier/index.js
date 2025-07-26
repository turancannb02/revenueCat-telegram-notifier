"use strict";
// @ts-nocheck
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
exports.default = execute;
require("dotenv/config");
var utils_js_1 = require("../buildship/utils.js");
var http_js_1 = require("../buildship/http.js");
var path_1 = require("path");
var url_1 = require("url");
var __dirname = (0, path_1.dirname)((0, url_1.fileURLToPath)(import.meta.url));
var executeScript = (0, utils_js_1.scripExecutor)(__dirname);
var executeHttp = (0, http_js_1.httpExecutor)(__dirname);
var NODES;
(function (NODES) {
    NODES["extractPurchaseData"] = "104c924c-7056-4337-a568-035ba31698a8";
    NODES["formatTelegramMessage"] = "5c186f68-f5a3-4c8a-b3cb-ebeb4d379b3c";
    NODES["sendTelegramMessage"] = "9fe8ed28-5c57-4f36-8f36-ef427b921371";
    NODES["outputs"] = "0265cc6f-8060-4336-9daf-01752982baaf";
})(NODES || (NODES = {}));
function execute(inputs, root) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        var _k;
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    root["inputs"] = {};
                    Object.entries(inputs).forEach(function (_a) {
                        var key = _a[0], value = _a[1];
                        root["inputs"][key] = value;
                    });
                    _a = utils_js_1.setResult;
                    _b = [root];
                    return [4 /*yield*/, executeScript(NODES.extractPurchaseData, { "webhookPayload": root["inputs"]["event"] }, root, {})];
                case 1:
                    _a.apply(void 0, _b.concat([_l.sent(), [NODES.extractPurchaseData]]));
                    _c = utils_js_1.setResult;
                    _d = [root];
                    return [4 /*yield*/, executeScript(NODES.formatTelegramMessage, { "type": root[NODES.extractPurchaseData]["type"], "country": root[NODES.extractPurchaseData]["country"], "purchase_date": root[NODES.extractPurchaseData]["purchase_date"], "product_id": root[NODES.extractPurchaseData]["product_id"], "user_id": root[NODES.extractPurchaseData]["user_id"], "notificationMessage": root[NODES.extractPurchaseData]["notificationMessage"], "eventClassification": root[NODES.extractPurchaseData]["eventClassification"] }, root, {})];
                case 2:
                    _c.apply(void 0, _d.concat([_l.sent(), [NODES.formatTelegramMessage]]));
                    _e = utils_js_1.setResult;
                    _f = [root];
                    return [4 /*yield*/, executeScript(NODES.sendTelegramMessage, { "kbIntegrationKey": "telegram;;telegram-key-1", "text": root[NODES.formatTelegramMessage]["messageText"], "chatId": "1622428401" }, root, {})];
                case 3:
                    _e.apply(void 0, _f.concat([_l.sent(), [NODES.sendTelegramMessage]]));
                    _g = utils_js_1.setResult;
                    _h = [root];
                    _k = {};
                    _j = "telegramResponse";
                    return [4 /*yield*/, (0, utils_js_1.getSecret)("telegram-api")];
                case 4:
                    _g.apply(void 0, _h.concat([(_k[_j] = _l.sent(),
                            _k), ["output"]]));
                    throw "STOP";
            }
        });
    });
}
