#!/usr/bin/env python3
"""Surgically swap Release placeholder content to Kickback (vintage football jerseys)
content while preserving the existing design language (Fraunces serif, beige/black
palette, all section structures). Run from sites/release/."""
import re

# === INDEX.HTML SWAPS ===
with open('index.html') as f: s = f.read()

# Hero — replace placeholder background + copy
s = s.replace(
    'src="https://placehold.co/2400x1600/1a1814/1a1814.png" alt="SS26 editorial"',
    'src="brand_assets/products/parma-97-98-away.webp" alt="Vintage football jersey editorial"'
)
s = s.replace(
    '<div class="rise rise-1 text-[11px] md:text-[12px] tracking-mega uppercase font-medium text-white/80">SS26 statement pieces</div>',
    '<div class="rise rise-1 text-[11px] md:text-[12px] tracking-mega uppercase font-medium text-white/80">Kolekcja vintage · Sezon 25/26</div>'
)
s = s.replace(
    'Bold by <em class="font-wonk font-normal">design</em>',
    'Football <em class="font-wonk font-normal">heritage</em>'
)
s = s.replace(
    '>Discover more</a>',
    '>Zobacz kolekcję</a>',
    1
)

# Just arrived section heading + view all
s = s.replace('>Just arrived</h2>', '>Nowości</h2>')

# Just arrived — 4 products with real Kickback data
products_just_arrived = [
    ('brazil-total-90-training-top', 'Brazil Total 90 Training Top', '250,00 zł', 'Limitowana', '#F4C92E'),
    ('schalke-02-04-home', 'Schalke 02/04 Home', '290,00 zł', None, None),
    ('fc-porto-16-17-home', 'FC Porto 16/17 Home', '230,00 zł', None, None),
    ('italy-2002-home', 'Italy 2002 Home', '300,00 zł', 'Klasyk', None),
]

# Use a state-based replacement for the 4 product cards. Each card has the same structure
# starting with `<a href="products/...html"...><img src="https://placehold.co/900x1125/ececea/ececea.png"`
# I'll match each card block and replace name, price, image.
import re as rx

# Pattern matches a single product article with placeholder image, badge, name, price, meta
card_pattern = rx.compile(
    r'(<article class="group">\s*<a href="products/[^"]+" class="tile block relative aspect-\[4/5\] rounded-\[2px\] overflow-hidden shadow-tile">\s*)'
    r'<img src="https://placehold\.co/900x1125/[^"]*" alt="[^"]*" class="absolute inset-0 h-full w-full object-cover"/>'
    r'(\s*(?:<span class="absolute left-4 top-4[^"]*"[^>]*>[^<]*</span>\s*)?</a>\s*<div class="mt-5">\s*)'
    r'<h3 class="text-\[11px\] tracking-wide2 uppercase font-medium">([^<]+)</h3>'
    r'(\s*<div class="mt-1 text-\[12px\]">)([^<]*)(</div>\s*<div class="mt-1 text-\[10px\] text-black/50 tracking-wide2 uppercase">)([^<]*)(</div>\s*</div>\s*</article>)'
)

# Collect 4 products with Kickback data (replacing first 4 cards in document order — those are in Just Arrived)
ja_data = [
    ('brazil-total-90-training-top.webp', 'Brazil Total 90 Training Top', '250,00 zł', 'Limitowana', 'Dostępne w 4 rozmiarach'),
    ('schalke-02-04-home.webp', 'Schalke 02/04 Home', '290,00 zł', None, 'Dostępne w 3 rozmiarach'),
    ('fc-porto-16-17-home.webp', 'FC Porto 16/17 Home', '230,00 zł', None, 'Dostępne w 4 rozmiarach'),
    ('italy-2002-home.webp', 'Italy 2002 Home', '300,00 zł', 'Klasyk', 'Dostępne w 5 rozmiarach'),
]
ja_iter = iter(ja_data)
def ja_replace(m):
    try: img, name, price, badge, meta = next(ja_iter)
    except StopIteration: return m.group(0)
    badge_html = ''
    if badge:
        # if there's already a span in original we want to remove it; the regex captured it inside group 2
        pass
    new_card = (
        m.group(1)
        + f'<img src="brand_assets/products/{img}" alt="{name}" class="absolute inset-0 h-full w-full object-cover bg-stone-100 p-4"/>'
        + (f'<span class="absolute left-4 top-4 text-[10px] tracking-wide2 uppercase bg-white/90 px-2 py-1 rounded-full">{badge}</span>' if badge else '')
        + '</a>\n        <div class="mt-5">\n        '
        + f'<h3 class="text-[11px] tracking-wide2 uppercase font-medium">{name}</h3>'
        + m.group(4) + price + m.group(6) + meta + m.group(8)
    )
    return new_card

