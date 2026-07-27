// Port z partials.js linie 949-1033 (bindQuickview).
// Etap 6: add-to-cart submit -> POST wc-ajax=add_to_cart, fragments refresh, otwarcie cart drawera.

function wcAjaxUrl(action) {
  const base = (window.KB && window.KB.shopUrl) ? window.KB.shopUrl : (window.location.origin + '/');
  const sep = base.indexOf('?') === -1 ? '?' : '&';
  return base + sep + 'wc-ajax=' + encodeURIComponent(action);
}

function applyFragments(fragments) {
  Object.keys(fragments || {}).forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      const tpl = document.createElement('template');
      tpl.innerHTML = fragments[selector];
      const next = tpl.content.firstElementChild;
      if (next && el.parentNode) el.parentNode.replaceChild(next, el);
    });
  });
}

function initQuickviewDrawer() {
  const drawer = document.getElementById('qv-drawer');
  if (!drawer) return;
  const panel = drawer.querySelector('[data-qv-panel]');
  const backdrop = drawer.querySelector('[data-qv-backdrop]');
  const body = drawer.querySelector('[data-qv-body]');
  let lastFocus = null;

  function open(data) {
    lastFocus = document.activeElement;
    const sizes = (data.sizes || '').split(',').map((s) => s.trim()).filter(Boolean);
    const hasSizes = sizes.length > 0;
    const priceFmt = data.price ? data.price : '';
    body.innerHTML = `
      <div class="px-6 md:px-8 py-6">
        <div class="tile relative aspect-[4/5] rounded-[2px] overflow-hidden mb-6">
          ${data.image ? '<img src="' + data.image + '" alt="" class="absolute inset-0 h-full w-full object-cover">' : ''}
        </div>
        <h2 class="text-[20px] md:text-[22px] font-medium tracking-tight">${data.name || ''}</h2>
        <div class="mt-2 text-[18px]">${priceFmt}</div>
        <form class="mt-6" data-qv-form>
          ${hasSizes ? `
          <div class="text-[11px] tracking-wide2 uppercase mb-3">Rozmiar <span class="text-black/55" data-qv-size-label>${sizes[0]}</span></div>
          <div class="flex flex-wrap items-center gap-2 mb-6">
            ${sizes.map((s, i) => `<button type="button" data-qv-size="${s}" class="h-11 w-12 border ${i === 0 ? 'border-black' : 'hairline'} text-[12px] rounded-[3px] hover:border-black transition">${s}</button>`).join('')}
          </div>` : ''}
          <button type="submit" class="block w-full h-12 rounded-full bg-black text-white text-[11px] tracking-wide2 uppercase font-medium pill pill-dark">Dodaj do koszyka</button>
          <button type="submit" data-qv-buy-now class="block w-full mt-3 h-12 rounded-full border hairline text-[11px] tracking-wide2 uppercase font-medium pill pill-solid">Kup teraz</button>
          <a href="${data.url || '#'}" class="block text-center mt-4 text-[11px] tracking-wide2 uppercase link-underline">Zobacz szczegóły</a>
        </form>
      </div>`;

    // size selection
    const sizeBtns = body.querySelectorAll('[data-qv-size]');
    const sizeLabel = body.querySelector('[data-qv-size-label]');
    let selectedSize = sizes[0];
    sizeBtns.forEach((b) => b.addEventListener('click', () => {
      sizeBtns.forEach((x) => { x.classList.remove('border-black'); x.classList.add('hairline'); });
      b.classList.add('border-black'); b.classList.remove('hairline');
      selectedSize = b.getAttribute('data-qv-size');
      if (sizeLabel) sizeLabel.textContent = selectedSize;
    }));

    // add to cart — real WC AJAX (etap 6). Submitter rozróżnia ATC vs Kup teraz.
    const form = body.querySelector('[data-qv-form]');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!data.id) return;
      const submitter = e.submitter || form.querySelector('button[type="submit"]');
      const isBuyNow = !!(submitter && submitter.hasAttribute('data-qv-buy-now'));
      const params = new URLSearchParams();
      params.append('product_id', String(data.id));
      params.append('quantity', '1');
      if (submitter) {
        submitter.disabled = true;
        submitter.dataset.kbOrig = submitter.textContent;
        submitter.textContent = isBuyNow ? 'Przekierowuję…' : 'Dodaję…';
      }
      fetch(wcAjaxUrl('add_to_cart'), {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      })
        .then((r) => {
          if (!r.ok) {
            console.error('❌ AJAX status error:', r.status, r.statusText);
            throw new Error(`HTTP ${r.status}`);
          }
          return r.json();
        })
        .then((json) => {
          console.log('✅ AJAX success:', json);
          if (json && json.error) {
            console.error('❌ Backend error:', json.error);
            // np. variation required — fallback do permalink
            if (data.url) window.location.href = data.url;
            return;
          }
          if (json && json.fragments) {
            applyFragments(json.fragments);
            document.body.dispatchEvent(new CustomEvent('added_to_cart', { detail: { fragments: json.fragments } }));
          }
          if (window.jQuery) window.jQuery(document.body).trigger('added_to_cart');
          // Schów page loader (został pokazany przez page-loader.js na submit event)
          const pageLoader = document.querySelector('[data-kb-loader]');
          if (pageLoader) {
            pageLoader.classList.remove('is-active');
          }

          // Kup teraz → checkout. ATC → cart drawer.
          if (isBuyNow) {
            const checkout = (window.KB && window.KB.checkoutUrl) || '/zamowienie/';
            window.location.href = checkout;
            return;
          }
          close();
          if (window.kbCartDrawer && typeof window.kbCartDrawer.open === 'function') {
            setTimeout(() => window.kbCartDrawer.open(), 200);
          }
        })
        .catch((err) => {
          console.error('❌ AJAX fail:', err.message);
          if (data.url) window.location.href = data.url;
        })
        .finally(() => {
          if (submitter && !isBuyNow) {
            submitter.disabled = false;
            if (submitter.dataset.kbOrig) submitter.textContent = submitter.dataset.kbOrig;
          }
        });
    });

    drawer.classList.remove('pointer-events-none');
    drawer.setAttribute('aria-hidden', 'false');
    backdrop.style.opacity = '1';
    panel.style.transform = 'translateX(0)';
    document.body.style.overflow = 'hidden';
    const closeBtn = drawer.querySelector('[data-qv-close]');
    setTimeout(() => closeBtn && closeBtn.focus(), 80);
  }

  function close() {
    drawer.classList.add('pointer-events-none');
    drawer.setAttribute('aria-hidden', 'true');
    backdrop.style.opacity = '0';
    panel.style.transform = 'translateX(100%)';
    document.body.style.overflow = '';
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  drawer.querySelectorAll('[data-qv-close]').forEach((b) => b.addEventListener('click', close));
  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.getAttribute('aria-hidden') === 'false') close();
  });
  document.addEventListener('click', (e) => {
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
      sizes: card.getAttribute('data-qv-sizes'),
    });
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState !== 'loading') initQuickviewDrawer();
  else document.addEventListener('DOMContentLoaded', initQuickviewDrawer);
}
