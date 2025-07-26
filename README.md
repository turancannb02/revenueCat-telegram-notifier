# 📲 RevenueCat to Telegram Notifier

[![Build with BuildShip](https://img.shields.io/badge/Built%20with-BuildShip-blueviolet?style=for-the-badge&logo=serverless)](https://buildship.com)
[![Made for Indie Devs](https://img.shields.io/badge/Indie%20Dev-Friendly-✓-brightgreen?style=for-the-badge)](https://indiehackers.com)
[![Telegram Bot](https://img.shields.io/badge/Telegram-Bot-2CA5E0?style=for-the-badge&logo=telegram)](https://t.me/BotFather)
[![MIT License](https://img.shields.io/github/license/yourusername/revenuecat-telegram-notifier?style=for-the-badge)](LICENSE)

> A no-code template to receive RevenueCat event notifications directly in your Telegram inbox.

---

## 📖 Overview

This template connects **RevenueCat webhooks** to **Telegram**, allowing you to get notified in real-time when key subscription events happen:

- 🔔 Trial Started
- 💳 Initial Purchase
- 🔄 Renewal
- ❌ Cancellation
- ... and more

It's built with [BuildShip](https://buildship.com) — a powerful automation platform — and is perfect for indie devs, product owners, and mobile app teams.

---

## ✅ Prerequisites

You'll need the following:

- A [RevenueCat](https://revenuecat.com) account with webhook access
- A Telegram bot via [@BotFather](https://t.me/BotFather)
- Your Telegram `chat_id`
- A [BuildShip](https://buildship.com) account
- (Optional) Familiarity with `curl` or Postman to test payloads

---

## ✍️ How to Use

### 🛠 Step 1: Add Telegram Bot Token to BuildShip

1. In BuildShip, go to **Auth Keys**.
2. Add your bot token and save it under a recognizable name.
3. This token is used in the `Send Telegram Message` block.

---

### 🧪 Step 2: Connect RevenueCat Webhook

1. Go to [RevenueCat Webhooks](https://app.revenuecat.com/webhooks)
2. Add a new webhook with your BuildShip **workflow URL**  
   Example:  
   `https://your-buildship-url/executeWorkflow/abc123`
3. Select event types like `INITIAL_PURCHASE`, `RENEWAL`, `CANCELLATION`, etc.

---

### 🔧 Step 3: Customize the Message Format (Optional)

Inside the `Format Telegram Message` step, you can edit the output.  
By default, messages look like this:

```
🎉 New Purchase Notification

👤 User ID: `user_123`
🛍️ Product: `com.example.app.premium`
📅 Date: July 26, 2025, 12:51 PM
🌍 Country: US
📝 Event Type: `INITIAL_PURCHASE`
```
Markdown formatting is enabled via `parse_mode: "Markdown"`.

---

### 🚀 Step 4: Test Your Setup

#### ✅ Option A: RevenueCat Test Button

- Go to the webhook settings in RevenueCat
- Click **Test Webhook**
- Choose any event (`RENEWAL`, `CANCELLATION`, etc.)

#### ✅ Option B: Manual curl Test

```bash
curl -X POST https://your-buildship-url/executeWorkflow/abc123 \
  -H "Content-Type: application/json" \
  -d '{
    "event": {
      "app_user_id": "user_test",
      "product_id": "com.example.subscription",
      "purchased_at_ms": 1753435998800,
      "type": "RENEWAL",
      "country_code": "US"
    }
  }'
```

## 🔗 Resources

- 📚 [RevenueCat Webhook Docs](https://www.revenuecat.com/docs/webhooks/notifications)
- 🤖 [Telegram Bot API](https://core.telegram.org/bots/api)
- 🧪 [Test Webhooks in RevenueCat](https://www.revenuecat.com/docs/webhooks/test-events)
- 🧰 [BuildShip Templates](https://buildship.com/templates)

---

## 🙌 Author & License

Built by [@turancannb02](https://github.com/turancannb02) with ☕ and ❤️  
Feel free to fork, star, or contribute at:  
**`git@github.com:turancannb02/revenueCat-telegram-notifier.git`**

Released under the [MIT License](LICENSE)