# Apply only to first 4 cards (Just Arrived) — what's new section is later
# But we're matching globally. Let me just map all 8 cards (Just Arrived + What's new) using rolling data.
all_card_data = ja_data + [
    ('real-madrid-98-00-home.webp', 'Real Madrid 98/00 Home', '600,00 zł', 'Vintage', 'Dostępne w 2 rozmiarach'),
    ('manchester-united-06-07-home.webp', 'Manchester United 06/07 Home', '330,00 zł', None, 'Dostępne w 4 rozmiarach'),
    ('real-madrid-24-25-home-mbappe.webp', 'Real Madrid 24/25 Mbappé', '250,00 zł', 'Nowość', 'Dostępne w 4 rozmiarach'),
    ('inter-milan-24-25-third.webp', 'Inter Milan 24/25 Third', '250,00 zł', None, 'Dostępne w 5 rozmiarach'),
]
all_iter = iter(all_card_data)
def all_replace(m):
    try: img, name, price, badge, meta = next(all_iter)
    except StopIteration: return m.group(0)
    new_card = (
        m.group(1)
        + f'<img src="brand_assets/products/{img}" alt="{name}" class="absolute inset-0 h-full w-full object-contain bg-stone-100 p-4"/>'
        + (f'<span class="absolute left-4 top-4 text-[10px] tracking-wide2 uppercase bg-white/90 px-2 py-1 rounded-full">{badge}</span>' if badge else '')
        + '</a>\n        <div class="mt-5">\n        '
        + f'<h3 class="text-[11px] tracking-wide2 uppercase font-medium">{name}</h3>'
        + m.group(4) + price + m.group(6) + meta + m.group(8)
    )
    return new_card

s = card_pattern.sub(all_replace, s)

# Hero "View all" → "Zobacz wszystkie"
s = s.replace('>View all</a>', '>Zobacz wszystkie</a>')

# Timeless classics already has Kickback photos — translate copy
s = s.replace(
    '<h2 class="h-editorial text-[48px] md:text-[64px]">Timeless <em class="font-wonk font-normal">classics</em></h2>',
    '<h2 class="h-editorial text-[48px] md:text-[64px]">Ponadczasowe <em class="font-wonk font-normal">klasyki</em></h2>'
)
s = s.replace('>Explore</a>', '>Eksploruj</a>')

# Brand quote (parallax)
s = s.replace(
    'The brand designs clothing to make<br/>everyone feel <em class="font-wonk font-normal">unique</em>',
    'Każda koszulka to <em class="font-wonk font-normal">historia</em><br/>warta zachowania'
)
# Background of parallax → Kickback editorial photo if available
s = s.replace(
    'src="https://placehold.co/2400x1200/7a8a86/7a8a86.png"',
    'src="brand_assets/photos/9-outfit3-kickback.webp"',
    1
)

# Our special collections → Nasze kategorie
s = s.replace(
    '<h2 class="h-section text-[40px] md:text-[56px]">Our <em class="font-wonk font-normal">special</em> collections</h2>',
    '<h2 class="h-section text-[40px] md:text-[56px]">Nasze <em class="font-wonk font-normal">kategorie</em></h2>'
)
s = s.replace('>Explore all</a>', '>Zobacz wszystkie</a>')
# 3 collection cards → Kluby / Reprezentacje / Karty
s = s.replace(
    '<img src="https://placehold.co/1200x1500/2c3d5a/2c3d5a.png"',
    '<img src="brand_assets/products/manchester-united-06-07-home.webp"', 1
)
s = s.replace(
    '<img src="https://placehold.co/1200x1500/1e1e1e/1e1e1e.png"',
    '<img src="brand_assets/products/italy-2002-home.webp"', 1
)
s = s.replace(
    '<img src="https://placehold.co/1200x1500/0e7a4e/0e7a4e.png"',
    '<img src="brand_assets/products/2025-26-topps-real-madrid-team-set.webp"', 1
)
s = s.replace('<span class="text-[16px]">Tops</span>', '<span class="text-[16px]">Kluby</span>')
s = s.replace('<span class="text-[16px]">Accessories</span>', '<span class="text-[16px]">Reprezentacje</span>')
s = s.replace('<span class="text-[16px]">Bottoms</span>', '<span class="text-[16px]">Karty</span>')
s = s.replace('<span class="text-[10px] text-black/45 align-super">14</span>', '<span class="text-[10px] text-black/45 align-super">142</span>')
s = s.replace('<span class="text-[10px] text-black/45 align-super">22</span>', '<span class="text-[10px] text-black/45 align-super">38</span>')
s = s.replace('<span class="text-[10px] text-black/45 align-super">18</span>', '<span class="text-[10px] text-black/45 align-super">25</span>')

