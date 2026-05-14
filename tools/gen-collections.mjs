// Generates collection HTML pages from a single taxonomy source.
// Run: node sites/release/tools/gen-collections.mjs
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const HERE = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..'); // sites/release
const OUT  = path.join(ROOT, 'collections');

// =============================================================
// TAXONOMY — single source of truth.
// Each entry: { slug, label, parent, kind, image?, products? }
// kind ∈ 'group' | 'league' | 'club' | 'continent' | 'team' | 'maker' | 'series' | 'tier' | 'flat'
// =============================================================
const C = [];
function add(slug, label, parent, kind){ C.push({ slug, label, parent, kind }); }

// ---------- TOP ----------
add('kluby',         'Kluby',          null, 'group');
add('reprezentacje', 'Reprezentacje',  null, 'group');
add('karty-pilkarskie','Karty piłkarskie',null,'group');
add('mystery-box',   'Mystery Box',    null, 'group');
add('bluzy-i-kurtki','Bluzy i kurtki', null, 'flat');
add('nowe-z-metka',  'Koszulki nowe z metką', null, 'flat');
add('best-of',       'Best Of',        null, 'flat');
add('nowosci',       'Nowości',        null, 'flat');
add('reszta-swiata', 'Reszta świata',  'kluby', 'group');

// ---------- KLUBY ----------
const KL = (slug, label, league) => add(slug, label, league, 'club');

add('premier-league',     'Premier League',     'kluby', 'league');
['arsenal','aston-villa','bournemouth','brentford','brighton','burnley','chelsea','crystal-palace','everton','fulham','leeds-utd','liverpool','manchester-city','manchester-utd','newcastle-utd','nottingham-forest','sunderland','tottenham','west-ham','wolverhampton'].forEach((s,i)=>{
  const labels = ['Arsenal','Aston Villa','Bournemouth','Brentford','Brighton','Burnley','Chelsea','Crystal Palace','Everton','Fulham','Leeds Utd.','Liverpool','Manchester City','Manchester Utd.','Newcastle Utd.','Nottingham Forest','Sunderland','Tottenham','West Ham','Wolverhampton'];
  KL(s, labels[i], 'premier-league');
});

add('efl-championship',   'EFL Championship',   'kluby', 'league');
['derby','hull-city','leicester','millwall','southampton','swansea','sheffield-utd','qpr'].forEach((s,i)=>{
  const labels = ['Derby','Hull City','Leicester','Millwall','Southampton','Swansea','Sheffield Utd.','QPR'];
  KL(s, labels[i], 'efl-championship');
});

add('la-liga',            'La Liga',            'kluby', 'league');
['athletic-bilbao','atletico-madrid','barcelona','cd-tenerife','girona','malaga','real-betis','real-madrid','real-sociedad','sevilla','valencia','villareal'].forEach((s,i)=>{
  const labels = ['Athletic Bilbao','Atlético Madrid','Barcelona','CD Tenerife','Girona','Málaga','Real Betis','Real Madrid','Real Sociedad','Sevilla','Valencia','Villarreal'];
  KL(s, labels[i], 'la-liga');
});

add('serie-a',            'Serie A',            'kluby', 'league');
['ac-milan','as-roma','atalanta','bologna','como','fiorentina','inter-milan','juventus','lazio-roma','napoli','parma','torino','venezia','udinese'].forEach((s,i)=>{
  const labels = ['AC Milan','AS Roma','Atalanta','Bologna','Como','Fiorentina','Inter Milan','Juventus','Lazio Roma','Napoli','Parma','Torino','Venezia','Udinese'];
  KL(s, labels[i], 'serie-a');
});

add('serie-b',            'Serie B',            'kluby', 'league');
['sampdoria','monza','pescara'].forEach((s,i)=>{
  const labels = ['Sampdoria','Monza','Pescara'];
  KL(s, labels[i], 'serie-b');
});

add('bundesliga',         'Bundesliga',         'kluby', 'league');
['bayer-leverkusen','bayern-munich','borussia-dortmund','borussia-monchengladbach','eintracht-frankfurt','rb-leipzig','union-berlin','vfb-stuttgart'].forEach((s,i)=>{
  const labels = ['Bayer 04 Leverkusen','Bayern Munich','Borussia Dortmund','Borussia Mönchengladbach','Eintracht Frankfurt','RB Leipzig','Union Berlin','VFB Stuttgart'];
  KL(s, labels[i], 'bundesliga');
});

