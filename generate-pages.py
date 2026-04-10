#!/usr/bin/env python3
"""Generate all Release theme subpages. Run once: python3 generate-pages.py"""
import os, textwrap

ROOT = os.path.dirname(os.path.abspath(__file__))

HEAD = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>{title} — release</title>
<script src="https://cdn.tailwindcss.com"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
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

def write(path, title, main, depth):
    base = '../' * depth
    html = HEAD.format(title=title, base=base) + main + TAIL.format(base=base)
    full = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, 'w') as f: f.write(html)
    print('wrote', path)

# ---------- COLLECTION PAGE TEMPLATE ----------

# Representative product set (used for all collections, labels vary slightly)
PRODUCTS = [
    ("Beige loungepants", "€49.95", "€69.95", "28% off", "4 color and 4 size", "#ecdbc1"),
    ("Beige basic essential t-shirt", "€29.95", "€79.00", "62% off", "5 size", "#e6d8bd"),
    ("Black loungepants", "€49.95", None, None, "4 size and 4 color", "#141414"),
    ("Beige sweater with zipper", "€69.95", None, "Pre-order", "4 size", "#e0d2b4"),
    ("Beige tank top", "€29.95", None, "New", "3 color and 5 size", "#e4d4b2"),
    ("White sweater with zipper", "€69.95", None, None, "4 size", "#f0ece2"),
    ("Pink hooded sweatshirt", "€49.95", None, None, "4 size", "#e8c0c6"),
    ("Grey hooded sweatshirt", "€49.95", None, None, "5 size", "#9a9691"),
    ("White hooded sweatshirt", "€49.95", None, None, "5 size", "#f4f2ec"),
    ("Black sweater with zipper", "€69.95", None, "Sold out", "4 size", "#121212"),
    ("Ecru Lounge Pants", "€49.95", None, None, "4 size and 4 color", "#ece1c9"),
    ("Grey loungepants", "€49.95", None, None, "4 size and 4 color", "#8e8a85"),
    ("Green turtleneck short sleeve", "€39.95", None, None, "4 size and 3 color", "#1f3a2b"),
    ("Black turtleneck short sleeve", "€39.95", None, None, "4 size and 3 color", "#111"),
    ("Grey turtleneck short sleeve", "€39.95", None, None, "4 size and 3 color", "#868278"),
    ("Black turtleneck with stripes", "€39.95", None, None, "4 size and 2 color", "#181818"),
    ("White turtleneck with stripes", "€39.95", None, None, "4 size and 2 color", "#efeadb"),
    ("Black turtleneck", "€39.95", None, None, "4 color and 4 size", "#121212"),
    ("Brown turtleneck", "€39.95", None, None, "4 size and 4 color", "#5a3a23"),
    ("Grey turtleneck", "€39.95", None, None, "4 size and 4 color", "#7d7772"),
    ("Sweater with Stripes", "€29.95", None, None, "4 size", "#cfc7b5"),
]

def product_card(p, depth):
    name, price, compare, badge, meta, color = p
    base = '../' * depth
    color_hex = color.replace('#','')
    badge_html = ''
    if badge:
        cls = 'bg-[#b4332a] text-white' if badge=='Sold out' else ('bg-white/90' if badge in ['New','Pre-order'] else 'bg-white/90')
        badge_html = f'<span class="absolute left-4 top-4 text-[10px] tracking-wide2 uppercase {cls} px-2 py-1 rounded-full">{badge}</span>'
    price_html = f'<span class="line-through text-black/40">{compare}</span> <span class="text-[#b4332a]">{price}</span>' if compare else price
    return f'''<article class="group">
  <a href="{base}products/knit-comfort-turn-up-sleeve-coat.html" class="tile block relative aspect-[4/5] rounded-[2px] overflow-hidden shadow-tile">
    <img src="https://placehold.co/900x1125/{color_hex}/{color_hex}.png" alt="{name}" class="absolute inset-0 h-full w-full object-cover"/>
    {badge_html}
  </a>
  <div class="mt-5">
    <h3 class="pc-name">{name}</h3>
    <div class="mt-1 text-[12px]">{price_html}</div>
    <div class="pc-meta">Available in {meta}</div>
  </div>
</article>'''

def build_collection(slug, title, description, depth=1):
    cards = '\n'.join(product_card(p, depth) for p in PRODUCTS)
    main = f'''
<section class="onlight bg-[var(--stone)]">
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 pt-16 pb-16 text-center">
    <div class="crumbs mb-6"><a href="{'../'*depth}index.html">Home</a><span class="sep">/</span><span>{title}</span></div>
    <h1 class="h-editorial text-[44px] md:text-[88px]">{title}</h1>
    <p class="mt-5 max-w-[640px] mx-auto text-[14px] leading-[1.75] text-black/65">{description}</p>
  </div>
</section>

<section class="onlight bg-white">
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 py-10 flex items-center justify-between border-b hairline">
    <button class="inline-flex items-center gap-2 text-[11px] tracking-wide2 uppercase">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18M6 12h12M10 18h4"/></svg>
      Filters
    </button>
    <div class="text-[11px] tracking-wide2 uppercase text-black/60">Showing 21 of 21 products</div>
    <div class="inline-flex items-center gap-2 text-[11px] tracking-wide2 uppercase">
      <span class="text-black/60">Sort by</span>
      <button class="inline-flex items-center gap-1.5 border hairline rounded-full px-4 h-9">Best selling <span class="caret">▾</span></button>
    </div>
  </div>

  <div class="mx-auto max-w-[1600px] px-6 md:px-10 py-14">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {cards}
    </div>
  </div>
</section>

<section class="onlight bg-[var(--stone)]">
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 py-16">
    <h2 class="h-section text-[28px] md:text-[40px] mb-8">Related <em class="font-wonk font-normal">collections</em></h2>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
      <a href="{'../'*depth}collections/jackets-coats.html" class="group">
        <div class="tile relative aspect-[4/5] overflow-hidden rounded-[2px]">
          <img src="https://placehold.co/900x1125/2c3d5a/2c3d5a.png" alt="" class="absolute inset-0 h-full w-full object-cover"/>
        </div>
        <div class="mt-4 flex items-baseline gap-1.5"><span class="text-[16px]">Jackets &amp; Coats</span><span class="text-[10px] text-black/45 align-super">15</span></div>
      </a>
      <a href="{'../'*depth}collections/knitwear.html" class="group">
        <div class="tile relative aspect-[4/5] overflow-hidden rounded-[2px]">
          <img src="https://placehold.co/900x1125/a38e6c/a38e6c.png" alt="" class="absolute inset-0 h-full w-full object-cover"/>
        </div>
        <div class="mt-4 flex items-baseline gap-1.5"><span class="text-[16px]">Knitwear</span><span class="text-[10px] text-black/45 align-super">23</span></div>
      </a>
      <a href="{'../'*depth}collections/dresses.html" class="group">
        <div class="tile relative aspect-[4/5] overflow-hidden rounded-[2px]">
          <img src="https://placehold.co/900x1125/ecd4c2/ecd4c2.png" alt="" class="absolute inset-0 h-full w-full object-cover"/>
        </div>
        <div class="mt-4 flex items-baseline gap-1.5"><span class="text-[16px]">Long Dresses</span><span class="text-[10px] text-black/45 align-super">4</span></div>
      </a>
    </div>
  </div>
</section>
'''
    write(f'collections/{slug}.html', title, main, depth)

