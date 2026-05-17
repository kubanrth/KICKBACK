#!/usr/bin/env python3
"""Generate missing Kickback pages: cart, account/login, search, blog tag pages,
and ~16 product PDPs for jackets/knitwear/tops.

Idempotent by default — existing files are skipped to protect hand-edited
content. Pass --force to overwrite everything.

Usage:
    python3 generate-missing.py             # safe: skip existing files
    python3 generate-missing.py --force     # destructive: overwrite all
"""
import os, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
FORCE = '--force' in sys.argv

HEAD = """<!doctype html>
<html lang="pl">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>{title} — Kickback</title>
<meta name="description" content="{description}" />
<meta property="og:title" content="{title} — Kickback" />
<meta property="og:description" content="{description}" />
<meta property="og:image" content="{base}brand_assets/photos/banner-glowny-pop.webp" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<script src="https://cdn.tailwindcss.com"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=DM+Sans:wght@300;400;500;600&family=Michroma&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{base}assets/styles.css">
</head>
<body class="min-h-screen">
<div data-release-header></div>
"""

TAIL = """
<div data-release-footer></div>
<script src="{base}assets/partials.js"></script>
</body>
</html>
"""

DEFAULT_DESC = "Kickback — koszulki piłkarskie i karty. Klasyka, retro, reprezentacje. Wysyłka 24h, BLIK i PayNow."

def write(path, title, main, depth, description=None):
    base = '../' * depth
    desc = description or DEFAULT_DESC
    html = HEAD.format(title=title, base=base, description=desc) + main + TAIL.format(base=base)
    full = os.path.join(ROOT, path)
    if os.path.exists(full) and not FORCE:
        print('skip (exists)', path)
        return
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, 'w') as f: f.write(html)
    print('wrote', path)

# ---------- CART ----------
def build_cart():
    main = '''
<section class="onlight bg-white pt-12 pb-20">
  <div class="mx-auto max-w-[900px] px-6 md:px-10 text-center">
    <div class="text-[11px] tracking-wide2 uppercase text-black/55">Your cart 0</div>
    <h1 class="h-editorial text-[60px] md:text-[96px] mt-8 leading-[0.95]">It's a little<br/><em class="font-wonk font-normal">empty</em> here</h1>
    <p class="mt-6 text-[14px] text-black/60">Your cart is currently empty</p>
    <a href="../collections/all.html" class="mt-8 inline-flex items-center justify-center h-12 px-8 rounded-full bg-black text-white text-[11px] tracking-wide2 uppercase font-medium pill pill-dark">Start shopping</a>
  </div>
</section>

<section class="onlight bg-white">
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 py-14 border-t hairline">
    <div class="flex items-end justify-between mb-10">
      <h2 class="h-section text-[32px] md:text-[44px]">You may also <em class="font-wonk font-normal">like</em></h2>
      <a href="../collections/all.html" class="text-[11px] tracking-wide2 uppercase link-underline">View all</a>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
      <article><a href="../products/black-puffer-jacket.html" class="tile block relative aspect-[4/5] rounded-[2px] overflow-hidden shadow-tile"><img src="https://placehold.co/900x1125/111111/111111.png" class="absolute inset-0 h-full w-full object-cover" alt=""/></a><div class="mt-5"><h3 class="pc-name">Black Puffer Jacket</h3><div class="mt-1 text-[12px]">€69.95</div></div></article>
      <article><a href="../products/green-puffguard-jacket.html" class="tile block relative aspect-[4/5] rounded-[2px] overflow-hidden shadow-tile"><img src="https://placehold.co/900x1125/3a4a36/3a4a36.png" class="absolute inset-0 h-full w-full object-cover" alt=""/></a><div class="mt-5"><h3 class="pc-name">Green PuffGuard Jacket</h3><div class="mt-1 text-[12px]">€94.95</div></div></article>
      <article><a href="../products/beige-sweater-with-zipper.html" class="tile block relative aspect-[4/5] rounded-[2px] overflow-hidden shadow-tile"><img src="https://placehold.co/900x1125/e0d2b4/e0d2b4.png" class="absolute inset-0 h-full w-full object-cover" alt=""/></a><div class="mt-5"><h3 class="pc-name">Beige Sweater with Zipper</h3><div class="mt-1 text-[12px]">€69.95</div></div></article>
      <article><a href="../products/knit-comfort-turn-up-sleeve-coat.html" class="tile block relative aspect-[4/5] rounded-[2px] overflow-hidden shadow-tile"><img src="https://placehold.co/900x1125/8e6b44/8e6b44.png" class="absolute inset-0 h-full w-full object-cover" alt=""/></a><div class="mt-5"><h3 class="pc-name">Knit Comfort Turn-Up Sleeve Coat</h3><div class="mt-1 text-[12px]">€79.95</div></div></article>
    </div>
  </div>
</section>
'''
    write('pages/cart.html', 'Your shopping cart', main, 1)