add('ligue-1',            'Ligue 1',            'kluby', 'league');
['as-monaco','losc-lille','olympique-marseille','olympique-lyon','psg'].forEach((s,i)=>{
  const labels = ['AS Monaco','LOSC Lille','Olympique Marseille','Olympique Lyon','PSG'];
  KL(s, labels[i], 'ligue-1');
});

add('mls',                'MLS',                'kluby', 'league');
['chicago-fire','inter-miami','la-galaxy','new-york-fc','orlando-city','seattle-sounders'].forEach((s,i)=>{
  const labels = ['Chicago Fire','Inter Miami','LA Galaxy','New York FC','Orlando City','Seattle Sounders'];
  KL(s, labels[i], 'mls');
});

add('eredivisie',         'Eredivisie',         'kluby', 'league');
['ajax-amsterdam','feyenoord','psv-eindhoven'].forEach((s,i)=>{
  const labels = ['Ajax Amsterdam','Feyenoord','PSV Eindhoven'];
  KL(s, labels[i], 'eredivisie');
});

add('liga-portugal',      'Liga Portugal',      'kluby', 'league');
['benfica-lisboa','sporting','porto'].forEach((s,i)=>{
  const labels = ['Benfica Lizbona','Sporting','Porto'];
  KL(s, labels[i], 'liga-portugal');
});

add('ekstraklasa',        'Ekstraklasa',        'kluby', 'league');
['lech-poznan','legia-warszawa','wisla-krakow'].forEach((s,i)=>{
  const labels = ['Lech Poznań','Legia Warszawa','Wisła Kraków'];
  KL(s, labels[i], 'ekstraklasa');
});

// Reszta świata
add('saudi-pro-league',     'Saudi Pro League',     'reszta-swiata', 'league');
['al-hilal','al-nassr'].forEach((s,i)=>{ KL(s,['Al Hilal','Al Nassr'][i], 'saudi-pro-league'); });

add('super-lig',            'Super Lig',            'reszta-swiata', 'league');
['besiktas','galatasaray','fenerbahce'].forEach((s,i)=>{ KL(s,['Beşiktaş','Galatasaray','Fenerbahçe'][i], 'super-lig'); });

add('scottish-premiership', 'Scottish Premiership', 'reszta-swiata', 'league');
['celtic','rangers'].forEach((s,i)=>{ KL(s,['Celtic','Rangers'][i], 'scottish-premiership'); });

add('superleague-ellada',   'Superleague Ellada',   'reszta-swiata', 'league');
['aek-athens','paok-saloniki','panathinaikos','olympiakos'].forEach((s,i)=>{ KL(s,['AEK Athens','PAOK Saloniki','Panathinaikos','Olympiakos'][i], 'superleague-ellada'); });

// ---------- REPREZENTACJE ----------
const NT = (slug, label, continent) => add(slug, label, continent, 'team');
add('reprezentacje-europa',  'Europa',  'reprezentacje', 'continent');
['anglia','belgia','chorwacja','czechy','francja','grecja','holandia','hiszpania','niemcy','portugalia','polska','wlochy'].forEach((s,i)=>{
  const labels=['Anglia','Belgia','Chorwacja','Czechy','Francja','Grecja','Holandia','Hiszpania','Niemcy','Portugalia','Polska','Włochy'];
  NT('reprezentacja-'+s, labels[i], 'reprezentacje-europa');
});
add('reprezentacje-ameryka', 'Ameryka', 'reprezentacje', 'continent');
['argentyna','brazylia','chile','ekwador','kolumbia','urugwaj','usa'].forEach((s,i)=>{
  const labels=['Argentyna','Brazylia','Chile','Ekwador','Kolumbia','Urugwaj','USA'];
  NT('reprezentacja-'+s, labels[i], 'reprezentacje-ameryka');
});
add('reprezentacje-azja',    'Azja',    'reprezentacje', 'continent');
['australia','japonia','korea-poludniowa'].forEach((s,i)=>{
  const labels=['Australia','Japonia','Korea Południowa'];
  NT('reprezentacja-'+s, labels[i], 'reprezentacje-azja');
});
add('reprezentacje-afryka',  'Afryka',  'reprezentacje', 'continent');
['algieria','egipt','kamerun','maroko','senegal','wybrzeze-kosci-sloniowej'].forEach((s,i)=>{
  const labels=['Algieria','Egipt','Kamerun','Maroko','Senegal','Wybrzeże Kości Słoniowej'];
  NT('reprezentacja-'+s, labels[i], 'reprezentacje-afryka');
});

