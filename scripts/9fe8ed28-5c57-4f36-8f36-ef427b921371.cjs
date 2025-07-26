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

// revenueCatTelegramNotifier/tmp_scripts_224/9fe8ed28-5c57-4f36-8f36-ef427b921371_temp.ts
var fe8ed28_5c57_4f36_8f36_ef427b921371_temp_exports = {};
__export(fe8ed28_5c57_4f36_8f36_ef427b921371_temp_exports, {
  default: () => sendMessage
});
module.exports = __toCommonJS(fe8ed28_5c57_4f36_8f36_ef427b921371_temp_exports);
async function sendMessage({ chatId, text }, { auth }) {
  const token = auth.getKey();
  if (!token) {
    throw new Error("Telegram bot token is missing. Please select a key.");
  }
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown"
      // önemli
    })
  });
  const data = await response.json();
  if (!response.ok || data.ok === false) {
    console.error("Telegram API Error:", data);
    throw new Error(`Failed to send Telegram message: ${data.description || "Unknown error"}`);
  }
  return data;
}
