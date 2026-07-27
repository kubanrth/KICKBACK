<?php
/**
 * Primary nav — pobieranie itemów z WP menu (Wygląd → Menu, lokalizacja `primary`)
 * z fallbackiem do hardcoded struktury dla świeżego theme installa.
 *
 * Zachowanie:
 *  - Item bez children + URL kończy się na jednym ze slugs mega ("kluby", "reprezentacje",
 *    "karty-pilkarskie", "mystery-box") → rendrowany jako top-button z mega-menu (kb_menu_data).
 *  - Item z children → mały text-only dropdown (jak "Pozostałe").
 *  - Item bez children i bez mega match → zwykły link (jak "Nowości", "Kickback Club").
 *
 * WP-CLI: `wp kb-menu import` tworzy menu "Menu główne" z domyślnymi 7 pozycjami
 * (Nowości / Kluby / Reprezentacje / Karty / Mystery Box / Pozostałe + submenus / Kickback Club)
 * i przypisuje do lokalizacji `primary`.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Slugi którym w templacie dopinamy mega-menu (z kb_menu_data). */
function kb_primary_mega_slugs(): array {
	return [ 'kluby', 'reprezentacje', 'karty-pilkarskie', 'mystery-box' ];
}

/**
 * Zwraca strukturę top-level itemów. Priorytet: WP menu (lokalizacja `primary`),
 * fallback: hardcoded array.
 *
 * @return array<int, array{label:string, url:string, slug:string, children:array}>
 */
function kb_get_primary_menu_items(): array {
	$locations = get_nav_menu_locations();
	$menu_id   = isset( $locations['primary'] ) ? (int) $locations['primary'] : 0;

	if ( $menu_id > 0 ) {
		$wp_items = wp_get_nav_menu_items( $menu_id, [ 'update_post_term_cache' => false ] );
		if ( is_array( $wp_items ) && ! empty( $wp_items ) ) {
			return kb_primary_menu_tree( $wp_items );
		}
	}
	return kb_primary_menu_fallback();
}

/** Buduje 2-poziomową strukturę z płaskiej listy WP menu items. */
function kb_primary_menu_tree( array $items ): array {
	$normalized = [];
	foreach ( $items as $it ) {
		$normalized[ (int) $it->ID ] = [
			'id'       => (int) $it->ID,
			'parent'   => (int) $it->menu_item_parent,
			'label'    => (string) $it->title,
			'url'      => (string) $it->url,
			'slug'     => kb_extract_slug_from_url( (string) $it->url ),
			'children' => [],
		];
	}

	// Zbierz children pod rodzicami.
	$roots = [];
	foreach ( $normalized as $id => $it ) {
		if ( $it['parent'] > 0 && isset( $normalized[ $it['parent'] ] ) ) {
			$normalized[ $it['parent'] ]['children'][] = $it;
		} else {
			$roots[] = $id;
		}
	}
	$tree = [];
	foreach ( $roots as $id ) {
		$tree[] = $normalized[ $id ];
	}
	return $tree;
}

/** Ostatni non-empty segment ścieżki URL — np. `/kategoria-produktu/kluby/` → `kluby`. */
function kb_extract_slug_from_url( string $url ): string {
	if ( '' === $url || '#' === $url ) return '';
	$path = wp_parse_url( $url, PHP_URL_PATH );
	if ( ! $path ) return '';
	$parts = array_values( array_filter( explode( '/', (string) $path ), 'strlen' ) );
	return (string) ( end( $parts ) ?: '' );
}

/**
 * Fallback — obecna hardcoded struktura z site-header.php.
 * Używany gdy WP menu `primary` niezdefiniowane lub puste.
 */
function kb_primary_menu_fallback(): array {
	return [
		[ 'label' => 'Nowości',      'url' => kb_term_url( 'nowosci' ),          'slug' => 'nowosci',          'children' => [] ],
		[ 'label' => 'Kluby',        'url' => kb_term_url( 'kluby' ),            'slug' => 'kluby',            'children' => [] ],
		[ 'label' => 'Reprezentacje','url' => kb_term_url( 'reprezentacje' ),    'slug' => 'reprezentacje',    'children' => [] ],
		[ 'label' => 'Karty',        'url' => kb_term_url( 'karty-pilkarskie' ), 'slug' => 'karty-pilkarskie', 'children' => [] ],
		[ 'label' => 'Mystery Box',  'url' => kb_term_url( 'mystery-box' ),      'slug' => 'mystery-box',      'children' => [] ],
		[ 'label' => 'Pozostałe',    'url' => '#',                               'slug' => '',                 'children' => [
			[ 'label' => 'Best Of',              'url' => kb_term_url( 'best-of' ),         'slug' => 'best-of',         'children' => [] ],
			[ 'label' => 'Koszulki nowe z metką','url' => kb_term_url( 'nowe-z-metka' ),    'slug' => 'nowe-z-metka',    'children' => [] ],
			[ 'label' => 'Bluzy i kurtki',       'url' => kb_term_url( 'bluzy-i-kurtki' ),  'slug' => 'bluzy-i-kurtki',  'children' => [] ],
			[ 'label' => 'Reszta świata',        'url' => kb_term_url( 'reszta-swiata' ),   'slug' => 'reszta-swiata',   'children' => [] ],
		] ],
	];
}

