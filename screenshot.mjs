// Take a screenshot of a URL using Puppeteer.
// Usage:
//   node screenshot.mjs http://localhost:3000
//   node screenshot.mjs http://localhost:3000 mylabel
//
// Saves to ./temporary screenshots/screenshot-N[-label].png (auto-incremented).
import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const ROOT = path.dirname(url.fileURLToPath(import.meta.url));
const OUT_DIR = path.join(ROOT, 'temporary screenshots');

const targetUrl = process.argv[2];
const label = process.argv[3];

if (!targetUrl) {
  console.error('Usage: node screenshot.mjs <url> [label]');
  process.exit(1);
}

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// Find next available index
function nextIndex() {
  const files = fs.readdirSync(OUT_DIR).filter(f => /^screenshot-\d+/.test(f));
  let max = 0;
  for (const f of files) {
    const m = f.match(/^screenshot-(\d+)/);
    if (m) max = Math.max(max, parseInt(m[1], 10));
  }
  return max + 1;
}

const idx = nextIndex();
const filename = label
  ? `screenshot-${idx}-${label}.png`
  : `screenshot-${idx}.png`;
const outPath = path.join(OUT_DIR, filename);

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 60000 });
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(`Saved: ${outPath}`);
  } finally {
    await browser.close();
  }
})().catch(err => {
  console.error(err);
  process.exit(1);
});
