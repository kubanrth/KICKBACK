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
<div id="site-announcement" class="bg-black text-white text-[11px] tracking-wide2 uppercase relative z-40">
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 h-9 flex items-center justify-between gap-6">
    <a href="${R('pages/store-locator.html')}" class="hidden md:inline-flex items-center gap-2 hover:text-white/70"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-7 8-13a8 8 0 0 0-16 0c0 6 8 13 8 13z"/><circle cx="12" cy="9" r="2.6"/></svg>Nasze sklepy</a>
    <div class="flex-1 text-center"><span class="inline-flex items-center gap-2"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 7h13v9H3zM16 10h4l1 3v3h-5z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>Darmowa dostawa od 500 zł</span></div>
    <div class="hidden md:inline-flex items-center gap-2"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 8h14l-1.5 9a2 2 0 0 1-2 1.6H8.5a2 2 0 0 1-2-1.6Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg><span>Nowości</span><span class="text-white/40">·</span><span>kończą się za</span><span class="digit">133<span class="text-white/55">D</span></span><span class="text-white/40">|</span><span class="digit">10<span class="text-white/55">H</span></span><span class="text-white/40">|</span><span class="digit">05<span class="text-white/55">M</span></span></div>
  </div>
</div>
<div id="site-header-wrap" class="sticky top-0 z-50 transition-all duration-300 ease-out">
<header id="site-header" class="bg-white border-b hairline onlight relative transition-all duration-300 ease-out">
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 h-[72px] grid grid-cols-3 items-center transition-all duration-300 ease-out">
    <nav class="flex items-center gap-8 text-[12px] tracking-wide2 uppercase text-black/80">
      <div class="has-mega">
        <a href="${R('collections/all.html')}" class="hover:text-black inline-flex items-center h-[72px]">Shop <svg class="caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></a>
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
                <li><a href="${R('collections/all.html')}" class="mega-link">Koszulki RETRO</a></li>
                <li><a href="${R('collections/tops.html')}" class="mega-link">Kluby</a></li>
                <li><a href="${R('collections/best-sellers.html')}" class="mega-link">Reprezentacje</a></li>
                <li><a href="${R('collections/basics.html')}" class="mega-link">Karty piłkarskie</a></li>
                <li><a href="${R('collections/jackets-coats.html')}" class="mega-link">Bluzy i kurtki</a></li>
                <li><a href="${R('collections/accessories.html')}" class="mega-link">Akcesoria</a></li>
              </ul>
            </div>
            <a href="${R('collections/all.html')}" class="col-span-3 group">
              <div class="mega-card tile">
                <img src="${R('brand_assets/photos/banner-kluby.webp')}" alt="" class="absolute inset-0 h-full w-full object-cover"/>
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/0"></div>
                <div class="absolute left-5 top-5 text-[10px] tracking-wide2 uppercase text-white/85">Hit sezonu</div>
                <div class="absolute left-5 bottom-5 text-white font-display text-[22px] leading-tight normal-case">Kluby</div>
              </div>
            </a>
            <a href="${R('collections/new-collection.html')}" class="col-span-3 group">
              <div class="mega-card tile">
                <img src="${R('brand_assets/photos/banner-junior-2.webp')}" alt="" class="absolute inset-0 h-full w-full object-cover"/>
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/0"></div>
                <div class="absolute left-5 top-5 text-[10px] tracking-wide2 uppercase text-white/85">Sezon 25/26</div>
                <div class="absolute left-5 bottom-5 text-white font-display text-[22px] leading-tight normal-case">Od najmłodszych lat</div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="has-mega">
        <a href="#" class="hover:text-black inline-flex items-center h-[72px]">Pages <svg class="caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></a>
        <div class="mega rounded-b-[2px] min-w-[220px]">
          <div class="px-6 py-6">
            <ul class="space-y-0.5">
              <li><a href="${R('pages/faq.html')}" class="mega-link">FAQ</a></li>
              <li><a href="${R('blogs/news.html')}" class="mega-link">Blog</a></li>
              <li><a href="${R('pages/about-us.html')}" class="mega-link">O nas</a></li>
            </ul>
          </div>
        </div>
      </div>
      <a href="${R('pages/contact.html')}" class="hover:text-black inline-flex items-center h-[72px]">Kontakt</a>
    </nav>
    <a href="${R('index.html')}" class="justify-self-center inline-flex items-center" aria-label="Kickback"><img src="${R('brand_assets/kickback_logo.svg')}" alt="Kickback" class="h-7 md:h-8 w-auto"/></a>
    <nav class="justify-self-end flex items-center gap-6 text-[12px] tracking-wide2 uppercase text-black/80">
      <a href="#" class="hover:text-black inline-flex items-center gap-1.5">United states <svg class="caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></a>
      <button type="button" data-search-open class="hover:text-black" aria-label="Search"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg></button>
      <a href="${R('pages/login.html')}" class="hover:text-black" aria-label="Account"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6"/></svg></a>
      <a href="${R('pages/cart.html')}" data-cart-open class="hover:text-black inline-flex items-center gap-1.5" aria-label="Cart">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 7h14l-1.5 12a2 2 0 0 1-2 1.7H8.5a2 2 0 0 1-2-1.7Z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/></svg>
        <span data-cart-badge class="inline-flex items-center justify-center min-w-[18px] h-[18px] text-[10px] rounded-full bg-black text-white px-1">0</span>
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
        <h3 class="mt-3 text-[18px] leading-[1.4] max-w-[420px]">Zapisz się do naszego newslettera i otrzymaj 10% na swoje pierwsze zamówienie</h3>
        <form class="mt-5 flex items-center bg-white rounded-full pl-5 pr-1.5 h-12 max-w-md" onsubmit="event.preventDefault()">
          <input type="email" placeholder="Adres email" class="flex-1 bg-transparent text-black placeholder:text-black/45 text-[13px] outline-none"/>
          <button class="h-9 px-5 rounded-full bg-black text-white text-[11px] tracking-wide2 uppercase font-medium">Zapisz się</button>
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
          <li><a href="${R('pages/about-us.html')}" class="hover:text-white">O nas</a></li>
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

  const quickviewDrawer = `
<div id="qv-drawer" class="fixed inset-0 z-[100] pointer-events-none" aria-hidden="true">
  <div data-qv-backdrop class="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300"></div>
  <aside data-qv-panel class="absolute top-0 right-0 h-full w-full max-w-[480px] bg-white translate-x-full transition-transform duration-400 ease-out flex flex-col shadow-[0_0_60px_-20px_rgba(0,0,0,0.25)]" role="dialog" aria-label="Choose options">
    <header class="flex items-center justify-between px-6 md:px-8 h-[72px] border-b hairline shrink-0">
      <div class="text-[15px] font-medium">Choose options</div>
      <button type="button" data-qv-close aria-label="Zamknij" class="h-10 w-10 rounded-full flex items-center justify-center hover:bg-black/5 transition"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    </header>
    <div data-qv-body class="flex-1 overflow-y-auto"></div>
  </aside>
</div>`;

  const cartDrawer = `
<div id="cart-drawer" class="fixed inset-0 z-[100] pointer-events-none" aria-hidden="true">
  <div data-cart-backdrop class="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300"></div>
  <aside data-cart-panel class="absolute top-0 right-0 h-full w-full max-w-[440px] bg-white translate-x-full transition-transform duration-400 ease-out flex flex-col shadow-[0_0_60px_-20px_rgba(0,0,0,0.25)]" role="dialog" aria-label="Shopping cart">
    <header class="flex items-center justify-between px-6 md:px-8 h-[72px] border-b hairline shrink-0">
      <div class="text-[12px] tracking-wide2 uppercase">Twój koszyk <span data-cart-header-count class="text-black/55 ml-1">0</span></div>
      <button type="button" data-cart-close aria-label="Zamknij" class="h-10 w-10 rounded-full flex items-center justify-center hover:bg-black/5 transition"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    </header>
    <div data-cart-body class="flex-1 overflow-y-auto"></div>
    <div data-cart-foot class="shrink-0"></div>
  </aside>
</div>`;

  const sizeGuideModal = `
<div id="size-guide-modal" class="fixed inset-0 z-[110] pointer-events-none" aria-hidden="true">
  <div data-sg-backdrop class="absolute inset-0 bg-black/45 opacity-0 transition-opacity duration-300"></div>
  <div class="absolute inset-0 flex items-center justify-center p-4 md:p-8">
    <div data-sg-content class="relative bg-white max-w-[760px] w-full max-h-[88vh] overflow-y-auto rounded-[3px] shadow-[0_20px_60px_-20px_rgba(0,0,0,.35)] translate-y-3 opacity-0 transition-all duration-300 ease-out">
      <button type="button" data-sg-close aria-label="Zamknij" class="sticky float-right top-5 right-5 mt-5 mr-5 h-10 w-10 rounded-full flex items-center justify-center hover:bg-black/5 transition z-10"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      <div class="px-8 md:px-12 py-10 md:py-14">
        <h2 class="h-editorial text-[28px] md:text-[40px] leading-[1.05]">Tabela <em class="font-wonk font-normal">rozmiarów</em></h2>
        <p class="mt-4 text-[14px] text-black/65 leading-[1.7] max-w-[520px]">Aby dobrać najlepszy rozmiar, zmierz się zgodnie z wymiarami w tabeli poniżej przed zakupem.</p>
        <div class="mt-8 overflow-x-auto">
          <table class="w-full text-[13px] border-collapse">
            <thead>
              <tr class="border-b hairline">
                <th class="text-left py-3 px-3 text-[11px] tracking-wide2 uppercase text-black/60">Rozmiar</th>
                <th class="text-left py-3 px-3 text-[11px] tracking-wide2 uppercase text-black/60">Klatka (cm)</th>
                <th class="text-left py-3 px-3 text-[11px] tracking-wide2 uppercase text-black/60">Talia (cm)</th>
                <th class="text-left py-3 px-3 text-[11px] tracking-wide2 uppercase text-black/60">Biodra (cm)</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b hairline"><td class="py-3 px-3 font-medium">XS</td><td class="py-3 px-3 text-black/75">78–84</td><td class="py-3 px-3 text-black/75">60–66</td><td class="py-3 px-3 text-black/75">86–92</td></tr>
              <tr class="border-b hairline"><td class="py-3 px-3 font-medium">S</td><td class="py-3 px-3 text-black/75">85–91</td><td class="py-3 px-3 text-black/75">67–73</td><td class="py-3 px-3 text-black/75">93–99</td></tr>
              <tr class="border-b hairline"><td class="py-3 px-3 font-medium">M</td><td class="py-3 px-3 text-black/75">92–98</td><td class="py-3 px-3 text-black/75">74–80</td><td class="py-3 px-3 text-black/75">100–106</td></tr>
              <tr class="border-b hairline"><td class="py-3 px-3 font-medium">L</td><td class="py-3 px-3 text-black/75">99–105</td><td class="py-3 px-3 text-black/75">81–87</td><td class="py-3 px-3 text-black/75">107–113</td></tr>
              <tr class="border-b hairline"><td class="py-3 px-3 font-medium">XL</td><td class="py-3 px-3 text-black/75">106–112</td><td class="py-3 px-3 text-black/75">88–94</td><td class="py-3 px-3 text-black/75">114–120</td></tr>
              <tr><td class="py-3 px-3 font-medium">XXL</td><td class="py-3 px-3 text-black/75">113–119</td><td class="py-3 px-3 text-black/75">95–101</td><td class="py-3 px-3 text-black/75">121–127</td></tr>
            </tbody>
          </table>
        </div>
        <p class="mt-6 text-[12px] text-black/55 leading-[1.6]">Wymiary podane w tabeli odpowiadają wymiarom ciała, nie ubrania. Jeśli wahasz się między rozmiarami, polecamy wybrać większy dla luźniejszego kroju.</p>
      </div>
    </div>
  </div>
</div>`;

  const CART_KEY = 'release_cart_v1';
  const CartState = {
    read(){ try { const v = JSON.parse(localStorage.getItem(CART_KEY)); return v && Array.isArray(v.items) ? v : { items: [] }; } catch(e){ return { items: [] }; } },
    write(s){ localStorage.setItem(CART_KEY, JSON.stringify(s)); document.dispatchEvent(new CustomEvent('cart:change')); },
    keyOf(item){ return [item.id, item.size || '', item.color || ''].join('|'); },
    add(item){
      const s = this.read();
      const k = this.keyOf(item);
      const found = s.items.find(i => this.keyOf(i) === k);
      if (found) found.qty += item.qty;
      else s.items.push(item);
      this.write(s);
    },
    setQty(idx, qty){
      const s = this.read();
      if (!s.items[idx]) return;
      if (qty <= 0) s.items.splice(idx, 1);
      else s.items[idx].qty = qty;
      this.write(s);
    },
    remove(idx){ const s = this.read(); s.items.splice(idx, 1); this.write(s); },
    clear(){ this.write({ items: [] }); },
    count(){ return this.read().items.reduce((n, i) => n + i.qty, 0); },
    subtotal(){ return this.read().items.reduce((n, i) => n + i.price * i.qty, 0); }
  };
  // expose so PDP / cart page can use the same source of truth
  window.ReleaseCart = CartState;

  function formatPLN(n){ return n.toFixed(2).replace('.', ',') + ' zł'; }

  function renderCartDrawer(){
    const drawer = document.getElementById('cart-drawer');
    if (!drawer) return;
    const body = drawer.querySelector('[data-cart-body]');
    const foot = drawer.querySelector('[data-cart-foot]');
    const headerCount = drawer.querySelector('[data-cart-header-count]');
    const s = CartState.read();
    headerCount.textContent = CartState.count();
    if (s.items.length === 0){
      body.innerHTML = `
        <div class="h-full flex flex-col items-center justify-center text-center px-8 py-20">
          <h2 class="h-editorial text-[44px] md:text-[56px] leading-[0.95]">It's a little<br><em class="font-wonk font-normal">empty</em> here</h2>
          <p class="mt-6 text-[13px] text-black/60">Your cart is currently empty</p>
          <a href="${R('collections/all.html')}" class="mt-8 btn-ghost-dark h-12 px-10 rounded-full text-[11px] tracking-wide2 uppercase font-medium">Start shopping</a>
        </div>`;
      foot.innerHTML = '';
      return;
    }
    body.innerHTML = s.items.map((item, i) => `
      <article class="flex gap-4 px-6 md:px-8 py-5 border-b hairline">
        <a href="${item.url || '#'}" class="w-[88px] h-[110px] shrink-0 rounded-[2px] overflow-hidden bg-[var(--tile)] block">
          ${item.image ? '<img src="' + item.image + '" alt="" class="w-full h-full object-cover">' : ''}
        </a>
        <div class="flex-1 min-w-0">
          <h3 class="pc-name truncate">${item.name}</h3>
          ${(item.size || item.color) ? '<div class="text-[10px] tracking-wide2 uppercase text-black/55 mt-1">' + [item.size, item.color].filter(Boolean).join(' / ') + '</div>' : ''}
          <div class="flex items-center justify-between mt-4">
            <div class="flex items-center border hairline rounded-full h-9 px-2 text-[13px]">
              <button type="button" data-cart-qty="${i}" data-delta="-1" aria-label="Zmniejsz" class="w-6 text-black/55 hover:text-black">−</button>
              <span class="w-7 text-center tabular-nums">${item.qty}</span>
              <button type="button" data-cart-qty="${i}" data-delta="1" aria-label="Zwiększ" class="w-6 text-black/55 hover:text-black">+</button>
            </div>
            <div class="text-[13px] tabular-nums">${formatPLN(item.price * item.qty)}</div>
          </div>
        </div>
        <button type="button" data-cart-remove="${i}" aria-label="Usuń" class="text-black/40 hover:text-black self-start mt-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      </article>`).join('');
    foot.innerHTML = `
      <div class="border-t hairline px-6 md:px-8 py-6">
        <div class="flex items-center justify-between mb-4">
          <span class="text-[11px] tracking-wide2 uppercase text-black/55">Suma</span>
          <span class="text-[20px] tabular-nums">${formatPLN(CartState.subtotal())}</span>
        </div>
        <div class="text-[10px] tracking-wide2 uppercase text-black/45 mb-5">Wysyłka liczona przy kasie</div>
        <a href="#" class="block text-center h-12 leading-[3rem] rounded-full bg-black text-white text-[11px] tracking-wide2 uppercase font-medium pill pill-dark">Przejdź do kasy</a>
        <a href="${R('pages/cart.html')}" class="block text-center mt-3 text-[11px] tracking-wide2 uppercase text-black/60 hover:text-black">Zobacz koszyk</a>
      </div>`;
  }

  function bindCart(){
    const drawer = document.getElementById('cart-drawer');
    if (!drawer) return;
    const panel = drawer.querySelector('[data-cart-panel]');
    const backdrop = drawer.querySelector('[data-cart-backdrop]');
    let lastFocus = null;
    function open(){
      lastFocus = document.activeElement;
      drawer.classList.remove('pointer-events-none');
      drawer.setAttribute('aria-hidden', 'false');
      backdrop.style.opacity = '1';
      panel.style.transform = 'translateX(0)';
      document.body.style.overflow = 'hidden';
      const closeBtn = drawer.querySelector('[data-cart-close]');
      setTimeout(() => closeBtn && closeBtn.focus(), 80);
    }
    function close(){
      drawer.classList.add('pointer-events-none');
      drawer.setAttribute('aria-hidden', 'true');
      backdrop.style.opacity = '0';
      panel.style.transform = 'translateX(100%)';
      document.body.style.overflow = '';
      if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    }
    window.ReleaseCart.open = open;
    window.ReleaseCart.close = close;
    document.querySelectorAll('[data-cart-open]').forEach(b => {
      b.addEventListener('click', e => { e.preventDefault(); open(); });
    });
    drawer.querySelectorAll('[data-cart-close]').forEach(b => b.addEventListener('click', close));
    backdrop.addEventListener('click', close);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && drawer.getAttribute('aria-hidden') === 'false') close();
    });
    // Event delegation for qty/remove
    drawer.addEventListener('click', e => {
      const qtyBtn = e.target.closest('[data-cart-qty]');
      const rmBtn = e.target.closest('[data-cart-remove]');
      if (qtyBtn){
        const i = +qtyBtn.dataset.cartQty;
        const d = +qtyBtn.dataset.delta;
        const s = CartState.read();
        if (s.items[i]) CartState.setQty(i, s.items[i].qty + d);
      } else if (rmBtn){
        CartState.remove(+rmBtn.dataset.cartRemove);
      }
    });
    document.addEventListener('cart:change', renderCartDrawer);
    renderCartDrawer();
  }

  function bindProductPage(){
    const atc = document.getElementById('main-add-to-cart');
    if (!atc) return; // not a PDP
    const nameEl = document.querySelector('h1');
    const name = nameEl ? nameEl.textContent.trim() : 'Product';
    const priceEl = document.querySelector('.product-price') || document.querySelector('section .text-\\[22px\\]');
    const priceText = priceEl ? priceEl.textContent.trim() : '';
    const price = parseFloat(priceText.replace(/[^\d.,-]/g, '').replace(/\.(?=\d{3})/g, '').replace(',', '.')) || 0;
    const imgEl = document.querySelector('section img');
    const image = imgEl ? imgEl.src : '';
    const id = location.pathname.split('/').pop().replace('.html', '') || name.toLowerCase().replace(/\s+/g, '-');
    const url = location.pathname;

    const variantContainers = document.querySelectorAll('section div.mt-3.flex.items-center.gap-2');
    let sizeContainer = null, colorContainer = null;
    variantContainers.forEach(c => {
      if (c.querySelector('button')) sizeContainer = sizeContainer || c;
      else if (c.querySelector('span')) colorContainer = colorContainer || c;
    });

    function findLabel(prefix){
      const candidates = document.querySelectorAll('section .text-\\[11px\\].tracking-wide2.uppercase');
      for (const el of candidates){
        if (el.textContent.trim().toLowerCase().startsWith(prefix.toLowerCase())) return el.querySelector('.text-black\\/60');
      }
      return null;
    }

    let selectedSize = null;
    const sizeLabel = findLabel('Size');
    if (sizeContainer){
      const btns = sizeContainer.querySelectorAll('button');
      selectedSize = sizeLabel ? sizeLabel.textContent.trim() : (btns[0] && btns[0].textContent.trim());
      btns.forEach(b => {
        if (b.textContent.trim() === selectedSize){ b.classList.remove('hairline'); b.classList.add('border-black'); }
        b.addEventListener('click', () => {
          btns.forEach(x => { x.classList.remove('border-black'); x.classList.add('hairline'); });
          b.classList.remove('hairline'); b.classList.add('border-black');
          selectedSize = b.textContent.trim();
          if (sizeLabel) sizeLabel.textContent = selectedSize;
        });
      });
    }

    let selectedColor = null;
    const colorLabel = findLabel('Color');
    if (colorContainer){
      selectedColor = colorLabel ? colorLabel.textContent.trim() : null;
      const spans = colorContainer.querySelectorAll('span');
      spans.forEach((sp, i) => {
        sp.style.cursor = 'pointer';
        sp.setAttribute('role', 'button');
        sp.setAttribute('tabindex', '0');
        sp.style.transition = 'box-shadow .2s ease, transform .2s ease';
        if (i === 0) sp.style.boxShadow = '0 0 0 2px #fff, 0 0 0 3.5px #000';
        sp.addEventListener('click', () => {
          spans.forEach(x => { x.style.boxShadow = 'none'; });
          sp.style.boxShadow = '0 0 0 2px #fff, 0 0 0 3.5px #000';
        });
      });
    }

    const qtyInput = document.querySelector('section input.w-8.text-center');
    if (qtyInput && qtyInput.parentElement){
      const [minusBtn, , plusBtn] = qtyInput.parentElement.children;
      if (minusBtn) minusBtn.addEventListener('click', e => { e.preventDefault(); qtyInput.value = Math.max(1, (parseInt(qtyInput.value) || 1) - 1); });
      if (plusBtn) plusBtn.addEventListener('click', e => { e.preventDefault(); qtyInput.value = Math.min(99, (parseInt(qtyInput.value) || 1) + 1); });
    }

    function addToCart(){
      const qty = parseInt(qtyInput && qtyInput.value) || 1;
      CartState.add({ id, name, price, image, url, size: selectedSize, color: selectedColor, qty });
      if (window.ReleaseCart && window.ReleaseCart.open) window.ReleaseCart.open();
    }
    atc.addEventListener('click', e => { e.preventDefault(); addToCart(); });
    const buyNow = atc.parentElement && atc.parentElement.nextElementSibling;
    if (buyNow && /buy.it.now/i.test(buyNow.textContent || '')){
      buyNow.addEventListener('click', e => { e.preventDefault(); addToCart(); });
    }
  }

  function updateCartBadges(){
    const n = CartState.count();
    document.querySelectorAll('[data-cart-badge]').forEach(el => {
      el.textContent = n;
      el.classList.toggle('opacity-0', n === 0);
    });
  }
  document.addEventListener('cart:change', updateCartBadges);
  // Cross-tab sync
  window.addEventListener('storage', e => {
    if (e.key === CART_KEY) document.dispatchEvent(new CustomEvent('cart:change'));
  });

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
      const rect = wrap.getBoundingClientRect();
      document.documentElement.style.setProperty('--mega-top', rect.bottom + 'px');
    };
    requestAnimationFrame(onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }

  function bindReveal(){
    document.documentElement.classList.add('js');
    // Tag common reveal targets on collection / PDP / related-collection pages
    const targets = new Set([
      ...document.querySelectorAll('main article.group, body > section article.group'),
      ...document.querySelectorAll('article.group'),
      ...document.querySelectorAll('body > section.relative h1, body > section.relative .text-white\\/70'),
      ...document.querySelectorAll('body > section a.group'),
      ...document.querySelectorAll('.h-section')
    ]);
    targets.forEach(el => el.classList.add('js-animation-fade-in'));
    if (!('IntersectionObserver' in window)){
      targets.forEach(el => el.classList.add('animation-init'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries){
        if (e.isIntersecting){
          e.target.classList.add('animation-init');
          io.unobserve(e.target);
        }
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
    targets.forEach(el => io.observe(el));
  }

  function bindQuickview(){
    const drawer = document.getElementById('qv-drawer');
    if (!drawer) return;
    const panel = drawer.querySelector('[data-qv-panel]');
    const backdrop = drawer.querySelector('[data-qv-backdrop]');
    const body = drawer.querySelector('[data-qv-body]');
    let lastFocus = null;
    function open(data){
      lastFocus = document.activeElement;
      const sizes = (data.sizes || 'XS,S,M,L,XL').split(',').map(s => s.trim()).filter(Boolean);
      const priceFmt = data.price ? data.price : '';
      body.innerHTML = `
        <div class="px-6 md:px-8 py-6">
          <div class="tile relative aspect-[4/5] rounded-[2px] overflow-hidden mb-6">
            ${data.image ? '<img src="' + data.image + '" alt="" class="absolute inset-0 h-full w-full object-cover">' : ''}
          </div>
          <h2 class="text-[20px] md:text-[22px] font-medium tracking-tight">${data.name || ''}</h2>
          <div class="mt-2 text-[18px]">${priceFmt}</div>
          <form class="mt-6" data-qv-form>
            <div class="text-[11px] tracking-wide2 uppercase mb-3">Size <span class="text-black/55" data-qv-size-label>XS</span></div>
            <div class="flex flex-wrap items-center gap-2 mb-6">
              ${sizes.map((s, i) => `<button type="button" data-qv-size="${s}" class="h-11 w-12 border ${i===0?'border-black':'hairline'} text-[12px] rounded-[3px] hover:border-black transition">${s}</button>`).join('')}
            </div>
            <button type="submit" class="block w-full h-12 rounded-full bg-black text-white text-[11px] tracking-wide2 uppercase font-medium pill pill-dark">Add to cart</button>
            <a href="${data.url || '#'}" class="block text-center mt-3 h-12 leading-[3rem] rounded-full border hairline text-[11px] tracking-wide2 uppercase font-medium pill">Buy it now</a>
            <a href="${data.url || '#'}" class="block text-center mt-4 text-[11px] tracking-wide2 uppercase link-underline">View full details</a>
          </form>
        </div>`;
      // size selection
      const sizeBtns = body.querySelectorAll('[data-qv-size]');
      const sizeLabel = body.querySelector('[data-qv-size-label]');
      let selectedSize = sizes[0];
      sizeBtns.forEach(b => b.addEventListener('click', () => {
        sizeBtns.forEach(x => { x.classList.remove('border-black'); x.classList.add('hairline'); });
        b.classList.add('border-black'); b.classList.remove('hairline');
        selectedSize = b.getAttribute('data-qv-size');
        if (sizeLabel) sizeLabel.textContent = selectedSize;
      }));
      // add to cart
      const form = body.querySelector('[data-qv-form]');
      form.addEventListener('submit', e => {
        e.preventDefault();
        if (!window.ReleaseCart) return;
        const priceNum = parseFloat((data.price || '0').replace(/[^\d,.-]/g, '').replace(',', '.')) || 0;
        window.ReleaseCart.add({ id: data.id || data.url || data.name, name: data.name, price: priceNum, qty: 1, size: selectedSize, image: data.image, url: data.url });
        close();
        if (window.ReleaseCart.open) setTimeout(() => window.ReleaseCart.open(), 320);
      });
      drawer.classList.remove('pointer-events-none');
      drawer.setAttribute('aria-hidden', 'false');
      backdrop.style.opacity = '1';
      panel.style.transform = 'translateX(0)';
      document.body.style.overflow = 'hidden';
      const closeBtn = drawer.querySelector('[data-qv-close]');
      setTimeout(() => closeBtn && closeBtn.focus(), 80);
    }
    function close(){
      drawer.classList.add('pointer-events-none');
      drawer.setAttribute('aria-hidden', 'true');
      backdrop.style.opacity = '0';
      panel.style.transform = 'translateX(100%)';
      document.body.style.overflow = '';
      if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    }
    drawer.querySelectorAll('[data-qv-close]').forEach(b => b.addEventListener('click', close));
    backdrop.addEventListener('click', close);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && drawer.getAttribute('aria-hidden') === 'false') close();
    });
    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-qv-open]');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      const card = btn.closest('[data-qv-card]') || btn;
      open({
        id: card.getAttribute('data-qv-id'),
        name: card.getAttribute('data-qv-name'),
        price: card.getAttribute('data-qv-price'),
        image: card.getAttribute('data-qv-image'),
        url: card.getAttribute('data-qv-url'),
        sizes: card.getAttribute('data-qv-sizes')
      });
    });
  }

  function bindAuth(){
    const loggedIn = (typeof localStorage !== 'undefined') && localStorage.getItem('demo_auth') === '1';
    if (!loggedIn) return;
    document.querySelectorAll('a[aria-label="Account"]').forEach(a => {
      a.setAttribute('href', R('pages/account/index.html'));
      a.setAttribute('title', 'demo@kickback.pl');
      // small green dot indicator
      if (!a.querySelector('.auth-dot')){
        const dot = document.createElement('span');
        dot.className = 'auth-dot';
        dot.style.cssText = 'position:absolute;top:-2px;right:-2px;width:7px;height:7px;border-radius:99px;background:#00b067;box-shadow:0 0 0 2px #fff';
        a.style.position = 'relative';
        a.appendChild(dot);
      }
    });
  }

  function bindSizeGuide(){
    const root = document.getElementById('size-guide-modal');
    if (!root) return;
    const backdrop = root.querySelector('[data-sg-backdrop]');
    const content = root.querySelector('[data-sg-content]');
    const close = root.querySelector('[data-sg-close]');
    function open(){
      root.classList.remove('pointer-events-none');
      root.setAttribute('aria-hidden', 'false');
      requestAnimationFrame(() => {
        backdrop.style.opacity = '1';
        content.classList.remove('translate-y-3', 'opacity-0');
      });
      document.body.style.overflow = 'hidden';
    }
    function shut(){
      root.setAttribute('aria-hidden', 'true');
      backdrop.style.opacity = '0';
      content.classList.add('translate-y-3', 'opacity-0');
      document.body.style.overflow = '';
      setTimeout(() => root.classList.add('pointer-events-none'), 300);
    }
    backdrop.addEventListener('click', shut);
    close.addEventListener('click', shut);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && root.getAttribute('aria-hidden') === 'false') shut(); });
    document.addEventListener('click', e => {
      const t = e.target.closest('[data-size-guide-open]');
      if (t) { e.preventDefault(); open(); }
    });
    window.openSizeGuide = open;
  }

  function inject(){
    document.querySelectorAll('[data-release-header]').forEach(el => el.outerHTML = header);
    document.querySelectorAll('[data-release-footer]').forEach(el => el.outerHTML = footer);
    document.body.insertAdjacentHTML('beforeend', searchDrawer);
    document.body.insertAdjacentHTML('beforeend', cartDrawer);
    document.body.insertAdjacentHTML('beforeend', quickviewDrawer);
    document.body.insertAdjacentHTML('beforeend', sizeGuideModal);
    bindSearch();
    bindStickyHeader();
    bindReveal();
    bindCart();
    bindQuickview();
    bindProductPage();
    bindAuth();
    bindSizeGuide();
    updateCartBadges();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
  else inject();
})();