COLLECTIONS = [
    ('all', 'All Products', 'Explore the full catalog — every release, every season, every silhouette.'),
    ('new-collection', 'New Collection', 'Step into the season with our latest designs, blending comfort and style effortlessly. Explore premium quality pieces perfect for any occasion, available in fresh colors and modern fits.'),
    ('best-sellers', 'Bestsellers', 'The pieces our community keeps coming back to — tested, loved, and restocked.'),
    ('basics', 'Basics', 'Elevated essentials. Built to layer, built to last — the foundation of every wardrobe.'),
    ('tops', 'Tops', 'Fluid silhouettes and refined details — from tailored blouses to cropped knits.'),
    ('jeans', 'Jeans', 'Denim engineered for movement — wide legs, straight cuts, elevated rises.'),
    ('shorts', 'Shorts', 'Warm-weather staples in linen blends, paperbag waists, and relaxed fits.'),
    ('t-shirts', 'T-Shirts', 'Heavyweight cottons, clean cuts, and embroidered detailing.'),
    ('pants', 'Bottoms', 'Trousers, joggers, and high-rise cuts that move with you.'),
    ('sweatpants', 'Sweatpants', 'Loungewear refined — elevated cottons and tailored silhouettes.'),
    ('jackets-coats', 'Jackets & Coats', 'Outerwear for every season — from hydrophobic technical shells to alpaca-blend knit coats.'),
    ('hoodies-sweatshirts', 'Hoodies & Sweatshirts', 'Bouclé textures and oversized fits — the new standard in off-duty dressing.'),
    ('knitwear', 'Knitwear', 'Turn-up sleeves, cozy crops, and heritage patchwork — the knitwear archive.'),
    ('dresses', 'Dresses', 'Short, long, structured, or flowing — dresses for every mood.'),
    ('long-dresses', 'Long Dresses', 'Floor-grazing silhouettes for occasion and everyday.'),
    ('short-dresses', 'Short Dresses', 'Mini and midi cuts — playful, polished, and ready to wear.'),
]
for slug, title, desc in COLLECTIONS:
    build_collection(slug, title, desc)

# ---------- PRODUCT DETAIL ----------

