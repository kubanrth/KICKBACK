// KICKBACK – shared header + footer injection
(function(){
  const scripts = document.querySelectorAll('script[src*="partials.js"]');
  const myScript = scripts[scripts.length - 1];
  const src = myScript.getAttribute('src');
  const base = src.replace(/assets\/partials\.js$/, '');
  const R = (p) => base + p;

  const header = `
<div class="bg-black text-white">
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 h-9 flex items-center justify-center text-[11px] font-medium tracking-wide2 uppercase">
    <div class="text-center">Darmowa dostawa od 300 zł · Sprawdź nowości w sklepie</div>
  </div>
</div>
<header class="bg-white border-b hairline onlight relative z-40">
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 h-[80px] grid grid-cols-3 items-center">
    <nav class="flex items-center gap-5 text-[12px] tracking-wide2 uppercase text-black/80">
      <a href="${R('pages/search.html')}" class="hover:text-[var(--accent)] inline-flex items-center gap-2 h-[80px]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        Szukaj
      </a>
    </nav>
    <a href="${R('index.html')}" class="justify-self-center kb-logo">kickback</a>
    <nav class="justify-self-end flex items-center gap-5 text-[12px] tracking-wide2 uppercase text-black/80">
      <a href="${R('pages/login.html')}" class="hover:text-[var(--accent)]" aria-label="Konto"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6"/></svg></a>
      <a href="#" class="hover:text-[var(--accent)] relative" aria-label="Lista życzeń"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg><span class="absolute -top-2 -right-2 inline-flex items-center justify-center min-w-[16px] h-4 text-[9px] rounded-full bg-black text-white px-1">0</span></a>
      <a href="${R('pages/cart.html')}" class="hover:text-[var(--accent)] relative" aria-label="Koszyk"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 7h14l-1.5 12a2 2 0 0 1-2 1.7H8.5a2 2 0 0 1-2-1.7Z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/></svg><span class="absolute -top-2 -right-2 inline-flex items-center justify-center min-w-[16px] h-4 text-[9px] rounded-full bg-black text-white px-1">0</span></a>
    </nav>
  </div>
  <!-- secondary nav row, kickback.pl style -->
  <div class="border-t hairline">
    <nav class="mx-auto max-w-[1600px] px-6 md:px-10 h-12 flex items-center justify-center gap-8 text-[12px] tracking-wide2 uppercase text-black">
      <div class="has-mega">
        <a href="${R('collections/all.html')}" class="hover:text-[var(--accent)] inline-flex items-center gap-2 h-12">⚽ Kluby <span class="caret">▾</span></a>
        <div class="mega rounded-b-[2px] min-w-[280px]">
          <div class="px-6 py-6">
            <ul class="space-y-0.5">
              <li><a href="${R('collections/jackets-coats.html')}" class="mega-link">FC Barcelona</a></li>
              <li><a href="${R('collections/jackets-coats.html')}" class="mega-link">Real Madrid</a></li>
              <li><a href="${R('collections/jackets-coats.html')}" class="mega-link">FC Bayern Munich</a></li>
              <li><a href="${R('collections/jackets-coats.html')}" class="mega-link">Manchester United</a></li>
              <li><a href="${R('collections/jackets-coats.html')}" class="mega-link">Liverpool</a></li>
              <li><a href="${R('collections/jackets-coats.html')}" class="mega-link">PSG</a></li>
              <li><a href="${R('collections/jackets-coats.html')}" class="mega-link">Juventus</a></li>
              <li><a href="${R('collections/jackets-coats.html')}" class="mega-link">Arsenal</a></li>
              <li><a href="${R('collections/jackets-coats.html')}" class="mega-link">Chelsea</a></li>
              <li><a href="${R('collections/all.html')}" class="mega-link font-semibold text-[var(--accent)]">Zobacz wszystkie kluby →</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="has-mega">
        <a href="${R('collections/best-sellers.html')}" class="hover:text-[var(--accent)] inline-flex items-center gap-2 h-12">🇪🇺 Reprezentacje <span class="caret">▾</span></a>
        <div class="mega rounded-b-[2px] min-w-[260px]">
          <div class="px-6 py-6">
            <ul class="space-y-0.5">
              <li><a href="${R('collections/best-sellers.html')}" class="mega-link">Brazylia</a></li>
              <li><a href="${R('collections/best-sellers.html')}" class="mega-link">Argentyna</a></li>
              <li><a href="${R('collections/best-sellers.html')}" class="mega-link">Włochy</a></li>
              <li><a href="${R('collections/best-sellers.html')}" class="mega-link">Francja</a></li>
              <li><a href="${R('collections/best-sellers.html')}" class="mega-link">Hiszpania</a></li>
              <li><a href="${R('collections/best-sellers.html')}" class="mega-link">Niemcy</a></li>
              <li><a href="${R('collections/best-sellers.html')}" class="mega-link">Polska</a></li>
              <li><a href="${R('collections/best-sellers.html')}" class="mega-link">Anglia</a></li>
            </ul>
          </div>
        </div>
      </div>
      <a href="${R('collections/jackets-coats.html')}" class="hover:text-[var(--accent)] inline-flex items-center h-12">Kurtki i Bluzy</a>
      <a href="${R('collections/basics.html')}" class="hover:text-[var(--accent)] inline-flex items-center h-12">Karty piłkarskie</a>
      <a href="${R('collections/new-collection.html')}" class="hover:text-[var(--accent)] inline-flex items-center gap-2 h-12">
        <span class="inline-block w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse"></span>
        Mystery Box
      </a>
      <a href="${R('pages/about-us.html')}" class="hover:text-[var(--accent)] inline-flex items-center h-12">O nas</a>
      <a href="${R('pages/contact.html')}" class="hover:text-[var(--accent)] inline-flex items-center h-12">Kontakt</a>
    </nav>
  </div>
</header>`;

  const footer = `
<footer class="bg-black text-white mt-0">
  <div class="border-b border-white/10">
    <a href="${R('pages/faq.html')}" class="block text-center py-6 text-[11px] tracking-wide2 uppercase hover:text-[var(--yellow)] transition">FAQ — często zadawane pytania</a>
  </div>
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 pt-16 pb-12 grid grid-cols-1 md:grid-cols-4 gap-10">
    <div>
      <div class="kb-logo bg-white text-black mb-5">kickback</div>
      <p class="text-[12px] text-white/55 leading-[1.7] max-w-xs">Vintage football jerseys, kolekcjonerskie karty piłkarskie i Mystery Box. Pasja dla pasjonatów.</p>
    </div>
    <div>
      <div class="text-[11px] tracking-wide2 uppercase text-white/45 mb-4">Poznaj Kickback</div>
      <ul class="space-y-2.5 text-[13px] text-white/85">
        <li><a href="${R('pages/about-us.html')}" class="hover:text-[var(--yellow)]">O nas</a></li>
        <li><a href="${R('pages/contact.html')}" class="hover:text-[var(--yellow)]">Kontakt</a></li>
        <li><a href="${R('pages/store-locator.html')}" class="hover:text-[var(--yellow)]">Pop-up Store</a></li>
        <li><a href="${R('blogs/news.html')}" class="hover:text-[var(--yellow)]">Blog</a></li>
      </ul>
    </div>
    <div>
      <div class="text-[11px] tracking-wide2 uppercase text-white/45 mb-4">Obsługa Zamówień</div>
      <ul class="space-y-2.5 text-[13px] text-white/85">
        <li><a href="${R('pages/faq.html')}" class="hover:text-[var(--yellow)]">FAQ</a></li>
        <li><a href="${R('pages/privacy.html')}" class="hover:text-[var(--yellow)]">Polityka prywatności</a></li>
        <li><a href="${R('pages/terms.html')}" class="hover:text-[var(--yellow)]">Regulamin</a></li>
        <li><a href="${R('pages/size-guide.html')}" class="hover:text-[var(--yellow)]">Tabela rozmiarów</a></li>
      </ul>
    </div>
    <div>
      <div class="text-[11px] tracking-wide2 uppercase text-white/45 mb-4">Newsletter</div>
      <p class="text-[12px] text-white/65 mb-4">Bądź na bieżąco z nowościami i ekskluzywnymi dropami.</p>
      <form class="flex items-center bg-white rounded-full pl-4 pr-1.5 h-11" onsubmit="event.preventDefault()">
        <input type="email" placeholder="Twój email" class="flex-1 bg-transparent text-black placeholder:text-black/45 text-[13px] outline-none"/>
        <button class="h-9 px-5 rounded-full bg-[var(--accent)] text-white text-[10px] tracking-wide2 uppercase font-semibold">Zapisz</button>
      </form>
      <div class="mt-6 flex items-center gap-3 text-white/80">
        <a href="#" aria-label="Instagram" class="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-[var(--yellow)] hover:text-black hover:border-transparent transition"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg></a>
        <a href="#" aria-label="TikTok" class="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-[var(--yellow)] hover:text-black hover:border-transparent transition"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 3v11a4 4 0 1 1-4-4"/><path d="M15 3a5 5 0 0 0 5 5"/></svg></a>
        <a href="#" aria-label="YouTube" class="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-[var(--yellow)] hover:text-black hover:border-transparent transition"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3Z" fill="currentColor"/></svg></a>
      </div>
    </div>
  </div>
  <div class="border-t border-white/10">
    <div class="mx-auto max-w-[1600px] px-6 md:px-10 py-5 text-[11px] text-white/45 text-center">
      © Kickback 2026. All rights reserved.
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