// ---------- KARTY ----------
const SR = (slug, label, maker) => add(slug, label, maker, 'series');
add('karty-daka',   'DAKA',   'karty-pilkarskie', 'maker');
['ac-milan','barcelona','belgium','inter-milan','juventus','manchester-city','real-madrid'].forEach(s=>{
  const labelMap = {'ac-milan':'AC Milan','barcelona':'Barcelona','belgium':'Belgia','inter-milan':'Inter Milan','juventus':'Juventus','manchester-city':'Manchester City','real-madrid':'Real Madrid'};
  SR('daka-top-audience-'+s, 'Top Audience '+labelMap[s], 'karty-daka');
});
add('karty-topps',  'Topps',  'karty-pilkarskie', 'maker');
['chrome','merlin'].forEach(s=>{ SR('topps-'+s, 'Topps '+s[0].toUpperCase()+s.slice(1), 'karty-topps'); });
['arsenal','atletico-madrid','chelsea','barcelona','bayern-munich','liverpool','manchester-city','manchester-utd','psg','real-madrid'].forEach(s=>{
  const labelMap = {'arsenal':'Arsenal','atletico-madrid':'Atlético Madrid','chelsea':'Chelsea','barcelona':'Barcelona','bayern-munich':'Bayern Munich','liverpool':'Liverpool','manchester-city':'Manchester City','manchester-utd':'Manchester Utd.','psg':'PSG','real-madrid':'Real Madrid'};
  SR('topps-'+s, 'Topps '+labelMap[s], 'karty-topps');
});
add('karty-panini', 'Panini', 'karty-pilkarskie', 'maker');
['world-cup-2026','euro-2012'].forEach(s=>{
  const labelMap={'world-cup-2026':'World Cup 2026','euro-2012':'Euro 2012'};
  SR('panini-'+s, 'Panini '+labelMap[s], 'karty-panini');
});

// ---------- MYSTERY BOX ----------
// Three sub-groups, each with its own set of tier products.
add('mystery-top5',          'Top 5 Lig',     'mystery-box',  'group');
['standard','premium','hero','icon'].forEach(s=>{
  const labels={'standard':'Standard','premium':'Premium','hero':'Hero','icon':'Icon'};
  add('mystery-top5-'+s,         labels[s], 'mystery-top5', 'tier');
});
add('mystery-reprezentacje',          'Reprezentacje', 'mystery-box',          'group');
['standard','premium','hero'].forEach(s=>{
  const labels={'standard':'Standard','premium':'Premium','hero':'Hero'};
  add('mystery-reprezentacje-'+s, labels[s], 'mystery-reprezentacje', 'tier');
});
add('mystery-szalik',                 'Szalik',        'mystery-box',          'group');
add('mystery-szalik-top5',         'TOP 5',         'mystery-szalik', 'tier');
add('mystery-szalik-reszta-swiata','Reszta Świata', 'mystery-szalik', 'tier');

// =============================================================
// helpers
// =============================================================
const bySlug = Object.fromEntries(C.map(c => [c.slug, c]));
const children = slug => C.filter(c => c.parent === slug);
function chain(slug){
  const out=[]; let cur = bySlug[slug];
  while(cur){ out.unshift(cur); cur = cur.parent ? bySlug[cur.parent] : null; }
  return out;
}