def build_product():
    depth = 1
    base = '../' * depth
    main = f'''
<section class="onlight bg-white pt-10">
  <div class="mx-auto max-w-[1600px] px-6 md:px-10">
    <div class="crumbs mb-8"><a href="{base}index.html">Home</a><span class="sep">/</span><a href="{base}collections/knitwear.html">Knitwear</a><span class="sep">/</span><span>Knit Comfort Turn-Up Sleeve Coat</span></div>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-10">
      <!-- Gallery -->
      <div class="md:col-span-7 grid grid-cols-2 gap-3">
        {''.join(f'<div class="relative tile aspect-[4/5] overflow-hidden rounded-[2px]"><img src="https://placehold.co/900x1125/{c}/{c}.png" alt="" class="absolute inset-0 h-full w-full object-cover"/></div>' for c in ['8e6b44','755531','a0876a','b8987a','6e5432'])}
      </div>

      <!-- Product info -->
      <div class="md:col-span-5 md:pl-8">
        <div class="text-[11px] tracking-wide2 uppercase text-black/55 mb-3">Knitwear</div>
        <h1 class="h-editorial text-[36px] md:text-[48px] mb-5">Knit Comfort Turn-Up Sleeve Coat</h1>
        <div class="flex items-baseline gap-3">
          <span class="text-[22px]">€79.95</span>
          <span class="text-[11px] tracking-wide2 uppercase text-black/50">Taxes included</span>
        </div>

        <p class="mt-6 text-[13px] leading-[1.75] text-black/70">Our Knit Comfort Turn-Up Sleeve Coat, a timeless blend of style and functionality designed to elevate your wardrobe. Crafted with meticulous attention to detail, this coat exudes sophistication and versatility. Featuring long sleeves with chic turn-up cuffs, this coat offers a modern twist on classic design. The lapel collar adds a touch of refinement, while front welt pockets provide both style and convenience.</p>
        <a href="#description" class="mt-2 inline-block text-[11px] tracking-wide2 uppercase link-underline">Read more</a>

        <div class="mt-8 flex items-center justify-between">
          <div class="text-[11px] tracking-wide2 uppercase">Size <span class="text-black/60">M</span></div>
          <a href="#size-guide" class="text-[11px] tracking-wide2 uppercase link-underline">Size guide</a>
        </div>
        <div class="mt-3 flex items-center gap-2">
          <button class="h-11 w-12 border hairline text-[12px] rounded-[3px]">XS</button>
          <button class="h-11 w-12 border hairline text-[12px] rounded-[3px]">S</button>
          <button class="h-11 w-12 border border-black text-[12px] rounded-[3px]">M</button>
          <button class="h-11 w-12 border hairline text-[12px] rounded-[3px]">L</button>
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

        <div class="mt-6 text-[11px] tracking-wide2 uppercase text-[#b4332a]">Only 15 left in stock. Order soon.</div>

        <div class="mt-8 grid grid-cols-2 gap-3 text-[11px] tracking-wide2 uppercase text-black/70">
          <div class="flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 7h13v9H3zM16 10h4l1 3v3h-5z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>Free delivery &amp; returns</div>
          <div class="flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>Secure payment</div>
        </div>

        <div class="mt-10 divide-y hairline border-y hairline">
          <details id="description" class="py-5">
            <summary class="flex items-center justify-between text-[12px] tracking-wide2 uppercase cursor-pointer">Description<span>+</span></summary>
            <p class="mt-4 text-[13px] leading-[1.75] text-black/70">Designed for ease of wear, this coat boasts a button-up fastening at the front, allowing for effortless layering and a tailored fit. Whether you're heading to the office or out for a casual weekend stroll, this coat promises comfort and style for every occasion.</p>
          </details>
          <details id="size-guide" class="py-5">
            <summary class="flex items-center justify-between text-[12px] tracking-wide2 uppercase cursor-pointer">Size guide<span>+</span></summary>
            <table class="mt-4 w-full text-[12px]">
              <thead><tr class="text-left text-black/60"><th class="py-1">Size</th><th>Bust</th><th>Waist</th><th>Hips</th></tr></thead>
              <tbody>
                <tr><td class="py-1">XS</td><td>78</td><td>60</td><td>83.5</td></tr>
                <tr><td class="py-1">S</td><td>80.5</td><td>62.5</td><td>86</td></tr>
                <tr><td class="py-1">M</td><td>83</td><td>65</td><td>88.5</td></tr>
                <tr><td class="py-1">L</td><td>88</td><td>70</td><td>93.5</td></tr>
              </tbody>
            </table>
          </details>
          <details class="py-5">
            <summary class="flex items-center justify-between text-[12px] tracking-wide2 uppercase cursor-pointer">Delivery &amp; returns<span>+</span></summary>
            <ul class="mt-4 text-[13px] leading-[1.9] text-black/70 list-disc pl-5">
              <li>Free shipping on US orders over $150</li>
              <li>US flat rate shipping $5</li>
              <li>International shipping calculated at checkout</li>
              <li>Carbon-neutral delivery on all orders</li>
              <li>All packaging is plastic-free and recyclable</li>
            </ul>
          </details>
          <details class="py-5">
            <summary class="flex items-center justify-between text-[12px] tracking-wide2 uppercase cursor-pointer">Contact us<span>+</span></summary>
            <p class="mt-4 text-[13px] leading-[1.75] text-black/70">Reach out to us at <a href="{base}pages/contact.html" class="link-underline">contact us</a> for assistance.</p>
          </details>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="relative">
  <div class="relative h-[min(60vh,520px)] min-h-[360px] overflow-hidden">
    <img src="https://placehold.co/2400x1000/8b816f/8b816f.png" class="absolute inset-0 h-full w-full object-cover" alt=""/>
    <div class="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40"></div>
    <div class="grain"></div>
    <div class="relative z-10 h-full flex items-center justify-center">
      <h3 class="h-editorial text-white text-[36px] md:text-[56px] text-center">Amazing details. <em class="font-wonk font-normal">Organic fabrics.</em></h3>
    </div>
  </div>
</section>

<section class="onlight bg-white">
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 py-20">
    <h2 class="h-section text-[32px] md:text-[44px] mb-10">You may also <em class="font-wonk font-normal">like</em></h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
      {''.join(product_card(p, 1) for p in PRODUCTS[:4])}
    </div>
  </div>
</section>
'''
    write('products/knit-comfort-turn-up-sleeve-coat.html', 'Knit Comfort Turn-Up Sleeve Coat', main, 1)

build_product()

# ---------- FAQ ----------
def build_faq():
    qa = [
        ("Orders & shipping", [
            ("How do I return my order?", "If you would like to return your order, please fill out the return form that came with the package. Make sure to include all the information requested on the form, such as the order number and the reason for the return. Once the form is complete, carefully seal the package and attach the shipping label that was also included with the package. If you have any questions about the return process, please contact our customer service team."),
            ("Are there any shipping costs?", "For orders under $100, a shipping fee of $9.95 will be charged. However, all orders over $100 will be delivered for free, allowing you to save on shipping costs and enjoy complimentary delivery."),
            ("Can I still change my order?", "If you wish to change your order, please send an email to hello@release.com. Our team will review your request and determine what modifications can still be accommodated."),
            ("Can I return my order?", "All orders can be returned within 30 days. Once we have received the returned order, the refund will be processed within 14 business days."),
        ]),
        ("Account info", [
            ("Do I have to create an account?", "No, you don't have to create an account. However, we strongly recommend that you create an account so that you can take advantage of the various benefits it offers."),
            ("How do I change my account password?", "If you have forgotten your password, you can easily reset it by clicking the 'forgot password' link. Once you click the link, you will receive an email with instructions on how to create a new password."),
        ]),
        ("Products", [
            ("How do I find my size?", "Each product page includes a dedicated size guide based on bust, waist, and hip measurements. If you're between sizes, we recommend sizing up for a relaxed fit."),
            ("Are your fabrics sustainable?", "Where possible, we use organic cotton, recycled polyester, and ethically-sourced wool. Each product page lists the specific fibers used."),
        ]),
    ]
    blocks = []
    for group, items in qa:
        inner = '\n'.join(f'''<details class="py-5 border-b hairline group">
  <summary class="flex items-center justify-between cursor-pointer text-[16px] md:text-[18px]">
    <span>{q}</span>
    <span class="text-2xl font-light leading-none group-open:rotate-45 transition-transform">+</span>
  </summary>
  <p class="mt-4 text-[13px] leading-[1.75] text-black/65 max-w-[720px]">{a}</p>
</details>''' for q, a in items)
        blocks.append(f'<div class="mb-12"><h2 class="h-section text-[28px] md:text-[36px] mb-4">{group}</h2>{inner}</div>')
    main = f'''
<section class="page-banner text-center">
  <div class="mx-auto max-w-[1200px] px-6">
    <div class="crumbs mb-6"><a href="../index.html">Home</a><span class="sep">/</span><span>FAQ</span></div>
    <h1>FAQ</h1>
    <p>If you have a question, please consult our list of frequently asked questions before reaching out for assistance.</p>
  </div>
</section>

<section class="onlight bg-white">
  <div class="mx-auto max-w-[900px] px-6 py-20">
    {''.join(blocks)}
  </div>
</section>
'''
    write('pages/faq.html', 'FAQ', main, 1)
