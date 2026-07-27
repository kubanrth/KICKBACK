<?php
/**
 * CMB2 field groups — odpowiednik inc/acf-fields.php dla free CMB2 (plugin
 * "CMB2" by WebDevStudios, https://wordpress.org/plugins/cmb2/).
 *
 * Klucze pól dopasowane do nazw używanych w templatach (kb_*). Dzięki shimowi
 * w inc/cms-compat.php templaty czytają te same wartości czy mamy ACF Pro
 * czy CMB2 — wystarczy mieć aktywną jedną z wtyczek.
 *
 * Option keys (wpisy w wp_options):
 *  - kb_cms_header        — Pasek nagłówka (marquee)
 *  - kb_cms_home          — Strona główna (hero + wszystkie sekcje)
 *  - kb_cms_footer        — Stopka
 *  - kb_cms_pdp           — Karta produktu (PDP)
 *  - kb_cms_seo           — SEO & Analytics (GA4 + Search Console)
 *  - kb_cms_404           — Strona 404
 *
 * Per-page (page-about / page-faq / page-contact / page-store-locator) i
 * per-product (kb_player_name, kb_material) idą jako post meta w wp_postmeta.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'cmb2_admin_init', function () {

	// Bezpiecznik: CMB2 musi być aktywne.
	if ( ! function_exists( 'new_cmb2_box' ) ) {
		return;
	}

	// ═══════════════════════════════════════════════════════════════════
	// PASEK NAGŁÓWKA — wiadomości marquee
	// ═══════════════════════════════════════════════════════════════════
	$bar = new_cmb2_box( [
		'id'           => 'kb_cms_header_box',
		'title'        => 'Pasek nagłówka — wiadomości marquee',
		'object_types' => [ 'options-page' ],
		'option_key'   => 'kb_cms_header',
		'parent_slug'  => 'kb-cms',
		'menu_title'   => 'Pasek nagłówka',
		'capability'   => 'edit_theme_options',
		'icon_url'     => 'dashicons-megaphone',
	] );
	$bar_group = $bar->add_field( [
		'id'          => 'kb_bar_messages',
		'name'        => 'Wiadomości (w pętli; sugerowane 6)',
		'description' => 'Każda wiadomość dostaje automatyczną ikonkę (cykl 6).',
		'type'        => 'group',
		'options'     => [
			'group_title'   => 'Wiadomość {#}',
			'add_button'    => 'Dodaj wiadomość',
			'remove_button' => 'Usuń',
			'sortable'      => true,
			'closed'        => false,
		],
	] );
	$bar->add_group_field( $bar_group, [ 'id' => 'text', 'name' => 'Tekst', 'type' => 'text' ] );

	// HEADER: dodatkowe pola (search drawer + cart drawer)
	$bar->add_field( [ 'id' => '_search_title', 'type' => 'title', 'name' => '── WYSZUKIWARKA (drawer)' ] );
	$bar->add_field( [ 'id' => 'kb_search_placeholder', 'name' => 'Placeholder w polu wyszukiwarki', 'type' => 'text', 'attributes' => [ 'placeholder' => 'Wyszukaj' ] ] );
	$bar->add_field( [ 'id' => 'kb_search_popular_label', 'name' => 'Etykieta nad „Popularnymi wyszukiwaniami"', 'type' => 'text', 'attributes' => [ 'placeholder' => 'Popularne wyszukiwania' ] ] );
	$popular_g = $bar->add_field( [
		'id'      => 'kb_search_popular',
		'name'    => 'Popularne wyszukiwania (chipsy pod polem)',
		'type'    => 'group',
		'options' => [ 'group_title' => 'Chip {#}', 'add_button' => 'Dodaj chip', 'remove_button' => 'Usuń', 'sortable' => true ],
	] );
	$bar->add_group_field( $popular_g, [ 'id' => 'label', 'name' => 'Tekst chipa', 'type' => 'text', 'attributes' => [ 'placeholder' => 'Real Madrid' ] ] );
	$bar->add_group_field( $popular_g, [ 'id' => 'url',   'name' => 'Link', 'type' => 'text_url' ] );

	$bar->add_field( [ 'id' => '_cart_title', 'type' => 'title', 'name' => '── KOSZYK (drawer)' ] );
	$bar->add_field( [ 'id' => 'kb_cart_header', 'name' => 'Nagłówek koszyka (drawer)', 'type' => 'text', 'attributes' => [ 'placeholder' => 'Twój koszyk' ] ] );
	$bar->add_field( [ 'id' => 'kb_cart_empty_heading', 'name' => 'Tekst gdy koszyk pusty (nagłówek)', 'type' => 'text', 'attributes' => [ 'placeholder' => 'Twój koszyk jest pusty' ] ] );
	$bar->add_field( [ 'id' => 'kb_cart_empty_lead',    'name' => 'Tekst gdy koszyk pusty (lead)', 'type' => 'textarea_small', 'attributes' => [ 'rows' => 2, 'placeholder' => 'Wybierz coś z naszych kategorii…' ] ] );
	$bar->add_field( [ 'id' => 'kb_cart_empty_cta',     'name' => 'Tekst przycisku „Wróć do zakupów"', 'type' => 'text', 'attributes' => [ 'placeholder' => 'Przejdź do zakupów' ] ] );

	// ═══════════════════════════════════════════════════════════════════
	// STRONA GŁÓWNA — wszystkie sekcje (hero + slidery + banery)
	// ═══════════════════════════════════════════════════════════════════
	$home = new_cmb2_box( [
		'id'           => 'kb_cms_home_box',
		'title'        => 'Strona główna',
		'object_types' => [ 'options-page' ],
		'option_key'   => 'kb_cms_home',
		'parent_slug'  => 'kb-cms',
		'menu_title'   => 'Strona główna',
		'capability'   => 'edit_theme_options',
	] );

	// MAPA BANERÓW — visual TOC dla klienta na samej górze.
	// Klient od razu widzi co edytuje każdą sekcję i w jakiej kolejności są na home.
	$home->add_field( [
		'id'   => '_map_banners',
		'type' => 'title',
		'name' => '🗺️ Mapa banerów strony głównej',
		'desc' => '<div style="background:#f6f3ee;border-left:4px solid #0d0d0d;padding:14px 18px;margin:8px 0 16px;font-size:13px;line-height:1.7">
			<strong style="display:block;margin-bottom:8px;font-size:14px">Każdy baner widoczny na <a href="' . esc_url( home_url( '/' ) ) . '" target="_blank">stronie głównej</a> ma swoje pole w tym CMS.</strong>
			Sekcje pojawiają się na home <strong>w tej kolejności</strong> (od góry):
			<ol style="margin:10px 0 0 22px;padding:0">
				<li><strong>HERO</strong> — banner pełnoekranowy (zdjęcie tła desktop+mobile, eyebrow, headline, CTA)</li>
				<li><strong>NOWOŚCI</strong> (Just-Arrived) — slider produktów (nagłówek + przycisk)</li>
				<li><strong>RETRO / LEGENDS</strong> — 2 banery split (repeater: zdjęcie + napis + CTA)</li>
				<li><strong>PARALLAX</strong> — pełnoekranowy z parallax scroll (zdjęcie desktop+mobile + tekst)</li>
				<li><strong>POLECANE</strong> — slider produktów (nagłówek + przycisk)</li>
				<li><strong>TOPOWE NAZWISKA</strong> — 3 kafelki (repeater: zdjęcie + label + link)</li>
				<li><strong>MYSTERY BOXY</strong> — slider produktów (nagłówek + przycisk)</li>
				<li><strong>KARTY PIŁKARSKIE</strong> — slider produktów (nagłówek + przycisk)</li>
				<li><strong>REPREZENTACJE</strong> split — lewy banner zdjęcie (desktop+mobile) + prawa kolumna tekst</li>
				<li><strong>WHATS NEW TABS</strong> — 3 zakładki produktów (etykiety + CTA)</li>
				<li><strong>JUNIOR</strong> — pełnoekranowy banner (zdjęcie desktop+mobile + tekst + CTA)</li>
				<li><strong>AKCESORIA / KURTKI</strong> — banner split 2-w-1 (zdjęcie desktop+mobile + 2 CTA)</li>
				<li><strong>TOPOWE ZESPOŁY</strong> — siatka 9 herbów (repeater: herb + nazwa + link)</li>
				<li><strong>KLUBY / RESZTA ŚWIATA</strong> — 2 banery split (L+R zdjęcia desktop+mobile + CTA)</li>
				<li><strong>BLOG SLIDER</strong> — slider postów (nagłówek; treść postów: <em>wp-admin → Wpisy</em>)</li>
			</ol>
			<p style="margin:12px 0 0">💡 <strong>Tip:</strong> Każde pole „Zdjęcie" pokazuje aktualny obrazek z podglądem. Klik <em>"Remove"</em> + <em>"Add or Upload File"</em> pozwala podmienić. Mobile puste = używa desktop docięte.</p>
		</div>',
	] );

	// HERO ──────────────────────────────────────────────────────────────
	$home->add_field( [ 'id' => '_hero_title', 'type' => 'title', 'name' => '1️⃣ HERO (slider banerów głównych)', 'desc' => 'Dodaj tyle slajdów ile chcesz. Slider auto-przewija co 6s. Jeśli grupa pusta → używane są pola singletonowe poniżej (kompatybilność wsteczna).' ] );
	$hero_g = $home->add_field( [
		'id'      => 'kb_hero_slides',
		'name'    => 'Slajdy hero',
		'type'    => 'group',
		'options' => [ 'group_title' => 'Slajd {#}', 'add_button' => 'Dodaj slajd', 'remove_button' => 'Usuń slajd', 'sortable' => true ],
	] );
	$home->add_group_field( $hero_g, [ 'id' => 'image_desktop',    'name' => 'Zdjęcie — DESKTOP', 'desc' => 'Zalecane: 2400×1080 (16:9), WebP, max 500 KB.', 'type' => 'file', 'options' => [ 'url' => false ] ] );
	$home->add_group_field( $hero_g, [ 'id' => 'image_mobile',     'name' => 'Zdjęcie — MOBILE',  'desc' => 'Zalecane: 1080×1440 (3:4 portrait), WebP, max 300 KB. Puste = używa desktop (docięte).', 'type' => 'file', 'options' => [ 'url' => false ] ] );
	$home->add_group_field( $hero_g, [ 'id' => 'eyebrow',          'name' => 'Eyebrow (mały label)',           'type' => 'text' ] );
	$home->add_group_field( $hero_g, [ 'id' => 'headline',         'name' => 'Nagłówek (1. linia)',            'type' => 'text' ] );
	$home->add_group_field( $hero_g, [ 'id' => 'headline_italic',  'name' => 'Nagłówek (2. linia — italic)',   'type' => 'text' ] );
	$home->add_group_field( $hero_g, [ 'id' => 'cta_label',        'name' => 'Tekst przycisku',                'type' => 'text' ] );
	$home->add_group_field( $hero_g, [ 'id' => 'cta_url',          'name' => 'Link przycisku',                 'type' => 'text_url' ] );

	// Legacy singleton fields (fallback jeśli kb_hero_slides pusta — kompatybilność wsteczna).
	$home->add_field( [ 'id' => '_hero_legacy_title', 'type' => 'title', 'name' => '── HERO singleton (używane gdy powyższa grupa PUSTA)' ] );
	$home->add_field( [ 'id' => 'kb_hero_image',           'name' => 'Zdjęcie tła — DESKTOP', 'desc' => 'Zalecane: 2400×1080 (16:9), WebP, max 500 KB.', 'type' => 'file', 'options' => [ 'url' => false ] ] );
	$home->add_field( [ 'id' => 'kb_hero_image_mobile',    'name' => 'Zdjęcie tła — MOBILE',  'desc' => 'Zalecane: 1080×1440 (3:4 portrait), WebP, max 300 KB. Jeśli puste — używa zdjęcia desktop (docięte).', 'type' => 'file', 'options' => [ 'url' => false ] ] );
	$home->add_field( [ 'id' => 'kb_hero_eyebrow',         'name' => 'Eyebrow (mały label)',    'type' => 'text', 'attributes' => [ 'placeholder' => 'Kickback · Sezon 25/26' ] ] );
	$home->add_field( [ 'id' => 'kb_hero_headline',        'name' => 'Nagłówek (1. linia)',     'type' => 'text', 'attributes' => [ 'placeholder' => 'Twoja koszulka,' ] ] );
	$home->add_field( [ 'id' => 'kb_hero_headline_italic', 'name' => 'Nagłówek (2. linia — italic)', 'type' => 'text', 'attributes' => [ 'placeholder' => 'twoja historia.' ] ] );
	$home->add_field( [ 'id' => 'kb_hero_cta_label',       'name' => 'Tekst przycisku',         'type' => 'text', 'attributes' => [ 'placeholder' => 'Zobacz kolekcję' ] ] );
	$home->add_field( [ 'id' => 'kb_hero_cta_url',         'name' => 'Link przycisku',          'type' => 'text_url' ] );

	// TOPOWE NAZWISKA ───────────────────────────────────────────────────
	$home->add_field( [ 'id' => '_topowe_title', 'type' => 'title', 'name' => '── TOPOWE NAZWISKA (3 kafelki)' ] );
	$topowe_g = $home->add_field( [
		'id'      => 'kb_topowe',
		'name'    => 'Kafelki (zdjęcie + podpis + link)',
		'type'    => 'group',
		'options' => [ 'group_title' => 'Kafelek {#}', 'add_button' => 'Dodaj kafelek', 'remove_button' => 'Usuń', 'sortable' => true ],
	] );
	$home->add_group_field( $topowe_g, [ 'id' => 'image', 'name' => 'Zdjęcie', 'type' => 'file', 'options' => [ 'url' => false ] ] );
	$home->add_group_field( $topowe_g, [ 'id' => 'label', 'name' => 'Podpis pod zdjęciem', 'type' => 'text' ] );
	$home->add_group_field( $topowe_g, [ 'id' => 'url',   'name' => 'Link po kliknięciu', 'type' => 'text_url' ] );

	// RETRO / LEGENDS ───────────────────────────────────────────────────
	$home->add_field( [ 'id' => '_rl_title', 'type' => 'title', 'name' => '── RETRO / LEGENDS (2 banery)' ] );
	$rl_g = $home->add_field( [
		'id'      => 'kb_rl',
		'name'    => 'Banery',
		'type'    => 'group',
		'options' => [ 'group_title' => 'Baner {#}', 'add_button' => 'Dodaj baner', 'remove_button' => 'Usuń', 'sortable' => true ],
	] );
	$home->add_group_field( $rl_g, [ 'id' => 'image',           'name' => 'Zdjęcie',                  'type' => 'file', 'options' => [ 'url' => false ] ] );
	$home->add_group_field( $rl_g, [ 'id' => 'headline',        'name' => 'Nagłówek (część zwykła)',  'type' => 'text' ] );
	$home->add_group_field( $rl_g, [ 'id' => 'headline_italic', 'name' => 'Nagłówek (italic)',        'type' => 'text' ] );
	$home->add_group_field( $rl_g, [ 'id' => 'cta_label',       'name' => 'Tekst przycisku',          'type' => 'text', 'default' => 'Sprawdź' ] );
	$home->add_group_field( $rl_g, [ 'id' => 'url',             'name' => 'Link',                     'type' => 'text_url' ] );

	// PARALLAX ──────────────────────────────────────────────────────────
	$home->add_field( [ 'id' => '_para_title', 'type' => 'title', 'name' => '── PARALLAX („Każda koszulka to historia")' ] );
	$home->add_field( [ 'id' => 'kb_para_image_desktop',   'name' => 'Zdjęcie desktop', 'type' => 'file', 'options' => [ 'url' => false ] ] );
	$home->add_field( [ 'id' => 'kb_para_image_mobile',    'name' => 'Zdjęcie mobile',  'type' => 'file', 'options' => [ 'url' => false ] ] );
	$home->add_field( [ 'id' => 'kb_para_headline',        'name' => 'Nagłówek (zwykła)',  'type' => 'text', 'attributes' => [ 'placeholder' => 'Każda koszulka to' ] ] );
	$home->add_field( [ 'id' => 'kb_para_headline_italic', 'name' => 'Nagłówek (italic)',  'type' => 'text', 'attributes' => [ 'placeholder' => 'historia..' ] ] );
	$home->add_field( [ 'id' => 'kb_para_cta_label',       'name' => 'Tekst przycisku',   'type' => 'text', 'attributes' => [ 'placeholder' => 'Zobacz kolekcję' ] ] );
	$home->add_field( [ 'id' => 'kb_para_cta_url',         'name' => 'Link przycisku',    'type' => 'text_url' ] );

	// NOWOŚCI (Just-arrived) ────────────────────────────────────────────
	$home->add_field( [ 'id' => '_ja_title', 'type' => 'title', 'name' => '── NOWOŚCI (najnowsze produkty)' ] );
	$home->add_field( [ 'id' => 'kb_ja_heading',   'name' => 'Nagłówek sekcji', 'type' => 'text', 'attributes' => [ 'placeholder' => 'Nowości' ] ] );
	$home->add_field( [ 'id' => 'kb_ja_btn_label', 'name' => 'Tekst przycisku', 'type' => 'text', 'attributes' => [ 'placeholder' => 'Zobacz wszystkie' ] ] );
	$home->add_field( [ 'id' => 'kb_ja_btn_url',   'name' => 'Link przycisku',  'type' => 'text_url' ] );

	// POLECANE ──────────────────────────────────────────────────────────
	$home->add_field( [ 'id' => '_pl_title', 'type' => 'title', 'name' => '── POLECANE (random produkty)' ] );
	$home->add_field( [ 'id' => 'kb_pl_heading',   'name' => 'Nagłówek sekcji', 'type' => 'text', 'attributes' => [ 'placeholder' => 'Polecane' ] ] );
	$home->add_field( [ 'id' => 'kb_pl_btn_label', 'name' => 'Tekst przycisku', 'type' => 'text', 'attributes' => [ 'placeholder' => 'Zobacz wszystkie' ] ] );
	$home->add_field( [ 'id' => 'kb_pl_btn_url',   'name' => 'Link przycisku',  'type' => 'text_url' ] );

	// MYSTERY BOXY ──────────────────────────────────────────────────────
	$home->add_field( [ 'id' => '_mb_title', 'type' => 'title', 'name' => '── MYSTERY BOXY' ] );
	$home->add_field( [ 'id' => 'kb_mb_heading',   'name' => 'Nagłówek (zwykła)', 'type' => 'text', 'attributes' => [ 'placeholder' => 'Mystery' ] ] );
	$home->add_field( [ 'id' => 'kb_mb_heading_i', 'name' => 'Nagłówek (italic)', 'type' => 'text', 'attributes' => [ 'placeholder' => 'boxy' ] ] );
	$home->add_field( [ 'id' => 'kb_mb_btn_label', 'name' => 'Tekst przycisku',   'type' => 'text', 'attributes' => [ 'placeholder' => 'Zobacz wszystkie' ] ] );
	$home->add_field( [ 'id' => 'kb_mb_btn_url',   'name' => 'Link przycisku',    'type' => 'text_url' ] );

	// KARTY PIŁKARSKIE ──────────────────────────────────────────────────
	$home->add_field( [ 'id' => '_kp_title', 'type' => 'title', 'name' => '── KARTY PIŁKARSKIE' ] );
	$home->add_field( [ 'id' => 'kb_kp_heading',   'name' => 'Nagłówek (zwykła)', 'type' => 'text', 'attributes' => [ 'placeholder' => 'Karty' ] ] );
	$home->add_field( [ 'id' => 'kb_kp_heading_i', 'name' => 'Nagłówek (italic)', 'type' => 'text', 'attributes' => [ 'placeholder' => 'piłkarskie' ] ] );
	$home->add_field( [ 'id' => 'kb_kp_btn_label', 'name' => 'Tekst przycisku',   'type' => 'text', 'attributes' => [ 'placeholder' => 'Zobacz wszystkie' ] ] );
	$home->add_field( [ 'id' => 'kb_kp_btn_url',   'name' => 'Link przycisku',    'type' => 'text_url' ] );

	// TOPOWE ZESPOŁY ────────────────────────────────────────────────────
	$home->add_field( [ 'id' => '_tz_title', 'type' => 'title', 'name' => '── TOPOWE ZESPOŁY (siatka herbów)' ] );
	$home->add_field( [ 'id' => 'kb_tz_heading',   'name' => 'Nagłówek (zwykła)', 'type' => 'text', 'attributes' => [ 'placeholder' => 'Topowe' ] ] );
	$home->add_field( [ 'id' => 'kb_tz_heading_i', 'name' => 'Nagłówek (italic)', 'type' => 'text', 'attributes' => [ 'placeholder' => 'zespoły' ] ] );
	$home->add_field( [ 'id' => 'kb_tz_btn_label', 'name' => 'Tekst przycisku',   'type' => 'text', 'attributes' => [ 'placeholder' => 'Zobacz wszystkie' ] ] );
	$home->add_field( [ 'id' => 'kb_tz_btn_url',   'name' => 'Link przycisku',    'type' => 'text_url' ] );

	$kluby_g = $home->add_field( [
		'id'      => 'kb_tz_kluby',
		'name'    => 'Kluby (siatka herbów)',
		'type'    => 'group',
		'options' => [ 'group_title' => 'Klub {#}', 'add_button' => 'Dodaj klub', 'remove_button' => 'Usuń', 'sortable' => true ],
	] );
	$home->add_group_field( $kluby_g, [ 'id' => 'image', 'name' => 'Herb (zdjęcie PNG/SVG/WebP, ok. 400×400)', 'type' => 'file', 'options' => [ 'url' => false ] ] );
	$home->add_group_field( $kluby_g, [ 'id' => 'label', 'name' => 'Nazwa klubu (podpis pod herbem)', 'type' => 'text' ] );
	$home->add_group_field( $kluby_g, [ 'id' => 'url',   'name' => 'Link po kliknięciu (URL kategorii klubu)', 'type' => 'text_url' ] );

	// BLOG SLIDER ───────────────────────────────────────────────────────
	$home->add_field( [ 'id' => '_blog_title', 'type' => 'title', 'name' => '── BLOG SLIDER' ] );
	$home->add_field( [ 'id' => 'kb_blog_heading', 'name' => 'Nagłówek sekcji', 'type' => 'text', 'attributes' => [ 'placeholder' => 'Blog' ] ] );

	// CAROUSEL FINAL ────────────────────────────────────────────────────
	$home->add_field( [ 'id' => '_carousel_title', 'type' => 'title', 'name' => '── CAROUSEL FINAL (4 random produkty)' ] );
	$home->add_field( [ 'id' => 'kb_carousel_heading', 'name' => 'Nagłówek sekcji', 'type' => 'text', 'attributes' => [ 'placeholder' => 'Carousel' ] ] );

	// REPREZENTACJE ─────────────────────────────────────────────────────
	$home->add_field( [ 'id' => '_rep_title', 'type' => 'title', 'name' => '── REPREZENTACJE (split: foto + black box)' ] );
	$home->add_field( [ 'id' => 'kb_rep_l_image',        'name' => 'L. Zdjęcie — DESKTOP',       'desc' => 'Zalecane: 1600×1200 WebP, max 250 KB.', 'type' => 'file', 'options' => [ 'url' => false ] ] );
	$home->add_field( [ 'id' => 'kb_rep_l_image_mobile', 'name' => 'L. Zdjęcie — MOBILE',        'desc' => 'Zalecane: 1080×1440 (3:4 portrait) WebP. Puste = używa desktop (docięte).', 'type' => 'file', 'options' => [ 'url' => false ] ] );
	$home->add_field( [ 'id' => 'kb_rep_l_headline_i', 'name' => 'L. Nagłówek (italic)',       'type' => 'text', 'attributes' => [ 'placeholder' => 'Reprezentacje' ] ] );
	$home->add_field( [ 'id' => 'kb_rep_l_cta',        'name' => 'L. Tekst przycisku',         'type' => 'text', 'attributes' => [ 'placeholder' => 'Sprawdź' ] ] );
	$home->add_field( [ 'id' => 'kb_rep_l_url',        'name' => 'L. Link',                    'type' => 'text_url' ] );
	$home->add_field( [ 'id' => 'kb_rep_r_headline_i', 'name' => 'P. Nagłówek (italic)',       'type' => 'text', 'attributes' => [ 'placeholder' => 'Mundial 2026' ] ] );
	$home->add_field( [ 'id' => 'kb_rep_r_headline',   'name' => 'P. Nagłówek (zwykła)',       'type' => 'text', 'attributes' => [ 'placeholder' => 'przejmuje Kickback' ] ] );
	$home->add_field( [ 'id' => 'kb_rep_r_lead',       'name' => 'P. Tekst pod nagłówkiem',    'type' => 'textarea_small', 'attributes' => [ 'placeholder' => 'Sprawdź selekcję koszulek drużyn narodowych.', 'rows' => 2 ] ] );
	$home->add_field( [ 'id' => 'kb_rep_r_cta',        'name' => 'P. Tekst przycisku',         'type' => 'text', 'attributes' => [ 'placeholder' => 'Zobacz kolekcję' ] ] );
	$home->add_field( [ 'id' => 'kb_rep_r_url',        'name' => 'P. Link',                    'type' => 'text_url' ] );

	// KLUBY / RESZTA ŚWIATA ─────────────────────────────────────────────
	$home->add_field( [ 'id' => '_krs_title', 'type' => 'title', 'name' => '── KLUBY / RESZTA ŚWIATA (split 2 banery)' ] );
	$home->add_field( [ 'id' => 'kb_krs_l_image',        'name' => 'L. Zdjęcie — DESKTOP', 'desc' => 'Zalecane: 1600×1200 WebP, max 300 KB.', 'type' => 'file', 'options' => [ 'url' => false ] ] );
	$home->add_field( [ 'id' => 'kb_krs_l_image_mobile', 'name' => 'L. Zdjęcie — MOBILE',  'desc' => 'Zalecane: 1080×1440 (3:4). Puste = używa desktop.', 'type' => 'file', 'options' => [ 'url' => false ] ] );
	$home->add_field( [ 'id' => 'kb_krs_l_headline_i', 'name' => 'L. Nagłówek (italic)', 'type' => 'text', 'attributes' => [ 'placeholder' => 'Kluby' ] ] );
	$home->add_field( [ 'id' => 'kb_krs_l_cta',        'name' => 'L. Tekst przycisku',   'type' => 'text', 'attributes' => [ 'placeholder' => 'Sprawdź' ] ] );
	$home->add_field( [ 'id' => 'kb_krs_l_url',        'name' => 'L. Link',              'type' => 'text_url' ] );
	$home->add_field( [ 'id' => 'kb_krs_r_image',        'name' => 'P. Zdjęcie — DESKTOP', 'desc' => 'Zalecane: 1600×1200 WebP, max 300 KB.', 'type' => 'file', 'options' => [ 'url' => false ] ] );
	$home->add_field( [ 'id' => 'kb_krs_r_image_mobile', 'name' => 'P. Zdjęcie — MOBILE',  'desc' => 'Zalecane: 1080×1440 (3:4). Puste = używa desktop.', 'type' => 'file', 'options' => [ 'url' => false ] ] );
	$home->add_field( [ 'id' => 'kb_krs_r_headline_i', 'name' => 'P. Nagłówek (italic)', 'type' => 'text', 'attributes' => [ 'placeholder' => 'Reszta świata' ] ] );
	$home->add_field( [ 'id' => 'kb_krs_r_cta',        'name' => 'P. Tekst przycisku',   'type' => 'text', 'attributes' => [ 'placeholder' => 'Sprawdź' ] ] );
	$home->add_field( [ 'id' => 'kb_krs_r_url',        'name' => 'P. Link',              'type' => 'text_url' ] );

	// AKCESORIA / KURTKI ────────────────────────────────────────────────
	$home->add_field( [ 'id' => '_ak_title', 'type' => 'title', 'name' => '── AKCESORIA / KURTKI (banner 2-w-1)' ] );
	$home->add_field( [ 'id' => 'kb_ak_image',        'name' => 'Tło baneru — DESKTOP', 'desc' => 'Zalecane: 2400×1080 WebP, max 400 KB.', 'type' => 'file', 'options' => [ 'url' => false ] ] );
	$home->add_field( [ 'id' => 'kb_ak_image_mobile', 'name' => 'Tło baneru — MOBILE',  'desc' => 'Zalecane: 1080×1440 (3:4) WebP. Puste = używa desktop (docięte).', 'type' => 'file', 'options' => [ 'url' => false ] ] );
	$home->add_field( [ 'id' => 'kb_ak_l_headline_i', 'name' => 'L. Nagłówek (italic)','type' => 'text', 'attributes' => [ 'placeholder' => 'Akcesoria' ] ] );
	$home->add_field( [ 'id' => 'kb_ak_l_cta',        'name' => 'L. Tekst przycisku',  'type' => 'text', 'attributes' => [ 'placeholder' => 'Sprawdź' ] ] );
	$home->add_field( [ 'id' => 'kb_ak_l_url',        'name' => 'L. Link',             'type' => 'text_url' ] );
	$home->add_field( [ 'id' => 'kb_ak_r_headline_i', 'name' => 'P. Nagłówek (italic)','type' => 'text', 'attributes' => [ 'placeholder' => 'Kurtki i bluzy' ] ] );
	$home->add_field( [ 'id' => 'kb_ak_r_cta',        'name' => 'P. Tekst przycisku',  'type' => 'text', 'attributes' => [ 'placeholder' => 'Sprawdź' ] ] );
	$home->add_field( [ 'id' => 'kb_ak_r_url',        'name' => 'P. Link',             'type' => 'text_url' ] );

	// SPRING BANNER ─────────────────────────────────────────────────────
	$home->add_field( [ 'id' => '_sp_title', 'type' => 'title', 'name' => '── SPRING BANNER (czarna sekcja z tekstem)' ] );
	$home->add_field( [ 'id' => 'kb_sp_headline_i', 'name' => 'Nagłówek (italic — początek)', 'type' => 'text', 'attributes' => [ 'placeholder' => 'Spring has arrived.' ] ] );
	$home->add_field( [ 'id' => 'kb_sp_headline',   'name' => 'Nagłówek (zwykła część)',      'type' => 'textarea_small', 'attributes' => [ 'placeholder' => 'Discover the new items', 'rows' => 2 ] ] );
	$home->add_field( [ 'id' => 'kb_sp_cta',        'name' => 'Tekst linku',                  'type' => 'text', 'attributes' => [ 'placeholder' => 'Discover now' ] ] );
	$home->add_field( [ 'id' => 'kb_sp_url',        'name' => 'Link',                         'type' => 'text_url' ] );

	// JUNIOR ────────────────────────────────────────────────────────────
	$home->add_field( [ 'id' => '_jr_title', 'type' => 'title', 'name' => '── JUNIOR (banner pełnoekranowy)' ] );
	$home->add_field( [ 'id' => 'kb_jr_image',        'name' => 'Zdjęcie tła — DESKTOP', 'desc' => 'Zalecane: 2400×1080 WebP, max 400 KB.', 'type' => 'file', 'options' => [ 'url' => false ] ] );
	$home->add_field( [ 'id' => 'kb_jr_image_mobile', 'name' => 'Zdjęcie tła — MOBILE',  'desc' => 'Zalecane: 1080×1440 (3:4) WebP. Puste = używa desktop (docięte).', 'type' => 'file', 'options' => [ 'url' => false ] ] );
	$home->add_field( [ 'id' => 'kb_jr_eyebrow',    'name' => 'Eyebrow (mały label)',         'type' => 'text', 'attributes' => [ 'placeholder' => 'Od najmłodszych lat' ] ] );
	$home->add_field( [ 'id' => 'kb_jr_headline_i', 'name' => 'Nagłówek (italic)',            'type' => 'text', 'attributes' => [ 'placeholder' => 'Junior' ] ] );
	$home->add_field( [ 'id' => 'kb_jr_lead',       'name' => 'Tekst pod nagłówkiem',         'type' => 'textarea_small', 'attributes' => [ 'placeholder' => 'Sprawdź selekcję koszulek juniorskich.', 'rows' => 2 ] ] );
	$home->add_field( [ 'id' => 'kb_jr_badge',      'name' => 'Tekst „badge" autentyczności', 'type' => 'text', 'attributes' => [ 'placeholder' => 'Wszystkie koszulki przechodzą weryfikację.' ] ] );
	$home->add_field( [ 'id' => 'kb_jr_cta',        'name' => 'Tekst przycisku',              'type' => 'text', 'attributes' => [ 'placeholder' => 'Zobacz kolekcję' ] ] );
	$home->add_field( [ 'id' => 'kb_jr_url',        'name' => 'Link',                         'type' => 'text_url' ] );

	// KOSZULKI BANNER ───────────────────────────────────────────────────
	$home->add_field( [ 'id' => '_kosz_title', 'type' => 'title', 'name' => '── KOSZULKI BANNER (samo zdjęcie)' ] );
	$home->add_field( [ 'id' => 'kb_kosz_image', 'name' => 'Zdjęcie banera', 'type' => 'file', 'options' => [ 'url' => false ] ] );

	// BEFORE/AFTER ──────────────────────────────────────────────────────
	$home->add_field( [ 'id' => '_ba_title', 'type' => 'title', 'name' => '── BEFORE/AFTER SLIDER (Retro vs Nowe)' ] );
	$home->add_field( [ 'id' => 'kb_ba_heading',        'name' => 'Nagłówek (lewa część)',         'type' => 'text', 'attributes' => [ 'placeholder' => 'Retro' ] ] );
	$home->add_field( [ 'id' => 'kb_ba_heading_mid',    'name' => 'Słowo łącznik („vs")',          'type' => 'text', 'attributes' => [ 'placeholder' => 'vs' ] ] );
	$home->add_field( [ 'id' => 'kb_ba_heading_italic', 'name' => 'Nagłówek italic (prawa część)', 'type' => 'text', 'attributes' => [ 'placeholder' => 'Nowe' ] ] );
	$home->add_field( [ 'id' => 'kb_ba_lead',           'name' => 'Tekst pod nagłówkiem',          'type' => 'textarea_small', 'attributes' => [ 'rows' => 2 ] ] );
	$home->add_field( [ 'id' => 'kb_ba_cta',            'name' => 'Tekst przycisku',               'type' => 'text', 'attributes' => [ 'placeholder' => 'Zobacz kolekcję' ] ] );
	$home->add_field( [ 'id' => 'kb_ba_url',            'name' => 'Link przycisku',                'type' => 'text_url' ] );
	$home->add_field( [ 'id' => 'kb_ba_image_before',   'name' => 'Zdjęcie BEFORE (Retro)',        'type' => 'file', 'options' => [ 'url' => false ] ] );
	$home->add_field( [ 'id' => 'kb_ba_image_after',    'name' => 'Zdjęcie AFTER (Nowe)',          'type' => 'file', 'options' => [ 'url' => false ] ] );
	$home->add_field( [ 'id' => 'kb_ba_label_before',   'name' => 'Etykieta BEFORE',               'type' => 'text', 'attributes' => [ 'placeholder' => 'Retro' ] ] );
	$home->add_field( [ 'id' => 'kb_ba_label_after',    'name' => 'Etykieta AFTER',                'type' => 'text', 'attributes' => [ 'placeholder' => 'Nowe' ] ] );

	// WHAT'S NEW TABS ───────────────────────────────────────────────────
	$home->add_field( [ 'id' => '_wn_title', 'type' => 'title', 'name' => '── WHATS NEW TABS (3 zakładki produktów)' ] );
	$home->add_field( [ 'id' => 'kb_wn_label_retro',     'name' => 'Etykieta zakładki #1 (Retro)',     'type' => 'text', 'attributes' => [ 'placeholder' => 'Retro' ] ] );
	$home->add_field( [ 'id' => 'kb_wn_label_nowe',      'name' => 'Etykieta zakładki #2 (Nowe)',      'type' => 'text', 'attributes' => [ 'placeholder' => 'Nowe' ] ] );
	$home->add_field( [ 'id' => 'kb_wn_label_akcesoria', 'name' => 'Etykieta zakładki #3 (Akcesoria)', 'type' => 'text', 'attributes' => [ 'placeholder' => 'Akcesoria' ] ] );
	$home->add_field( [ 'id' => 'kb_wn_cta',             'name' => 'Tekst przycisku "Zobacz wszystkie"','type' => 'text', 'attributes' => [ 'placeholder' => 'Zobacz wszystkie' ] ] );
	$home->add_field( [ 'id' => 'kb_wn_url',             'name' => 'Link przycisku',                   'type' => 'text_url' ] );

	// ═══════════════════════════════════════════════════════════════════
	// STOPKA — newsletter + kolumny + socials + copyright
	// ═══════════════════════════════════════════════════════════════════
	$footer = new_cmb2_box( [
		'id'           => 'kb_cms_footer_box',
		'title'        => 'Stopka',
		'object_types' => [ 'options-page' ],
		'option_key'   => 'kb_cms_footer',
		'parent_slug'  => 'kb-cms',
		'menu_title'   => 'Stopka',
		'capability'   => 'edit_theme_options',
	] );

	$footer->add_field( [ 'id' => '_nl_title', 'type' => 'title', 'name' => '── NEWSLETTER' ] );
	$footer->add_field( [ 'id' => 'kb_foot_nl_label',       'name' => 'Label (mały)',         'type' => 'text', 'attributes' => [ 'placeholder' => 'Newsletter' ] ] );
	$footer->add_field( [ 'id' => 'kb_foot_nl_heading',     'name' => 'Nagłówek',             'type' => 'textarea_small', 'attributes' => [ 'rows' => 2 ] ] );
	$footer->add_field( [ 'id' => 'kb_foot_nl_placeholder', 'name' => 'Placeholder w polu email','type' => 'text', 'attributes' => [ 'placeholder' => 'Adres email' ] ] );
	$footer->add_field( [ 'id' => 'kb_foot_nl_btn',         'name' => 'Tekst przycisku',      'type' => 'text', 'attributes' => [ 'placeholder' => 'Zapisz się' ] ] );

	$footer->add_field( [ 'id' => '_cols_title', 'type' => 'title', 'name' => '── KOLUMNY LINKÓW (zalecane 3)' ] );
	$cols_g = $footer->add_field( [
		'id'      => 'kb_foot_cols',
		'name'    => 'Kolumny',
		'type'    => 'group',
		'options' => [ 'group_title' => 'Kolumna {#}', 'add_button' => 'Dodaj kolumnę', 'remove_button' => 'Usuń', 'sortable' => true ],
	] );
	$footer->add_group_field( $cols_g, [ 'id' => 'heading', 'name' => 'Nagłówek kolumny (opcjonalny)', 'type' => 'text' ] );
	// CMB2 NIE wspiera nested groups w free version → linki dla każdej kolumny
	// jako jeden textarea (każda linia = "Label | URL"). Parsing w link-columns.php.
	$footer->add_group_field( $cols_g, [
		'id'          => 'items_raw',
		'name'        => 'Linki — każda linia: Label | URL',
		'description' => 'Przykład:<br>FAQ | /faq/<br>Kontakt | /kontakt/',
		'type'        => 'textarea_small',
		'attributes'  => [ 'rows' => 6, 'placeholder' => "FAQ | /faq/\nKontakt | /kontakt/" ],
	] );

	$footer->add_field( [ 'id' => '_soc_title', 'type' => 'title', 'name' => '── SOCJALE' ] );
	$footer->add_field( [ 'id' => 'kb_foot_soc_ig', 'name' => 'Instagram URL', 'type' => 'text_url' ] );
	$footer->add_field( [ 'id' => 'kb_foot_soc_yt', 'name' => 'YouTube URL',   'type' => 'text_url' ] );
	$footer->add_field( [ 'id' => 'kb_foot_soc_tt', 'name' => 'TikTok URL',    'type' => 'text_url' ] );

	$footer->add_field( [ 'id' => '_copy_title', 'type' => 'title', 'name' => '── COPYRIGHT' ] );
	$footer->add_field( [ 'id' => 'kb_foot_copy', 'name' => 'Tekst copyright', 'type' => 'text', 'attributes' => [ 'placeholder' => 'Copyright © {rok} Kickback' ] ] );

	// ═══════════════════════════════════════════════════════════════════
	// KARTA PRODUKTU (PDP)
	// ═══════════════════════════════════════════════════════════════════
	$pdp = new_cmb2_box( [
		'id'           => 'kb_cms_pdp_box',
		'title'        => 'Karta produktu (PDP)',
		'object_types' => [ 'options-page' ],
		'option_key'   => 'kb_cms_pdp',
		'parent_slug'  => 'kb-cms',
		'menu_title'   => 'Karta produktu',
		'capability'   => 'edit_theme_options',
	] );

	$pdp->add_field( [ 'id' => '_perks_title', 'type' => 'title', 'name' => '── PERKS (pasek nad ATC)' ] );
	$perks_g = $pdp->add_field( [
		'id'      => 'kb_pdp_perks',
		'name'    => 'Punkty (zalecane 2)',
		'type'    => 'group',
		'options' => [ 'group_title' => 'Punkt {#}', 'add_button' => 'Dodaj punkt', 'remove_button' => 'Usuń', 'sortable' => true ],
	] );
	$pdp->add_group_field( $perks_g, [ 'id' => 'text', 'name' => 'Tekst', 'type' => 'text' ] );

	$pdp->add_field( [ 'id' => '_trust_title', 'type' => 'title', 'name' => '── TRUST TILES (4 kafelki pod ATC)' ] );
	$trust_g = $pdp->add_field( [
		'id'          => 'kb_pdp_trust',
		'name'        => 'Kafelki (slot 1–4 → ikonki: truck / return / lock / leaf)',
		'description' => 'Kolejność rzędna — slot 1 dostaje ikonę „truck", slot 2 „return", itd.',
		'type'        => 'group',
		'options'     => [ 'group_title' => 'Kafelek {#}', 'add_button' => 'Dodaj kafelek', 'remove_button' => 'Usuń', 'sortable' => true ],
	] );
	$pdp->add_group_field( $trust_g, [ 'id' => 'text', 'name' => 'Tekst', 'type' => 'text' ] );

	$pdp->add_field( [ 'id' => '_mi_title', 'type' => 'title', 'name' => '── AKORDEON "WIĘCEJ INFORMACJI"' ] );
	$pdp->add_field( [ 'id' => 'kb_pdp_mi_heading',    'name' => 'Nagłówek sekcji',            'type' => 'text', 'attributes' => [ 'placeholder' => 'Więcej informacji' ] ] );
	$pdp->add_field( [ 'id' => 'kb_pdp_mi_desc_label', 'name' => 'Etykieta "Opis"',            'type' => 'text', 'attributes' => [ 'placeholder' => 'Opis' ] ] );
	$pdp->add_field( [ 'id' => 'kb_pdp_mi_attr_label', 'name' => 'Etykieta "Atrybuty"',        'type' => 'text', 'attributes' => [ 'placeholder' => 'Atrybuty' ] ] );
	$pdp->add_field( [ 'id' => 'kb_pdp_mi_safe_label', 'name' => 'Etykieta "Bezpieczne zakupy"','type' => 'text', 'attributes' => [ 'placeholder' => 'Bezpieczne zakupy online' ] ] );
	$mi_safe_g = $pdp->add_field( [
		'id'      => 'kb_pdp_mi_safe_items',
		'name'    => 'Punkty "Bezpieczne zakupy"',
		'type'    => 'group',
		'options' => [ 'group_title' => 'Punkt {#}', 'add_button' => 'Dodaj punkt', 'remove_button' => 'Usuń', 'sortable' => true ],
	] );
	$pdp->add_group_field( $mi_safe_g, [ 'id' => 'text', 'name' => 'Tekst', 'type' => 'text' ] );
	$pdp->add_field( [ 'id' => 'kb_pdp_mi_contact_label', 'name' => 'Etykieta "Dane kontaktowe"', 'type' => 'text', 'attributes' => [ 'placeholder' => 'Dane kontaktowe' ] ] );

	// ═══════════════════════════════════════════════════════════════════
	// Sekcja „Integracje wysyłki" usunięta — apaczka picker działa bez InPost
	// Geowidget tokenu (klient prosił o usunięcie zbędnej sekcji w CMS).
	// ═══════════════════════════════════════════════════════════════════
	// SEO & ANALYTICS
	// ═══════════════════════════════════════════════════════════════════
	$seo = new_cmb2_box( [
		'id'           => 'kb_cms_seo_box',
		'title'        => 'SEO & Analytics',
		'object_types' => [ 'options-page' ],
		'option_key'   => 'kb_cms_seo',
		'parent_slug'  => 'kb-cms',
		'menu_title'   => 'SEO & Analytics',
		'capability'   => 'edit_theme_options',
		'icon_url'     => 'dashicons-chart-line',
	] );
	$seo->add_field( [
		'id'          => 'kb_ga_measurement_id',
		'name'        => 'Google Analytics 4 — Measurement ID',
		'description' => 'Format: G-XXXXXXXXXX (znajdź w Google Analytics → Admin → Properties)',
		'type'        => 'text',
		'attributes'  => [ 'placeholder' => 'G-XXXXXXXXXX', 'pattern' => 'G-[A-Z0-9]+' ],
	] );
	$seo->add_field( [
		'id'          => 'kb_sc_verification_meta',
		'name'        => 'Google Search Console — Verification Meta Tag',
		'description' => 'Wklej zawartość atrybutu content= z meta tagu (Search Console → Settings → Verification)',
		'type'        => 'text',
		'attributes'  => [ 'placeholder' => 'google1890f46046bdf01e' ],
	] );

	// ═══════════════════════════════════════════════════════════════════
	// STRONA 404
	// ═══════════════════════════════════════════════════════════════════
	$p404 = new_cmb2_box( [
		'id'           => 'kb_cms_404_box',
		'title'        => 'Strona 404 — komunikat',
		'object_types' => [ 'options-page' ],
		'option_key'   => 'kb_cms_404',
		'parent_slug'  => 'kb-cms',
		'menu_title'   => 'Strona 404',
		'capability'   => 'edit_theme_options',
	] );
	$p404->add_field( [ 'id' => 'kb_404_heading',  'name' => 'Nagłówek H1',                     'type' => 'text', 'attributes' => [ 'placeholder' => 'Nie znaleźliśmy tej strony' ] ] );
	$p404->add_field( [ 'id' => 'kb_404_lead',     'name' => 'Tekst pod nagłówkiem',            'type' => 'textarea_small', 'attributes' => [ 'rows' => 3 ] ] );
	$p404->add_field( [ 'id' => 'kb_404_cta_home', 'name' => 'Tekst przycisku — Strona główna', 'type' => 'text', 'attributes' => [ 'placeholder' => 'Strona główna' ] ] );
	$p404->add_field( [ 'id' => 'kb_404_cta_shop', 'name' => 'Tekst przycisku — Sklep',         'type' => 'text', 'attributes' => [ 'placeholder' => 'Przejdź do sklepu' ] ] );
	$p404->add_field( [ 'id' => 'kb_404_search',   'name' => 'Tekst nad wyszukiwarką',          'type' => 'text', 'attributes' => [ 'placeholder' => 'Spróbuj wyszukać' ] ] );

	// ═══════════════════════════════════════════════════════════════════
	// PER-PAGE: O nas (page-about.php)
	// ═══════════════════════════════════════════════════════════════════
	$about = new_cmb2_box( [
		'id'            => 'kb_about_box',
		'title'         => 'Kickback — O nas',
		'object_types'  => [ 'page' ],
		'show_on'       => [ 'key' => 'page-template', 'value' => 'page-about.php' ],
	] );
	$about->add_field( [ 'id' => 'kb_about_eyebrow', 'name' => 'Eyebrow (mały label nad tytułem)', 'type' => 'text', 'attributes' => [ 'placeholder' => 'Kickback · Sezon 25/26' ] ] );
	$about_stats = $about->add_field( [
		'id'      => 'kb_about_stats',
		'name'    => 'Statystyki (do 6 elementów)',
		'type'    => 'group',
		'options' => [ 'group_title' => 'Statystyka {#}', 'add_button' => 'Dodaj statystykę', 'remove_button' => 'Usuń', 'sortable' => true ],
	] );
	$about->add_group_field( $about_stats, [ 'id' => 'number', 'name' => 'Liczba',   'type' => 'text', 'attributes' => [ 'placeholder' => '10+' ] ] );
	$about->add_group_field( $about_stats, [ 'id' => 'label',  'name' => 'Etykieta', 'type' => 'text', 'attributes' => [ 'placeholder' => 'Lat na rynku' ] ] );
	$about->add_field( [ 'id' => 'kb_about_cta_label', 'name' => 'CTA — etykieta przycisku', 'type' => 'text', 'attributes' => [ 'placeholder' => 'Zobacz kolekcję' ] ] );
	$about->add_field( [ 'id' => 'kb_about_cta_url',   'name' => 'CTA — link',               'type' => 'text_url' ] );

	// ═══════════════════════════════════════════════════════════════════
	// PER-PAGE: FAQ (page-faq.php)
	// ═══════════════════════════════════════════════════════════════════
	$faq = new_cmb2_box( [
		'id'           => 'kb_faq_box',
		'title'        => 'Kickback — FAQ',
		'object_types' => [ 'page' ],
		'show_on'      => [ 'key' => 'page-template', 'value' => 'page-faq.php' ],
	] );
	$faq_g = $faq->add_field( [
		'id'      => 'kb_faq_items',
		'name'    => 'Pytania FAQ',
		'type'    => 'group',
		'options' => [ 'group_title' => 'Pytanie {#}', 'add_button' => 'Dodaj pytanie', 'remove_button' => 'Usuń', 'sortable' => true ],
	] );
	$faq->add_group_field( $faq_g, [
		'id'          => 'category',
		'name'        => 'Kategoria (opcjonalna grupa)',
		'description' => 'Pytania z tą samą kategorią zgrupują się pod wspólnym nagłówkiem.',
		'type'        => 'text',
		'attributes'  => [ 'placeholder' => 'Zamówienia i wysyłka' ],
	] );
	$faq->add_group_field( $faq_g, [ 'id' => 'question', 'name' => 'Pytanie', 'type' => 'text' ] );
	$faq->add_group_field( $faq_g, [ 'id' => 'answer',   'name' => 'Odpowiedź', 'type' => 'wysiwyg', 'options' => [ 'media_buttons' => false, 'textarea_rows' => 5 ] ] );

	// ═══════════════════════════════════════════════════════════════════
	// PER-PAGE: Kontakt (page-contact.php)
	// ═══════════════════════════════════════════════════════════════════
	$ct = new_cmb2_box( [
		'id'           => 'kb_contact_box',
		'title'        => 'Kickback — Kontakt',
		'object_types' => [ 'page' ],
		'show_on'      => [ 'key' => 'page-template', 'value' => 'page-contact.php' ],
	] );
	$ct->add_field( [ 'id' => 'kb_contact_eyebrow', 'name' => 'Eyebrow',  'type' => 'text', 'attributes' => [ 'placeholder' => 'Skontaktuj się z nami' ] ] );
	$ct->add_field( [ 'id' => 'kb_contact_lead',    'name' => 'Lead',     'type' => 'textarea_small', 'attributes' => [ 'rows' => 3 ] ] );
	$ct->add_field( [ 'id' => 'kb_contact_address', 'name' => 'Adres (każda linia w nowej linii)', 'type' => 'textarea_small', 'attributes' => [ 'rows' => 4 ] ] );
	$ct->add_field( [ 'id' => 'kb_contact_email',   'name' => 'Email',    'type' => 'text_email', 'attributes' => [ 'placeholder' => 'hello@kickback.pl' ] ] );
	$ct->add_field( [ 'id' => 'kb_contact_phone',   'name' => 'Telefon',  'type' => 'text', 'attributes' => [ 'placeholder' => '+48 500 100 100' ] ] );
	$ct_hours = $ct->add_field( [
		'id'      => 'kb_contact_hours',
		'name'    => 'Godziny otwarcia',
		'type'    => 'group',
		'options' => [ 'group_title' => 'Dzień {#}', 'add_button' => 'Dodaj dzień', 'remove_button' => 'Usuń', 'sortable' => true ],
	] );
	$ct->add_group_field( $ct_hours, [ 'id' => 'day',   'name' => 'Dzień',   'type' => 'text', 'attributes' => [ 'placeholder' => 'Poniedziałek — Piątek' ] ] );
	$ct->add_group_field( $ct_hours, [ 'id' => 'range', 'name' => 'Godziny', 'type' => 'text', 'attributes' => [ 'placeholder' => '9:00 — 21:00' ] ] );
	$ct_soc = $ct->add_field( [
		'id'      => 'kb_contact_socials',
		'name'    => 'Social media',
		'type'    => 'group',
		'options' => [ 'group_title' => 'Profil {#}', 'add_button' => 'Dodaj profil', 'remove_button' => 'Usuń', 'sortable' => true ],
	] );
	$ct->add_group_field( $ct_soc, [
		'id'      => 'network',
		'name'    => 'Sieć',
		'type'    => 'select',
		'default' => 'instagram',
		'options' => [
			'instagram' => 'Instagram',
			'youtube'   => 'YouTube',
			'tiktok'    => 'TikTok',
			'facebook'  => 'Facebook',
			'twitter'   => 'X / Twitter',
		],
	] );
	$ct->add_group_field( $ct_soc, [ 'id' => 'url', 'name' => 'URL profilu', 'type' => 'text_url' ] );
	$ct->add_field( [ 'id' => 'kb_contact_form_id', 'name' => 'Contact Form 7 — ID formularza (opcjonalne)', 'description' => 'Jeśli używasz CF7, wklej numeryczne ID.', 'type' => 'text', 'attributes' => [ 'placeholder' => '123' ] ] );

	// ═══════════════════════════════════════════════════════════════════
	// PER-PAGE: Salony / Lokalizacje
	// ═══════════════════════════════════════════════════════════════════
	$loc = new_cmb2_box( [
		'id'           => 'kb_locations_box',
		'title'        => 'Kickback — Salony / Lokalizacje',
		'object_types' => [ 'page' ],
		'show_on'      => [ 'key' => 'page-template', 'value' => 'page-store-locator.php' ],
	] );
	$loc_g = $loc->add_field( [
		'id'      => 'kb_locations',
		'name'    => 'Salony',
		'type'    => 'group',
		'options' => [ 'group_title' => 'Salon {#}', 'add_button' => 'Dodaj salon', 'remove_button' => 'Usuń', 'sortable' => true ],
	] );
	$loc->add_group_field( $loc_g, [ 'id' => 'city',     'name' => 'Miasto / nazwa salonu', 'type' => 'text' ] );
	$loc->add_group_field( $loc_g, [ 'id' => 'address',  'name' => 'Adres (każda linia w nowej linii)', 'type' => 'textarea_small', 'attributes' => [ 'rows' => 3 ] ] );
	$loc->add_group_field( $loc_g, [ 'id' => 'phone',    'name' => 'Telefon', 'type' => 'text', 'attributes' => [ 'placeholder' => '+48 22 000 00 00' ] ] );
	$loc->add_group_field( $loc_g, [ 'id' => 'hours',    'name' => 'Godziny otwarcia', 'type' => 'text', 'attributes' => [ 'placeholder' => 'Pn—Pt 10:00—19:00' ] ] );
	$loc->add_group_field( $loc_g, [ 'id' => 'maps_url', 'name' => 'Google Maps URL', 'type' => 'text_url' ] );

	// ═══════════════════════════════════════════════════════════════════
	// PER-PRODUCT: dodatkowe pola (Atrybuty)
	// ═══════════════════════════════════════════════════════════════════
	$prod = new_cmb2_box( [
		'id'           => 'kb_product_extras_box',
		'title'        => 'Dodatkowe informacje (Atrybuty)',
		'object_types' => [ 'product' ],
		'context'      => 'side',
		'priority'     => 'low',
	] );
	$prod->add_field( [ 'id' => 'kb_player_name',   'name' => 'Nazwisko zawodnika', 'description' => 'Puste = ukryte w Atrybutach.', 'type' => 'text' ] );
	$prod->add_field( [ 'id' => 'kb_player_number', 'name' => 'Numer zawodnika',    'description' => 'Puste = ukryte w Atrybutach.', 'type' => 'text' ] );
	$prod->add_field( [ 'id' => 'kb_material',      'name' => 'Skład materiału',    'type' => 'text', 'attributes' => [ 'placeholder' => 'np. 100% poliester' ] ] );

	// ═══════════════════════════════════════════════════════════════════
	// PER-TERM: banner kategorii (product_cat)
	// ═══════════════════════════════════════════════════════════════════
	$term = new_cmb2_box( [
		'id'           => 'kb_term_banner_box',
		'title'        => 'Baner kategorii (hero)',
		'object_types' => [ 'term' ],
		'taxonomies'   => [ 'product_cat' ],
	] );
	$term->add_field( [
		'id'          => 'category_banner',
		'name'        => 'Zdjęcie hero (jeśli puste — minimal text banner)',
		'type'        => 'file',
		'options'     => [ 'url' => false ],
		'description' => 'Pełnoekranowy banner z overlay i nazwą kategorii. Bez zdjęcia kategoria pokaże minimal banner stone bg.',
	] );

} );

/**
 * Seed defaults dla CMB2 groupów pierwsze otwarcie admin CMS.
 *
 * Bez tego klient widzi "1 empty record" w group repeater i myśli że tylko
 * 1 element jest na stronie. Pre-fill = klient widzi WSZYSTKIE faktyczne
 * elementy (9 klubów, 2 banery retro/legends, 3 kafelki topowe nazwiska)
 * z hardcoded defaults z templatów.
 *
 * Run TYLKO raz, kontrolowany flagą `kb_cms_seeded`. Klient potem edytuje
 * normalnie — usunięcie elementu z group jest persistent (flaga zostaje).
 */