build_cart()

# ---------- ACCOUNT / LOGIN ----------
def build_login():
    main = '''
<section class="page-banner text-center">
  <div class="mx-auto max-w-[1200px] px-6">
    <div class="crumbs mb-6"><a href="../index.html">Home</a><span class="sep">/</span><span>Account</span></div>
    <h1>Login</h1>
    <p>Welcome back. Sign in to access your orders, saved items, and account details.</p>
  </div>
</section>

<section class="onlight bg-white">
  <div class="mx-auto max-w-[460px] px-6 py-20">
    <form class="space-y-5" onsubmit="event.preventDefault()">
      <label class="block">
        <span class="text-[11px] tracking-wide2 uppercase text-black/60">Email</span>
        <input type="email" class="mt-2 w-full h-12 px-4 border hairline rounded-[2px] text-[14px] outline-none focus:border-black" placeholder="jane@example.com"/>
      </label>
      <label class="block">
        <span class="text-[11px] tracking-wide2 uppercase text-black/60">Password</span>
        <input type="password" class="mt-2 w-full h-12 px-4 border hairline rounded-[2px] text-[14px] outline-none focus:border-black" placeholder="••••••••"/>
      </label>
      <div class="flex items-center justify-between text-[11px] tracking-wide2 uppercase">
        <label class="inline-flex items-center gap-2 text-black/60"><input type="checkbox"/>Remember me</label>
        <a href="#" class="link-underline">Forgot password?</a>
      </div>
      <button class="w-full h-12 rounded-full bg-black text-white text-[11px] tracking-wide2 uppercase font-medium pill pill-dark">Sign in</button>
    </form>
    <div class="mt-10 pt-8 border-t hairline text-center">
      <p class="text-[13px] text-black/60">New to release?</p>
      <a href="register.html" class="mt-4 inline-flex items-center justify-center h-12 px-7 rounded-full border hairline text-[11px] tracking-wide2 uppercase font-medium pill">Create account</a>
    </div>
    <div class="mt-10 text-center text-[11px] tracking-wide2 uppercase text-black/45">
      Or continue with
    </div>
    <div class="mt-4 flex items-center justify-center gap-3">
      <button class="h-11 w-11 rounded-full border hairline flex items-center justify-center" aria-label="Google"><svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22 12c0-.7-.1-1.4-.2-2H12v4h5.7c-.2 1.3-1 2.4-2.1 3.1v2.6h3.4c2-1.8 3-4.5 3-7.7z"/><path fill="#34A853" d="M12 23c2.8 0 5.2-.9 6.9-2.5l-3.4-2.6c-.9.6-2.1 1-3.5 1-2.7 0-5-1.8-5.8-4.3H2.7v2.7C4.4 20.7 7.9 23 12 23z"/><path fill="#FBBC05" d="M6.2 14.6c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V8.1H2.7C2 9.5 1.6 11 1.6 12.7s.4 3.2 1.1 4.6l3.5-2.7z"/><path fill="#EA4335" d="M12 5.6c1.5 0 2.9.5 4 1.5l3-3C17.2 2.5 14.8 1.6 12 1.6 7.9 1.6 4.4 3.9 2.7 7.2l3.5 2.7C7 7.4 9.3 5.6 12 5.6z"/></svg></button>
      <button class="h-11 w-11 rounded-full border hairline flex items-center justify-center" aria-label="Shop Pay"><svg width="18" height="18" viewBox="0 0 24 24" fill="#5A31F4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14.5v-4l-3-3h3v-3l3 3v3h3l-3 3v4h-3z"/></svg></button>
    </div>
  </div>
</section>
'''
    write('pages/login.html', 'Login', main, 1)

    # Registration page
    reg = '''
<section class="page-banner text-center">
  <div class="mx-auto max-w-[1200px] px-6">
    <div class="crumbs mb-6"><a href="../index.html">Home</a><span class="sep">/</span><a href="login.html">Account</a><span class="sep">/</span><span>Register</span></div>
    <h1>Create <em class="font-wonk font-normal">account</em></h1>
    <p>Save your details for faster checkout and track your orders.</p>
  </div>
</section>
<section class="onlight bg-white">
  <div class="mx-auto max-w-[460px] px-6 py-20">
    <form class="space-y-5" onsubmit="event.preventDefault()">
      <div class="grid grid-cols-2 gap-4">
        <label class="block"><span class="text-[11px] tracking-wide2 uppercase text-black/60">First name</span><input class="mt-2 w-full h-12 px-4 border hairline rounded-[2px] text-[14px] outline-none focus:border-black"/></label>
        <label class="block"><span class="text-[11px] tracking-wide2 uppercase text-black/60">Last name</span><input class="mt-2 w-full h-12 px-4 border hairline rounded-[2px] text-[14px] outline-none focus:border-black"/></label>
      </div>
      <label class="block"><span class="text-[11px] tracking-wide2 uppercase text-black/60">Email</span><input type="email" class="mt-2 w-full h-12 px-4 border hairline rounded-[2px] text-[14px] outline-none focus:border-black"/></label>
      <label class="block"><span class="text-[11px] tracking-wide2 uppercase text-black/60">Password</span><input type="password" class="mt-2 w-full h-12 px-4 border hairline rounded-[2px] text-[14px] outline-none focus:border-black"/></label>
      <label class="flex items-start gap-2 text-[12px] text-black/65"><input type="checkbox" class="mt-0.5"/>I agree to the <a href="terms.html" class="link-underline">terms of service</a> and <a href="privacy.html" class="link-underline">privacy policy</a>.</label>
      <button class="w-full h-12 rounded-full bg-black text-white text-[11px] tracking-wide2 uppercase font-medium pill pill-dark">Create account</button>
    </form>
    <p class="mt-8 text-center text-[13px] text-black/60">Already have an account? <a href="login.html" class="link-underline">Sign in</a></p>
  </div>
</section>
'''
    write('pages/register.html', 'Create account', reg, 1)