# Classic Meets Contemporary — translate to Polish football context
s = s.replace('Classic Meets<br/>Contemporary', 'Klasyka spotyka<br/>Współczesność')
s = s.replace(
    'Redefine timeless styles with a modern twist — explore the Heritage Collection and the Future Edit.',
    'Vintage retro 80\'s i 90\'s obok najnowszych trykotów 25/26. Pełna kolekcja w jednym miejscu.'
)
s = s.replace('>Discover more</a>', '>Zobacz kolekcję</a>', 1)
# Classic Meets background
s = s.replace(
    '<img src="https://placehold.co/1200x1200/f3f1ec/f3f1ec.png"',
    '<img src="brand_assets/photos/kickback-site-classics.webp"', 1
)

# What's new tabs
s = s.replace(
    '<div class="text-[11px] tracking-mega uppercase text-black/55">What\'s new</div>',
    '<div class="text-[11px] tracking-mega uppercase text-black/55">Najnowsze</div>'
)
s = s.replace(
    '<button class="h-section text-[36px] md:text-[52px] border-b tab-active pb-1">Jackets</button>',
    '<button class="h-section text-[36px] md:text-[52px] border-b tab-active pb-1">Klubowe</button>'
)
s = s.replace(
    '<button class="h-section text-[36px] md:text-[52px] tab-muted">Hoodies</button>',
    '<button class="h-section text-[36px] md:text-[52px] tab-muted">Reprezentacje</button>'
)
s = s.replace(
    '<button class="h-section text-[36px] md:text-[52px] tab-muted">T-Shirts</button>',
    '<button class="h-section text-[36px] md:text-[52px] tab-muted">Karty</button>'
)

# Item of the week
s = s.replace(
    '<h2 class="h-section text-[40px] md:text-[56px] mb-10">Item of the <em class="font-wonk font-normal">week</em></h2>',
    '<h2 class="h-section text-[40px] md:text-[56px] mb-10">Produkt <em class="font-wonk font-normal">tygodnia</em></h2>'
)
s = s.replace(
    '<img src="https://placehold.co/900x1125/e4e1db/e4e1db.png"',
    '<img src="brand_assets/products/parma-97-98-away.webp" style="background:#f5f5f5;padding:24px"', 1
)
s = s.replace(
    '<img src="https://placehold.co/900x1125/dcd8d2/dcd8d2.png"',
    '<img src="brand_assets/products/real-madrid-98-00-home.webp" style="background:#f5f5f5;padding:24px"', 1
)
s = s.replace('<h3 class="text-[12px] tracking-wide2 uppercase font-medium">Black Puffer Jacket</h3>',
              '<h3 class="text-[12px] tracking-wide2 uppercase font-medium">Parma 97/98 Away</h3>')
s = s.replace('<div class="mt-2 text-[11px] tracking-wide2 uppercase link-underline text-black/60 w-fit">Release theme</div>',
              '<div class="mt-2 text-[11px] tracking-wide2 uppercase link-underline text-black/60 w-fit">Vintage · Limitowana</div>')
s = s.replace('<div class="mt-4 text-[16px]">€69.95 <span class="text-[11px] text-black/50 tracking-wide2 uppercase ml-2">Taxes included</span></div>',
              '<div class="mt-4 text-[16px]">600,00 zł <span class="text-[11px] text-black/50 tracking-wide2 uppercase ml-2">VAT wliczony</span></div>')
s = s.replace('Add to cart', 'Do koszyka')
s = s.replace('Buy it now', 'Kup teraz')
s = s.replace('View product', 'Zobacz produkt')
s = s.replace('<a href="pages/size-guide.html" class="text-[11px] tracking-wide2 uppercase link-underline">Size guide</a>',
              '<a href="pages/size-guide.html" class="text-[11px] tracking-wide2 uppercase link-underline">Tabela rozmiarów</a>')
s = s.replace('<div class="text-[11px] tracking-wide2 uppercase">Size <span class="text-black/60">XS</span></div>',
              '<div class="text-[11px] tracking-wide2 uppercase">Rozmiar <span class="text-black/60">M</span></div>')