// Hero image per category — re-use existing brand_assets where it makes sense, else color placeholder
const HERO_COLOR = {
  'kluby':           '0a0a0a',
  'reprezentacje':   '1a1a1a',
  'karty-pilkarskie':'1a1410',
  'mystery-box':     '0a0a0a',
  'bluzy-i-kurtki':  '1a1a1a',
  'nowe-z-metka':    'f3f0e9',
  'best-of':         '0a0a0a',
  'nowosci':         'f3f0e9',
  'reszta-swiata':   '1a1a1a',
};
const HERO_IMG = {
  'kluby':         '../brand_assets/photos/banner-kluby.webp',
  'reprezentacje': '../brand_assets/photos/banner-reprezentacje.webp',
  'reszta-swiata': '../brand_assets/photos/banner-resztaswiata.webp',
  'nowosci':       '../brand_assets/photos/baner-glowny.webp',
};
function heroBg(cat){
  if (HERO_IMG[cat.slug]) return `<img src="${HERO_IMG[cat.slug]}" alt="${cat.label}" class="absolute inset-0 h-full w-full object-cover opacity-60"/>`;
  // For league/club/team/series/tier: solid-ish dark placeholder
  const color = HERO_COLOR[cat.slug] || (cat.kind === 'club' || cat.kind === 'team' || cat.kind === 'league' ? '1a1a1a' : '0e0e0e');
  return `<div class="absolute inset-0" style="background:#${color}"></div>`;
}

// Sample products for leaf pages (placeholder grid)
function sampleProducts(cat){
  const palettes = ['9c876a','c2b29a','3d3a30','1a1a1a','8c2a1f','a52424','c4b48c','e8d8b0','1f3fa6','3f8a45','e0d2b4','8e6b44'];
  const titles = (cat.kind === 'club' || cat.kind === 'team')
    ? [`${cat.label} Home 25/26`, `${cat.label} Away 25/26`, `${cat.label} Third 25/26`, `${cat.label} Retro 99/00`, `${cat.label} Retro 02/03`, `${cat.label} Training`, `${cat.label} Junior`, `${cat.label} Goalkeeper`]
    : (cat.kind === 'series' ? [`${cat.label} Box`, `${cat.label} Singles`, `${cat.label} Pack 25`, `${cat.label} Pack 50`, `${cat.label} Premium`, `${cat.label} Limited`]
    : [`Koszulka retro`, `Koszulka home`, `Koszulka away`, `Bluza vintage`, `Akcesoria`, `Mystery box`, `Karty piłkarskie`, `Limited edition`]);
  const prices = [89, 119, 149, 179, 219, 249, 279, 329];
  return titles.slice(0,8).map((t, i) => ({
    title: t,
    price: prices[i % prices.length],
    color: palettes[i % palettes.length],
    cat: bySlug[cat.parent]?.label || cat.label
  }));
}

// =============================================================
// TEMPLATE
// =============================================================
function breadcrumbHtml(cat){
  const chain_ = chain(cat.slug);
  const parts = [`<a href="../index.html" class="hover:text-black">Home</a>`];
  chain_.forEach((c, idx) => {
    const isLast = idx === chain_.length - 1;
    parts.push(`<span class="mx-2 text-black/30">/</span>`);
    if (isLast) parts.push(`<span class="text-black">${c.label}</span>`);
    else parts.push(`<a href="${c.slug}.html" class="hover:text-black">${c.label}</a>`);
  });
  return parts.join('');
}

function childTiles(cat){
  const kids = children(cat.slug);
  if (!kids.length) return '';
  const kindLabel = {league:'Ligi',club:'Kluby',continent:'Kontynenty',team:'Reprezentacje',maker:'Producenci',series:'Serie',tier:'Wersje',group:'Kategorie'}[kids[0].kind] || 'Kategorie';
  return `
<section class="onlight bg-white">
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 py-10 md:py-14 border-b hairline">
    <div class="flex items-end justify-between mb-7 md:mb-10">
      <h2 class="h-section text-[22px] md:text-[28px]">${kindLabel}</h2>
      <div class="text-[11px] tracking-wide2 uppercase text-black/55">${kids.length}</div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
      ${kids.map((k, i) => `
        <a href="${k.slug}.html" class="cat-tile group">
          <span class="cat-tile-index">${String(i+1).padStart(2,'0')}</span>
          <span class="cat-tile-label">${k.label}</span>
          <svg class="cat-tile-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><polyline points="9 6 15 12 9 18"/></svg>
        </a>`).join('')}
    </div>
  </div>
</section>`;
}