build_login()

# ---------- SEARCH ----------
def build_search():
    results = [
        ('waterproof-insulated-down-jacket', 'WarmGuard HydroDown Jacket', '€149.00', None, None, '5 taille', '111111'),
        ('hydrophobic-wind-resistant-padded-jacket', 'AquaShield Windbreaker Padded Jacket', '€64.90', '€79.90', '18% off', '5 size', '2b2b2b'),
        ('down-jacket-x-studio-nicholso', 'White PaddedFold Jacket', '€129.00', None, None, '5 taille', 'efefef'),
        ('black-puffer-jacket', 'Black Puffer Jacket', '€69.95', None, None, '4 size and 2 color', '1a1a1a'),
        ('white-puffer-jacket', 'White Puffer Jacket', '€69.95', None, None, '2 color and 4 size', 'f0f0f0'),
        ('green-puffguard-jacket', 'Green PuffGuard Jacket', '€94.95', None, None, '1 title', '3a4a36'),
        ('green-long-wool-coat', 'Green long wool coat', '€119.00', None, None, '1 title', '4a5a40'),
    ]
    cards = ''
    for slug, name, price, compare, badge, meta, color in results:
        badge_html = f'<span class="absolute left-4 top-4 text-[10px] tracking-wide2 uppercase bg-white/90 px-2 py-1 rounded-full">{badge}</span>' if badge else ''
        price_html = f'<span class="line-through text-black/40">{compare}</span> <span class="text-[#b4332a]">{price}</span>' if compare else price
        cards += f'''<article class="group">
          <a href="../products/{slug}.html" class="tile block relative aspect-[4/5] rounded-[2px] overflow-hidden shadow-tile">
            <img src="https://placehold.co/900x1125/{color}/{color}.png" class="absolute inset-0 h-full w-full object-cover" alt="{name}"/>
            {badge_html}
          </a>
          <div class="mt-5">
            <h3 class="pc-name">{name}</h3>
            <div class="mt-1 text-[12px]">{price_html}</div>
            <div class="pc-meta">Available in {meta}</div>
          </div>
        </article>'''

    main = f'''
<section class="onlight bg-[var(--stone)]">
  <div class="mx-auto max-w-[1200px] px-6 md:px-10 pt-12 pb-10">
    <form class="flex items-center gap-3 bg-white rounded-full pl-6 pr-2 h-14 border hairline max-w-[720px] mx-auto" onsubmit="event.preventDefault()">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
      <input class="flex-1 bg-transparent text-[15px] outline-none" value="jacket" placeholder="Search for products, articles..."/>
      <button class="h-10 px-6 rounded-full bg-black text-white text-[11px] tracking-wide2 uppercase">Search</button>
      <a href="#" class="text-[11px] tracking-wide2 uppercase text-black/55 pr-2">Clear</a>
    </form>
    <div class="text-center mt-8">
      <h1 class="h-editorial text-[40px] md:text-[56px]">Search results for <em class="font-wonk font-normal">"jacket"</em></h1>
      <p class="mt-4 text-[13px] text-black/55">Showing 7 of 7 products</p>
    </div>
  </div>
</section>

<section class="onlight bg-white">
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 py-10 flex items-center justify-between border-b hairline">
    <button class="inline-flex items-center gap-2 text-[11px] tracking-wide2 uppercase">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18M6 12h12M10 18h4"/></svg>
      Filters
    </button>
    <div class="inline-flex items-center gap-2 text-[11px] tracking-wide2 uppercase">
      <span class="text-black/60">Sort by</span>
      <button class="inline-flex items-center gap-1.5 border hairline rounded-full px-4 h-9">Relevance <span class="caret">▾</span></button>
    </div>
  </div>

  <div class="mx-auto max-w-[1600px] px-6 md:px-10 py-14">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {cards}
    </div>
  </div>
</section>

<section class="onlight bg-[var(--stone)]">
  <div class="mx-auto max-w-[1200px] px-6 py-14">
    <h2 class="h-section text-[24px] md:text-[32px] mb-6">Related <em class="font-wonk font-normal">articles</em></h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <a href="../blogs/news/the-timeless-elegance-of-soft-beige-cream-and-peach.html" class="flex gap-4 bg-white p-4 rounded-[2px] hairline border">
        <div class="tile w-24 h-24 flex-shrink-0"><img src="https://placehold.co/200x200/4a4137/4a4137.png" class="w-full h-full object-cover" alt=""/></div>
        <div>
          <div class="text-[10px] tracking-wide2 uppercase text-black/50">Article</div>
          <div class="mt-1 font-display text-[17px] leading-tight">Defying the Twilight: Bold Styles for Modern Rebels</div>
        </div>
      </a>
      <a href="../blogs/news/10-fresh-fashion-trends-for-the-season-ahead.html" class="flex gap-4 bg-white p-4 rounded-[2px] hairline border">
        <div class="tile w-24 h-24 flex-shrink-0"><img src="https://placehold.co/200x200/b9a27f/b9a27f.png" class="w-full h-full object-cover" alt=""/></div>
        <div>
          <div class="text-[10px] tracking-wide2 uppercase text-black/50">Article</div>
          <div class="mt-1 font-display text-[17px] leading-tight">10 Fresh Fashion Trends for the Season Ahead</div>
        </div>
      </a>
    </div>
  </div>
</section>
'''
    write('pages/search.html', 'Search results', main, 1)