add_action( 'admin_init', function () {
	// v3 — dodaje też kluby/reszta świata images (klient widzi co aktualnie
	// wyświetlone). Klient który już ma zapisane CMS images zostaje nietknięty
	// (foreach nie nadpisuje istniejących wartości).
	if ( (int) get_option( 'kb_cms_seeded' ) >= 4 ) {
		return;
	}
	if ( ! current_user_can( 'edit_theme_options' ) ) {
		return;
	}

	$home = get_option( 'kb_cms_home', [] );
	if ( ! is_array( $home ) ) {
		$home = [];
	}

	// 1) Topowe zespoły — 9 klubów (siatka herbów)
	if ( empty( $home['kb_tz_kluby'] ) ) {
		$kluby_default = [
			[ 'slug' => 'real-madrid',       'label' => 'Real Madrid',       'cat' => 'real-madrid' ],
			[ 'slug' => 'barcelona',         'label' => 'FC Barcelona',      'cat' => 'barcelona' ],
			[ 'slug' => 'chelsea',           'label' => 'Chelsea',           'cat' => 'chelsea' ],
			[ 'slug' => 'arsenal',           'label' => 'Arsenal',           'cat' => 'arsenal' ],
			[ 'slug' => 'manchester-united', 'label' => 'Manchester United', 'cat' => 'manchester-united' ],
			[ 'slug' => 'manchester-city',   'label' => 'Manchester City',   'cat' => 'manchester-city' ],
			[ 'slug' => 'juventus',          'label' => 'Juventus',          'cat' => 'juventus' ],
			[ 'slug' => 'bayern-munich',     'label' => 'Bayern Munich',     'cat' => 'bayern-munich' ],
			[ 'slug' => 'borussia-dortmund', 'label' => 'Borussia Dortmund', 'cat' => 'borussia-dortmund' ],
		];
		$home['kb_tz_kluby'] = [];
		// FORCE https — home.pl SSL terminator zwraca PHP request_scheme=http
	// nawet gdy front-end jest na HTTPS. Bez tego URLs idą mixed-content.
	$theme_uri = set_url_scheme( get_template_directory_uri(), 'https' );
		foreach ( $kluby_default as $k ) {
			$home['kb_tz_kluby'][] = [
				'image'    => $theme_uri . '/assets/images/crests/' . $k['slug'] . '.svg',
				'label'    => $k['label'],
				'url'      => home_url( '/kategoria-produktu/' . $k['cat'] . '/' ),
			];
		}
	}

	// 2) Retro / Legends — 2 banery
	if ( empty( $home['kb_rl'] ) ) {
		// FORCE https — home.pl SSL terminator zwraca PHP request_scheme=http
	// nawet gdy front-end jest na HTTPS. Bez tego URLs idą mixed-content.
	$theme_uri = set_url_scheme( get_template_directory_uri(), 'https' );
		$home['kb_rl'] = [
			[
				'image'           => $theme_uri . '/assets/images/photos/baner-kickback-1.webp',
				'headline'        => 'Retro',
				'headline_italic' => '(80s — 00s)',
				'cta_label'       => 'Sprawdź',
				'url'             => home_url( '/kategoria-produktu/retro/' ),
			],
			[
				'image'           => $theme_uri . '/assets/images/photos/banner-legends-1.webp',
				'headline'        => '',
				'headline_italic' => 'Legends',
				'cta_label'       => 'Sprawdź',
				'url'             => home_url( '/kategoria-produktu/legends/' ),
			],
		];
	}

	// 4) Hero — 3 default slajdy (obecny hero baner + 2 extra jako punkt startowy)
	if ( empty( $home['kb_hero_slides'] ) ) {
		$theme_uri = set_url_scheme( get_template_directory_uri(), 'https' );
		$home['kb_hero_slides'] = [
			[
				'image_desktop'    => $theme_uri . '/assets/images/photos/banner-glowny-pop.webp',
				'image_mobile'     => '',
				'eyebrow'          => 'Kickback · Sezon 25/26',
				'headline'         => 'Twoja koszulka,',
				'headline_italic'  => 'twoja historia.',
				'cta_label'        => 'Zobacz kolekcję',
				'cta_url'          => '#just-arrived',
			],
			[
				'image_desktop'    => $theme_uri . '/assets/images/photos/banner-reprezentacje.webp',
				'image_mobile'     => '',
				'eyebrow'          => 'Reprezentacje',
				'headline'         => 'Barwy narodowe,',
				'headline_italic'  => 'jedna pasja.',
				'cta_label'        => 'Zobacz reprezentacje',
				'cta_url'          => home_url( '/kategoria-produktu/reprezentacje/' ),
			],
			[
				'image_desktop'    => $theme_uri . '/assets/images/photos/baner-kickback-1.webp',
				'image_mobile'     => '',
				'eyebrow'          => 'Retro klasyki',
				'headline'         => 'Legendarne trykoty',
				'headline_italic'  => 'z lat 80s—00s.',
				'cta_label'        => 'Zobacz retro',
				'cta_url'          => home_url( '/kategoria-produktu/koszulki-pilkarskie-retro/' ),
			],
		];
	}

	// 3) Topowe nazwiska — 3 kafelki
	if ( empty( $home['kb_topowe'] ) ) {
		// FORCE https — home.pl SSL terminator zwraca PHP request_scheme=http
	// nawet gdy front-end jest na HTTPS. Bez tego URLs idą mixed-content.
	$theme_uri = set_url_scheme( get_template_directory_uri(), 'https' );
		$home['kb_topowe'] = [
			[
				'image' => $theme_uri . '/assets/images/photos/banner-ronaldo-1.webp',
				'label' => 'Ronaldo',
				'url'   => home_url( '/?s=Ronaldo&post_type=product' ),
			],
			[
				'image' => $theme_uri . '/assets/images/photos/banner-messi-pop.webp',
				'label' => 'Messi',
				'url'   => home_url( '/?s=Messi&post_type=product' ),
			],
			[
				'image' => $theme_uri . '/assets/images/photos/banner-otherheroes.webp',
				'label' => 'Other heroes',
				'url'   => home_url( '/sklep/?orderby=popularity' ),
			],
		];
	}

	// Single image fields — pre-fill URL z theme assets żeby klient widział
	// w admin co jest aktualnie wyświetlane na żywo. Klient może wgrać własne
	// zdjęcie (override) albo zostawić dotychczasowe.
	// FORCE https — home.pl SSL terminator zwraca PHP request_scheme=http
	// nawet gdy front-end jest na HTTPS. Bez tego URLs idą mixed-content.
	$theme_uri = set_url_scheme( get_template_directory_uri(), 'https' );
	$single_image_defaults = [
		'kb_hero_image'         => '/assets/images/photos/banner-glowny-pop.webp',
		'kb_para_image_desktop' => '/assets/images/photos/banner-karty-desktop.webp',
		'kb_para_image_mobile'  => '/assets/images/photos/banner-karty-mobile.webp',
		'kb_rep_l_image'        => '/assets/images/photos/banner-reprezentacje.webp',
		'kb_krs_l_image'        => '/assets/images/photos/banner-kluby-nowy.webp',
		'kb_krs_r_image'        => '/assets/images/photos/banner-resztaswiata-copy.webp',
		'kb_ak_image'           => '/assets/images/photos/banner-akcesoriabluzy.webp',
		'kb_jr_image'           => '/assets/images/photos/banner-junior-2.webp',
		'kb_kosz_image'         => '/assets/images/photos/banner-koszulki.webp',
	];
	foreach ( $single_image_defaults as $field_key => $rel_path ) {
		if ( empty( $home[ $field_key ] ) ) {
			$abs_path = get_template_directory() . $rel_path;
			if ( file_exists( $abs_path ) ) {
				$home[ $field_key ] = $theme_uri . $rel_path;
			}
		}
	}

	update_option( 'kb_cms_home', $home );
	update_option( 'kb_cms_seeded', 4 );
} );