function productGrid(cat){
  // Show product grid for leaf-ish pages (no children OR has products in mind)
  const kids = children(cat.slug);
  if (kids.length) return '';
  const items = sampleProducts(cat);
  return `
<section class="onlight bg-white">
  <div class="mx-auto max-w-[1600px] px-5 md:px-10 py-4 md:py-10 grid grid-cols-2 md:flex md:items-center md:justify-between gap-y-2 border-b hairline">
    <button type="button" data-filters-open class="inline-flex items-center gap-2 text-[11px] tracking-wide2 uppercase hover:text-black/55 transition-colors">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18M6 12h12M10 18h4"/></svg>
      Filtruj
    </button>
    <div class="col-span-2 md:col-auto order-last md:order-none text-[10px] md:text-[11px] tracking-wide2 uppercase text-black/55 md:text-black/60">Pokazuję ${items.length} z ${items.length} produktów</div>
    <div data-sort-root class="relative inline-flex items-center gap-2 text-[11px] tracking-wide2 uppercase justify-end">
      <span class="hidden md:inline text-black/60">Sortuj</span>
      <button type="button" data-sort-toggle class="inline-flex items-center gap-1.5 border hairline rounded-full px-4 h-9 hover:bg-black hover:text-white transition"><span data-sort-label>Polecane</span> <svg data-sort-caret width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-200"><polyline points="6 9 12 15 18 9"/></svg></button>
    </div>
  </div>
  <div class="mx-auto max-w-[1600px] px-5 md:px-10 py-8 md:py-14">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      ${items.map((p, i) => `
        <article class="group" data-qv-card data-qv-id="${cat.slug}-${i+1}" data-qv-name="${p.title}" data-qv-price="${p.price.toFixed(2).replace('.', ',')} zł" data-qv-image="https://placehold.co/900x1125/${p.color}/${p.color}.png" data-qv-url="../products/black-puffer-jacket.html" data-qv-sizes="XS,S,M,L,XL">
          <div class="tile block relative aspect-[4/5] rounded-[2px] overflow-hidden shadow-tile">
            <a href="../products/black-puffer-jacket.html" class="absolute inset-0"><img src="https://placehold.co/900x1125/${p.color}/${p.color}.png" class="absolute inset-0 h-full w-full object-cover" alt=""/></a>
            <button type="button" class="qv-btn" data-qv-open aria-label="Dodaj do koszyka"></button>
          </div>
          <div class="mt-5"><h3 class="pc-name">${p.title}</h3><div class="mt-1 text-[12px]">${p.price.toFixed(2).replace('.', ',')} zł</div><div class="pc-meta">${p.cat}</div></div>
        </article>`).join('')}
    </div>
  </div>
</section>`;
}

const escapeHtml = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

function pageHtml(cat){
  const titleEn = cat.label.replace(/<[^>]+>/g, '');
  return `<!doctype html>
<html lang="pl">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${escapeHtml(titleEn)} — Kickback</title>
<script src="https://cdn.tailwindcss.com"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=DM+Sans:wght@300;400;500;600&family=Michroma&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/styles.css">
</head>
<body class="min-h-screen">
<div data-release-header></div>

<section class="onlight bg-white">
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 pt-8 md:pt-14 pb-6 md:pb-10 border-b hairline">
    <div class="crumbs-light text-[11px] tracking-wide2 uppercase text-black/55">
      ${breadcrumbHtml(cat)}
    </div>
    <h1 class="h-section text-[26px] md:text-[36px] mt-4 md:mt-5">${escapeHtml(cat.label)}</h1>
  </div>
</section>

${childTiles(cat)}
${productGrid(cat)}

<div data-release-footer></div>
<script src="../assets/partials.js"></script>
</body>
</html>
`;
}

// =============================================================
// run
// =============================================================
let written = 0;
for (const cat of C) {
  const filePath = path.join(OUT, cat.slug + '.html');
  fs.writeFileSync(filePath, pageHtml(cat), 'utf8');
  written++;
}
console.log(`generated ${written} collection pages -> ${OUT}`);
console.log(`top-level: ${C.filter(c=>!c.parent).map(c=>c.slug).join(', ')}`);
