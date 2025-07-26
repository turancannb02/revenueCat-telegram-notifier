"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bucket = void 0;
var storage_1 = require("@google-cloud/storage");
var storage = new storage_1.Storage();
exports.bucket = storage.bucket(process.env.BUCKET);