build_search()

# ---------- BLOG TAG PAGES ----------
ALL_POSTS = [
    ('fashion-forward-navigating-the-path-to-sustainable-style', 'Fashion Forward: Navigating the Path to Sustainable Style', 'Julia Hampel', 'March 1, 2024', ['Sustainability', 'Benefits'], '#3f3d55'),
    ('10-fresh-fashion-trends-for-the-season-ahead', '10 Fresh Fashion Trends for the Season Ahead', 'Julia Hampel', 'March 1, 2024', ['Trends'], '#b9a27f'),
    ('denim-decoded-a-guide-to-styling-your-favorite-jeans', 'BTS: Matching Shooting Locations With Our Collections', 'Julia Hampel', 'March 1, 2024', ['Trends'], '#6b5a44'),
    ('the-benefits-of-organic-cotton', 'Cruelty Free Fashion, is it possible?', 'Julia Hampel', 'March 1, 2024', ['Benefits'], '#e4e1db'),
    ('the-timeless-elegance-of-soft-beige-cream-and-peach', 'Defying the Twilight: Bold Styles for Modern Rebels', 'Julia Hampel', 'March 1, 2024', ['Trends'], '#4a4137'),
]

def build_blog_tag(tag):
    # filter posts by tag
    filtered = [p for p in ALL_POSTS if tag in p[4]]
    cards = ''.join(f'''<a href="../{slug}.html" class="group block">
      <div class="tile relative aspect-[4/3] overflow-hidden rounded-[2px] shadow-tile">
        <img src="https://placehold.co/1200x900/{color.strip('#')}/{color.strip('#')}.png" class="absolute inset-0 h-full w-full object-cover" alt=""/>
      </div>
      <div class="mt-5 text-[10px] tracking-wide2 uppercase text-black/55">{tags[0]}</div>
      <h3 class="mt-2 h-section text-[22px] md:text-[26px] max-w-[420px]">{title}</h3>
      <div class="mt-3 text-[10px] tracking-wide2 uppercase text-black/55">{author} · {date}</div>
    </a>''' for slug, title, author, date, tags, color in filtered)

    def active(t):
        return ' border-b border-black pb-3 -mb-px' if t == tag else ' text-black/55 hover:text-black pb-3'

    main = f'''
<section class="page-banner text-center">
  <div class="mx-auto max-w-[1200px] px-6">
    <div class="crumbs mb-6"><a href="../../../index.html">Home</a><span class="sep">/</span><a href="../../news.html">Blog</a><span class="sep">/</span><span>{tag}</span></div>
    <h1>Never miss a beat with our latest <em class="font-wonk font-normal">news</em></h1>
    <p class="mt-4 text-[13px] tracking-wide2 uppercase text-black/55">Tagged: {tag}</p>
  </div>
</section>

<section class="onlight bg-white">
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 pt-10 pb-6 flex items-center gap-6 text-[11px] tracking-wide2 uppercase border-b hairline">
    <a href="../../news.html" class="text-black/55 hover:text-black pb-3">Show all</a>
    <a href="benefits.html" class="{active('Benefits')}">Benefits</a>
    <a href="sustainability.html" class="{active('Sustainability')}">Sustainability</a>
    <a href="trends.html" class="{active('Trends')}">Trends</a>
  </div>
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 py-16">
    {'<div class="grid grid-cols-1 md:grid-cols-3 gap-10">' + cards + '</div>' if filtered else '<div class="text-center py-20 text-[14px] text-black/55">No posts tagged with "' + tag + '" yet.</div>'}
  </div>
</section>
'''
    slug = tag.lower()
    write(f'blogs/news/tagged/{slug}.html', f'News tagged "{tag}"', main, 3)

