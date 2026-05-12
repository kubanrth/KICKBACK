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
<div id="site-header-wrap" class="sticky top-0 z-50 transition-all duration-300 ease-out">
<div id="site-announcement" class="bg-black text-white text-[11px] tracking-wide2 uppercase">
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 h-9 flex items-center justify-between gap-6">
    <a href="${R('pages/store-locator.html')}" class="hidden md:inline-flex items-center gap-2 hover:text-white/70"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-7 8-13a8 8 0 0 0-16 0c0 6 8 13 8 13z"/><circle cx="12" cy="9" r="2.6"/></svg>Nasze sklepy</a>
    <div class="flex-1 text-center"><span class="inline-flex items-center gap-2"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 7h13v9H3zM16 10h4l1 3v3h-5z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>Darmowa dostawa od 500 zł</span></div>
    <div class="hidden md:inline-flex items-center gap-2"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 8h14l-1.5 9a2 2 0 0 1-2 1.6H8.5a2 2 0 0 1-2-1.6Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg><span>Nowości</span><span class="text-white/40">·</span><span>kończą się za</span><span class="digit">133<span class="text-white/55">D</span></span><span class="text-white/40">|</span><span class="digit">10<span class="text-white/55">H</span></span><span class="text-white/40">|</span><span class="digit">05<span class="text-white/55">M</span></span></div>
  </div>
</div>
<header id="site-header" class="bg-white border-b hairline onlight relative transition-all duration-300 ease-out">
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 h-[72px] grid grid-cols-3 items-center transition-all duration-300 ease-out">
    <nav class="flex items-center gap-8 text-[12px] tracking-wide2 uppercase text-black/80">
      <div class="has-mega">
        <a href="${R('collections/all.html')}" class="hover:text-black inline-flex items-center h-[72px]">Shop <span class="caret">▾</span></a>
        <div class="mega mega-wide">
          <div class="mx-auto max-w-[1600px] px-10 py-12 grid grid-cols-12 gap-10">
            <div class="col-span-3">
              <div class="mega-col-title">Featured</div>
              <ul class="space-y-0.5">
                <li><a href="${R('collections/new-collection.html')}" class="mega-link">New</a></li>
                <li><a href="${R('collections/best-sellers.html')}" class="mega-link">Bestsellers</a></li>
                <li><a href="${R('collections/basics.html')}" class="mega-link">Basics</a></li>
              </ul>
            </div>
            <div class="col-span-3">
              <div class="mega-col-title">Categories</div>
              <ul class="space-y-0.5">
                <li><a href="${R('collections/tops.html')}" class="mega-link">Tops</a></li>
                <li><a href="${R('collections/jeans.html')}" class="mega-link">Jeans</a></li>
                <li><a href="${R('collections/shorts.html')}" class="mega-link">Shorts</a></li>
                <li><a href="${R('collections/t-shirts.html')}" class="mega-link">T-Shirts</a></li>
                <li><a href="${R('collections/pants.html')}" class="mega-link">Bottoms</a></li>
                <li><a href="${R('collections/sweatpants.html')}" class="mega-link">Sweatpants</a></li>
                <li><a href="${R('collections/jackets-coats.html')}" class="mega-link">Jackets &amp; coats</a></li>
                <li><a href="${R('collections/hoodies-sweatshirts.html')}" class="mega-link">Hoodies &amp; sweatshirts</a></li>
              </ul>
            </div>
            <a href="${R('collections/new-collection.html')}" class="col-span-3 group">
              <div class="mega-card tile">
                <img src="https://placehold.co/600x800/3a3530/3a3530.png" alt="" class="absolute inset-0 h-full w-full object-cover"/>
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0"></div>
                <div class="absolute left-5 top-5 text-[10px] tracking-wide2 uppercase text-white/85">Spotlight</div>
                <div class="absolute left-5 bottom-5 text-white font-display text-[22px] leading-tight normal-case">Transient Echoes</div>
              </div>
            </a>
            <a href="${R('collections/shorts.html')}" class="col-span-3 group">
              <div class="mega-card tile">
                <img src="https://placehold.co/600x800/b38b55/b38b55.png" alt="" class="absolute inset-0 h-full w-full object-cover"/>
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0"></div>
                <div class="absolute left-5 top-5 text-[10px] tracking-wide2 uppercase text-white/85">SS26</div>
                <div class="absolute left-5 bottom-5 text-white font-display text-[22px] leading-tight normal-case">Get ready for the sun</div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="has-mega">
        <a href="#" class="hover:text-black inline-flex items-center h-[72px]">Pages <span class="caret">▾</span></a>
        <div class="mega rounded-b-[2px] min-w-[220px]">
          <div class="px-6 py-6">
            <ul class="space-y-0.5">
              <li><a href="${R('pages/faq.html')}" class="mega-link">FAQ</a></li>
              <li><a href="${R('blogs/news.html')}" class="mega-link">Blog</a></li>
              <li><a href="${R('pages/lookbook.html')}" class="mega-link">Lookbook</a></li>
              <li><a href="${R('pages/content-tiles.html')}" class="mega-link">Content tiles</a></li>
              <li><a href="${R('pages/about-us.html')}" class="mega-link">About us</a></li>
              <li><a href="${R('pages/size-guide.html')}" class="mega-link">Size guide</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="has-mega">
        <a href="#" class="hover:text-black inline-flex items-center h-[72px]">Product features <span class="caret">▾</span></a>
        <div class="mega rounded-b-[2px] min-w-[240px]">
          <div class="px-6 py-6">
            <ul class="space-y-0.5">
              <li><a href="${R('products/knit-comfort-turn-up-sleeve-coat.html')}" class="mega-link">Pre-order feature</a></li>
              <li><a href="${R('collections/all.html')}" class="mega-link">Product groups</a></li>
            </ul>
          </div>
        </div>
      </div>
      <a href="${R('pages/contact.html')}" class="hover:text-black inline-flex items-center h-[72px]">Contact</a>
    </nav>
    <a href="${R('index.html')}" class="justify-self-center inline-flex items-center" aria-label="Kickback"><img src="${R('brand_assets/kickback_logo.svg')}" alt="Kickback" class="h-7 md:h-8 w-auto"/></a>
    <nav class="justify-self-end flex items-center gap-6 text-[12px] tracking-wide2 uppercase text-black/80">
      <a href="#" class="hover:text-black inline-flex items-center gap-1.5">United states <span class="caret">▾</span></a>
      <button type="button" data-search-open class="hover:text-black" aria-label="Search"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg></button>
      <a href="${R('pages/login.html')}" class="hover:text-black" aria-label="Account"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6"/></svg></a>
      <a href="${R('pages/cart.html')}" class="hover:text-black inline-flex items-center gap-1.5" aria-label="Cart">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 7h14l-1.5 12a2 2 0 0 1-2 1.7H8.5a2 2 0 0 1-2-1.7Z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/></svg>
        <span class="inline-flex items-center justify-center min-w-[18px] h-[18px] text-[10px] rounded-full bg-black text-white px-1">0</span>
      </a>
    </nav>
  </div>
