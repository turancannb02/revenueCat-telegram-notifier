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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scripExecutor = void 0;
exports.getSecret = getSecret;
exports.parseExpression = parseExpression;
exports.setResult = setResult;
exports.duplicateState = duplicateState;
exports.executeWorkflow = executeWorkflow;
/** @ts-ignore */
var acorn = require("acorn");
var path_1 = require("path");
var url_1 = require("url");
var index_js_1 = require("./files/index.js");
var lodash_es_1 = require("lodash-es");
var __dirname = path_1.default.dirname((0, url_1.fileURLToPath)(import.meta.url));
var runtimeEnv = process.env.BS_ENV;
function getSecret(name, runtimeEnv) {
    return process.env[name];
}
function isMultiline(codeString) {
    try {
        var parsedCode = acorn.parse(codeString, {
            ecmaVersion: "latest",
            sourceType: "module",
            allowReturnOutsideFunction: true,
            locations: true,
        });
        var statement = parsedCode.body[parsedCode.body.length - 1];
        if (!parsedCode || !statement)
            return false;
        return (parsedCode.body.length > 1 ||
            statement.type === "ReturnStatement" ||
            statement.type === "VariableDeclaration");
    }
    catch (error) {
        return false;
    }
}
function formatExpression(inputString) {
    var isJSON = /^\s*(?:\(\s*)?(?:\{[\s\S]*\}|\[[\s\S]*\]|`[^`]*`|'[^']*'|"[^"]*"|true|false|null|-?\d+(\.\d+)?([eE][+\-]?\d+)?)?(?:\s*\))?\s*$/.test(inputString.trim());
    if (isJSON || !isMultiline(inputString))
        return "async (ctx,getSecret,projectEnv,stringify) => (".concat(inputString, ")");
    return "async (ctx,getSecret,projectEnv,stringify) => {".concat(inputString, "}");
}
function parseExpression(ctx, val) {
    return __awaiter(this, void 0, void 0, function () {
        var runtimeEnv;
        var _a, _b;
        return __generator(this, function (_c) {
            ctx = { root: ctx };
            runtimeEnv = (_a = process.env.runtimeEnv) !== null && _a !== void 0 ? _a : "test-env";
            return [2 /*return*/, eval(formatExpression(val))(__assign(__assign({}, ctx), { env: {} }), function (name) { return getSecret(name, runtimeEnv); }, JSON.parse((_b = (runtimeEnv ? process.env["".concat(runtimeEnv, "ProjectEnv")] : process.env.projectEnv)) !== null && _b !== void 0 ? _b : "{}"), function (value) { return (typeof value === "string" ? value : JSON.stringify(value)); })];
        });
    });
}
var scripExecutor = function (workflowDirectory) {
    return function (nodeId_1, args_1, root_1) {
        var args_2 = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args_2[_i - 3] = arguments[_i];
        }
        return __awaiter(void 0, __spreadArray([nodeId_1, args_1, root_1], args_2, true), void 0, function (nodeId, args, root, subNodes) {
            var script, nodes, node, subNodesCamelcased;
            var _a, _b;
            if (subNodes === void 0) { subNodes = {}; }
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, Promise.resolve("".concat("../../scripts/".concat(nodeId, ".cjs"))).then(function (s) { return require(s); })];
                    case 1:
                        script = (_c.sent()).default.default;
                        return [4 /*yield*/, Promise.resolve("".concat(path_1.default.join(workflowDirectory, "nodes.js"))).then(function (s) { return require(s); })];
                    case 2:
                        nodes = (_c.sent()).nodes;
                        node = nodes.find(function (node) { return node.id === nodeId; });
                        if (!node) {
                            throw new Error("Node with ID ".concat(nodeId, " not found."));
                        }
                        subNodesCamelcased = (_b = (_a = node.nodes) === null || _a === void 0 ? void 0 : _a.map(function (subNode) {
                            var _a, _b;
                            return (__assign(__assign({}, subNode), { label: (0, lodash_es_1.camelCase)((_a = subNode.label) !== null && _a !== void 0 ? _a : (_b = subNode.meta) === null || _b === void 0 ? void 0 : _b.name) }));
                        })) !== null && _b !== void 0 ? _b : [];
                        return [2 /*return*/, script(args, {
                                env: {},
                                logging: console,
                                auth: {
                                    getKey: function (options) {
                                        var selectedKey = args.kbIntegrationKey;
                                        if (selectedKey === undefined) {
                                            if (options === null || options === void 0 ? void 0 : options.ignoreMissingKey)
                                                return undefined;
                                            throw new Error("No key was selected for this trigger. Please select one in the trigger's setup/config tab.");
                                        }
                                        var _a = selectedKey.split(";;"), groupUid = _a[0], keyId = _a[1];
                                        // This case should never happen, but just in case it does, the error should help with debugging.
                                        if (groupUid !== node._groupInfo.uid) {
                                            throw new Error("Selected key (".concat(selectedKey, ") does not belong to this trigger's group (").concat(node._groupInfo.uid, ")."));
                                        }
                                        return JSON.parse(process.env[runtimeEnv ? "".concat(runtimeEnv, "ProjectEnv") : "projectEnv"] || "{}")[selectedKey];
                                    },
                                    getToken: function () {
                                        throw new Error("OAuth nodes are not yet supported with local executor");
                                    },
                                },
                                getBuildShipFile: index_js_1.getBuildShipFile,
                                secret: {
                                    get: getSecret,
                                    set: function (name, value) {
                                        throw new Error("Setting secrets is not yet supported with local executor");
                                    },
                                },
                                execute: function (name, args) { return __awaiter(void 0, void 0, void 0, function () {
                                    var nodeToExecuteId, executeSubNode;
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                nodeToExecuteId = (_a = subNodesCamelcased.find(function (subNode) { return subNode.label === name; })) === null || _a === void 0 ? void 0 : _a.id;
                                                if (!nodeToExecuteId) {
                                                    throw new Error("Node with name ".concat(name, " not found."));
                                                }
                                                executeSubNode = subNodes[nodeToExecuteId];
                                                if (!executeSubNode) {
                                                    throw new Error("Internal Error: OpenAI function not found.");
                                                }
                                                return [4 /*yield*/, executeSubNode(args)];
                                            case 1: return [2 /*return*/, _b.sent()];
                                        }
                                    });
                                }); },
                                pause: function () {
                                    throw new Error("Pause is not yet supported with local executor");
                                },
                                nodes: subNodesCamelcased,
                                // TODO: This root should be coming from the workflow execution context.
                                root: root,
                            })];
                }
            });
        });
    };
};
exports.scripExecutor = scripExecutor;
function setResult(obj, value, keyPath) {
    var lastKeyIndex = keyPath.length - 1;
    for (var i = 0; i < lastKeyIndex; ++i) {
        var key = keyPath[i];
        if (!(key in obj)) {
            obj[key] = {};
        }
        obj = obj[key];
    }
    obj[keyPath[lastKeyIndex]] = value;
}
function duplicateState(state) {
    var newState = __assign(__assign({}, JSON.parse(JSON.stringify(state))), { 
        // The state object is used by Set Variable nodes to store data. The workflow variables are
        // like global variables and are shared between all nodes/sub-nodes.
        state: state.state });
    return newState;
}
function executeWorkflow(workflowName, args) {
    return __awaiter(this, void 0, void 0, function () {
        var workflow, ctx, root, ret, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve("".concat(path_1.default.join(__dirname, "../", workflowName, "index.js"))).then(function (s) { return require(s); })];
                case 1:
                    workflow = (_a.sent()).default;
                    ctx = {};
                    root = (ctx.root = {});
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, workflow(args, root)];
                case 3:
                    ret = _a.sent();
                    return [2 /*return*/, ret];
                case 4:
                    error_1 = _a.sent();
                    if (error_1 === "STOP") {
                        return [2 /*return*/, root["output"]];
                    }
                    throw error_1;
                case 5: return [2 /*return*/];
            }
        });
    });
}
