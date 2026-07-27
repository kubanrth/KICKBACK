<?php
/**
 * Kickback — theme bootstrap.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'KICKBACK_VERSION', wp_get_theme()->get( 'Version' ) );
define( 'KICKBACK_DIR', get_template_directory() );
define( 'KICKBACK_URI', get_template_directory_uri() );

require_once KICKBACK_DIR . '/inc/theme-setup.php';
require_once KICKBACK_DIR . '/inc/enqueue.php';
require_once KICKBACK_DIR . '/inc/nav-menus.php';
require_once KICKBACK_DIR . '/inc/menu-primary.php';
require_once KICKBACK_DIR . '/inc/woocommerce-hooks.php';
require_once KICKBACK_DIR . '/inc/omnibus.php';
require_once KICKBACK_DIR . '/inc/loyalty.php';
require_once KICKBACK_DIR . '/inc/loyalty-endpoint.php';
require_once KICKBACK_DIR . '/inc/loyalty-backfill.php';
require_once KICKBACK_DIR . '/inc/user-birthday.php';
if ( is_admin() ) {
	require_once KICKBACK_DIR . '/inc/admin-loyalty.php';
	require_once KICKBACK_DIR . '/inc/admin-cat-search.php';
}
require_once KICKBACK_DIR . '/inc/wygodne-zwroty.php';
require_once KICKBACK_DIR . '/inc/breadcrumbs.php';
require_once KICKBACK_DIR . '/inc/seo.php';
require_once KICKBACK_DIR . '/inc/google-analytics.php';
require_once KICKBACK_DIR . '/inc/menu-data.php';
require_once KICKBACK_DIR . '/inc/icon-helpers.php';
require_once KICKBACK_DIR . '/inc/color-map.php';
require_once KICKBACK_DIR . '/inc/cart-fragments.php';
require_once KICKBACK_DIR . '/inc/attribute-defaults.php';
require_once KICKBACK_DIR . '/inc/cli-seed.php';
require_once KICKBACK_DIR . '/inc/cli-seed-pages.php';
require_once KICKBACK_DIR . '/inc/cli-cat-descriptions.php';
require_once KICKBACK_DIR . '/inc/import-map.php';
require_once KICKBACK_DIR . '/inc/import-products.php';
require_once KICKBACK_DIR . '/inc/facetwp-config.php';
require_once KICKBACK_DIR . '/inc/smart-filters.php';
require_once KICKBACK_DIR . '/inc/term-description-format.php';
require_once KICKBACK_DIR . '/inc/term-links.php';
require_once KICKBACK_DIR . '/inc/mystery-box.php';
require_once KICKBACK_DIR . '/inc/blog-helpers.php';
// CMS — wczytujemy BEFORE acf-fields.php żeby shimy z cms-compat.php były
// dostępne dla templatów gdy ani ACF Pro ani CMB2 nie są aktywne (graceful
// degradation: kb_opt zwraca defaulty z templatów).
require_once KICKBACK_DIR . '/inc/cms-compat.php';
require_once KICKBACK_DIR . '/inc/cms-options-pages.php';
require_once KICKBACK_DIR . '/inc/cmb2-fields.php';
require_once KICKBACK_DIR . '/inc/acf-fields.php';
require_once KICKBACK_DIR . '/inc/perf.php';
require_once KICKBACK_DIR . '/inc/a11y.php';
require_once KICKBACK_DIR . '/inc/security.php';
require_once KICKBACK_DIR . '/inc/newsletter.php';
require_once KICKBACK_DIR . '/inc/cli-wady-sync.php';
require_once KICKBACK_DIR . '/inc/cli-catalog-sync.php';
require_once KICKBACK_DIR . '/inc/thankyou-upsell.php';