s = s.replace('<div class="mt-6 text-[11px] tracking-wide2 uppercase">Color <span class="text-black/60">Black</span></div>',
              '<div class="mt-6 text-[11px] tracking-wide2 uppercase">Kolor <span class="text-black/60">Original</span></div>')

# Shop the look
s = s.replace('<h3 class="h-section text-[28px] md:text-[36px] mb-6">Shop the look</h3>',
              '<h3 class="h-section text-[28px] md:text-[36px] mb-6">Skompletuj <em class="font-wonk font-normal">look</em></h3>')
s = s.replace(
    '<img src="https://placehold.co/800x1000/8e6b44/8e6b44.png"',
    '<img src="brand_assets/products/fc-bayern-retro-track-sweatshirt.webp" style="background:#f5f5f5;padding:16px"', 1
)
s = s.replace('<div class="mt-4 text-[11px] tracking-wide2 uppercase font-medium">Knit Comfort Turn-up Sleeve Coat</div>',
              '<div class="mt-4 text-[11px] tracking-wide2 uppercase font-medium">FC Bayern Retro Track</div>')
s = s.replace('<div class="mt-1 text-[12px]">€79.95</div>',
              '<div class="mt-1 text-[12px]">320,00 zł</div>')
s = s.replace('<div class="mt-1 text-[10px] text-black/50 tracking-wide2 uppercase">Available in 3 size</div>',
              '<div class="mt-1 text-[10px] text-black/50 tracking-wide2 uppercase">Dostępne w 3 rozmiarach</div>', 1)

# Sale countdown banner
s = s.replace('<h3 class="font-display text-[28px] md:text-[36px] leading-none">Sale has ended</h3>',
              '<h3 class="font-display text-[28px] md:text-[36px] leading-none">Drop kończy się za</h3>')
s = s.replace('>Explore</a>', '>Zobacz</a>')
s = s.replace('Days', 'Dni').replace('Hours', 'Godz').replace('>Min<', '>Min<').replace('>Sec<', '>Sek<')

# Spring has arrived
s = s.replace(
    '<em class="font-wonk font-normal">Spring has arrived.</em> Discover<br/>the new items',
    '<em class="font-wonk font-normal">Nowy drop.</em> Sprawdź<br/>kolekcję 25/26'
)
s = s.replace('>Discover now</a>', '>Zobacz teraz</a>')

# Two-up editorial quote
s = s.replace(
    'Timeless staples, redesigned for everyday sophistication',
    'Każda koszulka opowiada historię — od stadionu do twojej szafy'
)
# Two-up editorial photos
s = s.replace(
    '<img src="https://placehold.co/1200x1440/1a1a1a/1a1a1a.png"',
    '<img src="brand_assets/photos/9-outfit3-kickback.webp"', 1
)
s = s.replace(
    '<img src="https://placehold.co/1200x1440/6d6863/6d6863.png"',
    '<img src="brand_assets/photos/kickback-site-classics.webp"', 1
)

# Flagship stores
s = s.replace(
    '<h2 class="h-section text-[40px] md:text-[56px] mb-10"><em class="font-wonk font-normal">Our</em> flagship stores</h2>',
    '<h2 class="h-section text-[40px] md:text-[56px] mb-10"><em class="font-wonk font-normal">Nasz</em> pop-up store</h2>'
)
s = s.replace(
    '<h3 class="h-editorial text-[28px] md:text-[36px]">Discover our <em class="font-wonk font-normal">other stores</em></h3>',
    '<h3 class="h-editorial text-[28px] md:text-[36px]">Warszawa · <em class="font-wonk font-normal">Oleandrów 4</em></h3>'
)
s = s.replace('Map — Europe', 'Warszawa, Polska')

# Before/After
s = s.replace(
    '<h2 class="h-section text-[36px] md:text-[48px]">Before <span class="text-black/40">/</span> <em class="font-wonk font-normal">After</em></h2>',
    '<h2 class="h-section text-[36px] md:text-[48px]">Przed <span class="text-black/40">/</span> <em class="font-wonk font-normal">Po</em></h2>'
)
s = s.replace(
    'Before and after images are a great way to showcase the transformation or improvement in a particular subject.',
    'Każda koszulka przechodzi przez profesjonalną renowację. Zobacz różnicę.'
)
s = s.replace('>Shop now</a>', '>Sprawdź</a>')
s = s.replace('Made before', 'Stan oryginalny')
s = s.replace('Made after', 'Po renowacji')

