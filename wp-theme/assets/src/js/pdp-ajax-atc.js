// AJAX wrapper na formularz Add-to-Cart na single product (PDP).
// Cel: po dodaniu nie odświeża strony, tylko otwiera cart drawer (window.kbCartDrawer.open).
// Działa na simple products; dla variable products + grouped fallbackuje na normalny submit.

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

function initPdpAjaxAtc() {
  const form = document.querySelector('form.cart');
  if (!form) return;

  // Tylko simple. Variable/grouped → zwykły submit (wymagają wyboru wariacji itp.).
  if (form.classList.contains('variations_form') || form.classList.contains('grouped_form')) return;

  const submitBtn = form.querySelector('.single_add_to_cart_button')
    || form.querySelector('button[type="submit"]');

  form.addEventListener('submit', (e) => {
    // Wartość product_id leci albo z input[name="add-to-cart"] (formularz simple) albo z value submit-buttonu.
    const productIdField = form.querySelector('input[name="add-to-cart"]');
    const submitter = e.submitter || submitBtn;
    const productId = (productIdField && productIdField.value) || (submitter && submitter.value);
    if (!productId) return;
    e.preventDefault();

    const isBuyNow = submitter && submitter.hasAttribute && submitter.hasAttribute('data-buy-now');
    const qtyField = form.querySelector('input[name="quantity"]');
    const params = new URLSearchParams();
    params.append('product_id', String(productId));
    params.append('quantity', qtyField ? String(qtyField.value || 1) : '1');

    const clickedBtn = submitter || submitBtn;
    if (clickedBtn) {
      clickedBtn.disabled = true;
      clickedBtn.dataset.kbOrig = clickedBtn.textContent;
      clickedBtn.textContent = isBuyNow ? 'Przekierowuję…' : 'Dodaję…';
    }

    // Serialize całego formularza (mystery box fields, size, variants, etc.)
    // zamiast tylko product_id + quantity.
    const formData = new FormData(form);
    formData.set('product_id', String(productId));
    formData.set('quantity', qtyField ? String(qtyField.value || 1) : '1');

    // ── KUP TERAZ — pomijamy AJAX i submitujemy serwerowo z flagą `kb_buy_now`.
    // Filter `woocommerce_add_to_cart_redirect` w inc/woocommerce-hooks.php podmienia
    // docelowy URL na checkout. To jest bulletproof — działa nawet jak JS-AJAX fail.
    //
    // KRYTYCZNE: `HTMLFormElement.prototype.submit()` NIE serializuje wartości submit-buttonu,
    // więc trzeba ręcznie wstawić hidden `add-to-cart=<id>` żeby WC odpalił add_to_cart_handler.
    if (isBuyNow) {
      const ensureHidden = (name, value) => {
        let h = form.querySelector(`input[type="hidden"][name="${name}"]`);
        if (!h) {
          h = document.createElement('input');
          h.type = 'hidden';
          h.name = name;
          form.appendChild(h);
        }
        h.value = String(value);
      };
      ensureHidden('add-to-cart', productId);
      ensureHidden('quantity', qtyField ? (qtyField.value || 1) : 1);
      ensureHidden('kb_buy_now', '1');
      HTMLFormElement.prototype.submit.call(form);
      return;
    }

    fetch(wcAjaxUrl('add_to_cart'), {
      method: 'POST',
      credentials: 'same-origin',
      body: formData,
    })
      .then((r) => r.json())
      .then((json) => {
        if (json && json.error) {
          form.submit();
          return;
        }
        if (json && json.fragments) {
          applyFragments(json.fragments);
          if (window.jQuery) {
            window.jQuery(document.body).trigger('added_to_cart', [json.fragments, json.cart_hash]);
          } else {
            document.body.dispatchEvent(new CustomEvent('added_to_cart', { detail: { fragments: json.fragments } }));
          }
        }
        if (isBuyNow) {
          const checkout = (window.KB && window.KB.checkoutUrl) || '/zamowienie/';
          window.location.href = checkout;
          return;
        }
        if (window.kbCartDrawer && typeof window.kbCartDrawer.open === 'function') {
          setTimeout(() => window.kbCartDrawer.open(), 180);
        }
      })
      .catch(() => form.submit())
      .finally(() => {
        if (clickedBtn && !isBuyNow) {
          clickedBtn.disabled = false;
          if (clickedBtn.dataset.kbOrig) clickedBtn.textContent = clickedBtn.dataset.kbOrig;
        }
      });
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState !== 'loading') initPdpAjaxAtc();
  else document.addEventListener('DOMContentLoaded', initPdpAjaxAtc);
}

export {};
