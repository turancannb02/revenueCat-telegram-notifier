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

// revenueCatTelegramNotifier/tmp_scripts_224/5c186f68-f5a3-4c8a-b3cb-ebeb4d379b3c_temp.ts
var c186f68_f5a3_4c8a_b3cb_ebeb4d379b3c_temp_exports = {};
__export(c186f68_f5a3_4c8a_b3cb_ebeb4d379b3c_temp_exports, {
  default: () => formatTelegramMessage
});
module.exports = __toCommonJS(c186f68_f5a3_4c8a_b3cb_ebeb4d379b3c_temp_exports);
async function formatTelegramMessage({
  user_id,
  product_id,
  purchase_date,
  type,
  country,
  notificationMessage
}) {
  let formattedDate = "Unknown";
  if (purchase_date) {
    formattedDate = new Date(purchase_date).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  const messageText = `${notificationMessage}

\u{1F464} *User ID:* \`${user_id}\`
\u{1F6CD}\uFE0F *Product:* \`${product_id}\`
\u{1F4C5} *Date:* ${formattedDate}
\u{1F30D} *Country:* ${country}
\u{1F4DD} *Event Type:* \`${type}\``;
  return { messageText };
}