for t in ['Benefits', 'Sustainability', 'Trends']:
    build_blog_tag(t)

# ---------- PRODUCT PAGES (16 new, matching key categories) ----------
PDPS = [
    # JACKETS (6)
    ('waterproof-insulated-down-jacket', 'WarmGuard HydroDown Jacket', 'Jackets & Coats', '149.00', None, None,
     'Waterproof insulated down jacket engineered for sub-zero conditions. Hydrophobic goose-down fill retains warmth even when wet, sealed seams keep moisture out, and the adjustable hood protects against wind and rain without compromising sight lines.',
     ['2b2b2b','1a1a1a','3a3a3a','121212','2c2c2c'], ['XS','S','M','L','XL'], 'M', 'Black', ['#111','#f0f0f0'], 'Only 8 left in stock. Order soon.'),
    ('hydrophobic-wind-resistant-padded-jacket', 'AquaShield Windbreaker Padded Jacket', 'Jackets & Coats', '64.90', '79.90', '18% off',
     'Hydrophobic wind-resistant padded jacket with storm-ready technical fabric. Lightweight enough to layer, warm enough for shoulder seasons. Treated with a DWR finish that resists light rain and bead off water.',
     ['5a5a5a','3a3a3a','2a2a2a','4a4a4a','6a6a6a'], ['XS','S','M','L','XL'], 'S', 'Charcoal', ['#3a3a3a','#7a7a7a','#2a2a2a'], 'Last few — only 3 pieces remaining.'),
    ('down-jacket-x-studio-nicholso', 'White PaddedFold Jacket', 'Jackets & Coats', '129.00', None, None,
     'Down jacket in collaboration with Studio Nicholson. A clean, architectural silhouette with carefully engineered fold lines that hold structure over time. Premium duck-down fill, matte nylon shell, minimal branding.',
     ['f0f0f0','e8e8e8','dfdfdf','e4e4e4','ededed'], ['XS','S','M','L','XL'], 'M', 'White', ['#efefef','#111'], 'In stock.'),
    ('black-puffer-jacket', 'Black Puffer Jacket', 'Jackets & Coats', '69.95', None, None,
     'Classic black puffer with oversized baffles and a slightly cropped cut. Pairs equally with tailoring and denim. Drawstring hem, zipped hand pockets, matte exterior.',
     ['1a1a1a','111111','222222','141414','1f1f1f'], ['XS','S','M','L'], 'M', 'Black', ['#111','#f0f0f0'], 'In stock.'),
    ('white-puffer-jacket', 'White Puffer Jacket', 'Jackets & Coats', '69.95', None, None,
     'The same foundational puffer in bright white. Coated finish resists dirt, recycled polyester fill, horizontal baffling for a vintage silhouette.',
     ['f0f0f0','e8e8e8','ededed','efefef'], ['XS','S','M','L'], 'S', 'White', ['#efefef','#111'], 'In stock.'),
    ('green-puffguard-jacket', 'Green PuffGuard Jacket', 'Jackets & Coats', '94.95', None, None,
     'PuffGuard jacket in deep forest green. Double-layer construction with internal baffles for deep-winter warmth. Fully taped seams, oversized fit, cropped waist.',
     ['3a4a36','2a3a26','4a5a46','3a4a36'], ['XS','S','M','L'], 'M', 'Forest green', ['#3a4a36'], 'In stock.'),

    # KNITWEAR (5)
    ('green-long-wool-coat', 'Green Long Wool Coat', 'Knitwear', '119.00', None, None,
     'Long-line wool coat in deep moss green. Traditional tailoring with a modern oversized cut, notched lapel, single-breasted closure. Made from a 70% wool blend.',
     ['4a5a40','3a4a36','5a6a52','3a4a38'], ['XS','S','M','L','XL'], 'M', 'Moss', ['#4a5a40'], 'In stock.'),
    ('beige-sweater-with-zipper', 'Beige Sweater with Zipper', 'Knitwear', '69.95', None, 'Pre-order',
     'Pre-order. Chunky ribbed knit sweater in warm beige with a half-zip placket. Merino wool blend, raglan sleeves, weighted hem. Delivery expected in 3 weeks.',
     ['e0d2b4','d8caac','ccbfa3','e0d2b4'], ['XS','S','M','L'], 'M', 'Beige', ['#e0d2b4','#111','#f0ece2'], 'Pre-order — ships in 3 weeks.'),
    ('black-turtleneck', 'Black Turtleneck', 'Knitwear', '39.95', None, None,
     'Fine-gauge turtleneck in pure black. Soft merino wool, slim cut, extended ribbed cuffs. A foundational piece to layer year-round.',
     ['111','141414','1f1f1f','181818'], ['XS','S','M','L'], 'S', 'Black', ['#111','#7d7772','#6a7a86','#5a3a23'], 'In stock.'),
    ('brown-turtleneck', 'Brown Turtleneck', 'Knitwear', '39.95', None, None,
     'Same foundational turtleneck, now in a warm earthy brown. Sustainable merino blend, ribbed collar, long sleeves with thumbholes for extra warmth.',
     ['5a3a23','6a4a2f','4a3220','5a3a23'], ['XS','S','M','L'], 'M', 'Brown', ['#5a3a23','#111','#6a7a86','#7d7772'], 'In stock.'),
    ('sweater-with-stripes', 'Sweater with Stripes', 'Knitwear', '29.95', None, None,
     'Striped knit sweater with a relaxed fit. Classic nautical palette, heavyweight cotton, drop shoulder. Equal parts coastal and contemporary.',
     ['cfc7b5','bfb7a5','d8d0be','cfc7b5'], ['S','M','L','XL'], 'M', 'Cream/Navy', ['#cfc7b5'], 'In stock.'),

    # TOPS (5)
    ('beige-basic-essential-t-shirt', 'Beige Basic Essential T-shirt', 'Tops', '29.95', '79.00', '62% off',
     'Heavyweight cotton tee in warm beige. Boxy fit, reinforced collar, drop shoulder. Cut from 240 GSM organic cotton — the foundational tee, simplified.',
     ['e6d8bd','dcc9a8','eeddbe','e6d8bd'], ['XS','S','M','L','XL'], 'M', 'Beige', ['#e6d8bd','#111','#f0f0f0'], 'In stock.'),
    ('white-sleeveless-crop-top', 'White Sleeveless Crop Top', 'Tops', '24.95', None, None,
     'Clean white sleeveless crop top in lightweight cotton. Cropped at the waist, ribbed hem, rounded neckline. Designed to layer or wear solo.',
     ['f4f2ec','efeae0','f0ece0','f4f2ec'], ['XS','S','M','L','XL'], 'S', 'White', ['#f4f2ec','#111','#d9c765'], 'In stock.'),
    ('natural-high-neck-top', 'Natural High Neck Top', 'Tops', '47.95', None, None,
     'Mock-neck top in natural linen-blend fabric. Longer sleeves, fitted bodice, with a subtle sheen. Refined enough for the office, soft enough for the weekend.',
     ['d8ccb4','ccc0a8','c4b8a0','d8ccb4'], ['XS','S','M','L','XL'], 'M', 'Natural', ['#d8ccb4'], 'In stock.'),
    ('beige-tank-top', 'Beige Tank Top', 'Tops', '29.95', None, 'New',
     'Ribbed tank top in buttery beige. Slim fit, scoop neckline, extended straps. Built from a cotton-modal blend that holds its shape over time.',
     ['e4d4b2','dccbab','ebd9b6','e4d4b2'], ['XS','S','M','L','XL'], 'M', 'Beige', ['#e4d4b2','#e8c0c6','#f0ece0'], 'In stock.'),
    ('grey-structured-t-shirt-top', 'Grey Structured T-shirt Top', 'Tops', '34.95', None, None,
     'Structured t-shirt top with a sharp shoulder line and a tailored boxy cut. Rendered in mid-grey bonded cotton for a crisp silhouette that holds its shape.',
     ['9a9691','8a8680','a6a39f','9a9691'], ['XS','S','M','L'], 'M', 'Grey', ['#9a9691','#e4d4b2','#6a7a86'], 'In stock.'),
]