build_faq()

# ---------- CONTACT ----------
def build_contact():
    main = '''
<section class="page-banner text-center">
  <div class="mx-auto max-w-[1200px] px-6">
    <div class="crumbs mb-6"><a href="../index.html">Home</a><span class="sep">/</span><span>Contact</span></div>
    <h1>Contact us</h1>
    <p>Have a question? Contact us, and we'll get back to you within one business day. Reach out to us for prompt assistance.</p>
  </div>
</section>

<section class="onlight bg-white">
  <div class="mx-auto max-w-[1200px] px-6 md:px-10 py-20 grid grid-cols-1 md:grid-cols-2 gap-16">
    <div>
      <h2 class="h-section text-[28px] md:text-[36px] mb-6">Opening <em class="font-wonk font-normal">hours</em></h2>
      <dl class="text-[14px] leading-[2]">
        <div class="flex justify-between border-b hairline py-3"><dt>Monday to Friday</dt><dd class="text-black/60">9am — 9pm (GMT)</dd></div>
        <div class="flex justify-between border-b hairline py-3"><dt>Saturday</dt><dd class="text-black/60">10am — 6pm</dd></div>
        <div class="flex justify-between border-b hairline py-3"><dt>Sunday</dt><dd class="text-black/60">10am — 4pm</dd></div>
      </dl>
      <div class="mt-10 space-y-4 text-[13px] text-black/70">
        <div class="flex items-center gap-3"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 6h16v12H4zM4 6l8 7 8-7"/></svg>hello@release.com</div>
        <div class="flex items-center gap-3"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>+1 (555) 010-1100</div>
        <div class="flex items-center gap-3"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 22s8-7.58 8-13a8 8 0 0 0-16 0c0 5.42 8 13 8 13Z"/><circle cx="12" cy="9" r="3"/></svg>Ellermanstraat 14, Belgium</div>
      </div>
    </div>
    <form class="space-y-5" onsubmit="event.preventDefault()">
      <div class="grid grid-cols-2 gap-5">
        <label class="block">
          <span class="text-[11px] tracking-wide2 uppercase text-black/60">First name</span>
          <input class="mt-2 w-full h-12 px-4 border hairline rounded-[2px] text-[14px] outline-none focus:border-black" placeholder="Jane"/>
        </label>
        <label class="block">
          <span class="text-[11px] tracking-wide2 uppercase text-black/60">Last name</span>
          <input class="mt-2 w-full h-12 px-4 border hairline rounded-[2px] text-[14px] outline-none focus:border-black" placeholder="Doe"/>
        </label>
      </div>
      <div>
        <div class="text-[11px] tracking-wide2 uppercase text-black/60 mb-3">How do you want us to contact you?</div>
        <div class="flex items-center gap-6 text-[13px]">
          <label class="inline-flex items-center gap-2"><input type="radio" name="c" checked/>Email</label>
          <label class="inline-flex items-center gap-2"><input type="radio" name="c"/>Phone</label>
          <label class="inline-flex items-center gap-2"><input type="radio" name="c"/>SMS</label>
        </div>
      </div>
      <label class="block">
        <span class="text-[11px] tracking-wide2 uppercase text-black/60">Email</span>
        <input type="email" class="mt-2 w-full h-12 px-4 border hairline rounded-[2px] text-[14px] outline-none focus:border-black" placeholder="jane@example.com"/>
      </label>
      <label class="block">
        <span class="text-[11px] tracking-wide2 uppercase text-black/60">Message</span>
        <textarea rows="5" class="mt-2 w-full px-4 py-3 border hairline rounded-[2px] text-[14px] outline-none focus:border-black resize-none" placeholder="How can we help?"></textarea>
      </label>
      <button class="h-12 px-8 rounded-full bg-black text-white text-[11px] tracking-wide2 uppercase font-medium pill pill-dark">Send message</button>
    </form>
  </div>
</section>
'''
    write('pages/contact.html', 'Contact us', main, 1)
build_contact()

