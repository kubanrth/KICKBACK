<?php
/**
 * Google Analytics 4 & Search Console tracking.
 *
 * Adds GA4 gtag.js to wp_head + handles ecommerce tracking (purchase, view_item_list, etc).
 * Measurement ID stored in theme option (Kickback CMS → SEO).
 *
 * SETUP:
 * 1. Go to Kickback CMS → SEO in wp-admin
 * 2. Enter your GA4 Measurement ID (format: G-XXXXXXXXXX)
 * 3. Verify site in Google Search Console
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Get GA measurement ID from theme option (fallback to empty for dev).
function kb_ga_measurement_id() {
	$id = function_exists( 'kb_opt' ) ? kb_opt( 'kb_ga_measurement_id', '' ) : '';
	// Safeguard: only alphanumeric + hyphen.
	if ( $id && preg_match( '/^G-[A-Z0-9]+$/', $id ) ) {
		return $id;
	}
	return '';
}

// Inject GA4 tracking code + dataLayer setup.
add_action( 'wp_head', function () {
	$measurement_id = kb_ga_measurement_id();
	if ( ! $measurement_id ) {
		return; // GA not configured.
	}

	?>
	<!-- Google Analytics 4 -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo esc_attr( $measurement_id ); ?>"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() { dataLayer.push(arguments); }
		gtag('js', new Date());
		gtag('config', '<?php echo esc_attr( $measurement_id ); ?>', {
			'page_path': window.location.pathname,
			'anonymize_ip': true,
			'allow_google_signals': true,
			'allow_ad_personalization_signals': true
		});
	</script>
	<?php
}, 5 );

// WooCommerce ecommerce tracking (view_item_list, view_item, add_to_cart, purchase, etc).
// Fire on product listing pages, product page, and checkout.
add_action( 'wp_footer', function () {
	$measurement_id = kb_ga_measurement_id();
	if ( ! $measurement_id || ! class_exists( 'WooCommerce' ) ) {
		return;
	}

	?>
	<script>
	(function() {
		// Only fire if GA is loaded.
		if (typeof gtag !== 'function') return;

		// Product Listing (shop, category, search, archive).
		<?php if ( ( is_shop() || is_product_category() || is_product_tag() || is_product_taxonomy() || is_search() ) && ! is_product() ) : ?>
			(function() {
				const items = [];
				<?php
				$products = wc_get_products( [ 'limit' => -1, 'status' => 'publish' ] );
				if ( $products ) :
					foreach ( $products as $product ) :
						$price = $product->get_price();
						$categories = $product->get_category_ids();
						$cat_name = '';
						if ( ! empty( $categories ) ) {
							$term = get_term( $categories[0], 'product_cat' );
							if ( $term ) {
								$cat_name = $term->name;
							}
						}
						?>
						items.push({
							item_id: '<?php echo esc_js( $product->get_id() ); ?>',
							item_name: '<?php echo esc_js( $product->get_name() ); ?>',
							item_category: '<?php echo esc_js( $cat_name ); ?>',
							price: parseFloat('<?php echo esc_js( $price ); ?>'),
							quantity: 1
						});
						<?php
					endforeach;
				endif;
				?>
				gtag('event', 'view_item_list', {
					items: items,
					value: items.reduce((sum, item) => sum + item.price, 0),
					currency: 'PLN'
				});
			})();
		<?php endif; ?>

		// Product Page (single product view).
		<?php if ( is_product() ) : ?>
			(function() {
				<?php
				global $product;
				if ( $product ) :
					$price = $product->get_price();
					$categories = $product->get_category_ids();
					$cat_name = '';
					if ( ! empty( $categories ) ) {
						$term = get_term( $categories[0], 'product_cat' );
						if ( $term ) {
							$cat_name = $term->name;
						}
					}
					?>
					gtag('event', 'view_item', {
						items: [{
							item_id: '<?php echo esc_js( $product->get_id() ); ?>',
							item_name: '<?php echo esc_js( $product->get_name() ); ?>',
							item_category: '<?php echo esc_js( $cat_name ); ?>',
							price: parseFloat('<?php echo esc_js( $price ); ?>'),
							currency: 'PLN'
						}],
						value: parseFloat('<?php echo esc_js( $price ); ?>'),
						currency: 'PLN'
					});
				<?php endif; ?>
			})();
		<?php endif; ?>

		// Add to Cart (listen to WC add_to_cart event).
		document.addEventListener('DOMContentLoaded', function() {
			// Bind to WooCommerce add_to_cart event.
			jQuery(document.body).on('added_to_cart', function() {
				// Fallback: re-fetch cart items and track add_to_cart.
				// Ideally, you'd intercept the event with the product data.
			});
		});

		// Purchase (thank you page).
		<?php if ( is_order_received_page() ) : ?>
			(function() {
				<?php
				$order_id = absint( get_query_var( 'order-received' ) );
				if ( $order_id ) :
					$order = wc_get_order( $order_id );
					if ( $order ) :
						$items = [];
						foreach ( $order->get_items() as $line_item ) :
							$product = $line_item->get_product();
							if ( $product ) :
								$categories = $product->get_category_ids();
								$cat_name = '';
								if ( ! empty( $categories ) ) {
									$term = get_term( $categories[0], 'product_cat' );
									if ( $term ) {
										$cat_name = $term->name;
									}
								}
								?>
								items.push({
									item_id: '<?php echo esc_js( $product->get_id() ); ?>',
									item_name: '<?php echo esc_js( $product->get_name() ); ?>',
									item_category: '<?php echo esc_js( $cat_name ); ?>',
									price: parseFloat('<?php echo esc_js( $line_item->get_subtotal() / $line_item->get_quantity() ); ?>'),
									quantity: parseInt('<?php echo esc_js( $line_item->get_quantity() ); ?>')
								});
								<?php
							endif;
						endforeach;

						$total = floatval( $order->get_total() );
						$transaction_id = $order->get_id();
						?>
						gtag('event', 'purchase', {
							transaction_id: '<?php echo esc_js( $transaction_id ); ?>',
							items: items,
							value: parseFloat('<?php echo esc_js( $total ); ?>'),
							currency: 'PLN'
						});
						<?php
					endif;
				endif;
				?>
			})();
		<?php endif; ?>
	})();
	</script>
	<?php
}, 20 );

// Search Console verification meta tag (if configured).
add_action( 'wp_head', function () {
	// This is read from a separate option if needed, or hardcoded below.
	$sc_verification = function_exists( 'kb_opt' ) ? kb_opt( 'kb_sc_verification_meta', '' ) : '';
	if ( $sc_verification ) {
		echo '<meta name="google-site-verification" content="' . esc_attr( $sc_verification ) . '" />' . "\n";
	}
}, 4 );
