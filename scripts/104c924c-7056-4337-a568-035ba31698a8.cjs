var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// revenueCatTelegramNotifier/tmp_scripts_224/104c924c-7056-4337-a568-035ba31698a8_temp.ts
var c924c_7056_4337_a568_035ba31698a8_temp_exports = {};
__export(c924c_7056_4337_a568_035ba31698a8_temp_exports, {
  default: () => revenueCatWebhookParser
});
module.exports = __toCommonJS(c924c_7056_4337_a568_035ba31698a8_temp_exports);
async function revenueCatWebhookParser({
  webhookPayload
}, {
  logging
}) {
  try {
    if (!webhookPayload || typeof webhookPayload !== "object" && typeof webhookPayload !== "string") {
      throw new Error("Invalid webhook payload: expected an object or JSON string");
    }
    if (typeof webhookPayload === "string") {
      webhookPayload = JSON.parse(webhookPayload);
    }
    const user_id = webhookPayload.app_user_id || "";
    const product_id = webhookPayload.product_id || "";
    const purchase_date = webhookPayload.purchased_at_ms ? new Date(webhookPayload.purchased_at_ms).toISOString() : "";
    const type = webhookPayload.type || "";
    const country = webhookPayload.country_code || "Unknown";
    let eventClassification = "";
    let notificationMessage = "";
    switch (type.toUpperCase()) {
      case "TRIAL_STARTED":
        eventClassification = "trial_start";
        notificationMessage = "\u{1F9EA} New Trial Started";
        break;
      case "INITIAL_PURCHASE":
      case "NON_RENEWING_PURCHASE":
        eventClassification = "purchase";
        notificationMessage = "\u{1F389} New Purchase Notification";
        break;
      case "RENEWAL":
        eventClassification = "renewal";
        notificationMessage = "\u{1F504} Subscription Renewed";
        break;
      case "CANCELLATION":
        eventClassification = "cancellation";
        notificationMessage = "\u274C Subscription Cancelled";
        break;
      default:
        eventClassification = "other";
        notificationMessage = `\u2139\uFE0F ${type || "Unknown"} Event`;
    }
    return {
      user_id,
      product_id,
      purchase_date,
      type,
      country,
      eventClassification,
      notificationMessage
    };
  } catch (error) {
    logging.error("Error parsing RevenueCat webhook payload:", error);
    throw error;
  }
}