# Tailored Motion
s = s.replace(
    '<h3 class="h-editorial text-[36px] md:text-[44px]">Tailored Motion: Style That Moves with You</h3>',
    '<h3 class="h-editorial text-[36px] md:text-[44px]">Mystery Box: <em class="font-wonk font-normal">losowanie</em> kolekcjonera</h3>'
)
# Tailored Motion left photo
s = s.replace(
    '<img src="https://placehold.co/1200x1500/2b2b2b/2b2b2b.png"',
    '<img src="brand_assets/photos/9-outfit3-kickback.webp"', 1
)
s = s.replace(
    '<img src="https://placehold.co/1200x1500/e9e3d6/e9e3d6.png"',
    '<img src="brand_assets/photos/kickback-site-classics.webp"', 1
)

# THE EDIT MODERN CLASSIC
s = s.replace('>THE EDIT</h3>', '>RETRO</h3>')
s = s.replace('>MODERN CLASSIC</h3>', '>VINTAGE 90s</h3>')

# Testimonials → Polish names + football fan quotes
s = s.replace('<h2 class="h-section text-[40px] md:text-[52px] text-black/15">Testimonials</h2>',
              '<h2 class="h-section text-[40px] md:text-[52px] text-black/15">Opinie</h2>')
# Replace 4 testimonials sequentially
testimonials_pattern = rx.compile(
    r'<figure class="text-center">\s*<div class="text-\[12px\] tracking-wide2 uppercase mb-3">([^<]+)</div>\s*<blockquote class="text-\[13px\] leading-\[1\.7\] text-black/70">"([^"]+)"</blockquote>\s*</figure>',
    rx.S
)
new_testimonials = [
    ('Michał K.', 'Kupiłem Real Madrid 98/00 i jakość przeszła moje oczekiwania. Szybka wysyłka, profesjonalne pakowanie.'),
    ('Karolina W.', 'Mystery Box to najlepszy prezent jaki dałam mojemu chłopakowi. Dostał Inter Milan 03/04, oszalał z radości.'),
    ('Bartek P.', 'Mam już 6 koszulek z Kickbacka. Każda autentyczna, każda dokładnie opisana. Polecam każdemu kolekcjonerowi.'),
    ('Julia S.', 'Pop-up store w Warszawie to magiczne miejsce. Można dotknąć każdej koszulki, ekipa zna się na temacie.'),
]
t_iter = iter(new_testimonials)
def t_replace(m):
    try: name, quote = next(t_iter)
    except StopIteration: return m.group(0)
    return f'<figure class="text-center">\n        <div class="text-[12px] tracking-wide2 uppercase mb-3">{name}</div>\n        <blockquote class="text-[13px] leading-[1.7] text-black/70">"{quote}"</blockquote>\n      </figure>'
s = testimonials_pattern.sub(t_replace, s)

# Blog
s = s.replace('<a href="blogs/news.html" class="text-[11px] tracking-wide2 uppercase link-underline">Visit blog</a>',
              '<a href="blogs/news.html" class="text-[11px] tracking-wide2 uppercase link-underline">Zobacz blog</a>')
s = s.replace('Read more', 'Czytaj dalej')
s = s.replace('Defying the Twilight: Bold Styles for Modern Rebels',
              'Jak rozpoznać oryginalną koszulkę piłkarską')
s = s.replace('Cruelty Free Fashion, Is It Possible?',
              'Najbardziej kultowe koszulki w historii Serie A')
s = s.replace('BTS: Matching Shooting Locations With Our Collections',
              'Najrzadsze koszulki w historii Mistrzostw Świata')
s = s.replace('Julia Hampel · March 1, 2024', 'Kickback · 1 marca 2026')
# Blog post images
s = s.replace(
    '<img src="https://placehold.co/1200x900/3f3d55/3f3d55.png"',
    '<img src="brand_assets/products/parma-97-98-away.webp" style="background:#f5f5f5;padding:24px"', 1
)
s = s.replace(
    '<img src="https://placehold.co/1200x900/e4e1db/e4e1db.png"',
    '<img src="brand_assets/products/manchester-united-06-07-home.webp" style="background:#f5f5f5;padding:24px"', 1
)
s = s.replace(
    '<img src="https://placehold.co/1200x900/d8d4cc/d8d4cc.png"',
    '<img src="brand_assets/products/italy-2002-home.webp" style="background:#f5f5f5;padding:24px"', 1
)

