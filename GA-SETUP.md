# Google Analytics 4 & Search Console Setup — Kickback.pl

## Overview
GA4 tracking and Google Search Console verification have been added to the Kickback WordPress theme. The theme now auto-collects:
- **Page views** (all pages)
- **E-commerce events**: `view_item_list`, `view_item`, `purchase` (auto-tracked from WooCommerce)
- **Measurement ID** set via wp-admin (Kickback CMS → SEO & Analytics)

---

## Step 1: Get Your GA4 Measurement ID

### Option A: You Already Have GA4 Installed
1. Go to **[Google Analytics](https://analytics.google.com)** → Sign in
2. Select your **Kickback property**
3. Click **Admin** (gear icon, bottom left)
4. Under "Property", click **Data streams**
5. Click the **web** data stream
6. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

### Option B: You Don't Have GA4 Yet (First-Time Setup)
1. Go to **[Google Analytics](https://analytics.google.com)** → Sign in
2. Click **Create** or **+ Create Property**
3. Property name: `Kickback.pl` (or your preferred name)
4. Reporting timezone: `Europe/Warsaw`
5. Currency: `PLN`
6. Click **Create**
7. Choose platform: **Web**
8. Website URL: `https://kickback.pl`
9. Property name: `Kickback.pl`
10. Click **Create data stream**
11. Copy the **Measurement ID** shown (format: `G-XXXXXXXXXX`)

---

## Step 2: Add Measurement ID to WordPress

1. Go to **wp-admin** at `https://kickback.pl/wp-admin`
2. In the left menu, find **Kickback CMS** → Click **SEO & Analytics**
3. Paste the **Measurement ID** into the field (e.g., `G-ABC123XYZ`)
4. Click **Save**

**Verification:**
- Go to the site frontend
- Open **DevTools** → **Network** tab
- Reload the page
- Search for `analytics` or `google` in the requests
- You should see a request to `https://www.googletagmanager.com/gtag/js?id=G-...` with status `200`

---

## Step 3: Verify in Google Analytics

1. Go back to **[Google Analytics](https://analytics.google.com)**
2. Select your **Kickback property**
3. Go to **Real-time** → **Overview**
4. Reload the site frontend (kickback.pl)
5. You should see **1 user** appear in Real-time within 5–10 seconds

If you don't see activity after 5 minutes:
- Check that the Measurement ID is correctly saved (re-visit wp-admin → SEO & Analytics)
- Verify the gtag.js request is loading in DevTools → Network
- Make sure you're on `https://kickback.pl` (not localhost or file://)
- Check for browser ad-blockers that might block GA

---

## Step 4: Set Up Google Search Console

### Option A: If You Already Have Search Console Access
1. Go to **[Google Search Console](https://search.google.com/search-console)**
2. Select your **kickback.pl property** (or add it if missing)
3. Go to **Settings** → **Verification**
4. Under "Verification method", look for **Meta tag**
5. Copy the content value (e.g., `google1890f46046bdf01e`)
6. Go to **wp-admin** → **Kickback CMS** → **SEO & Analytics**
7. Paste the verification meta into **Google Search Console — Verification Meta Tag**
8. Click **Save**
9. Return to Search Console and click **Verify**

### Option B: First-Time Search Console Setup
1. Go to **[Google Search Console](https://search.google.com/search-console)**
2. Click **+** → **Add property**
3. Enter: `https://kickback.pl`
4. Choose verification method: **HTML tag**
5. Copy the meta tag content (e.g., `google1890f46046bdf01e`)
6. Go to **wp-admin** → **Kickback CMS** → **SEO & Analytics**
7. Paste into **Google Search Console — Verification Meta Tag**
8. Click **Save**
9. Return to Search Console and click **Verify**

**Verification:**
- View the page source (Ctrl+U / Cmd+U) of kickback.pl
- Search for `google-site-verification`
- You should see: `<meta name="google-site-verification" content="..." />`

---

## Step 5: Submit Sitemap to Search Console

1. Go to **[Google Search Console](https://search.google.com/search-console)**
2. Select **kickback.pl** property
3. Go to **Sitemaps** (left menu)
4. Under "New sitemap", enter: `sitemap_index.xml`
5. Click **Submit**

Kickback already generates sitemaps automatically via **Rank Math** (or WooCommerce native). Verify at:
- `https://kickback.pl/sitemap_index.xml`
- `https://kickback.pl/sitemap_index.xml` (opens in browser)

---

## What's Now Tracked Automatically

### Page Views
✅ Every page load is tracked (home, categories, products, blog, checkout, etc.)

### E-commerce Events
✅ **Product List View** (`view_item_list`)
- Fired on: shop page, category page, tag page, search results
- Data: product name, category, price, quantity

✅ **Product Detail View** (`view_item`)
- Fired on: product page (PDP)
- Data: product ID, name, category, price

✅ **Add to Cart** (available, needs integration)
- Currently deferred — would need cart event listener

✅ **Purchase** (`purchase`)
- Fired on: Thank You / Order Received page
- Data: transaction ID, order total, items, prices

---

## Debugging & Troubleshooting

### GA not collecting data?

**1. Check if gtag.js is loaded**
```
DevTools → Network → Filter: "gtag"
Should see: gtag/js?id=G-... (status 200)
```

**2. Verify Measurement ID format**
- Correct: `G-ABC123XYZ`
- Wrong: `UA-123456-7` (that's old Universal Analytics, not GA4)
- Wrong: `G-ABC` (too short)

**3. Check for Content Security Policy (CSP) blocks**
- DevTools → Console
- Look for CSP errors mentioning `googletagmanager.com`
- May need to add to `script-src` allowlist in wp-config or .htaccess

**4. Verify site is HTTPS**
- GA doesn't track insecure (http://) traffic from HTTPS browsers
- Ensure home_url() returns https://

**5. Disable ad-blocker/privacy tools**
- uBlock Origin, Ghostery, Privacy Badger block GA by default
- Temporarily disable in DevTools to test

### Search Console not verifying?

**1. Refresh wp-admin → SEO & Analytics**
- Ensure the meta tag is saved correctly (no extra spaces, quotes)

**2. Check page source**
```
curl -s https://kickback.pl | grep "google-site-verification"
Should output: <meta name="google-site-verification" content="...">
```

**3. Wait 48 hours**
- Verification can take up to 2 days to process

**4. Use DNS / CNAME verification as fallback**
- If HTML meta tag fails, try DNS TXT record at your registrar

---

## Theme Code Changes

### New Files
- **`wp-theme/inc/google-analytics.php`** — GA4 tracking code + ecommerce events

### Modified Files
- **`wp-theme/functions.php`** — Added include for google-analytics.php
- **`wp-theme/inc/cmb2-fields.php`** — Added SEO & Analytics CMS section

### Options Keys Created
- `kb_ga_measurement_id` — Stores GA4 Measurement ID
- `kb_cms_seo` — Parent option for all SEO fields

---

## Deployment Checklist

- [ ] Push theme changes to GitHub (sites/release)
- [ ] SSH into home.pl and pull changes (rsync or git pull)
- [ ] Go to wp-admin → Kickback CMS → SEO & Analytics
- [ ] Add GA Measurement ID
- [ ] Add Search Console verification meta
- [ ] Test on live site — check Real-time in GA
- [ ] Verify in Search Console (HTML meta tag)
- [ ] Submit sitemap in Search Console

---

## FAQ

**Q: Will GA slow down the site?**
A: No. The gtag.js script loads **async**, so it doesn't block page rendering.

**Q: Can I use both GA and Rank Math reporting?**
A: Yes. Rank Math can display GA data within wp-admin (with API connection). GA4 tracking is independent.

**Q: Why does purchase tracking show 0 revenue?**
A: The purchase event fires on the thank-you page, but WooCommerce hides order details until email verification. Ensure `get_order()` returns order data (not null) on the thank-you page.

**Q: Can I track custom events?**
A: Yes. Add to theme with `gtag('event', 'custom_event', { ... })` in any template.

**Q: How often does GA update?**
A: Real-time data appears within 5–10 seconds. Full reports update overnight (can take 24–48 hours).

---

## Support

For issues:
1. Check [Google Analytics Help](https://support.google.com/analytics)
2. Read [GA4 ecommerce event guide](https://support.google.com/analytics/answer/9267735)
3. Review Search Console [verification guide](https://support.google.com/webmasters/answer/9008080)
