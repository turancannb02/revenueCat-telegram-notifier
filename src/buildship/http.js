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
exports.httpExecutor = void 0;
exports.fetchRequest = fetchRequest;
var path_1 = require("path");
function renderTemplate(template, context) {
    return template.replace(/\(\$([a-zA-Z0-9_.]+)\)/g, function (_, key) {
        var keyParts = key.split(".");
        var value = context;
        for (var _i = 0, keyParts_1 = keyParts; _i < keyParts_1.length; _i++) {
            var keyPart = keyParts_1[_i];
            value = value[keyPart];
            if (value === undefined)
                break;
        }
        return value;
    });
}
function renderRequestBody(spec, context) {
    var _a;
    // There should only be one request body. We are getting the first one.
    var requestBody = Object.values((_a = spec === null || spec === void 0 ? void 0 : spec.content) !== null && _a !== void 0 ? _a : {}).slice(0, 1)[0];
    if (!requestBody)
        return undefined;
    var body = renderBodyValue(requestBody.value, context, requestBody.schema);
    if (typeof body === "object") {
        return JSON.stringify(body);
    }
    else if (typeof body === "string") {
        return body;
    }
    else if (typeof body === "bigint" || typeof body === "boolean" || typeof body === "number") {
        return String(body);
    }
    return undefined;
}
function renderBodyValue(value, context, schema) {
    var _a;
    var body;
    if (typeof value === "object") {
        body = {};
        for (var _i = 0, _b = Object.entries(value); _i < _b.length; _i++) {
            var _c = _b[_i], key = _c[0], property = _c[1];
            body[key] = renderBodyValue(property, context, (_a = schema === null || schema === void 0 ? void 0 : schema.properties) === null || _a === void 0 ? void 0 : _a[key]);
        }
    }
    else if (typeof value === "string") {
        body = renderTemplate(value, context);
    }
    else if (typeof value === "bigint" || typeof value === "boolean" || typeof value === "number") {
        body = value;
    }
    // Fix typeof body based on schema type if possible
    try {
        body = (schema === null || schema === void 0 ? void 0 : schema.type) !== "string" && typeof value === "string" ? JSON.parse(body) : body;
    }
    catch (_d) { }
    return body;
}
function renderPath(path, context) {
    return path.replace(/\{([a-zA-Z0-9_.]+)\}/g, function (_, key) {
        var keyParts = key.split(".");
        var value = context;
        for (var _i = 0, keyParts_2 = keyParts; _i < keyParts_2.length; _i++) {
            var keyPart = keyParts_2[_i];
            value = value[keyPart];
            if (value === undefined)
                throw new Error("Undefined value in template for key: ".concat(key));
        }
        return value;
    });
}
function fetchRequest(node, context) {
    return __awaiter(this, void 0, void 0, function () {
        var isAccessTokenRequired, isIntegrationKeyRequired, runtimeEnv, getAccessToken, spec, headers, pathParams, queryParams, integrationId, accountId, getAccessTokenResp, selectedIntegrationKey, body, contentType, renderedUrl, url, response, getAccessTokenResp, responseText;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    isAccessTokenRequired = Array.isArray(node.integrations) && node.integrations.length > 0;
                    isIntegrationKeyRequired = ((_a = node._groupInfo) === null || _a === void 0 ? void 0 : _a.acceptsKey) &&
                        !isAccessTokenRequired &&
                        node.spec.parameters.some(function (p) { var _a; return (_a = p.value) === null || _a === void 0 ? void 0 : _a.includes("($auth.integrationKey)"); });
                    runtimeEnv = process.env.BS_ENV;
                    getAccessToken = function () {
                        throw new Error("getAccessToken is not implemented");
                    };
                    spec = node.spec;
                    headers = {};
                    pathParams = {};
                    queryParams = {};
                    if (!isAccessTokenRequired) return [3 /*break*/, 2];
                    return [4 /*yield*/, getAccessToken(false)];
                case 1:
                    getAccessTokenResp = _d.sent();
                    context = __assign(__assign({}, context), { auth: __assign(__assign({}, context.auth), { token: getAccessTokenResp.access_token }) });
                    _d.label = 2;
                case 2:
                    if (isIntegrationKeyRequired) {
                        selectedIntegrationKey = getKey(context.inputs.kbIntegrationKey, {
                            ignoreMissingKey: false,
                        });
                        context = __assign(__assign({}, context), { auth: __assign(__assign({}, context.auth), { integrationKey: selectedIntegrationKey }) });
                    }
                    spec.parameters.forEach(function (param) {
                        switch (param.in) {
                            case "header":
                                headers[param.name] = param.value ? renderTemplate(param.value, context) : undefined;
                                break;
                            case "path":
                                pathParams[param.name] = param.value ? renderTemplate(param.value, context) : undefined;
                                break;
                            case "query":
                                queryParams[param.name] = param.value ? renderTemplate(param.value, context) : undefined;
                                break;
                            default:
                                throw new Error("Unsupported parameter location: ".concat(param.in));
                        }
                    });
                    body = spec.method !== "GET" ? renderRequestBody(spec.requestBody, context) : undefined;
                    contentType = Object.keys((_c = (_b = spec.requestBody) === null || _b === void 0 ? void 0 : _b.content) !== null && _c !== void 0 ? _c : {}).slice(0, 1)[0];
                    if (contentType) {
                        headers["Content-Type"] = contentType;
                    }
                    renderedUrl = renderPath(spec.servers[0].url, pathParams);
                    url = new URL(renderedUrl);
                    Object.keys(queryParams).forEach(function (key) { return url.searchParams.append(key, queryParams[key]); });
                    return [4 /*yield*/, fetch(url, {
                            method: spec.method,
                            headers: headers,
                            body: body,
                        })];
                case 3:
                    response = _d.sent();
                    if (!(response.status === 401 && integrationId && accountId)) return [3 /*break*/, 6];
                    return [4 /*yield*/, getAccessToken(true)];
                case 4:
                    getAccessTokenResp = _d.sent();
                    context = __assign(__assign({}, context), { auth: __assign(__assign({}, context.auth), { token: getAccessTokenResp.access_token }) });
                    return [4 /*yield*/, fetch(url, {
                            method: spec.method,
                            headers: headers,
                            body: body ? JSON.stringify(body) : undefined,
                        })];
                case 5:
                    response = _d.sent();
                    _d.label = 6;
                case 6: return [4 /*yield*/, response.text()];
                case 7:
                    responseText = _d.sent();
                    // Using try-catch block to check if valid JSON because
                    // content-type header can't be trusted.
                    try {
                        return [2 /*return*/, {
                                status: response.status,
                                response: JSON.parse(responseText),
                            }];
                    }
                    catch (_e) {
                        return [2 /*return*/, {
                                status: response.status,
                                response: responseText,
                            }];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
var httpExecutor = function (workflowDirectory) { return function (nodeId, args) { return __awaiter(void 0, void 0, void 0, function () {
    var nodes, node;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.resolve("".concat(path_1.default.join(workflowDirectory, "nodes.js"))).then(function (s) { return require(s); })];
            case 1:
                nodes = (_a.sent()).nodes;
                node = nodes.find(function (n) { return n.id === nodeId; });
                if (!node)
                    throw new Error("Node with id ".concat(nodeId, " not found"));
                return [2 /*return*/, fetchRequest(node, { inputs: args })];
        }
    });
}); }; };
exports.httpExecutor = httpExecutor;
function getKey(kbIntegrationKey, options) {
    var runtimeEnv = process.env.BS_ENV;
    var selectedKey = kbIntegrationKey;
    if (selectedKey === undefined) {
        if (options === null || options === void 0 ? void 0 : options.ignoreMissingKey)
            return undefined;
        throw new Error("No key was selected for this trigger. Please select one in the trigger's setup/config tab.");
    }
    var _a = selectedKey.split(";;"), groupUid = _a[0], keyId = _a[1];
    return JSON.parse(process.env[runtimeEnv ? "".concat(runtimeEnv, "ProjectEnv") : "projectEnv"] || "{}")[selectedKey];
}
