# 📲 RevenueCat to Telegram Notifier

[![Build with BuildShip](https://img.shields.io/badge/Built%20with-BuildShip-blueviolet?style=for-the-badge&logo=serverless)](https://buildship.com)  
[![Telegram Bot](https://img.shields.io/badge/Telegram-Bot-2CA5E0?style=for-the-badge&logo=telegram)](https://t.me/BotFather)  
[![MIT License](https://img.shields.io/github/license/turancannb02/revenuecat-telegram-notifier?style=for-the-badge)](LICENSE)

<<<<<<< HEAD
> A no-code + local development template to send RevenueCat event notifications to Telegram.  
> Built with [BuildShip](https://buildship.com) and testable via `tsx` locally.
=======

> A no-code template to receive RevenueCat event notifications directly in your Telegram inbox.
>>>>>>> 313c3cfe603b0a7fe92ceab593916d71c2265b58

---

## 📖 Overview

This template lets you forward key subscription events from **RevenueCat** to **Telegram**, like:

- 🔔 Trial Started
- 💳 Initial Purchase
- 🔄 Renewal
- ❌ Cancellation
- ... and more

Works both in **BuildShip Cloud** and **local development** with Node.js.

---

## ✅ Prerequisites

- A [RevenueCat](https://revenuecat.com) account with Webhook access  
- A [Telegram bot](https://t.me/BotFather) + your personal `chat_id`  
- Node.js v18+ and `tsx` installed globally or via `npx`  
- Your Telegram Bot Token  
- (Optional) A BuildShip account to deploy your workflow

---

## 🧪 Local Testing (with `tsx`)

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Add Your Telegram Bot Token

You can either:

#### Option A: Use an `.env` file

Create `.env` in the root:

```env
projectEnv={"telegram;;telegram-key-1":"<YOUR_TELEGRAM_BOT_TOKEN>"}
```

#### Option B: Pass inline via terminal

```bash
projectEnv='{"telegram;;telegram-key-1":"<YOUR_TELEGRAM_BOT_TOKEN>"}' npx tsx test-runner.ts
```

---

### 3️⃣ Run the Test Script

```bash
npx tsx test-runner.ts
```

This simulates a `CANCELLATION` event from RevenueCat.  
The Telegram message will look like:

```
ℹ️ Cancellation Event

👤 User ID: `user_test_123`
🛍️ Product: `com.test.premium`
📅 Date: July 26, 2025, 12:00 PM
🌍 Country: US
📝 Event Type: `CANCELLATION`
```

> If you see `Unknown` or empty values, check your mock data structure!

---

## 🧰 Using in BuildShip

If you want to run this workflow on BuildShip:

### 🛠 Step 1: Add Telegram Bot Token

1. Go to **Auth Keys**
2. Add a new key like:  
   `telegram;;telegram-key-1 = <your bot token>`

---

### 🔗 Step 2: Connect RevenueCat Webhook

1. Go to [RevenueCat Webhooks](https://app.revenuecat.com/webhooks)
2. Add a new webhook:
   ```
   https://your-buildship-url/executeWorkflow/<workflowId>
   ```
3. Select event types you want to receive (`INITIAL_PURCHASE`, `RENEWAL`, etc.)

---

## 🔧 Customize Your Telegram Message

You can update the format inside:
```ts
scripts/<script-id>.cjs  // e.g., formatTelegramMessage node
```

Markdown formatting is enabled via `parse_mode: "Markdown"`.

---

## 🙌 Author & License

Built with ☕ by [@turancannb02](https://github.com/turancannb02)  
**MIT Licensed** — Fork it, test it, ship it.  

> `git clone git@github.com:turancannb02/revenueCat-telegram-notifier.git`