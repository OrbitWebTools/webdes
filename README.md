# 🚀 WebDes: Intelligent WhatsApp Automation Suite

![WebDes Banner](https://via.placeholder.com/1200x300/0f172a/25D366?text=WebDes+Automation+Engine)

## 📌 Overview
**WebDes** is a premium, high-conversion WhatsApp Automation and CRM syncing platform built for agencies, real estate brokers, and modern businesses. It eliminates manual follow-ups by deploying zero-latency auto-responders, capturing lead data instantly, and pushing payloads directly to secure cloud webhook nodes.

## ✨ Key Features
- **🤖 Zero-Latency Auto-Replies:** Instantly respond to client queries using keyword-triggered JSON payloads.
- **📊 Seamless Data Sync:** Push captured leads (Name, Phone, Email) directly to Google Sheets or CRMs via cloud webhooks.
- **⚡ 100% Serverless Architecture:** Hosted entirely on the cloud. No local server maintenance or active scanning required.
- **💳 Integrated Payment Flow:** Dynamic UPI intent routing for mobile users and instant QR code generation for desktop checkouts.
- **🎨 Glassmorphism UI/UX:** Ultra-premium, conversion-optimized frontend built for high-ticket B2B sales.

## 🛠️ Tech Stack
- **Frontend:** Pure HTML5, CSS3, Vanilla JavaScript (Zero Build Tools)
- **Styling:** Tailwind CSS (via CDN)
- **Backend Sync:** RESTful Webhook integrations (Render/Node.js compatible)
- **Hosting:** Fully optimized for GitHub Pages / Vercel

## ⚙️ Configuration (config.js)
The entire platform is modular. Editing contact details, pricing, and webhook routes takes less than 10 seconds without touching the core HTML.

```javascript
const CONFIG = {
    phone: "+91 6291192742",
    email: "contact.webdesai@gmail.com",
    upi_id: "6291192742@kotakbank",
    qr_image: "./qr-code.png", 
    render_webhook_url: "YOUR_SECURE_WEBHOOK_URL", 
};