CATEGORY_COLLECTIONS = {
    'Jackets & Coats': 'jackets-coats',
    'Knitwear': 'knitwear',
    'Tops': 'tops',
    'T-Shirts': 't-shirts',
}

def build_product(slug, name, category, price, compare, badge, desc, gallery_colors, sizes, default_size, color_name, swatches, stock_msg):
    cat_slug = CATEGORY_COLLECTIONS.get(category, 'all')
    gallery = ''.join(f'<div class="relative tile aspect-[4/5] overflow-hidden rounded-[2px]"><img src="https://placehold.co/900x1125/{c}/{c}.png" alt="" class="absolute inset-0 h-full w-full object-cover"/></div>' for c in gallery_colors)

    size_buttons = ''
    for s in sizes:
        active = 'border-black' if s == default_size else 'hairline'
        size_buttons += f'<button class="h-11 w-12 border {active} text-[12px] rounded-[3px]">{s}</button>'

    swatch_html = ''
    for sw in swatches:
        swatch_html += f'<span class="h-6 w-6 rounded-full" style="background:{sw};border:1px solid rgba(0,0,0,.15)"></span>'

    price_html = f'''<div class="flex items-baseline gap-3">
      <span class="text-[22px]">€{price}</span>
      {f'<span class="line-through text-black/40 text-[16px]">€{compare}</span><span class="text-[11px] tracking-wide2 uppercase text-[#b4332a] bg-[#b4332a]/10 px-2 py-1 rounded-full">{badge}</span>' if compare else ''}
      <span class="text-[11px] tracking-wide2 uppercase text-black/50">Taxes included</span>
    </div>'''

    badge_label = ''
    if badge and not compare:
        badge_label = f'<span class="inline-block text-[10px] tracking-wide2 uppercase bg-white/90 border hairline px-2 py-1 rounded-full mb-4">{badge}</span>'

    main = f'''
<section class="onlight bg-white pt-10">
  <div class="mx-auto max-w-[1600px] px-6 md:px-10">
    <div class="crumbs mb-8"><a href="../index.html">Home</a><span class="sep">/</span><a href="../collections/{cat_slug}.html">{category}</a><span class="sep">/</span><span>{name}</span></div>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-10">
      <div class="md:col-span-7 grid grid-cols-2 gap-3">
        {gallery}
      </div>

      <div class="md:col-span-5 md:pl-8">
        <div class="text-[11px] tracking-wide2 uppercase text-black/55 mb-3">{category}</div>
        {badge_label}
        <h1 class="h-editorial text-[32px] md:text-[44px] mb-5">{name}</h1>
        {price_html}

        <p class="mt-6 text-[13px] leading-[1.75] text-black/70">{desc}</p>

        <div class="mt-8 flex items-center justify-between">
          <div class="text-[11px] tracking-wide2 uppercase">Size <span class="text-black/60">{default_size}</span></div>
          <a href="../pages/size-guide.html" class="text-[11px] tracking-wide2 uppercase link-underline">Size guide</a>
        </div>
        <div class="mt-3 flex items-center gap-2">
          {size_buttons}
        </div>

        <div class="mt-6 text-[11px] tracking-wide2 uppercase">Color <span class="text-black/60">{color_name}</span></div>
        <div class="mt-3 flex items-center gap-2">
          {swatch_html}
        </div>

        <div class="mt-8 flex items-center gap-3">
          <div class="flex items-center border hairline rounded-full h-12 px-3">
            <button class="w-6 text-black/60">−</button>
            <input class="w-8 text-center bg-transparent" value="1"/>
            <button class="w-6 text-black/60">+</button>
          </div>
          <button class="flex-1 h-12 rounded-full bg-black text-white text-[11px] tracking-wide2 uppercase font-medium pill pill-dark">Add to cart</button>
        </div>
        <button class="mt-3 w-full h-12 rounded-full border hairline text-[11px] tracking-wide2 uppercase font-medium pill">Buy it now</button>

        <div class="mt-6 text-[11px] tracking-wide2 uppercase text-[#b4332a]">{stock_msg}</div>

        <div class="mt-8 grid grid-cols-2 gap-3 text-[11px] tracking-wide2 uppercase text-black/70">
          <div class="flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 7h13v9H3zM16 10h4l1 3v3h-5z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>Free delivery &amp; returns</div>
          <div class="flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>Secure payment</div>
        </div>

        <div class="mt-10 divide-y hairline border-y hairline">
          <details class="py-5" open>
            <summary class="flex items-center justify-between text-[12px] tracking-wide2 uppercase cursor-pointer">Description<span>+</span></summary>
            <p class="mt-4 text-[13px] leading-[1.75] text-black/70">{desc}</p>
          </details>
          <details class="py-5">
            <summary class="flex items-center justify-between text-[12px] tracking-wide2 uppercase cursor-pointer">Size guide<span>+</span></summary>
            <a href="../pages/size-guide.html" class="mt-4 inline-block text-[11px] tracking-wide2 uppercase link-underline">Open full size guide →</a>
          </details>
          <details class="py-5">
            <summary class="flex items-center justify-between text-[12px] tracking-wide2 uppercase cursor-pointer">Delivery &amp; returns<span>+</span></summary>
            <ul class="mt-4 text-[13px] leading-[1.9] text-black/70 list-disc pl-5">
              <li>Free shipping on US orders over $150</li>
              <li>30-day return window</li>
              <li>Carbon-neutral delivery</li>
            </ul>
          </details>
          <details class="py-5">
            <summary class="flex items-center justify-between text-[12px] tracking-wide2 uppercase cursor-pointer">Contact us<span>+</span></summary>
            <p class="mt-4 text-[13px] leading-[1.75] text-black/70">Reach out to us at <a href="../pages/contact.html" class="link-underline">contact us</a> for assistance.</p>
          </details>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="onlight bg-white">
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 py-20 border-t hairline">
    <h2 class="h-section text-[32px] md:text-[44px] mb-10">You may also <em class="font-wonk font-normal">like</em></h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
'''
    # Pick 4 related products from same category (fallback: first 4 PDPs)
    related = [p for p in PDPS if p[2] == category and p[0] != slug][:4]
    if len(related) < 4:
        for p in PDPS:
            if p[0] != slug and p not in related:
                related.append(p)
            if len(related) == 4: break
    for r in related:
        rslug, rname, _, rprice, rcompare, _, _, rgallery, _, _, _, _, _ = r
        rcolor = rgallery[0]
        rprice_html = f'<span class="line-through text-black/40">€{rcompare}</span> <span class="text-[#b4332a]">€{rprice}</span>' if rcompare else f'€{rprice}'
        main += f'''      <article>
        <a href="{rslug}.html" class="tile block relative aspect-[4/5] rounded-[2px] overflow-hidden shadow-tile">
          <img src="https://placehold.co/900x1125/{rcolor}/{rcolor}.png" class="absolute inset-0 h-full w-full object-cover" alt="{rname}"/>
        </a>
        <div class="mt-5">
          <h3 class="pc-name">{rname}</h3>
          <div class="mt-1 text-[12px]">{rprice_html}</div>
        </div>
      </article>
'''
    main += '''    </div>
  </div>
</section>
'''
    write(f'products/{slug}.html', name, main, 1)

for pdp in PDPS:
    build_product(*pdp)

print('\nDone.')
