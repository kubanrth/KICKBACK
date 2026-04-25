// Release – shared header + footer injection
// Usage: add <div data-release-header></div> and <div data-release-footer></div>
// to any page, then <script src="[relative]/assets/partials.js"></script>.
// Path resolution: derives base from the script's own src attribute — works at any URL depth.

(function(){
  const scripts = document.querySelectorAll('script[src*="partials.js"]');
  const myScript = scripts[scripts.length - 1];
  const src = myScript.getAttribute('src');
  const base = src.replace(/assets\/partials\.js$/, '');
  const R = (p) => base + p;

  const header = `
<div class="bg-black text-white">
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 h-9 flex items-center justify-between text-[11px] font-medium tracking-wide2 uppercase">
    <div class="hidden md:flex items-center gap-4 text-white/85">
      <a href="${R('pages/store-locator.html')}" class="hover:text-white">Nasz sklep</a>
    </div>
    <div class="flex-1 text-center">Darmowa wysyłka od 300 zł · Nowości w sprzedaży</div>
    <div class="hidden md:flex items-center gap-3 text-white/85">
      <span>Drop kończy się za</span>
      <span class="digit">1550<span class="text-white/50">D</span></span>
      <span class="text-white/40">|</span>
      <span class="digit">10<span class="text-white/50">H</span></span>
      <span class="text-white/40">|</span>
      <span class="digit">24<span class="text-white/50">M</span></span>
      <span class="text-white/40">|</span>
      <span class="digit">52<span class="text-white/50">S</span></span>
    </div>
  </div>
</div>
<header class="bg-white border-b hairline onlight relative z-40">
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 h-[72px] grid grid-cols-3 items-center">
    <nav class="flex items-center gap-8 text-[12px] tracking-wide2 uppercase text-black/80">
      <div class="has-mega">
        <a href="${R('collections/all.html')}" class="hover:text-black inline-flex items-center h-[72px]">Sklep <span class="caret">▾</span></a>
        <div class="mega mega-wide">
          <div class="mx-auto max-w-[1600px] px-10 py-12 grid grid-cols-12 gap-10">
            <div class="col-span-3">
              <div class="mega-col-title">Polecane</div>
              <ul class="space-y-0.5">
                <li><a href="${R('collections/new-collection.html')}" class="mega-link">Nowości</a></li>
                <li><a href="${R('collections/best-sellers.html')}" class="mega-link">Bestsellery</a></li>
                <li><a href="${R('collections/basics.html')}" class="mega-link">Mystery Box</a></li>
              </ul>
            </div>
            <div class="col-span-3">
              <div class="mega-col-title">Kategorie</div>
              <ul class="space-y-0.5">
                <li><a href="${R('collections/tops.html')}" class="mega-link">FC Barcelona</a></li>
                <li><a href="${R('collections/jeans.html')}" class="mega-link">Real Madrid</a></li>
                <li><a href="${R('collections/shorts.html')}" class="mega-link">Manchester United</a></li>
                <li><a href="${R('collections/t-shirts.html')}" class="mega-link">FC Bayern Munich</a></li>
                <li><a href="${R('collections/pants.html')}" class="mega-link">Liverpool</a></li>
                <li><a href="${R('collections/sweatpants.html')}" class="mega-link">PSG</a></li>
                <li><a href="${R('collections/jackets-coats.html')}" class="mega-link">Juventus</a></li>
                <li><a href="${R('collections/hoodies-sweatshirts.html')}" class="mega-link">Inter Milan</a></li>
              </ul>
            </div>
            <a href="${R('collections/new-collection.html')}" class="col-span-3 group">
              <div class="mega-card tile">
                <img src="${R('brand_assets/products/parma-97-98-away.webp')}" alt="" class="absolute inset-0 h-full w-full object-cover bg-stone-100"/>
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0"></div>
                <div class="absolute left-5 top-5 text-[10px] tracking-wide2 uppercase text-white/85">Limitowana</div>
                <div class="absolute left-5 bottom-5 text-white font-display text-[22px] leading-tight normal-case">Vintage Drop</div>
              </div>
            </a>
            <a href="${R('collections/shorts.html')}" class="col-span-3 group">
              <div class="mega-card tile">
                <img src="${R('brand_assets/products/real-madrid-98-00-home.webp')}" alt="" class="absolute inset-0 h-full w-full object-cover bg-stone-100"/>
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0"></div>
                <div class="absolute left-5 top-5 text-[10px] tracking-wide2 uppercase text-white/85">NEW IN</div>
                <div class="absolute left-5 bottom-5 text-white font-display text-[22px] leading-tight normal-case">Sezon 25/26</div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="has-mega">
        <a href="#" class="hover:text-black inline-flex items-center h-[72px]">Strony <span class="caret">▾</span></a>
        <div class="mega rounded-b-[2px] min-w-[220px]">
          <div class="px-6 py-6">
            <ul class="space-y-0.5">
              <li><a href="${R('pages/faq.html')}" class="mega-link">FAQ</a></li>
              <li><a href="${R('blogs/news.html')}" class="mega-link">Blog</a></li>
              <li><a href="${R('pages/lookbook.html')}" class="mega-link">Lookbook</a></li>
              <li><a href="${R('pages/content-tiles.html')}" class="mega-link">Galeria</a></li>
              <li><a href="${R('pages/about-us.html')}" class="mega-link">O nas</a></li>
              <li><a href="${R('pages/size-guide.html')}" class="mega-link">Tabela rozmiarów</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="has-mega">
        <a href="#" class="hover:text-black inline-flex items-center h-[72px]">Produkty <span class="caret">▾</span></a>
        <div class="mega rounded-b-[2px] min-w-[240px]">
          <div class="px-6 py-6">
            <ul class="space-y-0.5">
              <li><a href="${R('products/knit-comfort-turn-up-sleeve-coat.html')}" class="mega-link">Pre-order</a></li>
              <li><a href="${R('collections/all.html')}" class="mega-link">Mystery Box</a></li>
            </ul>
          </div>
        </div>
      </div>
      <a href="${R('pages/contact.html')}" class="hover:text-black inline-flex items-center h-[72px]">Kontakt</a>
    </nav>
    <a href="${R('index.html')}" class="justify-self-center font-display text-[26px] leading-none tracking-tight lowercase" style="letter-spacing:-.01em">kickback</a>
    <nav class="justify-self-end flex items-center gap-6 text-[12px] tracking-wide2 uppercase text-black/80">
      <a href="#" class="hover:text-black inline-flex items-center gap-1.5">Polska <span class="caret">▾</span></a>
      <a href="${R('pages/search.html')}" class="hover:text-black" aria-label="Search"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg></a>
      <a href="${R('pages/login.html')}" class="hover:text-black" aria-label="Account"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6"/></svg></a>
      <a href="${R('pages/cart.html')}" class="hover:text-black inline-flex items-center gap-1.5" aria-label="Cart">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 7h14l-1.5 12a2 2 0 0 1-2 1.7H8.5a2 2 0 0 1-2-1.7Z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/></svg>
        <span class="inline-flex items-center justify-center min-w-[18px] h-[18px] text-[10px] rounded-full bg-black text-white px-1">0</span>
      </a>
    </nav>
  </div>
</header>`;

  const footer = `
<footer class="bg-black text-white mt-0">
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 pt-20 pb-10">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-10">
      <div class="md:col-span-5">
        <div class="text-[11px] tracking-wide2 uppercase text-white/60">Newsletter</div>
        <h3 class="mt-3 text-[18px]">Zapisz się i otrzymaj 10% rabatu na pierwsze zamówienie</h3>
        <form class="mt-5 flex items-center bg-white rounded-full pl-5 pr-1.5 h-12 max-w-md" onsubmit="event.preventDefault()">
          <input type="email" placeholder="Twój email" class="flex-1 bg-transparent text-black placeholder:text-black/45 text-[13px] outline-none"/>
          <button class="h-9 px-5 rounded-full bg-black text-white text-[11px] tracking-wide2 uppercase font-medium">Zapisz</button>
        </form>
      </div>
      <div class="md:col-span-2">
        <div class="text-[11px] tracking-wide2 uppercase text-white/60 mb-4">Kickback</div>
        <ul class="space-y-2.5 text-[13px] text-white/85">
          <li><a href="#" class="hover:text-white">Szukaj</a></li>
          <li><a href="${R('pages/contact.html')}" class="hover:text-white">Kontakt</a></li>
          <li><a href="${R('pages/terms.html')}" class="hover:text-white">Regulamin</a></li>
          <li><a href="${R('pages/privacy.html')}" class="hover:text-white">Polityka prywatności</a></li>
        </ul>
      </div>
      <div class="md:col-span-2">
        <div class="text-[11px] tracking-wide2 uppercase text-white/60 mb-4">Strony</div>
        <ul class="space-y-2.5 text-[13px] text-white/85">
          <li><a href="${R('pages/faq.html')}" class="hover:text-white">FAQ</a></li>
          <li><a href="${R('blogs/news.html')}" class="hover:text-white">Blog</a></li>
          <li><a href="${R('pages/lookbook.html')}" class="hover:text-white">Lookbook</a></li>
          <li><a href="${R('collections/all.html')}" class="hover:text-white">Kolekcje</a></li>
        </ul>
      </div>
      <div class="md:col-span-3">
        <div class="text-[11px] tracking-wide2 uppercase text-white/60 mb-4">Sklep</div>
        <ul class="space-y-2.5 text-[13px] text-white/85">
          <li><a href="${R('collections/tops.html')}" class="hover:text-white">Kluby</a></li>
          <li><a href="${R('collections/t-shirts.html')}" class="hover:text-white">Reprezentacje</a></li>
          <li><a href="${R('collections/knitwear.html')}" class="hover:text-white">Karty piłkarskie</a></li>
          <li><a href="${R('collections/dresses.html')}" class="hover:text-white">Bluzy &amp; kurtki</a></li>
          <li><a href="${R('collections/pants.html')}" class="hover:text-white">Mystery Box</a></li>
          <li><a href="${R('collections/jackets-coats.html')}" class="hover:text-white">Akcesoria</a></li>
        </ul>
      </div>
    </div>
    <div class="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-t border-white/10 pt-8">
      <div class="max-w-md">
        <div class="font-display text-[56px] md:text-[72px] leading-none lowercase" style="letter-spacing:-.02em">kickback</div>
        <p class="mt-4 text-[12px] text-white/55">Kickback — vintage football jerseys, karty kolekcjonerskie i Mystery Box. Pasja dla pasjonatów.</p>
      </div>
      <div class="flex items-center gap-5 text-white/80">
        <a href="#" aria-label="Instagram" class="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg></a>
        <a href="#" aria-label="YouTube" class="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3Z" fill="currentColor"/></svg></a>
        <a href="#" aria-label="TikTok" class="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 3v11a4 4 0 1 1-4-4"/><path d="M15 3a5 5 0 0 0 5 5"/></svg></a>
        <a href="#" aria-label="X" class="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4l16 16M20 4 4 20"/></svg></a>
        <a href="#" aria-label="Vimeo" class="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 8c2-2 4-3 5-2s0 4-1 6 0 4 2 3 6-6 7-10-2-5-5-3"/></svg></a>
      </div>
    </div>
    <div class="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-white/50">
      <div>Copyright © 2026 Kickback. All rights reserved.</div>
      <div class="flex items-center gap-2 opacity-80">
        <span class="h-6 w-9 bg-white/10 rounded-[2px]"></span>
        <span class="h-6 w-9 bg-white/10 rounded-[2px]"></span>
        <span class="h-6 w-9 bg-white/10 rounded-[2px]"></span>
        <span class="h-6 w-9 bg-white/10 rounded-[2px]"></span>
        <span class="h-6 w-9 bg-white/10 rounded-[2px]"></span>
        <span class="h-6 w-9 bg-white/10 rounded-[2px]"></span>
        <span class="h-6 w-9 bg-white/10 rounded-[2px]"></span>
      </div>
    </div>
  </div>
</footer>`;

  function inject(){
    document.querySelectorAll('[data-release-header]').forEach(el => el.outerHTML = header);
    document.querySelectorAll('[data-release-footer]').forEach(el => el.outerHTML = footer);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
  else inject();
})();