# ---------- LOOKBOOK ----------
def build_lookbook():
    main = '''
<section class="page-banner text-center">
  <div class="mx-auto max-w-[1200px] px-6">
    <div class="crumbs mb-6"><a href="../index.html">Home</a><span class="sep">/</span><span>Lookbook</span></div>
    <h1>SS 2025 <em class="font-wonk font-normal">Lookbook</em></h1>
    <p>Discover your perfect style with our latest collection, where elegance meets everyday comfort.</p>
  </div>
</section>

<section class="onlight bg-white">
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 py-14">
    <div class="grid grid-cols-3 gap-5">
      <div class="tile aspect-[3/4] overflow-hidden"><img src="https://placehold.co/800x1066/6b5a44/6b5a44.png" class="h-full w-full object-cover" alt=""/></div>
      <div class="tile aspect-[3/4] overflow-hidden"><img src="https://placehold.co/800x1066/8a7a60/8a7a60.png" class="h-full w-full object-cover" alt=""/></div>
      <div class="tile aspect-[3/4] overflow-hidden"><img src="https://placehold.co/800x1066/55493a/55493a.png" class="h-full w-full object-cover" alt=""/></div>
    </div>
    <div class="mt-8 flex justify-center">
      <a href="../collections/all.html" class="inline-flex items-center justify-center h-11 px-7 rounded-full bg-black text-white text-[11px] tracking-wide2 uppercase pill pill-dark">Explore all</a>
    </div>
  </div>
</section>

<section class="onlight bg-[var(--stone)]">
  <div class="mx-auto max-w-[1200px] px-6 py-24 text-center">
    <h2 class="h-section text-[36px] md:text-[52px]">Explore the <em class="font-wonk font-normal">season</em></h2>
    <p class="mt-6 max-w-[720px] mx-auto text-[14px] leading-[1.85] text-black/65">Welcome to our latest lookbook, where fashion meets creativity. Dive into a world of style with our curated collection. Each piece is designed to inspire and elevate your wardrobe. Discover the perfect blend of classic and contemporary trends. Our collection offers something for every occasion. Enjoy exploring new styles and fresh ideas. Let your fashion journey begin here.</p>
  </div>
</section>

<section class="relative">
  <div class="relative h-[min(80vh,720px)] min-h-[480px] overflow-hidden">
    <img src="https://placehold.co/2400x1200/5a4f3f/5a4f3f.png" class="absolute inset-0 h-full w-full object-cover" alt=""/>
    <div class="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50"></div>
    <div class="relative z-10 h-full flex flex-col items-center justify-center text-white text-center gap-6 px-6">
      <div class="text-[11px] tracking-mega uppercase text-white/80">New collection</div>
      <h3 class="h-editorial text-[40px] md:text-[72px] max-w-[900px]">Transform your <em class="font-wonk font-normal">look</em> this season</h3>
      <div class="flex gap-3">
        <a href="../collections/all.html" class="inline-flex items-center justify-center h-11 px-7 rounded-full bg-white text-black text-[11px] tracking-wide2 uppercase pill pill-solid">Shop now</a>
        <a href="../collections/best-sellers.html" class="inline-flex items-center justify-center h-11 px-7 rounded-full border border-white/80 text-white text-[11px] tracking-wide2 uppercase pill pill-ghost">Explore</a>
      </div>
    </div>
  </div>
</section>

<section class="onlight bg-white">
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 py-20">
    <h2 class="h-section text-[32px] md:text-[48px] mb-10">SS25 Collection</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
      ''' + ''.join(product_card(p, 1) for p in PRODUCTS[:4]) + '''
    </div>
  </div>
</section>
'''
    write('pages/lookbook.html', 'Lookbook', main, 1)
build_lookbook()

# ---------- ABOUT US ----------
def build_about():
    main = '''
<section class="page-banner text-center">
  <div class="mx-auto max-w-[1200px] px-6">
    <div class="crumbs mb-6"><a href="../index.html">Home</a><span class="sep">/</span><span>About us</span></div>
    <h1>About <em class="font-wonk font-normal">Us</em></h1>
    <p>Essence, where we blend style and sustainability seamlessly. Our brand is all about offering women's clothing that's both affordable and eco-friendly.</p>
  </div>
</section>

<section class="onlight bg-white">
  <div class="mx-auto max-w-[900px] px-6 py-20 space-y-6 text-[15px] leading-[1.85] text-black/75">
    <p>We believe fashion should be accessible without harming the planet or compromising on quality. That's why we carefully design and craft each piece using sustainable materials and ethical practices.</p>
    <p>From everyday essentials to trendy must-haves, every item in our collection is created with the environment and your style in mind.</p>
    <p>But it's not just about the clothes — we're also here to empower you to make informed choices about your wardrobe and embrace mindful consumption.</p>
    <p>Join us as we redefine fashion, one sustainable outfit at a time. Discover the essence of style, where eco-conscious fashion meets effortless elegance.</p>
  </div>
</section>

<section class="relative">
  <div class="relative h-[min(70vh,620px)] min-h-[420px] overflow-hidden">
    <img src="https://placehold.co/2400x1000/9c876a/9c876a.png" class="absolute inset-0 h-full w-full object-cover" alt=""/>
    <div class="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40"></div>
    <div class="grain"></div>
  </div>
</section>

<section class="onlight bg-[var(--stone)]">
  <div class="mx-auto max-w-[1200px] px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
    <div>
      <div class="font-display text-[56px] leading-none">12+</div>
      <div class="mt-3 text-[11px] tracking-wide2 uppercase text-black/60">Years crafting</div>
    </div>
    <div>
      <div class="font-display text-[56px] leading-none">200k</div>
      <div class="mt-3 text-[11px] tracking-wide2 uppercase text-black/60">Happy customers</div>
    </div>
    <div>
      <div class="font-display text-[56px] leading-none">100%</div>
      <div class="mt-3 text-[11px] tracking-wide2 uppercase text-black/60">Carbon neutral</div>
    </div>
  </div>
</section>
'''
    write('pages/about-us.html', 'About us', main, 1)
build_about()

# ---------- CONTENT TILES ----------
def build_content_tiles():
    def tile(title, text=None, color='d8d4cc', h=None):
        body = f'<p class="mt-3 text-[12px] leading-[1.7] text-white/85 max-w-[320px]">{text}</p>' if text else ''
        hc = h if h else '340'
        return f'''<a href="#" class="relative block overflow-hidden rounded-[2px] tile group" style="aspect-ratio:1/1">
  <img src="https://placehold.co/800x800/{color}/{color}.png" class="absolute inset-0 h-full w-full object-cover" alt=""/>
  <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"></div>
  <div class="absolute inset-x-0 bottom-0 p-6 text-white">
    <h3 class="font-display text-[22px] md:text-[26px] leading-tight">{title}</h3>
    {body}
  </div>
</a>'''
    basic_grid = ''.join(tile('Heading for Multi Content Tiles', 'Tailor your store\u2019s look and feel with a flexible design that adapts to your brand identity, offering a seamless shopping experience for customers.', c) for c in ['2e2824','5a4f3f','8a7a60','b9a27f','4a4137','6b5a44','8e6b44','3a3530'])
    complex_grid = ''.join(tile('Heading for Multi Content Tiles', None, c) for c in ['212121','473d32','5a4f3f','b9a27f','8a7a60','6b5a44','4a4137','2c2620','3a3530','6e5432','8c7253','a38e6c','9c876a'])
    main = f'''
<section class="page-banner text-center">
  <div class="mx-auto max-w-[1200px] px-6">
    <div class="crumbs mb-6"><a href="../index.html">Home</a><span class="sep">/</span><span>Content tiles</span></div>
    <h1>Basic <em class="font-wonk font-normal">Layouts</em></h1>
    <p>Create a modern look with our basic layouts for the ultimate style upgrade.</p>
  </div>
</section>

<section class="onlight bg-white">
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 py-16">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
      {basic_grid}
    </div>
  </div>
</section>

<section class="onlight bg-[var(--stone)]">
  <div class="mx-auto max-w-[1200px] px-6 py-16 text-center">
    <h2 class="h-section text-[32px] md:text-[48px]">Complex <em class="font-wonk font-normal">Layouts</em></h2>
    <p class="mt-5 max-w-[600px] mx-auto text-[14px] text-black/65 leading-[1.8]">Discover the art of creative design with our complex layouts for multitile sections.</p>
  </div>
</section>

<section class="onlight bg-white">
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 py-16">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
      {complex_grid}
    </div>
  </div>
</section>
'''
    write('pages/content-tiles.html', 'Content tiles', main, 1)
