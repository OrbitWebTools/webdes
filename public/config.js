// WebDes Application Variables
// This is the single source of truth for all customer handles, payments and endpoints.
// Easily edit this file to configure the website branding and connections.

const CONFIG = {
    phone: "+91 6291192742",
    email: "contact.webdesai@gmail.com",
    upi_id: "6291192742@kotakbank",
    qr_image: "./qr-code.png", // Will fall back to dynamic checkout SVG if image isn't available
    render_webhook_url: "" // Paste your Render URL here (e.g. https://my-webhook.onrender.com)
};

// Expose globally for module scripts
if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}