</header>
</div>`;

  const footer = `
<footer class="bg-black text-white mt-0">
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 pt-20 pb-10">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-10">
      <div class="md:col-span-5">
        <div class="text-[11px] tracking-wide2 uppercase text-white/60">Newsletter</div>
        <h3 class="mt-3 text-[18px]">Sign up to receive 10% off your first order</h3>
        <form class="mt-5 flex items-center bg-white rounded-full pl-5 pr-1.5 h-12 max-w-md" onsubmit="event.preventDefault()">
          <input type="email" placeholder="Email address" class="flex-1 bg-transparent text-black placeholder:text-black/45 text-[13px] outline-none"/>
          <button class="h-9 px-5 rounded-full bg-black text-white text-[11px] tracking-wide2 uppercase font-medium">Subscribe</button>
        </form>
      </div>
      <div class="md:col-span-2">
        <div class="text-[11px] tracking-wide2 uppercase text-white/60 mb-4">Kickback</div>
        <ul class="space-y-2.5 text-[13px] text-white/85">
          <li><a href="${R('pages/contact.html')}" class="hover:text-white">Kontakt</a></li>
          <li><a href="${R('pages/terms.html')}" class="hover:text-white">Regulamin</a></li>
          <li><a href="${R('pages/privacy.html')}" class="hover:text-white">Polityka prywatności</a></li>
          <li><a href="${R('pages/shipping.html')}" class="hover:text-white">Wymiana i zwroty</a></li>
        </ul>
      </div>
      <div class="md:col-span-2">
        <ul class="space-y-2.5 text-[13px] text-white/85 md:mt-9">
          <li><a href="${R('pages/faq.html')}" class="hover:text-white">FAQ</a></li>
          <li><a href="${R('blogs/news.html')}" class="hover:text-white">Blog</a></li>
          <li><a href="${R('pages/about.html')}" class="hover:text-white">O nas</a></li>
        </ul>
      </div>
      <div class="md:col-span-3">
        <div class="text-[11px] tracking-wide2 uppercase text-white/60 mb-4">Produkty</div>
        <ul class="space-y-2.5 text-[13px] text-white/85">
          <li><a href="${R('collections/all.html')}" class="hover:text-white">Koszulki RETRO</a></li>
          <li><a href="${R('collections/new-collection.html')}" class="hover:text-white">Nowe koszulki</a></li>
          <li><a href="${R('collections/basics.html')}" class="hover:text-white">Karty piłkarskie</a></li>
          <li><a href="${R('collections/best-sellers.html')}" class="hover:text-white">Mystery Box</a></li>
          <li><a href="${R('collections/jackets-coats.html')}" class="hover:text-white">Bluzy i kurtki</a></li>
          <li><a href="${R('collections/accessories.html')}" class="hover:text-white">Akcesoria</a></li>
        </ul>
      </div>
    </div>
    <div class="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-t border-white/10 pt-8">
      <div class="max-w-md">
        <img src="${R('brand_assets/kickback_logo.svg')}" alt="Kickback" class="h-12 md:h-16 w-auto" style="filter:invert(1) brightness(2)"/>
      </div>
      <div class="flex items-center gap-5 text-white/80">
        <a href="#" aria-label="Instagram" class="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg></a>
        <a href="#" aria-label="YouTube" class="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3Z" fill="currentColor"/></svg></a>
        <a href="#" aria-label="TikTok" class="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 3v11a4 4 0 1 1-4-4"/><path d="M15 3a5 5 0 0 0 5 5"/></svg></a>
      </div>
    </div>
    <div class="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-white/50">
      <div>Copyright © 2026 DigiFist. All rights reserved. Powered by Shopify.</div>
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

  const searchDrawer = `
<div id="search-drawer" class="fixed inset-0 z-[100] pointer-events-none" aria-hidden="true">
  <div data-search-backdrop class="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300"></div>
  <div data-search-panel class="absolute top-0 left-0 right-0 bg-white -translate-y-full transition-transform duration-400 ease-out shadow-[0_18px_40px_-20px_rgba(0,0,0,0.25)]" style="border-radius:0 0 14px 14px">
    <div class="mx-auto max-w-[1600px] px-8 md:px-14 pt-8 pb-10">
      <div class="flex items-center gap-5 pb-6 border-b hairline">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="text-black/60 shrink-0"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        <input data-search-input type="search" placeholder="Search for..." class="flex-1 bg-transparent text-[26px] md:text-[32px] outline-none placeholder:text-black/40 text-black"/>
        <button type="button" data-search-close aria-label="Close" class="h-10 w-10 rounded-full flex items-center justify-center hover:bg-black/5 transition shrink-0"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      </div>
      <div class="mt-8">
        <div class="text-[10px] md:text-[11px] tracking-mega uppercase text-black/55 mb-5">Popularne wyszukiwania</div>
        <div class="flex flex-wrap gap-3">
          <a href="${R('collections/all.html')}" class="inline-flex items-center justify-center h-11 px-6 rounded-full border hairline text-[11px] tracking-wide2 uppercase hover:bg-black hover:text-white transition">Koszulki retro</a>
          <a href="${R('collections/all.html')}" class="inline-flex items-center justify-center h-11 px-6 rounded-full border hairline text-[11px] tracking-wide2 uppercase hover:bg-black hover:text-white transition">Real Madrid</a>
          <a href="${R('collections/all.html')}" class="inline-flex items-center justify-center h-11 px-6 rounded-full border hairline text-[11px] tracking-wide2 uppercase hover:bg-black hover:text-white transition">Manchester United</a>
          <a href="${R('collections/best-sellers.html')}" class="inline-flex items-center justify-center h-11 px-6 rounded-full border hairline text-[11px] tracking-wide2 uppercase hover:bg-black hover:text-white transition">Reprezentacja Polski</a>
          <a href="${R('collections/new-collection.html')}" class="inline-flex items-center justify-center h-11 px-6 rounded-full border hairline text-[11px] tracking-wide2 uppercase hover:bg-black hover:text-white transition">Mystery Box</a>
          <a href="${R('collections/jackets-coats.html')}" class="inline-flex items-center justify-center h-11 px-6 rounded-full border hairline text-[11px] tracking-wide2 uppercase hover:bg-black hover:text-white transition">Kurtki i bluzy</a>
        </div>
      </div>
    </div>
  </div>
</div>`;

  function bindSearch(){
    const drawer = document.getElementById('search-drawer');
    if (!drawer) return;
    const panel = drawer.querySelector('[data-search-panel]');
    const backdrop = drawer.querySelector('[data-search-backdrop]');
    const input = drawer.querySelector('[data-search-input]');
    function open(){
      drawer.classList.remove('pointer-events-none');
      drawer.setAttribute('aria-hidden', 'false');
      backdrop.style.opacity = '1';
      panel.style.transform = 'translateY(0)';
      setTimeout(() => input && input.focus(), 80);
      document.body.style.overflow = 'hidden';
    }
    function close(){
      drawer.classList.add('pointer-events-none');
      drawer.setAttribute('aria-hidden', 'true');
      backdrop.style.opacity = '0';
      panel.style.transform = 'translateY(-100%)';
      document.body.style.overflow = '';
    }
    document.querySelectorAll('[data-search-open]').forEach(b => b.addEventListener('click', open));
    document.querySelectorAll('[data-search-close]').forEach(b => b.addEventListener('click', close));
    backdrop.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  function bindStickyHeader(){
    const wrap = document.getElementById('site-header-wrap');
    if (!wrap) return;
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      wrap.classList.toggle('is-floating', y > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function inject(){
    document.querySelectorAll('[data-release-header]').forEach(el => el.outerHTML = header);
    document.querySelectorAll('[data-release-footer]').forEach(el => el.outerHTML = footer);
    document.body.insertAdjacentHTML('beforeend', searchDrawer);
    bindSearch();
    bindStickyHeader();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
  else inject();
})();