// ─── WP-CLI: import obecnej struktury do WP menu ───

if ( defined( 'WP_CLI' ) && WP_CLI ) {
	WP_CLI::add_command( 'kb-menu', new class {

		/**
		 * Utwórz „Menu główne" w WP z domyślnymi pozycjami i przypisz do lokalizacji `primary`.
		 * Idempotent — powtórne wywołanie NIE tworzy duplikatu, ale ostrzega.
		 * `wp kb-menu import`
		 */
		public function import( $args, $assoc ) {
			$menu_name = 'Menu główne';
			$location  = 'primary';

			$existing = wp_get_nav_menu_object( $menu_name );
			if ( $existing ) {
				WP_CLI::warning( "Menu „{$menu_name}" . '" już istnieje (ID ' . $existing->term_id . '). Pomijam tworzenie itemów.' );
				$menu_id = (int) $existing->term_id;
			} else {
				$menu_id = wp_create_nav_menu( $menu_name );
				if ( is_wp_error( $menu_id ) ) {
					WP_CLI::error( 'Nie utworzono menu: ' . $menu_id->get_error_message() );
				}
				WP_CLI::line( "Utworzono menu „{$menu_name}" . '" (ID ' . $menu_id . ')' );

				// Wstaw items (kolejność się zachowa przez menu_order).
				$structure = [
					[ 'title' => 'Nowości',      'url' => kb_term_url( 'nowosci' ) ],
					[ 'title' => 'Kluby',        'url' => kb_term_url( 'kluby' ) ],
					[ 'title' => 'Reprezentacje','url' => kb_term_url( 'reprezentacje' ) ],
					[ 'title' => 'Karty',        'url' => kb_term_url( 'karty-pilkarskie' ) ],
					[ 'title' => 'Mystery Box',  'url' => kb_term_url( 'mystery-box' ) ],
					[ 'title' => 'Pozostałe',    'url' => '#', 'children' => [
						[ 'title' => 'Best Of',               'url' => kb_term_url( 'best-of' ) ],
						[ 'title' => 'Koszulki nowe z metką', 'url' => kb_term_url( 'nowe-z-metka' ) ],
						[ 'title' => 'Bluzy i kurtki',        'url' => kb_term_url( 'bluzy-i-kurtki' ) ],
						[ 'title' => 'Reszta świata',         'url' => kb_term_url( 'reszta-swiata' ) ],
					] ],
					[ 'title' => 'Kickback Club', 'url' => home_url( '/kickback-club/' ) ],
				];

				$added = 0;
				foreach ( $structure as $item ) {
					$parent_id = wp_update_nav_menu_item( $menu_id, 0, [
						'menu-item-title'     => $item['title'],
						'menu-item-url'       => $item['url'],
						'menu-item-status'    => 'publish',
						'menu-item-type'      => 'custom',
					] );
					if ( is_wp_error( $parent_id ) ) {
						WP_CLI::warning( 'Fail: ' . $item['title'] . ' — ' . $parent_id->get_error_message() );
						continue;
					}
					$added++;

					if ( ! empty( $item['children'] ) ) {
						foreach ( $item['children'] as $child ) {
							$child_id = wp_update_nav_menu_item( $menu_id, 0, [
								'menu-item-title'     => $child['title'],
								'menu-item-url'       => $child['url'],
								'menu-item-parent-id' => $parent_id,
								'menu-item-status'    => 'publish',
								'menu-item-type'      => 'custom',
							] );
							if ( ! is_wp_error( $child_id ) ) $added++;
						}
					}
				}
				WP_CLI::line( "Dodano {$added} pozycji menu." );
			}

			// Przypnij do lokalizacji `primary`.
			$locations = get_theme_mod( 'nav_menu_locations', [] );
			$locations[ $location ] = $menu_id;
			set_theme_mod( 'nav_menu_locations', $locations );

			WP_CLI::success( sprintf( 'Menu „%s" (ID %d) przypięte do lokalizacji „%s". Edytuj w wp-admin → Wygląd → Menu.', $menu_name, $menu_id, $location ) );
		}

		/**
		 * Pełne 3-poziomowe seed z kb_menu_data_hardcoded — tops + subs + items + flats.
		 * Nadpisuje istniejące „Menu główne" (idempotent — bezpieczne re-run).
		 * `wp kb-menu seed-full [--dry-run]`
		 */
		public function seed_full( $args, $assoc ) {
			$dry       = ! empty( $assoc['dry-run'] );
			$menu_name = 'Menu główne';
			$location  = 'primary';

			if ( ! function_exists( 'kb_menu_data_hardcoded' ) ) {
				WP_CLI::error( 'kb_menu_data_hardcoded() niedostępne. Deploy theme?' );
			}
			$data = kb_menu_data_hardcoded();

			$existing = wp_get_nav_menu_object( $menu_name );
			if ( $existing ) {
				$menu_id = (int) $existing->term_id;
				WP_CLI::line( "Menu „{$menu_name}" . '" istnieje (ID ' . $menu_id . ') — czyszczę items…' );
				if ( ! $dry ) {
					$old_items = wp_get_nav_menu_items( $menu_id, [ 'post_status' => 'any' ] );
					if ( is_array( $old_items ) ) {
						foreach ( $old_items as $it ) {
							wp_delete_post( (int) $it->ID, true );
						}
						WP_CLI::line( 'Usunięto ' . count( $old_items ) . ' starych items.' );
					}
				}
			} else {
				if ( $dry ) {
					$menu_id = 0;
					WP_CLI::line( "[dry-run] utworzy menu „{$menu_name}" . '"' );
				} else {
					$menu_id = wp_create_nav_menu( $menu_name );
					if ( is_wp_error( $menu_id ) ) {
						WP_CLI::error( 'Nie utworzono menu: ' . $menu_id->get_error_message() );
					}
					WP_CLI::line( "Utworzono menu „{$menu_name}" . '" (ID ' . $menu_id . ')' );
				}
			}

			$total    = 0;
			$add_item = function ( array $props, int $parent = 0 ) use ( $menu_id, $dry, &$total ) {
				$total++;
				if ( $dry ) return 0;
				$props['menu-item-status'] = 'publish';
				$props['menu-item-type']   = 'custom';
				if ( $parent > 0 ) $props['menu-item-parent-id'] = $parent;
				$id = wp_update_nav_menu_item( $menu_id, 0, $props );
				return is_wp_error( $id ) ? 0 : (int) $id;
			};

			// Kolejność top-nav: Nowości → 4× mega → Pozostałe (dropdown ze zbieraniem drobnych flats).
			// Nowości najpierw (najczęściej klikane), Pozostałe na końcu jako drop-down catchall.

			// 1) Nowości (top-level flat, na początku)
			$add_item( [
				'menu-item-title' => 'Nowości',
				'menu-item-url'   => kb_term_url( 'nowosci' ),
			] );

			// 2) tops → subs → items (mega-menu)
			foreach ( $data['tops'] ?? [] as $top ) {
				$top_id = $add_item( [
					'menu-item-title' => $top['label'],
					'menu-item-url'   => kb_term_url( $top['slug'] ),
				] );
				foreach ( $top['subs'] ?? [] as $sub_slug => $sub ) {
					$sub_id = $add_item( [
						'menu-item-title' => $sub['label'],
						'menu-item-url'   => kb_term_url( $sub_slug ),
					], $top_id );
					foreach ( $sub['items'] ?? [] as $item ) {
						$add_item( [
							'menu-item-title' => $item[1],
							'menu-item-url'   => kb_term_url( $item[0] ),
						], $sub_id );
					}
				}
			}

			// 3) Pozostałe (top-level DROPDOWN) — zbiera Best Of, Nowe z metką, Kurtki i bluzy
			$misc_parent = $add_item( [
				'menu-item-title' => 'Pozostałe',
				'menu-item-url'   => kb_term_url( 'pozostale' ),
			] );
			foreach ( [ 'best-of' => 'Best Of', 'nowe-z-metka' => 'Nowe z metką', 'bluzy-i-kurtki' => 'Kurtki i bluzy' ] as $slug => $label ) {
				$add_item( [
					'menu-item-title' => $label,
					'menu-item-url'   => kb_term_url( $slug ),
				], $misc_parent );
			}

			// Blog/O nas/Kontakt/Kickback Club NIE są w seed —
			// mobile-drawer.php ma je hardcoded (dedykowany styling z logo dla Kickback Club).

			if ( ! $dry ) {
				$locations              = get_theme_mod( 'nav_menu_locations', [] );
				$locations[ $location ] = $menu_id;
				set_theme_mod( 'nav_menu_locations', $locations );
			}

			WP_CLI::success( sprintf(
				'%s: %d pozycji %s do menu (ID %d), lokalizacja „%s".',
				$dry ? '[dry-run]' : 'Seed',
				$total,
				$dry ? 'zostałoby dodanych' : 'dodane',
				$menu_id,
				$location
			) );
		}

		/**
		 * Diagnostyka — pokaż stan primary.
		 * `wp kb-menu status`
		 */
		public function status() {
			$locations = get_nav_menu_locations();
			$menu_id   = isset( $locations['primary'] ) ? (int) $locations['primary'] : 0;
			if ( $menu_id > 0 ) {
				$menu  = wp_get_nav_menu_object( $menu_id );
				$items = wp_get_nav_menu_items( $menu_id );
				WP_CLI::line( "Location `primary` → menu „{$menu->name}" . '" (ID ' . $menu_id . ') — ' . ( is_array( $items ) ? count( $items ) : 0 ) . ' items' );
			} else {
				WP_CLI::line( 'Location `primary` NIE ma przypisanego menu — używany jest fallback z kodu.' );
			}
		}
	} );
}
