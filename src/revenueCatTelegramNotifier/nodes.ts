export const nodes = [
  {
    "0": "A",
    "1": "u",
    "2": "t",
    "3": "o",
    "4": "f",
    "5": "i",
    "6": "l",
    "7": "l",
    "8": "i",
    "9": "n",
    "10": "g",
    "11": " ",
    "12": "t",
    "13": "h",
    "14": "e",
    "15": " ",
    "16": "v",
    "17": "a",
    "18": "l",
    "19": "u",
    "20": "e",
    "21": "s",
    "22": " ",
    "23": "f",
    "24": "o",
    "25": "r",
    "26": " ",
    "27": "t",
    "28": "h",
    "29": "i",
    "30": "s",
    "31": " ",
    "32": "n",
    "33": "o",
    "34": "d",
    "35": "e",
    "36": " ",
    "37": "c",
    "38": "a",
    "39": "n",
    "40": " ",
    "41": "h",
    "42": "e",
    "43": "l",
    "44": "p",
    "45": " ",
    "46": "y",
    "47": "o",
    "48": "u",
    "49": " ",
    "50": "a",
    "51": "c",
    "52": "h",
    "53": "i",
    "54": "e",
    "55": "v",
    "56": "e",
    "57": " ",
    "58": "y",
    "59": "o",
    "60": "u",
    "61": "r",
    "62": " ",
    "63": "r",
    "64": "e",
    "65": "q",
    "66": "u",
    "67": "i",
    "68": "r",
    "69": "e",
    "70": "m",
    "71": "e",
    "72": "n",
    "73": "t",
    "74": ".",
    "meta": {
      "icon": {
        "url": null,
        "type": "URL"
      },
      "description": "Extracts user_id, product_id, purchase_date, type, and event classification from the RevenueCat webhook payload with formatted notification messages.",
      "name": "Extract Purchase Data with Notifications",
      "id": "extract-purchase-data-with-notifications"
    },
    "output": {
      "buildship": {
        "index": "0"
      },
      "properties": {
        "user_id": {
          "type": "string",
          "buildship": {
            "index": "0"
          },
          "title": "user_id"
        },
        "product_id": {
          "type": "string",
          "title": "product_id",
          "buildship": {
            "index": "1"
          }
        },
        "purchase_date": {
          "title": "purchase_date",
          "type": "string",
          "buildship": {
            "index": "2"
          }
        },
        "type": {
          "buildship": {
            "index": "3"
          },
          "title": "type",
          "type": "string"
        },
        "country": {
          "type": "string",
          "title": "country",
          "buildship": {
            "index": "4"
          }
        },
        "eventClassification": {
          "type": "string",
          "title": "eventClassification",
          "buildship": {
            "index": "5"
          }
        },
        "notificationMessage": {
          "type": "string",
          "title": "notificationMessage",
          "buildship": {
            "index": "6"
          }
        }
      },
      "type": "object"
    },
    "plan": {
      "output": [
        {
          "id": "user_id",
          "description": "The ID of the purchasing user.",
          "type": "string",
          "name": "User ID"
        },
        {
          "id": "product_id",
          "type": "string",
          "name": "Product ID",
          "description": "The product identifier for the purchase."
        },
        {
          "type": "string",
          "description": "The ISO date/time of the purchase.",
          "name": "Purchase Date",
          "id": "purchase_date"
        },
        {
          "description": "The purchase event type (e.g., INITIAL_PURCHASE).",
          "name": "Type",
          "type": "string",
          "id": "type"
        }
      ],
      "inputs": [
        {
          "id": "webhookPayload",
          "type": "object",
          "_ai_instruction": "Extract user_id, product_id, purchase_date, and type from the payload. Prioritize use of relevant context and environment variables if available.",
          "name": "RevenueCat Webhook Payload",
          "description": "The JSON webhook payload from RevenueCat."
        }
      ],
      "description": "Extracts user_id, product_id, purchase_date, and type from the RevenueCat webhook payload. Custom script node since no library node exists for RevenueCat webhook parsing.",
      "name": "Extract Purchase Data"
    },
    "description": "Extracts user_id, product_id, purchase_date, and type from the RevenueCat webhook payload. Custom script node since no library node exists for RevenueCat webhook parsing.",
    "script": "export default async function revenueCatWebhookParser({\n  webhookPayload\n}: NodeInputs, {\n  logging\n}: NodeScriptOptions) {\n  try {\n    if (!webhookPayload || (typeof webhookPayload !== 'object' && typeof webhookPayload !== 'string')) {\n      throw new Error('Invalid webhook payload: expected an object or JSON string');\n    }\n\n    if (typeof webhookPayload === 'string') {\n      webhookPayload = JSON.parse(webhookPayload);\n    }\n\n    // DOĞRUDAN webhookPayload kullan\n    const user_id = webhookPayload.app_user_id || '';\n    const product_id = webhookPayload.product_id || '';\n    const purchase_date = webhookPayload.purchased_at_ms\n      ? new Date(webhookPayload.purchased_at_ms).toISOString()\n      : '';\n    const type = webhookPayload.type || '';\n    const country = webhookPayload.country_code || 'Unknown';\n\n    let eventClassification = '';\n    let notificationMessage = '';\n\n    switch (type.toUpperCase()) {\n      case 'TRIAL_STARTED':\n        eventClassification = 'trial_start';\n        notificationMessage = '🧪 New Trial Started';\n        break;\n      case 'INITIAL_PURCHASE':\n      case 'NON_RENEWING_PURCHASE':\n        eventClassification = 'purchase';\n        notificationMessage = '🎉 New Purchase Notification';\n        break;\n      case 'RENEWAL':\n        eventClassification = 'renewal';\n        notificationMessage = '🔄 Subscription Renewed';\n        break;\n      case 'CANCELLATION':\n        eventClassification = 'cancellation';\n        notificationMessage = '❌ Subscription Cancelled';\n        break;\n      default:\n        eventClassification = 'other';\n        notificationMessage = `ℹ️ ${type || 'Unknown'} Event`;\n    }\n\n    return {\n      user_id,\n      product_id,\n      purchase_date,\n      type,\n      country,\n      eventClassification,\n      notificationMessage\n    };\n  } catch (error) {\n    logging.error('Error parsing RevenueCat webhook payload:', error);\n    throw error;\n  }\n}\n",
    "inputs": {
      "type": "object",
      "properties": {
        "webhookPayload": {
          "title": "webhookPayload",
          "description": "The RevenueCat webhook payload object to parse.",
          "buildship": {
            "index": "0",
            "sensitive": false,
            "defaultExpressionType": "text"
          },
          "type": "object",
          "properties": {}
        }
      },
      "required": [
        "webhookPayload"
      ]
    },
    "id": "104c924c-7056-4337-a568-035ba31698a8",
    "type": "script",
    "dependencies": {},
    "label": "Extract Purchase Data"
  },
  {
    "type": "script",
    "output": {
      "buildship": {
        "index": "0"
      },
      "properties": {
        "messageText": {
          "buildship": {
            "index": "0"
          },
          "type": "string",
          "title": "messageText"
        }
      },
      "type": "object"
    },
    "isCollapsed": false,
    "description": "Formats a Telegram notification message for the new purchase using the provided template. Custom script node.",
    "inputs": {
      "required": [
        "user_id",
        "type",
        "country",
        "purchase_date",
        "product_id"
      ],
      "sections": {},
      "properties": {
        "notificationMessage": {
          "title": "notificationMessage",
          "buildship": {
            "index": "0",
            "sensitive": false,
            "hidden": false,
            "placeholder": "",
            "defaultExpressionType": "text"
          },
          "type": "string"
        },
        "user_id": {
          "type": "string",
          "buildship": {
            "userPromptHint": "Enter the User ID.",
            "readOnly": false,
            "index": "1"
          },
          "description": "The unique identifier of the user who made the purchase.",
          "title": "User ID"
        },
        "product_id": {
          "title": "product_id",
          "description": "The identifier of the purchased product.",
          "buildship": {
            "index": "2",
            "sensitive": false,
            "defaultExpressionType": "text"
          },
          "type": "string"
        },
        "purchase_date": {
          "title": "purchase_date",
          "description": "The date and time when the purchase was made (ISO format recommended).",
          "buildship": {
            "index": "3",
            "sensitive": false,
            "defaultExpressionType": "text"
          },
          "type": "string"
        },
        "type": {
          "title": "event_type",
          "description": "The type of event (e.g., purchase, renewal).",
          "buildship": {
            "index": "4",
            "sensitive": false,
            "defaultExpressionType": "text"
          },
          "type": "string"
        },
        "country": {
          "title": "country",
          "buildship": {
            "index": "5",
            "sensitive": false,
            "defaultExpressionType": "text"
          },
          "type": "string"
        },
        "eventClassification": {
          "title": "eventClassification",
          "buildship": {
            "index": "6",
            "sensitive": false,
            "defaultExpressionType": "text"
          },
          "type": "string"
        }
      },
      "type": "object",
      "structure": [
        {
          "id": "notificationMessage",
          "parentId": null,
          "depth": "0",
          "index": "0"
        },
        {
          "index": "1",
          "id": "user_id",
          "parentId": null,
          "depth": "0"
        },
        {
          "id": "product_id",
          "index": "2",
          "parentId": null,
          "depth": "0"
        },
        {
          "index": "3",
          "parentId": null,
          "id": "purchase_date",
          "depth": "0"
        },
        {
          "index": "4",
          "id": "type",
          "parentId": null,
          "depth": "0"
        },
        {
          "depth": "0",
          "index": "5",
          "id": "country",
          "parentId": null
        },
        {
          "id": "eventClassification",
          "parentId": null,
          "depth": "0",
          "index": "6"
        }
      ]
    },
    "meta": {
      "id": "format-telegram-message",
      "description": "Formats a Telegram notification message for the new purchase using the provided template. Custom script node.",
      "name": "Format Telegram Message",
      "icon": {
        "url": null,
        "type": "URL"
      }
    },
    "dependencies": {},
    "id": "5c186f68-f5a3-4c8a-b3cb-ebeb4d379b3c",
    "label": "Format Telegram Message",
    "script": "export default async function formatTelegramMessage({\n  user_id,\n  product_id,\n  purchase_date,\n  type,\n  country,\n  notificationMessage\n}) {\n  let formattedDate = 'Unknown';\n  if (purchase_date) {\n    formattedDate = new Date(purchase_date).toLocaleString('en-US', {\n      year: 'numeric',\n      month: 'long',\n      day: 'numeric',\n      hour: '2-digit',\n      minute: '2-digit'\n    });\n  }\n\n  const messageText = `${notificationMessage}\\n\\n` +\n    `👤 *User ID:* \\`${user_id}\\`\\n` +\n    `🛍️ *Product:* \\`${product_id}\\`\\n` +\n    `📅 *Date:* ${formattedDate}\\n` +\n    `🌍 *Country:* ${country}\\n` +\n    `📝 *Event Type:* \\`${type}\\``;\n\n  return { messageText };\n}\n",
    "plan": {
      "output": [
        {
          "id": "messageText",
          "description": "Formatted Telegram message for the purchase event.",
          "type": "string",
          "name": "Message Text"
        }
      ],
      "description": "Formats a Telegram notification message for the new purchase using the provided template. Custom script node.",
      "inputs": [
        {
          "description": "The user ID extracted from the webhook.",
          "name": "User ID",
          "type": "string",
          "_ai_instruction": "Use the user_id output from previous node.",
          "id": "user_id"
        },
        {
          "name": "Product ID",
          "description": "The product ID extracted from the webhook.",
          "type": "string",
          "id": "product_id",
          "_ai_instruction": "Use the product_id output from previous node."
        },
        {
          "_ai_instruction": "Use the purchase_date output from previous node.",
          "type": "string",
          "name": "Purchase Date",
          "id": "purchase_date",
          "description": "The purchase date extracted from the webhook."
        },
        {
          "_ai_instruction": "Use the type output from previous node.",
          "name": "Type",
          "type": "string",
          "description": "The purchase event type extracted from the webhook.",
          "id": "type"
        }
      ],
      "name": "Format Telegram Message"
    },
    "enableScriptInputs": false,
    "inputsScript": "/**\n * Add your custom logic here.\n *\n * Create an object in the structure of the JSON schema specification and return it:\n * https://json-schema.org/learn/miscellaneous-examples#basic\n *\n * To avoid creating dynamic inputs, return `undefined`.\n */\n\nreturn undefined;"
  },
  {
    "integrity": "v3:555df5d24c8e28da8e3030ab671360b3",
    "id": "9fe8ed28-5c57-4f36-8f36-ef427b921371",
    "groupInfo": "0IAjU2tekQHjibkvicpQ",
    "output": {
      "buildship": {
        "index": "0"
      },
      "type": "object",
      "properties": {
        "ok": {
          "buildship": {
            "index": "0"
          },
          "type": "boolean",
          "title": "ok"
        },
        "result": {
          "properties": {
            "chat": {
              "properties": {
                "username": {
                  "type": "string",
                  "buildship": {
                    "index": "2"
                  },
                  "title": "username"
                },
                "type": {
                  "type": "string",
                  "buildship": {
                    "index": "3"
                  },
                  "title": "type"
                },
                "id": {
                  "buildship": {
                    "index": "0"
                  },
                  "type": "number",
                  "title": "id"
                },
                "first_name": {
                  "buildship": {
                    "index": "1"
                  },
                  "type": "string",
                  "title": "first_name"
                }
              },
              "buildship": {
                "index": "2"
              },
              "type": "object",
              "title": "chat"
            },
            "date": {
              "buildship": {
                "index": "3"
              },
              "title": "date",
              "type": "number"
            },
            "from": {
              "properties": {
                "username": {
                  "buildship": {
                    "index": "3"
                  },
                  "title": "username",
                  "type": "string"
                },
                "is_bot": {
                  "title": "is_bot",
                  "buildship": {
                    "index": "1"
                  },
                  "type": "boolean"
                },
                "id": {
                  "title": "id",
                  "type": "number",
                  "buildship": {
                    "index": "0"
                  }
                },
                "first_name": {
                  "type": "string",
                  "buildship": {
                    "index": "2"
                  },
                  "title": "first_name"
                }
              },
              "type": "object",
              "buildship": {
                "index": "1"
              },
              "title": "from"
            },
            "message_id": {
              "buildship": {
                "index": "0"
              },
              "type": "number",
              "title": "message_id"
            },
            "text": {
              "buildship": {
                "index": "4"
              },
              "type": "string",
              "title": "text"
            }
          },
          "title": "result",
          "type": "object",
          "buildship": {
            "index": "1"
          }
        }
      }
    },
    "dependencies": {},
    "inputs": {
      "properties": {
        "text": {
          "type": "string",
          "buildship": {
            "index": "2",
            "placeholder": "Your message content here",
            "sensitive": false
          },
          "description": "The text of the message to be sent",
          "title": "Text",
          "properties": {}
        },
        "chatId": {
          "properties": {},
          "description": "The unique identifier for the target chat",
          "buildship": {
            "placeholder": "chat-id",
            "sensitive": false,
            "index": "1"
          },
          "title": "Chat ID",
          "type": "string"
        }
      },
      "structure": [
        {
          "index": "1",
          "parentId": null,
          "id": "chatId",
          "depth": "0"
        },
        {
          "parentId": null,
          "id": "text",
          "index": "2",
          "depth": "0"
        }
      ],
      "sections": {},
      "required": [
        "telegramApiToken",
        "chatId",
        "text"
      ],
      "type": "object"
    },
    "script": "export default async function sendMessage({ chatId, text }: NodeInputs, { auth }): NodeOutput {\n  const token = auth.getKey();\n  if (!token) {\n    throw new Error(\"Telegram bot token is missing. Please select a key.\");\n  }\n\n  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {\n    method: \"POST\",\n    headers: { \"Content-Type\": \"application/json\" },\n    body: JSON.stringify({\n      chat_id: chatId,\n      text,\n      parse_mode: \"Markdown\" // önemli\n    }),\n  });\n\n  const data = await response.json();\n\n  if (!response.ok || data.ok === false) {\n    console.error(\"Telegram API Error:\", data);\n    throw new Error(`Failed to send Telegram message: ${data.description || 'Unknown error'}`);\n  }\n\n  return data;\n}\n",
    "version": "5.0.0",
    "label": "Send Telegram Message",
    "featured": true,
    "_groupInfo": {
      "uid": "telegram",
      "iconUrl": "https://firebasestorage.googleapis.com/v0/b/website-a1s39m.appspot.com/o/buildship-app-logos%2FTelegram.png?alt=media&token=836e9e1a-72fd-4362-97e6-45473a183a4a",
      "keyDescription": "Your Telegram Bot Token provided by BotFather. (Refer to the [SendAudio API endpoint docs](https://telegram-bot-sdk.readme.io/reference/sendaudio).)",
      "name": "Telegram",
      "description": "Nodes for integrating Telegram functionality within your Workflow.",
      "acceptsKey": true
    },
    "src": "https://storage.googleapis.com/buildship-app-us-central1/publicLib/nodesV2/@buildship/telegram-send-message/5.0.0/build.cjs",
    "integrations": [],
    "_libRef": {
      "version": "5.0.0",
      "src": "https://storage.googleapis.com/buildship-app-us-central1/publicLib/nodesV2/@buildship/telegram-send-message/5.0.0/build.cjs",
      "integrity": "v3:555df5d24c8e28da8e3030ab671360b3",
      "isDirty": true,
      "libNodeRefId": "@buildship/telegram-send-message",
      "libType": "public",
      "buildHash": "7efe405e12a7c89f84b4c3fe245fd0406acf2611a24ed75ca903605ac7552d74"
    },
    "meta": {
      "id": "telegram-send-message",
      "name": "Send Telegram Message",
      "description": "Sends a message to a Telegram chat via the Telegram Bot API",
      "icon": {
        "type": "URL",
        "url": "https://firebasestorage.googleapis.com/v0/b/website-a1s39m.appspot.com/o/buildship-app-logos%2FTelegram.png?alt=media&token=836e9e1a-72fd-4362-97e6-45473a183a4a"
      }
    },
    "type": "script"
  },
  {
    "label": "Outputs",
    "description": "",
    "id": "0265cc6f-8060-4336-9daf-01752982baaf",
    "type": "output"
  }
]