# Image strip — 4 portrait jersey photos
strip_replacements = [
    ('<img src="https://placehold.co/800x1066/8b816f/8b816f.png"', '<img src="brand_assets/products/real-madrid-98-00-home.webp" style="background:#f5f5f5;padding:32px"'),
    ('<img src="https://placehold.co/800x1066/2b2b2b/2b2b2b.png"', '<img src="brand_assets/products/parma-97-98-away.webp" style="background:#f5f5f5;padding:32px"'),
    ('<img src="https://placehold.co/800x1066/4a4137/4a4137.png"', '<img src="brand_assets/products/manchester-united-06-07-home.webp" style="background:#f5f5f5;padding:32px"'),
    ('<img src="https://placehold.co/800x1066/1f1f1f/1f1f1f.png"', '<img src="brand_assets/products/inter-milan-24-25-third.webp" style="background:#f5f5f5;padding:32px"'),
]
for old, new in strip_replacements:
    s = s.replace(old, new, 1)

# Carousel — 4 product cards
s = s.replace('<h2 class="h-section text-[40px] md:text-[56px]">Carousel</h2>',
              '<h2 class="h-section text-[40px] md:text-[56px]">Polecane</h2>')
carousel_replacements = [
    ('<img src="https://placehold.co/900x1125/d6c9b7/d6c9b7.png"', '<img src="brand_assets/products/brazil-total-90-training-top.webp" style="background:#f5f5f5;padding:24px"'),
    ('<img src="https://placehold.co/900x1125/ece7dd/ece7dd.png"', '<img src="brand_assets/products/schalke-02-04-home.webp" style="background:#f5f5f5;padding:24px"'),
    ('<img src="https://placehold.co/900x1125/c5ad8b/c5ad8b.png"', '<img src="brand_assets/products/fc-porto-16-17-home.webp" style="background:#f5f5f5;padding:24px"'),
    ('<img src="https://placehold.co/900x1125/e8d8c4/e8d8c4.png"', '<img src="brand_assets/products/italy-2002-home.webp" style="background:#f5f5f5;padding:24px"'),
]
for old, new in carousel_replacements:
    s = s.replace(old, new, 1)

# Category grid (Tops/Bags/Dresses/Knitwear) → Kluby/Reprezentacje/Bluzy/Karty
cat_replacements = [
    ('<img src="https://placehold.co/800x1066/e3dccf/e3dccf.png"', '<img src="brand_assets/products/manchester-united-06-07-home.webp"'),
    ('<img src="https://placehold.co/800x1066/b9a27f/b9a27f.png"', '<img src="brand_assets/products/italy-2002-home.webp"'),
    ('<img src="https://placehold.co/800x1066/dcd5c5/dcd5c5.png"', '<img src="brand_assets/products/fc-bayern-retro-track-sweatshirt.webp"'),
    ('<img src="https://placehold.co/800x1066/a36d3a/a36d3a.png"', '<img src="brand_assets/products/2025-26-topps-real-madrid-team-set.webp"'),
]
for old, new in cat_replacements:
    s = s.replace(old, new, 1)
s = s.replace('>Tops</div>', '>Kluby</div>')
s = s.replace('>Bags</div>', '>Reprezentacje</div>')
s = s.replace('>Dresses</div>', '>Bluzy</div>')
s = s.replace('>Knitwear</div>', '>Karty</div>')

with open('index.html', 'w') as f: f.write(s)
print('index.html: content swapped to Kickback (design preserved)')

# === PARTIALS.JS HEADER + FOOTER SWAPS ===
with open('assets/partials.js') as f: pjs = f.read()

# Top utility bar
pjs = pjs.replace(
    '<a href="${R(\'pages/store-locator.html\')}" class="hover:text-white">Our stores</a>',
    '<a href="${R(\'pages/store-locator.html\')}" class="hover:text-white">Nasz sklep</a>'
)
pjs = pjs.replace(
    '<div class="flex-1 text-center">Welcome to our store · New products live now</div>',
    '<div class="flex-1 text-center">Darmowa wysyłka od 300 zł · Nowości w sprzedaży</div>'
)
pjs = pjs.replace('<span>Ends in</span>', '<span>Drop kończy się za</span>')

# Logo wordmark — keep design, only change text
pjs = pjs.replace(
    '<a href="${R(\'index.html\')}" class="justify-self-center font-display text-[26px] leading-none tracking-tight lowercase" style="letter-spacing:-.01em">release</a>',
    '<a href="${R(\'index.html\')}" class="justify-self-center font-display text-[26px] leading-none tracking-tight lowercase" style="letter-spacing:-.01em">kickback</a>'
)