build_content_tiles()

# ---------- BLOG LISTING ----------
POSTS = [
    ('fashion-forward-navigating-the-path-to-sustainable-style', 'Fashion Forward: Navigating the Path to Sustainable Style', 'Julia Hampel', 'March 1, 2024', 'Sustainability', '#3f3d55'),
    ('10-fresh-fashion-trends-for-the-season-ahead', '10 Fresh Fashion Trends for the Season Ahead', 'Julia Hampel', 'March 1, 2024', 'Trends', '#b9a27f'),
    ('denim-decoded-a-guide-to-styling-your-favorite-jeans', 'BTS: Matching Shooting Locations With Our Collections', 'Julia Hampel', 'March 1, 2024', 'Trends', '#6b5a44'),
    ('the-benefits-of-organic-cotton', 'Cruelty Free Fashion, is it possible?', 'Julia Hampel', 'March 1, 2024', 'Benefits', '#e4e1db'),
    ('the-timeless-elegance-of-soft-beige-cream-and-peach', 'Defying the Twilight: Bold Styles for Modern Rebels', 'Julia Hampel', 'March 1, 2024', 'Trends', '#4a4137'),
]

def build_blog_listing():
    cards = ''.join(f'''<a href="../blogs/news/{slug}.html" class="group block">
      <div class="tile relative aspect-[4/3] overflow-hidden rounded-[2px] shadow-tile">
        <img src="https://placehold.co/1200x900/{color.strip("#")}/{color.strip("#")}.png" class="absolute inset-0 h-full w-full object-cover" alt=""/>
      </div>
      <div class="mt-5 text-[10px] tracking-wide2 uppercase text-black/55">{tag}</div>
      <h3 class="mt-2 h-section text-[22px] md:text-[26px] max-w-[420px]">{title}</h3>
      <div class="mt-3 text-[10px] tracking-wide2 uppercase text-black/55">{author} · {date}</div>
    </a>''' for slug, title, author, date, tag, color in POSTS)
    main = f'''
<section class="page-banner text-center">
  <div class="mx-auto max-w-[1200px] px-6">
    <div class="crumbs mb-6"><a href="../index.html">Home</a><span class="sep">/</span><span>Blog</span></div>
    <h1>Never miss a beat with our latest <em class="font-wonk font-normal">news</em></h1>
  </div>
</section>

<section class="onlight bg-white">
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 pt-10 pb-6 flex items-center gap-6 text-[11px] tracking-wide2 uppercase border-b hairline">
    <a href="#" class="border-b border-black pb-3 -mb-px">Show all</a>
    <a href="#" class="text-black/55 hover:text-black pb-3">Benefits</a>
    <a href="#" class="text-black/55 hover:text-black pb-3">Sustainability</a>
    <a href="#" class="text-black/55 hover:text-black pb-3">Trends</a>
  </div>
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
    {cards}
  </div>
</section>
'''
    write('blogs/news.html', 'News', main, 1)
build_blog_listing()

