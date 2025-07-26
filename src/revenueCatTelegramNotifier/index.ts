// @ts-nocheck

import "dotenv/config";
import pMap from "p-map";
import { getSecret, scripExecutor, parseExpression, setResult, duplicateState, executeWorkflow } from "../buildship/utils.js";
import { httpExecutor } from "../buildship/http.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
    
const __dirname = dirname(fileURLToPath(import.meta.url));

const executeScript = scripExecutor(__dirname);
const executeHttp = httpExecutor(__dirname);

enum NODES {
    "extractPurchaseData" = "104c924c-7056-4337-a568-035ba31698a8",
    "formatTelegramMessage" = "5c186f68-f5a3-4c8a-b3cb-ebeb4d379b3c",
    "sendTelegramMessage" = "9fe8ed28-5c57-4f36-8f36-ef427b921371",
    "outputs" = "0265cc6f-8060-4336-9daf-01752982baaf"
}


export default async function execute(inputs: any, root: any) {
    root["inputs"] = {};
    Object.entries(inputs).forEach(([key, value]) => {
        root["inputs"][key] = value;
    });

    setResult(root, await executeScript(NODES.extractPurchaseData, { "webhookPayload": root["inputs"]["event"] }, root, {}), [NODES.extractPurchaseData]);

    setResult(root, await executeScript(NODES.formatTelegramMessage, { "type": root[NODES.extractPurchaseData]["type"], "country": root[NODES.extractPurchaseData]["country"], "purchase_date": root[NODES.extractPurchaseData]["purchase_date"], "product_id": root[NODES.extractPurchaseData]["product_id"], "user_id": root[NODES.extractPurchaseData]["user_id"], "notificationMessage": root[NODES.extractPurchaseData]["notificationMessage"], "eventClassification": root[NODES.extractPurchaseData]["eventClassification"] }, root, {}), [NODES.formatTelegramMessage]);

    setResult(root, await executeScript(NODES.sendTelegramMessage, { "kbIntegrationKey": "telegram;;telegram-key-1", "text": root[NODES.formatTelegramMessage]["messageText"], "chatId": "1622428401" }, root, {}), [NODES.sendTelegramMessage]);

    setResult(root, {
        "telegramResponse": await getSecret("telegram-api")
    }, ["output"]);
    throw "STOP";

    return result;
}