# Nav top — translate Shop / Pages / Product features / Contact + United States to Polish
pjs = pjs.replace('>Shop <span', '>Sklep <span')
pjs = pjs.replace('>Pages <span', '>Strony <span')
pjs = pjs.replace('>Product features <span', '>Produkty <span')
pjs = pjs.replace(
    '<a href="${R(\'pages/contact.html\')}" class="hover:text-black inline-flex items-center h-[72px]">Contact</a>',
    '<a href="${R(\'pages/contact.html\')}" class="hover:text-black inline-flex items-center h-[72px]">Kontakt</a>'
)
pjs = pjs.replace('United states', 'Polska')

# Mega menu Shop — Featured / Categories → Polecane / Kategorie + Polish team list
pjs = pjs.replace('<div class="mega-col-title">Featured</div>', '<div class="mega-col-title">Polecane</div>')
pjs = pjs.replace('<div class="mega-col-title">Categories</div>', '<div class="mega-col-title">Kategorie</div>')

# Featured list
pjs = pjs.replace(
    '''<li><a href="${R('collections/new-collection.html')}" class="mega-link">New</a></li>
                <li><a href="${R('collections/best-sellers.html')}" class="mega-link">Bestsellers</a></li>
                <li><a href="${R('collections/basics.html')}" class="mega-link">Basics</a></li>''',
    '''<li><a href="${R('collections/new-collection.html')}" class="mega-link">Nowości</a></li>
                <li><a href="${R('collections/best-sellers.html')}" class="mega-link">Bestsellery</a></li>
                <li><a href="${R('collections/basics.html')}" class="mega-link">Mystery Box</a></li>'''
)
# Categories list — replace with Polish football categories
pjs = pjs.replace(
    '''<li><a href="${R('collections/tops.html')}" class="mega-link">Tops</a></li>
                <li><a href="${R('collections/jeans.html')}" class="mega-link">Jeans</a></li>
                <li><a href="${R('collections/shorts.html')}" class="mega-link">Shorts</a></li>
                <li><a href="${R('collections/t-shirts.html')}" class="mega-link">T-Shirts</a></li>
                <li><a href="${R('collections/pants.html')}" class="mega-link">Bottoms</a></li>
                <li><a href="${R('collections/sweatpants.html')}" class="mega-link">Sweatpants</a></li>
                <li><a href="${R('collections/jackets-coats.html')}" class="mega-link">Jackets &amp; coats</a></li>
                <li><a href="${R('collections/hoodies-sweatshirts.html')}" class="mega-link">Hoodies &amp; sweatshirts</a></li>''',
    '''<li><a href="${R('collections/tops.html')}" class="mega-link">FC Barcelona</a></li>
                <li><a href="${R('collections/jeans.html')}" class="mega-link">Real Madrid</a></li>
                <li><a href="${R('collections/shorts.html')}" class="mega-link">Manchester United</a></li>
                <li><a href="${R('collections/t-shirts.html')}" class="mega-link">FC Bayern Munich</a></li>
                <li><a href="${R('collections/pants.html')}" class="mega-link">Liverpool</a></li>
                <li><a href="${R('collections/sweatpants.html')}" class="mega-link">PSG</a></li>
                <li><a href="${R('collections/jackets-coats.html')}" class="mega-link">Juventus</a></li>
                <li><a href="${R('collections/hoodies-sweatshirts.html')}" class="mega-link">Inter Milan</a></li>'''
)

# Mega menu cards (Spotlight / SS26)
pjs = pjs.replace(
    '<img src="https://placehold.co/600x800/3a3530/3a3530.png" alt="" class="absolute inset-0 h-full w-full object-cover"/>',
    '<img src="${R(\'brand_assets/products/parma-97-98-away.webp\')}" alt="" class="absolute inset-0 h-full w-full object-cover bg-stone-100"/>',
    1
)
pjs = pjs.replace(
    '<img src="https://placehold.co/600x800/b38b55/b38b55.png" alt="" class="absolute inset-0 h-full w-full object-cover"/>',
    '<img src="${R(\'brand_assets/products/real-madrid-98-00-home.webp\')}" alt="" class="absolute inset-0 h-full w-full object-cover bg-stone-100"/>',
    1
)
pjs = pjs.replace('Transient Echoes', 'Vintage Drop')
pjs = pjs.replace('SS26', 'NEW IN')
pjs = pjs.replace('Get ready for the sun', 'Sezon 25/26')
pjs = pjs.replace('Spotlight', 'Limitowana')

# Pages mega — translate
pages_old = '''<li><a href="${R('pages/faq.html')}" class="mega-link">FAQ</a></li>
              <li><a href="${R('blogs/news.html')}" class="mega-link">Blog</a></li>
              <li><a href="${R('pages/lookbook.html')}" class="mega-link">Lookbook</a></li>
              <li><a href="${R('pages/content-tiles.html')}" class="mega-link">Content tiles</a></li>
              <li><a href="${R('pages/about-us.html')}" class="mega-link">About us</a></li>
              <li><a href="${R('pages/size-guide.html')}" class="mega-link">Size guide</a></li>'''