# ---------- BLOG POSTS ----------
POST_BODIES = {
    'fashion-forward-navigating-the-path-to-sustainable-style': [
        'In a world where environmental concerns are at the forefront of global consciousness, the fashion industry finds itself facing increasing scrutiny over its sustainability practices. From the sourcing of materials to the manufacturing processes and the end lifecycle of garments, there\u2019s a growing demand for brands to prioritize eco-friendly initiatives.',
        'At Essence, we recognize our responsibility to tread lightly on the planet while still delivering high-quality, stylish clothing to our customers. In this blog post, we delve into the importance of sustainability in fashion and how our brand is committed to making a positive impact.',
        ('h2', 'Why Sustainability Matters'),
        'The fashion industry is notorious for its significant environmental footprint. The production of textiles often involves intensive water usage, chemical treatments, and carbon emissions. Additionally, the fast fashion model, characterized by rapid turnover of collections and cheaply made garments, encourages overconsumption and contributes to excessive waste.',
        ('img', '9c876a'),
        ('h2', 'Our Sustainable Initiatives'),
        'At Essence, we\u2019re committed to reducing our environmental impact at every stage of the fashion lifecycle. Ethical sourcing, reduced waste, transparency and traceability, longevity and timeless design, and circular economy initiatives guide every decision we make.',
        ('h3', 'Join Us on the Journey'),
        'As consumers, we have the power to drive change through our purchasing decisions. By supporting sustainable fashion brands, you\u2019re not only investing in stylish, high-quality clothing but also contributing to a more sustainable future for our planet. Together, we can redefine the fashion industry\u2019s standards.',
    ],
    '10-fresh-fashion-trends-for-the-season-ahead': [
        'Every new season brings fresh silhouettes, revived colors, and unexpected texture pairings. Here are ten trends we\u2019re leaning into this year — from the return of the paperbag waist to the quiet comeback of alpaca knits.',
        ('h2', '1. The elevated everyday'),
        'Think cashmere sweatpants, silk t-shirts, and tailored jeans — pieces that blur the line between loungewear and ready-to-wear.',
        ('h2', '2. Sculpted outerwear'),
        'Oversized puffers and dramatic lapels are defining silhouettes this season. The trick is balance: pair voluminous outer layers with fitted cuts underneath.',
        ('img', 'b9a27f'),
        ('h3', 'Styling notes'),
        'Keep accessories minimal and let the fabrics speak. When texture does the heavy lifting, less really is more.',
    ],
    'denim-decoded-a-guide-to-styling-your-favorite-jeans': [
        'Jeans are the single most versatile item in most wardrobes. But the difference between a good outfit and a great one often comes down to which cut, which rinse, and which break.',
        ('h2', 'The three cuts worth owning'),
        'A straight leg, a wide leg, and a relaxed fit. Between them you cover 90% of occasions. Anything beyond that is styling, not basics.',
        ('img', '6b5a44'),
        'The shoot above was styled in under ten minutes with pieces from our archive. That\u2019s the point — great basics require less decision-making.',
    ],
    'the-benefits-of-organic-cotton': [
        'Cruelty-free fashion starts with the fiber. Organic cotton is grown without synthetic pesticides or GMOs, using significantly less water than conventional cotton.',
        ('h2', 'Why it matters'),
        'Conventional cotton farming accounts for 16% of global insecticide use despite covering only 2.5% of cultivated land. Switching to organic is one of the most impactful single changes a brand can make.',
        ('img', 'e4e1db'),
        ('h2', 'Our sourcing standards'),
        'We work exclusively with GOTS-certified suppliers. Every organic cotton piece in our catalog can be traced from field to finished garment.',
    ],
    'the-timeless-elegance-of-soft-beige-cream-and-peach': [
        'There\u2019s a reason beige, cream, and peach never really leave the conversation. They\u2019re the palette of quiet luxury — universally flattering, endlessly pairable, and impossibly chic when worn monochromatically.',
        ('h2', 'Bold doesn\u2019t always mean loud'),
        'Rebellion in fashion is often associated with neon, graphics, and hard tailoring. But a head-to-toe soft palette can be just as confident — a refusal to compete for attention.',
        ('img', '4a4137'),
        'Pair a cream knit with peach trousers and beige loafers. The tonal variation gives the outfit depth without sacrificing calm.',
    ],
}

def build_post(slug, title, author, date, tag, color):
    body = POST_BODIES.get(slug, ['Post content coming soon.'])
    parts = []
    for item in body:
        if isinstance(item, tuple):
            kind, val = item
            if kind == 'h2':
                parts.append(f'<h2 class="h-section text-[28px] md:text-[34px] mt-10 mb-4">{val}</h2>')
            elif kind == 'h3':
                parts.append(f'<h3 class="h-section text-[22px] md:text-[26px] mt-8 mb-3">{val}</h3>')
            elif kind == 'img':
                parts.append(f'<div class="my-10 tile relative aspect-[16/9] overflow-hidden rounded-[2px]"><img src="https://placehold.co/1600x900/{val}/{val}.png" class="absolute inset-0 h-full w-full object-cover" alt=""/></div>')
        else:
            parts.append(f'<p class="mb-5">{item}</p>')
    body_html = '\n'.join(parts)
    # build related posts excluding current
    related = [p for p in POSTS if p[0] != slug][:3]
    rel_html = ''.join(f'''<a href="../news/{s}.html" class="group block">
      <div class="tile relative aspect-[4/3] overflow-hidden rounded-[2px]"><img src="https://placehold.co/1200x900/{c.strip('#')}/{c.strip('#')}.png" class="absolute inset-0 h-full w-full object-cover" alt=""/></div>
      <div class="mt-4 text-[10px] tracking-wide2 uppercase text-black/55">{t}</div>
      <h3 class="mt-2 h-section text-[18px] max-w-[320px]">{tt}</h3>
    </a>''' for s, tt, a, d, t, c in related)

    main = f'''
<section class="onlight bg-white pt-12">
  <div class="mx-auto max-w-[820px] px-6">
    <div class="crumbs mb-6"><a href="../../index.html">Home</a><span class="sep">/</span><a href="../news.html">Blog</a><span class="sep">/</span><span>{title}</span></div>
    <div class="flex items-center gap-3 mb-4">
      <span class="text-[10px] tracking-wide2 uppercase text-black/55 border hairline rounded-full px-3 py-1">{tag}</span>
    </div>
    <h1 class="font-display font-light text-[40px] md:text-[64px] leading-[1.02] tracking-tight mb-6" style="letter-spacing:-0.025em">{title}</h1>
    <div class="text-[11px] tracking-wide2 uppercase text-black/55">Posted by {author} · {date}</div>
  </div>
  <div class="mx-auto max-w-[1200px] px-6 md:px-10 mt-10">
    <div class="tile relative aspect-[16/9] overflow-hidden rounded-[2px]">
      <img src="https://placehold.co/1920x1080/{color.strip('#')}/{color.strip('#')}.png" class="absolute inset-0 h-full w-full object-cover" alt=""/>
    </div>
  </div>
  <div class="mx-auto max-w-[760px] px-6 mt-14 text-[15px] leading-[1.85] text-black/75 pb-10">
    {body_html}
  </div>
  <div class="mx-auto max-w-[760px] px-6 pb-14 flex items-center gap-4 text-[11px] tracking-wide2 uppercase">
    <span class="text-black/55">Share</span>
    <a href="#" class="link-underline">Twitter</a>
    <a href="#" class="link-underline">Pinterest</a>
    <a href="#" class="link-underline">LinkedIn</a>
    <a href="#" class="link-underline">Facebook</a>
  </div>
  <div class="mx-auto max-w-[760px] px-6 pb-12">
    <a href="../news.html" class="inline-flex items-center gap-2 text-[11px] tracking-wide2 uppercase link-underline">← Back to news</a>
  </div>
</section>

<section class="onlight bg-[var(--stone)]">
  <div class="mx-auto max-w-[760px] px-6 py-14">
    <h3 class="h-section text-[24px] mb-6">Leave a <em class="font-wonk font-normal">comment</em></h3>
    <form class="space-y-4" onsubmit="event.preventDefault()">
      <div class="grid grid-cols-2 gap-4">
        <input placeholder="Name" class="h-12 px-4 border hairline rounded-[2px] text-[14px] outline-none focus:border-black bg-white"/>
        <input placeholder="Email" class="h-12 px-4 border hairline rounded-[2px] text-[14px] outline-none focus:border-black bg-white"/>
      </div>
      <textarea rows="4" placeholder="Comment" class="w-full px-4 py-3 border hairline rounded-[2px] text-[14px] outline-none focus:border-black resize-none bg-white"></textarea>
      <button class="h-11 px-7 rounded-full bg-black text-white text-[11px] tracking-wide2 uppercase font-medium pill pill-dark">Post comment</button>
    </form>
  </div>
</section>

<section class="onlight bg-white">
  <div class="mx-auto max-w-[1400px] px-6 md:px-10 py-20">
    <h2 class="h-section text-[28px] md:text-[36px] mb-10">You may also <em class="font-wonk font-normal">like</em></h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {rel_html}
    </div>
  </div>
</section>
'''
    write(f'blogs/news/{slug}.html', title, main, 2)

for p in POSTS:
    build_post(*p)

# ---------- SIMPLE TEXT PAGES (size guide, store locator, terms, privacy, sample-page, test-page, vendor-list) ----------
SIMPLE_PAGES = [
    ('size-guide', 'Size guide', 'Find your perfect fit with our size charts.', '''
    <table class="w-full text-[13px] mt-8 border-collapse">
      <thead><tr class="text-left"><th class="p-3 border-b hairline">Size</th><th class="p-3 border-b hairline">Bust (cm)</th><th class="p-3 border-b hairline">Waist (cm)</th><th class="p-3 border-b hairline">Hips (cm)</th></tr></thead>
      <tbody>
        <tr><td class="p-3 border-b hairline">XS</td><td class="p-3 border-b hairline">78</td><td class="p-3 border-b hairline">60</td><td class="p-3 border-b hairline">83.5</td></tr>
        <tr><td class="p-3 border-b hairline">S</td><td class="p-3 border-b hairline">80.5</td><td class="p-3 border-b hairline">62.5</td><td class="p-3 border-b hairline">86</td></tr>
        <tr><td class="p-3 border-b hairline">M</td><td class="p-3 border-b hairline">83</td><td class="p-3 border-b hairline">65</td><td class="p-3 border-b hairline">88.5</td></tr>
        <tr><td class="p-3 border-b hairline">L</td><td class="p-3 border-b hairline">88</td><td class="p-3 border-b hairline">70</td><td class="p-3 border-b hairline">93.5</td></tr>
        <tr><td class="p-3 border-b hairline">XL</td><td class="p-3 border-b hairline">93</td><td class="p-3 border-b hairline">75</td><td class="p-3 border-b hairline">98.5</td></tr>
      </tbody>
    </table>
    '''),
    ('store-locator', 'Store locator', 'Find our flagship stores across Europe and beyond.', '''
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
      <div class="p-6 border hairline rounded-[2px]"><h3 class="font-display text-[22px]">Antwerp</h3><p class="mt-2 text-[13px] text-black/65 leading-[1.7]">Ellermanstraat 14<br/>2000 Antwerpen, Belgium<br/>+32 3 500 10 10</p></div>
      <div class="p-6 border hairline rounded-[2px]"><h3 class="font-display text-[22px]">Paris</h3><p class="mt-2 text-[13px] text-black/65 leading-[1.7]">12 Rue du Temple<br/>75004 Paris, France<br/>+33 1 42 74 10 10</p></div>
      <div class="p-6 border hairline rounded-[2px]"><h3 class="font-display text-[22px]">Berlin</h3><p class="mt-2 text-[13px] text-black/65 leading-[1.7]">Torstraße 140<br/>10119 Berlin, Germany<br/>+49 30 4000 10 10</p></div>
      <div class="p-6 border hairline rounded-[2px]"><h3 class="font-display text-[22px]">Dubai</h3><p class="mt-2 text-[13px] text-black/65 leading-[1.7]">The Dubai Mall<br/>Financial Centre Road<br/>+971 4 325 10 10</p></div>
    </div>
    '''),
    ('terms', 'Terms of service', 'Our terms and conditions.', '<p class="mt-6">These are the terms and conditions governing your use of release.com and any purchases made through our store.</p><p class="mt-4">By placing an order you agree to be bound by these terms. Full legal text is available on request.</p>'),
    ('privacy', 'Privacy policy', 'How we handle your data.', '<p class="mt-6">We take your privacy seriously. Personal data is collected only for order fulfillment, account management, and — with consent — marketing.</p><p class="mt-4">You may request access, correction, or deletion of your data at any time via contact@release.com.</p>'),
    ('sample-page', 'Sample page', 'A sample page showcasing rich text.', '<p class="mt-6">This is an example of a Shopify rich-text page. Use it to host policies, manifestos, press kits, or long-form content.</p>'),
    ('test-page', 'Test page', 'Internal test page.', '<p class="mt-6">Placeholder test page included in the theme demo.</p>'),
    ('vendor-list', 'Vendor list', 'Our trusted suppliers and partners.', '<ul class="mt-6 space-y-2 list-disc pl-5 text-[14px]"><li>Studio Nicholson</li><li>Marcello Velho</li><li>DigiFist</li><li>Essence Atelier</li></ul>'),
]
def build_simple(slug, title, sub, body):
    main = f'''
<section class="page-banner text-center">
  <div class="mx-auto max-w-[1200px] px-6">
    <div class="crumbs mb-6"><a href="../index.html">Home</a><span class="sep">/</span><span>{title}</span></div>
    <h1>{title}</h1>
    <p>{sub}</p>
  </div>
</section>
<section class="onlight bg-white">
  <div class="mx-auto max-w-[900px] px-6 py-20 text-[15px] leading-[1.85] text-black/75">
    {body}
  </div>
</section>
'''
    write(f'pages/{slug}.html', title, main, 1)
for args in SIMPLE_PAGES:
    build_simple(*args)

print('\\nAll pages generated.')