pages_new = '''<li><a href="${R('pages/faq.html')}" class="mega-link">FAQ</a></li>
              <li><a href="${R('blogs/news.html')}" class="mega-link">Blog</a></li>
              <li><a href="${R('pages/lookbook.html')}" class="mega-link">Lookbook</a></li>
              <li><a href="${R('pages/content-tiles.html')}" class="mega-link">Galeria</a></li>
              <li><a href="${R('pages/about-us.html')}" class="mega-link">O nas</a></li>
              <li><a href="${R('pages/size-guide.html')}" class="mega-link">Tabela rozmiarów</a></li>'''
pjs = pjs.replace(pages_old, pages_new)

# Product features mega — translate
pjs = pjs.replace('Pre-order feature', 'Pre-order')
pjs = pjs.replace('Product groups', 'Mystery Box')

# Footer columns
pjs = pjs.replace('Newsletter</div>', 'Newsletter</div>')
pjs = pjs.replace('Sign up to receive 10% off your first order', 'Zapisz się i otrzymaj 10% rabatu na pierwsze zamówienie')
pjs = pjs.replace('Email address', 'Twój email')
pjs = pjs.replace('>Subscribe</button>', '>Zapisz</button>')
pjs = pjs.replace('Company</div>', 'Kickback</div>')
# Company links
pjs = pjs.replace('>Search</a>', '>Szukaj</a>')
pjs = pjs.replace('>Contact</a>', '>Kontakt</a>')
pjs = pjs.replace('>Terms</a>', '>Regulamin</a>')
pjs = pjs.replace('>Privacy Policy</a>', '>Polityka prywatności</a>')
pjs = pjs.replace('Pages</div>', 'Strony</div>')
pjs = pjs.replace('>Lookbook</a>', '>Lookbook</a>')
pjs = pjs.replace('>Collections</a>', '>Kolekcje</a>')
pjs = pjs.replace('Shop</div>', 'Sklep</div>')
# Shop column links → Polish football
pjs = pjs.replace(
    '''<li><a href="${R('collections/tops.html')}" class="hover:text-white">Tops</a></li>
          <li><a href="${R('collections/t-shirts.html')}" class="hover:text-white">T-shirts</a></li>
          <li><a href="${R('collections/knitwear.html')}" class="hover:text-white">Knitwear</a></li>
          <li><a href="${R('collections/dresses.html')}" class="hover:text-white">Dresses</a></li>
          <li><a href="${R('collections/pants.html')}" class="hover:text-white">Bottoms</a></li>
          <li><a href="${R('collections/jackets-coats.html')}" class="hover:text-white">Jackets &amp; Coats</a></li>''',
    '''<li><a href="${R('collections/tops.html')}" class="hover:text-white">Kluby</a></li>
          <li><a href="${R('collections/t-shirts.html')}" class="hover:text-white">Reprezentacje</a></li>
          <li><a href="${R('collections/knitwear.html')}" class="hover:text-white">Karty piłkarskie</a></li>
          <li><a href="${R('collections/dresses.html')}" class="hover:text-white">Bluzy &amp; kurtki</a></li>
          <li><a href="${R('collections/pants.html')}" class="hover:text-white">Mystery Box</a></li>
          <li><a href="${R('collections/jackets-coats.html')}" class="hover:text-white">Akcesoria</a></li>'''
)

# Footer wordmark
pjs = pjs.replace('<div class="font-display text-[56px] md:text-[72px] leading-none lowercase" style="letter-spacing:-.02em">release</div>',
                  '<div class="font-display text-[56px] md:text-[72px] leading-none lowercase" style="letter-spacing:-.02em">kickback</div>')
pjs = pjs.replace('Release is a premium official Shopify theme designed by DigiFist.',
                  'Kickback — vintage football jerseys, karty kolekcjonerskie i Mystery Box. Pasja dla pasjonatów.')

# Copyright
pjs = pjs.replace('Copyright © 2026 DigiFist. All rights reserved. Powered by Shopify.',
                  'Copyright © 2026 Kickback. All rights reserved.')

with open('assets/partials.js', 'w') as f: f.write(pjs)
print('partials.js: header + footer translated to Polish, logo + mega menu swapped')

print('\nDone. Run `node serve.mjs` to preview.')
