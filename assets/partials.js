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

  // ---------- shared category taxonomy (used by both desktop mega + mobile drawer) ----------
  const MM_CLUBS = {
    'premier-league': { label: 'Premier League', items: [['arsenal','Arsenal'],['aston-villa','Aston Villa'],['bournemouth','Bournemouth'],['brentford','Brentford'],['brighton','Brighton'],['burnley','Burnley'],['chelsea','Chelsea'],['crystal-palace','Crystal Palace'],['everton','Everton'],['fulham','Fulham'],['leeds-utd','Leeds Utd.'],['liverpool','Liverpool'],['manchester-city','Manchester City'],['manchester-utd','Manchester Utd.'],['newcastle-utd','Newcastle Utd.'],['nottingham-forest','Nottingham Forest'],['sunderland','Sunderland'],['tottenham','Tottenham'],['west-ham','West Ham'],['wolverhampton','Wolverhampton']] },
    'efl-championship': { label: 'EFL Championship', items: [['derby','Derby'],['hull-city','Hull City'],['leicester','Leicester'],['millwall','Millwall'],['southampton','Southampton'],['swansea','Swansea'],['sheffield-utd','Sheffield Utd.'],['qpr','QPR']] },
    'la-liga': { label: 'La Liga', items: [['athletic-bilbao','Athletic Bilbao'],['atletico-madrid','Atlético Madrid'],['barcelona','Barcelona'],['cd-tenerife','CD Tenerife'],['girona','Girona'],['malaga','Málaga'],['real-betis','Real Betis'],['real-madrid','Real Madrid'],['real-sociedad','Real Sociedad'],['sevilla','Sevilla'],['valencia','Valencia'],['villareal','Villarreal']] },
    'serie-a': { label: 'Serie A', items: [['ac-milan','AC Milan'],['as-roma','AS Roma'],['atalanta','Atalanta'],['bologna','Bologna'],['como','Como'],['fiorentina','Fiorentina'],['inter-milan','Inter Milan'],['juventus','Juventus'],['lazio-roma','Lazio Roma'],['napoli','Napoli'],['parma','Parma'],['torino','Torino'],['venezia','Venezia'],['udinese','Udinese']] },
    'serie-b': { label: 'Serie B', items: [['sampdoria','Sampdoria'],['monza','Monza'],['pescara','Pescara']] },
    'bundesliga': { label: 'Bundesliga', items: [['bayer-leverkusen','Bayer 04 Leverkusen'],['bayern-munich','Bayern Munich'],['borussia-dortmund','Borussia Dortmund'],['borussia-monchengladbach','Borussia Mönchengladbach'],['eintracht-frankfurt','Eintracht Frankfurt'],['rb-leipzig','RB Leipzig'],['union-berlin','Union Berlin'],['vfb-stuttgart','VFB Stuttgart']] },
    'ligue-1': { label: 'Ligue 1', items: [['as-monaco','AS Monaco'],['losc-lille','LOSC Lille'],['olympique-marseille','Olympique Marseille'],['olympique-lyon','Olympique Lyon'],['psg','PSG']] },
    'mls': { label: 'MLS', items: [['chicago-fire','Chicago Fire'],['inter-miami','Inter Miami'],['la-galaxy','LA Galaxy'],['new-york-fc','New York FC'],['orlando-city','Orlando City'],['seattle-sounders','Seattle Sounders']] },
    'eredivisie': { label: 'Eredivisie', items: [['ajax-amsterdam','Ajax Amsterdam'],['feyenoord','Feyenoord'],['psv-eindhoven','PSV Eindhoven']] },
    'liga-portugal': { label: 'Liga Portugal', items: [['benfica-lisboa','Benfica Lizbona'],['sporting','Sporting'],['porto','Porto']] },
    'ekstraklasa': { label: 'Ekstraklasa', items: [['lech-poznan','Lech Poznań'],['legia-warszawa','Legia Warszawa'],['wisla-krakow','Wisła Kraków']] },
    'reszta-swiata': { label: 'Reszta świata', items: [['al-hilal','Al Hilal'],['al-nassr','Al Nassr'],['besiktas','Beşiktaş'],['galatasaray','Galatasaray'],['fenerbahce','Fenerbahçe'],['celtic','Celtic'],['rangers','Rangers'],['aek-athens','AEK Athens'],['paok-saloniki','PAOK Saloniki'],['panathinaikos','Panathinaikos'],['olympiakos','Olympiakos']] },
  };
  const MM_NATIONALS = {
    'reprezentacje-europa': { label: 'Europa', items: [['polska','Polska'],['anglia','Anglia'],['belgia','Belgia'],['chorwacja','Chorwacja'],['czechy','Czechy'],['francja','Francja'],['grecja','Grecja'],['holandia','Holandia'],['hiszpania','Hiszpania'],['niemcy','Niemcy'],['portugalia','Portugalia'],['wlochy','Włochy']].map(x=>['reprezentacja-'+x[0], x[1]]) },
    'reprezentacje-ameryka': { label: 'Ameryka', items: [['argentyna','Argentyna'],['brazylia','Brazylia'],['chile','Chile'],['ekwador','Ekwador'],['kolumbia','Kolumbia'],['urugwaj','Urugwaj'],['usa','USA']].map(x=>['reprezentacja-'+x[0], x[1]]) },
    'reprezentacje-azja': { label: 'Azja', items: [['australia','Australia'],['japonia','Japonia'],['korea-poludniowa','Korea Płd.']].map(x=>['reprezentacja-'+x[0], x[1]]) },
    'reprezentacje-afryka': { label: 'Afryka', items: [['algieria','Algieria'],['egipt','Egipt'],['kamerun','Kamerun'],['maroko','Maroko'],['senegal','Senegal'],['wybrzeze-kosci-sloniowej','Wybrzeże Kości Słoniowej']].map(x=>['reprezentacja-'+x[0], x[1]]) },
  };
  const MM_CARDS = {
    'karty-daka':   { label: 'DAKA',   items: [['daka-top-audience-ac-milan','Top Audience AC Milan'],['daka-top-audience-barcelona','Top Audience Barcelona'],['daka-top-audience-belgium','Top Audience Belgia'],['daka-top-audience-inter-milan','Top Audience Inter Milan'],['daka-top-audience-juventus','Top Audience Juventus'],['daka-top-audience-manchester-city','Top Audience Manchester City'],['daka-top-audience-real-madrid','Top Audience Real Madrid']] },
    'karty-topps':  { label: 'Topps',  items: [['topps-chrome','Chrome'],['topps-merlin','Merlin'],['topps-arsenal','Arsenal'],['topps-atletico-madrid','Atlético Madrid'],['topps-barcelona','Barcelona'],['topps-bayern-munich','Bayern Munich'],['topps-chelsea','Chelsea'],['topps-liverpool','Liverpool'],['topps-manchester-city','Manchester City'],['topps-manchester-utd','Manchester Utd.'],['topps-psg','PSG'],['topps-real-madrid','Real Madrid']] },
    'karty-panini': { label: 'Panini', items: [['panini-world-cup-2026','World Cup 2026'],['panini-euro-2012','Euro 2012']] },
  };
  const MM_MYSTERY = {
    'mystery-basic':     { label: 'Basic',     items: [] },
    'mystery-premium':   { label: 'Premium',   items: [] },
    'mystery-ultimate':  { label: 'Ultimate',  items: [] },
    'mystery-blind-box': { label: 'Blind Box', items: [] },
  };
  const MM_TOPS = [
    { slug:'kluby',             label:'Kluby',             subs: MM_CLUBS,     seeAll:'Wszystkie kluby',     icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3z"/></svg>' },
    { slug:'reprezentacje',     label:'Reprezentacje',     subs: MM_NATIONALS, seeAll:'Wszystkie reprezentacje', icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>' },
    { slug:'karty-pilkarskie',  label:'Karty piłkarskie',  subs: MM_CARDS,     seeAll:'Wszystkie karty',     icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6M9 11h6M9 15h4"/></svg>' },
    { slug:'mystery-box',       label:'Mystery Box',       subs: MM_MYSTERY,   seeAll:'Wszystkie boxy',      icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 7h18v13H3zM3 7l3-4h12l3 4M12 7v13M12 11v0"/></svg>' },
  ];
  const MM_FLATS = [
    { slug:'bluzy-i-kurtki', label:'Kurtki i bluzy',         icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 7l3-3h8l3 3 2 4-3 1v9H5v-9L2 11z"/></svg>' },
    { slug:'best-of',        label:'Best Of',                icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>' },
    { slug:'nowe-z-metka',   label:'Nowe z metką',           icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 13l9-10 9 10-9 8z"/><circle cx="9" cy="9" r="1.5" fill="currentColor"/></svg>' },
    { slug:'nowosci',        label:'Nowości',                icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M12 5v14"/></svg>' },
  ];

  // Renderer for desktop mega: 2-col drill (left = subs / right = items per active sub)
  function renderDesktopMega(top){
    const subs = Object.entries(top.subs);
    const itemColsClass = top.slug === 'kluby' || top.slug === 'reprezentacje' ? 'grid-cols-3' : 'grid-cols-2';
    return `
      <div class="mega mega-wide">
        <div class="mx-auto max-w-[1600px] px-10 py-8" data-dm-drill="${top.slug}">
          <div class="grid grid-cols-[280px_1fr] gap-10 min-h-[360px]">
            <div class="dm-subs-col border-r hairline pr-6 py-2">
              ${subs.map(([slug,sub],i) => `<button type="button" data-dm-sub="${slug}" class="dm-sub${i===0?' dm-sub-active':''}"><span>${sub.label}</span><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 6 15 12 9 18"/></svg></button>`).join('')}
              <a href="${R('collections/'+top.slug+'.html')}" class="dm-see-all">${top.seeAll}</a>
            </div>
            <div class="dm-items-col py-2">
              ${subs.map(([slug,sub],i) => `<div data-dm-items-for="${slug}" class="${i===0?'':'hidden'} grid ${itemColsClass} gap-x-8 gap-y-1.5">${sub.items.length ? sub.items.map(([is,il]) => `<a href="${R('collections/'+is+'.html')}" class="mega-link">${il}</a>`).join('') : `<div class="text-[13px] text-black/55 py-2 col-span-full"><a href="${R('collections/'+slug+'.html')}" class="link-underline">Zobacz produkty →</a></div>`}</div>`).join('')}
            </div>
          </div>
        </div>
      </div>`;
  }

  const header = `
<div id="site-announcement" class="bg-black text-white text-[11px] tracking-wide2 uppercase relative z-40 h-9 overflow-hidden">
  <div class="marquee absolute inset-y-0 left-0 flex items-center whitespace-nowrap will-change-transform">
    <div class="marquee-track flex items-center shrink-0">
      <span class="inline-flex items-center gap-2 px-7"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 7h13v9H3zM16 10h4l1 3v3h-5z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>Darmowa dostawa od 500 zł</span>
      <span class="text-white/30">✦</span>
      <span class="inline-flex items-center gap-2 px-7"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 14 4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 5 5v4"/></svg>14 dni na zwrot, bez pytań</span>
      <span class="text-white/30">✦</span>
      <span class="inline-flex items-center gap-2 px-7"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2 14.5 8.5 21 9l-5 4.5 1.5 7L12 17l-5.5 3.5L8 13.5 3 9l6.5-.5z"/></svg>Sezon 25/26 — nowa kolekcja online</span>
      <span class="text-white/30">✦</span>
      <span class="inline-flex items-center gap-2 px-7"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>BLIK · karta · PayPo · Przelewy24</span>
      <span class="text-white/30">✦</span>
      <span class="inline-flex items-center gap-2 px-7"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12a9 9 0 1 1-6.2-8.55"/><path d="M21 5v5h-5"/></svg>Wysyłka w 24h od poniedziałku do piątku</span>
      <span class="text-white/30">✦</span>
      <span class="inline-flex items-center gap-2 px-7"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>Każda koszulka opowiada historię</span>
      <span class="text-white/30">✦</span>
    </div>
    <div class="marquee-track flex items-center shrink-0" aria-hidden="true">
      <span class="inline-flex items-center gap-2 px-7"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 7h13v9H3zM16 10h4l1 3v3h-5z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>Darmowa dostawa od 500 zł</span>
      <span class="text-white/30">✦</span>
      <span class="inline-flex items-center gap-2 px-7"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 14 4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 5 5v4"/></svg>14 dni na zwrot, bez pytań</span>
      <span class="text-white/30">✦</span>
      <span class="inline-flex items-center gap-2 px-7"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2 14.5 8.5 21 9l-5 4.5 1.5 7L12 17l-5.5 3.5L8 13.5 3 9l6.5-.5z"/></svg>Sezon 25/26 — nowa kolekcja online</span>
      <span class="text-white/30">✦</span>
      <span class="inline-flex items-center gap-2 px-7"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>BLIK · karta · PayPo · Przelewy24</span>
      <span class="text-white/30">✦</span>
      <span class="inline-flex items-center gap-2 px-7"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12a9 9 0 1 1-6.2-8.55"/><path d="M21 5v5h-5"/></svg>Wysyłka w 24h od poniedziałku do piątku</span>
      <span class="text-white/30">✦</span>
      <span class="inline-flex items-center gap-2 px-7"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>Każda koszulka opowiada historię</span>
      <span class="text-white/30">✦</span>
    </div>
  </div>
</div>
<div id="site-header-wrap" class="sticky top-0 z-50 transition-all duration-300 ease-out">
<header id="site-header" class="bg-white border-b hairline onlight relative transition-all duration-300 ease-out">
  <div class="mx-auto max-w-[1600px] pl-3 pr-1 md:px-6 lg:px-8 h-[60px] md:h-[72px] grid grid-cols-3 md:grid-cols-[auto_1fr_auto] items-center md:gap-8 transition-all duration-300 ease-out">
    <div class="flex items-center md:justify-start">
      <button type="button" data-mobile-menu-toggle aria-label="Menu" class="md:hidden inline-flex items-center justify-center h-10 w-10 -ml-2 text-black/85"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 7h18M3 12h18M3 17h18"/></svg></button>
      <a href="${R('index.html')}" class="hidden md:inline-flex items-center" aria-label="Kickback"><img src="${R('brand_assets/kickback_logo.svg')}" alt="Kickback" class="h-8 w-auto"/></a>
    </div>
    <div class="flex items-center justify-center">
      <a href="${R('index.html')}" class="md:hidden inline-flex items-center" aria-label="Kickback"><img src="${R('brand_assets/kickback_logo.svg')}" alt="Kickback" class="h-6 w-auto"/></a>
      <nav data-site-nav class="hidden md:flex items-center justify-center gap-7 lg:gap-9 text-[12px] tracking-wide2 uppercase text-black/80">
        <a href="${R('collections/nowosci.html')}" class="hover:text-black inline-flex items-center h-[72px] whitespace-nowrap">Nowości</a>
        <div class="has-mega">
          <a href="${R('collections/kluby.html')}" class="hover:text-black inline-flex items-center gap-1.5 h-[72px] whitespace-nowrap">Kluby <svg class="caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></a>
          ${renderDesktopMega(MM_TOPS[0])}
        </div>
        <div class="has-mega">
          <a href="${R('collections/reprezentacje.html')}" class="hover:text-black inline-flex items-center gap-1.5 h-[72px] whitespace-nowrap">Reprezentacje <svg class="caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></a>
          ${renderDesktopMega(MM_TOPS[1])}
        </div>
        <div class="has-mega">
          <a href="${R('collections/karty-pilkarskie.html')}" class="hover:text-black inline-flex items-center gap-1.5 h-[72px] whitespace-nowrap">Karty <svg class="caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></a>
          ${renderDesktopMega(MM_TOPS[2])}
        </div>
        <div class="has-mega">
          <a href="${R('collections/mystery-box.html')}" class="hover:text-black inline-flex items-center gap-1.5 h-[72px] whitespace-nowrap">Mystery Box <svg class="caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></a>
          ${renderDesktopMega(MM_TOPS[3])}
        </div>
        <div class="has-mega">
          <a href="#" class="hover:text-black inline-flex items-center gap-1.5 h-[72px] whitespace-nowrap">Pozostałe <svg class="caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></a>
          <div class="mega rounded-b-[2px] min-w-[240px]">
            <div class="px-6 py-6">
              <ul class="space-y-0.5">
                <li><a href="${R('collections/best-of.html')}" class="mega-link">Best Of</a></li>
                <li><a href="${R('collections/nowe-z-metka.html')}" class="mega-link">Koszulki nowe z metką</a></li>
                <li><a href="${R('collections/bluzy-i-kurtki.html')}" class="mega-link">Bluzy i kurtki</a></li>
                <li><a href="${R('collections/reszta-swiata.html')}" class="mega-link">Reszta świata</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <nav class="justify-self-end flex items-center gap-0.5 md:gap-5 text-[12px] tracking-wide2 uppercase text-black/80">
      <button type="button" data-search-open class="hover:text-black inline-flex items-center justify-center h-11 w-11 md:h-9 md:w-9" aria-label="Search"><svg class="md:!w-[15px] md:!h-[15px]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg></button>
      <a href="${R('pages/login.html')}" class="hover:text-black inline-flex items-center justify-center h-11 w-11 md:h-9 md:w-9" aria-label="Account"><svg class="md:!w-[15px] md:!h-[15px]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6"/></svg></a>
      <a href="${R('pages/cart.html')}" data-cart-open class="hover:text-black inline-flex items-center justify-center relative h-11 w-11 md:h-9 md:w-auto md:gap-1.5 md:px-1" aria-label="Koszyk">
        <svg class="md:!w-[16px] md:!h-[16px]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <span data-cart-badge class="absolute md:static -top-0.5 -right-0.5 md:top-auto md:right-auto inline-flex items-center justify-center min-w-[18px] h-[18px] text-[10px] rounded-full bg-black text-white px-1">0</span>
      </a>
    </nav>
  </div>
</header>
</div>`;

  const footer = `
<footer class="bg-black text-white mt-0">
  <div class="mx-auto max-w-[1600px] px-6 md:px-10 pt-12 md:pt-20 pb-10">
    <div class="grid grid-cols-2 md:grid-cols-12 gap-y-8 gap-x-6 md:gap-10">
      <div class="col-span-2 md:col-span-5">
        <div class="text-[11px] tracking-wide2 uppercase text-white/60">Newsletter</div>
        <h3 class="mt-3 text-[16px] md:text-[18px] leading-[1.4] max-w-[420px]">Zapisz się do naszego newslettera i otrzymaj 10% na swoje pierwsze zamówienie</h3>
        <form class="mt-5 flex items-center bg-white rounded-full pl-4 md:pl-5 pr-1.5 h-12 max-w-md" onsubmit="event.preventDefault()">
          <input type="email" placeholder="Adres email" class="flex-1 bg-transparent text-black placeholder:text-black/45 text-[13px] outline-none min-w-0"/>
          <button class="h-9 px-4 md:px-5 rounded-full bg-black text-white text-[11px] tracking-wide2 uppercase font-medium whitespace-nowrap">Zapisz się</button>
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
          <li><a href="${R('collections/kluby.html')}" class="hover:text-white">Kluby</a></li>
          <li><a href="${R('collections/reprezentacje.html')}" class="hover:text-white">Reprezentacje</a></li>
          <li><a href="${R('collections/karty-pilkarskie.html')}" class="hover:text-white">Karty piłkarskie</a></li>
          <li><a href="${R('collections/mystery-box.html')}" class="hover:text-white">Mystery Box</a></li>
          <li><a href="${R('collections/bluzy-i-kurtki.html')}" class="hover:text-white">Bluzy i kurtki</a></li>
          <li><a href="${R('collections/nowe-z-metka.html')}" class="hover:text-white">Koszulki nowe z metką</a></li>
          <li><a href="${R('collections/best-of.html')}" class="hover:text-white text-[#e8c87a]">Best Of</a></li>
        </ul>
      </div>
    </div>
    <div class="mt-12 md:mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8 border-t border-white/10 pt-8">
      <div class="max-w-md">
        <img src="${R('brand_assets/kickback_logo.svg')}" alt="Kickback" class="h-9 md:h-16 w-auto" style="filter:invert(1) brightness(2)"/>
      </div>
      <div class="flex items-center gap-5 text-white/80">
        <a href="#" aria-label="Instagram" class="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg></a>
        <a href="#" aria-label="YouTube" class="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3Z" fill="currentColor"/></svg></a>
        <a href="#" aria-label="TikTok" class="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 3v11a4 4 0 1 1-4-4"/><path d="M15 3a5 5 0 0 0 5 5"/></svg></a>
      </div>
    </div>
    <div class="mt-10 pt-8 border-t border-white/10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-y-8 gap-x-10">
      <div class="space-y-5">
        <div>
          <div class="text-[10px] tracking-mega uppercase text-white/55 mb-3">Dostawa</div>
          <div class="flex flex-wrap items-center gap-1.5">
            <span class="inline-flex items-center justify-center h-7 px-3 text-[11px] font-semibold tracking-wide rounded-[4px] bg-[#ffcc00] text-black">InPost Paczkomat</span>
            <span class="inline-flex items-center justify-center h-7 px-3 text-[11px] font-semibold tracking-wide rounded-[4px] bg-white text-black">InPost Kurier</span>
            <span class="inline-flex items-center justify-center h-7 px-3 text-[11px] font-semibold tracking-wide rounded-[4px] bg-white text-[#e60028]">Orlen Paczka</span>
            <span class="inline-flex items-center justify-center h-7 px-3 text-[11px] font-semibold tracking-wide rounded-[4px] bg-[#ffcc00] text-[#cc0000]">DHL</span>
            <span class="inline-flex items-center justify-center h-7 px-3 text-[11px] font-semibold tracking-wide rounded-[4px] bg-[#dc0032] text-white">DPD</span>
          </div>
        </div>
        <div>
          <div class="text-[10px] tracking-mega uppercase text-white/55 mb-3">Płatności</div>
          <div class="flex flex-wrap items-center gap-1.5">
            <span class="inline-flex items-center justify-center h-7 px-3 text-[11px] font-semibold tracking-wide rounded-[4px] bg-white text-black lowercase">blik</span>
            <span class="inline-flex items-center justify-center h-7 px-3 text-[11px] font-extrabold italic tracking-wide rounded-[4px] bg-white text-[#1a1f71]">VISA</span>
            <span class="inline-flex items-center justify-center h-7 px-3 text-[10px] font-semibold tracking-wide rounded-[4px] bg-white text-[#eb001b]">Mastercard</span>
            <span class="inline-flex items-center justify-center gap-1 h-7 px-3 text-[11px] font-semibold tracking-wide rounded-[4px] bg-white text-black"><svg width="11" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 11.5c0 3.7 3.3 4.9 3.3 5 0 0-2.7 1-3.4 2.8-.5 1.4 0 2.5-1.2 2.5-.8 0-1.4-.4-2.4-.4-1 0-1.6.4-2.4.4-1.7 0-3-3.1-3-5.6 0-3.7 2.3-5.6 4.5-5.6 1 0 2 .7 2.7.7.6 0 1.8-.8 3-.7 1.6.1 2.8.6 3.5 1.7-.1.1-2.6 1.6-2.6 4.6V11.5zm-3.5-8.5C12.7 1.4 13.7 0 14.8 0c.1 1.6-1.5 3.5-2.6 3.5z"/></svg>Pay</span>
            <span class="inline-flex items-center justify-center h-7 px-3 text-[10px] font-semibold tracking-wide rounded-[4px] bg-white text-black">G Pay</span>
            <span class="inline-flex items-center justify-center h-7 px-3 text-[11px] font-semibold tracking-wide rounded-[4px] bg-white text-[#34a853]">PayU</span>
            <span class="inline-flex items-center justify-center h-7 px-3 text-[11px] font-semibold tracking-wide rounded-[4px] bg-white text-[#9b3eb1]">PayPo</span>
            <span class="inline-flex items-center justify-center h-7 px-3 text-[11px] font-semibold tracking-wide rounded-[4px] bg-white text-[#d40000]">Przelewy24</span>
          </div>
        </div>
      </div>
      <div class="text-[11px] text-white/50 lg:text-right lg:self-end lg:max-w-[280px]">Copyright © 2026 DigiFist. Wszystkie prawa zastrzeżone. Powered by Shopify.</div>
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
        <input data-search-input type="search" placeholder="Wyszukaj" class="flex-1 bg-transparent text-[26px] md:text-[32px] outline-none placeholder:text-black/40 text-black"/>
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
  <aside data-qv-panel class="absolute top-0 right-0 h-full w-full max-w-[480px] bg-white translate-x-full transition-transform duration-400 ease-out flex flex-col shadow-[0_0_60px_-20px_rgba(0,0,0,0.25)]" role="dialog" aria-label="Wybierz opcje">
    <header class="flex items-center justify-between px-6 md:px-8 h-[60px] md:h-[64px] border-b hairline shrink-0">
      <div class="text-[11px] tracking-wide2 uppercase">Wybierz opcje</div>
      <button type="button" data-qv-close aria-label="Zamknij" class="h-10 w-10 rounded-full flex items-center justify-center hover:bg-black/5 transition"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    </header>
    <div data-qv-body class="flex-1 overflow-y-auto"></div>
  </aside>
</div>`;

  const cartDrawer = `
<div id="cart-drawer" class="fixed inset-0 z-[100] pointer-events-none" aria-hidden="true">
  <div data-cart-backdrop class="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300"></div>
  <aside data-cart-panel class="absolute top-0 right-0 h-full w-full md:w-[60vw] md:max-w-[820px] bg-white translate-x-full transition-transform duration-400 ease-out flex flex-col shadow-[0_0_60px_-20px_rgba(0,0,0,0.25)]" role="dialog" aria-label="Twój koszyk">
    <header class="flex items-center justify-between px-6 md:px-8 h-[60px] md:h-[64px] border-b hairline shrink-0">
      <div class="text-[11px] tracking-wide2 uppercase text-black/85">Twój koszyk <span data-cart-header-count class="text-black/45 ml-1">0</span></div>
      <button type="button" data-cart-close aria-label="Zamknij" class="h-10 w-10 -mr-2 rounded-full flex items-center justify-center hover:bg-black/5 transition"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
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

  // mobile drawer renders as a navigation STACK (iOS-style push/pop).
  // Each level lives on its own absolutely-positioned screen; tapping a row pushes the next
  // screen in from the right, tapping the "‹ Label" back row pops to the previous screen.
  const chevR = '<svg class="mm-chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><polyline points="9 6 15 12 9 18"/></svg>';
  const chevL = '<svg class="mm-back-chev" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 6 9 12 15 18"/></svg>';

  function mmScreenRoot(){
    return `
    <div data-mm-screen="root" class="mm-screen mm-screen-active">
      <div class="mm-list">
        <a href="${R('index.html')}" class="mm-row">Strona główna</a>
        <a href="${R('collections/nowosci.html')}" class="mm-row">Nowości</a>
        ${MM_TOPS.map(t => `<button type="button" data-mm-go="${t.slug}" class="mm-row">${t.label}${chevR}</button>`).join('')}
        ${MM_FLATS.filter(f=>f.slug!=='nowosci').map(f => `<a href="${R('collections/'+f.slug+'.html')}" class="mm-row">${f.label}</a>`).join('')}
        <a href="${R('blogs/news.html')}" class="mm-row">Blog</a>
        <a href="${R('pages/about-us.html')}" class="mm-row">O nas</a>
        <a href="${R('pages/contact.html')}" class="mm-row">Kontakt</a>
      </div>
    </div>`;
  }

  function mmScreenTop(top){
    const subs = Object.entries(top.subs);
    return `
    <div data-mm-screen="${top.slug}" class="mm-screen mm-screen-right">
      <button type="button" data-mm-back class="mm-back-row">${chevL}<span>${top.label}</span></button>
      <div class="mm-list">
        ${subs.map(([slug,sub]) => sub.items.length
          ? `<button type="button" data-mm-go="${slug}" class="mm-row">${sub.label}${chevR}</button>`
          : `<a href="${R('collections/'+slug+'.html')}" class="mm-row">${sub.label}</a>`).join('')}
        <a href="${R('collections/'+top.slug+'.html')}" class="mm-row mm-row-see-all">${top.seeAll}</a>
      </div>
    </div>`;
  }

  function mmScreenSub(slug, sub, parentLabel){
    return `
    <div data-mm-screen="${slug}" class="mm-screen mm-screen-right">
      <button type="button" data-mm-back class="mm-back-row">${chevL}<span>${sub.label}</span></button>
      <div class="mm-list">
        ${sub.items.map(([is,il]) => `<a href="${R('collections/'+is+'.html')}" class="mm-row">${il}</a>`).join('')}
        <a href="${R('collections/'+slug+'.html')}" class="mm-row mm-row-see-all">Wszystkie produkty (${sub.label})</a>
      </div>
    </div>`;
  }

  function mmStackScreens(){
    const out = [mmScreenRoot()];
    MM_TOPS.forEach(top => {
      out.push(mmScreenTop(top));
      Object.entries(top.subs).forEach(([slug,sub]) => {
        if (sub.items.length) out.push(mmScreenSub(slug, sub, top.label));
      });
    });
    return out.join('');
  }

  const mobileMenu = `
<aside id="mobile-menu" class="fixed inset-0 z-[105] pointer-events-none md:hidden" aria-hidden="true">
  <div data-mm-backdrop class="absolute inset-0 bg-black/45 opacity-0 transition-opacity duration-300"></div>
  <div data-mm-panel class="absolute inset-0 bg-white -translate-x-full transition-transform duration-300 ease-out flex flex-col shadow-[0_0_60px_-20px_rgba(0,0,0,0.25)]">
    <div class="flex items-center justify-between px-4 h-[56px] border-b hairline shrink-0">
      <button type="button" data-mm-close aria-label="Zamknij" class="inline-flex items-center justify-center h-10 w-10 -ml-2 text-black/85"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      <a href="${R('index.html')}" class="inline-flex items-center" aria-label="Kickback"><img src="${R('brand_assets/kickback_logo.svg')}" alt="Kickback" class="h-6 w-auto"/></a>
      <div class="flex items-center gap-0.5">
        <button type="button" data-search-open class="inline-flex items-center justify-center h-10 w-10 text-black/85" aria-label="Search"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg></button>
        <a href="${R('pages/login.html')}" class="inline-flex items-center justify-center h-10 w-10 text-black/85" aria-label="Konto"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6"/></svg></a>
        <a href="${R('pages/cart.html')}" data-cart-open class="inline-flex items-center justify-center h-10 w-10 -mr-2 text-black/85" aria-label="Koszyk"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></a>
      </div>
    </div>
    <div class="relative flex-1 overflow-hidden" data-mm-stack>
      ${mmStackScreens()}
    </div>
  </div>
</aside>`;

  const FD_COLORS = [
    ['#0d0d0d', 'Czarny'],
    ['#1f3fa6', 'Niebieski'],
    ['#6b6b6b', 'Szary'],
    ['#3f8a45', 'Zielony'],
    ['#c4a26e', 'Beżowy'],
    ['#b4332a', 'Czerwony'],
    ['#f3f1ec', 'Biały'],
  ];
  const filterDrawer = `
<aside id="filter-drawer" class="fixed inset-0 z-[105] pointer-events-none" aria-hidden="true">
  <div data-fd-backdrop class="absolute inset-0 bg-black/45 opacity-0 transition-opacity duration-300"></div>
  <div data-fd-panel class="absolute inset-y-0 left-0 h-full w-full sm:w-[440px] md:w-[480px] bg-white -translate-x-full transition-transform duration-300 ease-out flex flex-col shadow-[0_0_60px_-20px_rgba(0,0,0,0.25)]">
    <div class="flex items-center justify-between px-6 md:px-8 h-[64px] md:h-[72px] shrink-0">
      <h2 class="text-[20px] md:text-[26px] font-semibold tracking-tight" style="letter-spacing:-0.01em">Filtruj</h2>
      <button type="button" data-fd-close aria-label="Zamknij" class="h-10 w-10 rounded-full flex items-center justify-center hover:bg-black/5 transition"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    </div>
    <div class="flex-1 overflow-y-auto px-6 md:px-8">
      <details class="border-t hairline py-5 fd-section" open>
        <summary class="flex items-center justify-between text-[16px] md:text-[18px] cursor-pointer list-none"><span>Cena</span><svg class="fd-caret transition-transform duration-200" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="6 9 12 15 18 9"/></svg></summary>
        <div class="mt-5 grid grid-cols-2 gap-4">
          <label class="block">
            <span class="block text-[10px] tracking-wide2 uppercase text-black/60 mb-1.5">Od</span>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-black/55">zł</span>
              <input data-fd-price-min type="number" min="0" placeholder="0" class="w-full h-11 pl-10 pr-3 border hairline rounded-[4px] text-[14px] outline-none focus:border-black"/>
            </div>
          </label>
          <label class="block">
            <span class="block text-[10px] tracking-wide2 uppercase text-black/60 mb-1.5">Do</span>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-black/55">zł</span>
              <input data-fd-price-max type="number" min="0" placeholder="999" class="w-full h-11 pl-10 pr-3 border hairline rounded-[4px] text-[14px] outline-none focus:border-black"/>
            </div>
          </label>
        </div>
      </details>
      <details class="border-t hairline py-5 fd-section" open>
        <summary class="flex items-center justify-between text-[16px] md:text-[18px] cursor-pointer list-none"><span>Kolor</span><svg class="fd-caret transition-transform duration-200" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="6 9 12 15 18 9"/></svg></summary>
        <div class="mt-5 space-y-2.5">
          ${FD_COLORS.map(([hex, name]) => `
          <label class="flex items-center gap-3 cursor-pointer py-1.5">
            <input type="checkbox" data-fd-color value="${name.toLowerCase()}" class="h-4 w-4 accent-black"/>
            <span class="h-5 w-5 rounded-[3px] border border-black/15" style="background:${hex}"></span>
            <span class="text-[12px] tracking-wide2 uppercase">${name}</span>
          </label>`).join('')}
        </div>
      </details>
      <details class="border-t hairline py-5 fd-section" open>
        <summary class="flex items-center justify-between text-[16px] md:text-[18px] cursor-pointer list-none"><span>Dostępność</span><svg class="fd-caret transition-transform duration-200" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="6 9 12 15 18 9"/></svg></summary>
        <div class="mt-5 space-y-2.5">
          <label class="flex items-center gap-3 cursor-pointer py-1.5"><input type="checkbox" data-fd-avail value="in" class="h-4 w-4 accent-black"/><span class="text-[12px] tracking-wide2 uppercase">Dostępne</span></label>
          <label class="flex items-center gap-3 cursor-pointer py-1.5"><input type="checkbox" data-fd-avail value="out" class="h-4 w-4 accent-black"/><span class="text-[12px] tracking-wide2 uppercase">Niedostępne</span></label>
        </div>
      </details>
      <div class="h-4"></div>
    </div>
    <div class="px-6 md:px-8 py-5 border-t hairline shrink-0 space-y-3">
      <button type="button" data-fd-clear class="btn-ghost-dark pill w-full h-12 rounded-full text-[11px] tracking-wide2 uppercase font-medium inline-flex items-center justify-center">Wyczyść</button>
      <button type="button" data-fd-apply class="w-full h-12 rounded-full bg-black text-white text-[11px] tracking-wide2 uppercase font-medium pill pill-dark inline-flex items-center justify-center">Zastosuj filtry</button>
    </div>
  </div>
</aside>`;

  const SORT_OPTIONS = [
    ['featured', 'Polecane'],
    ['relevant', 'Najtrafniejsze'],
    ['best-selling', 'Bestsellery'],
    ['az', 'Alfabetycznie, A-Z'],
    ['za', 'Alfabetycznie, Z-A'],
    ['price-asc', 'Cena: od najniższej'],
    ['price-desc', 'Cena: od najwyższej'],
    ['date-asc', 'Data: od najstarszych'],
    ['date-desc', 'Data: od najnowszych'],
  ];

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
        <div class="flex flex-col items-center justify-center text-center px-8 pt-24 md:pt-28 pb-12">
          <h2 class="h-section text-[22px] md:text-[28px]">Twój koszyk jest pusty</h2>
          <a href="${R('collections/all.html')}" class="mt-8 inline-flex items-center justify-center h-12 px-10 rounded-full bg-black text-white text-[11px] tracking-wide2 uppercase font-medium pill pill-dark">Przejdź do zakupów</a>
        </div>
        ${recommendedSliderHTML('Polecane dla Ciebie')}`;
      foot.innerHTML = '';
      return;
    }
    body.innerHTML = s.items.map((item, i) => `
      <article class="flex gap-4 px-6 md:px-8 py-5 border-b hairline">
        <a href="${item.url || '#'}" class="w-[88px] h-[110px] shrink-0 rounded-[2px] overflow-hidden bg-[var(--tile)] block">
          ${item.image ? '<img src="' + item.image + '" alt="" class="w-full h-full object-cover">' : ''}
        </a>
        <div class="flex-1 min-w-0">
          <h3 class="pc-name">${item.name}</h3>
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
      </article>`).join('') + recommendedSliderHTML('Dodaj do swoich zakupów');
    foot.innerHTML = `
      <div class="border-t hairline px-6 md:px-8 py-6">
        <div class="flex items-center justify-between mb-4">
          <span class="text-[11px] tracking-wide2 uppercase text-black/55">Suma</span>
          <span class="text-[20px] tabular-nums">${formatPLN(CartState.subtotal())}</span>
        </div>
        <div class="text-[10px] tracking-wide2 uppercase text-black/45 mb-5">Wysyłka liczona przy kasie</div>
        <a href="${R('pages/checkout.html')}" class="block text-center h-12 leading-[3rem] rounded-full bg-black text-white text-[11px] tracking-wide2 uppercase font-medium pill pill-dark">Przejdź do kasy</a>
        <a href="${R('pages/cart.html')}" class="block text-center mt-3 text-[11px] tracking-wide2 uppercase text-black/60 hover:text-black">Zobacz koszyk</a>
      </div>`;
  }

  function recommendedSliderHTML(title){
    const items = [
      { id: 'rec-real-madrid-02', name: 'Real Madrid Home 02/03', price: 219, img: 'https://placehold.co/600x750/3d3a30/3d3a30.png', url: R('collections/all.html#real-madrid'), sizes: 'S,M,L,XL' },
      { id: 'rec-brazylia-98',   name: 'Brazylia Reprezentacja 1998', price: 189, img: 'https://placehold.co/600x750/c4b48c/c4b48c.png', url: R('collections/all.html#brazylia'), sizes: 'S,M,L,XL' },
      { id: 'rec-mu-99',         name: 'Manchester United Retro 99/00', price: 239, img: 'https://placehold.co/600x750/8c2a1f/8c2a1f.png', url: R('collections/all.html#manchester-united'), sizes: 'S,M,L,XL,XXL' },
      { id: 'rec-card-topps',    name: 'Karta piłkarska — Topps Chrome', price: 49, img: 'https://placehold.co/600x750/e8d8b0/e8d8b0.png', url: R('collections/basics.html'), sizes: 'one' },
      { id: 'rec-mbox-s',        name: 'Mystery Box S', price: 149, img: 'https://placehold.co/600x750/1e1e1e/1e1e1e.png', url: R('collections/basics.html'), sizes: 'S,M,L,XL' },
      { id: 'rec-bayern',        name: 'Bayern München Home', price: 209, img: 'https://placehold.co/600x750/a52424/a52424.png', url: R('collections/all.html#bayern-munich'), sizes: 'S,M,L,XL' },
    ];
    return `
      <section class="px-6 md:px-8 py-8 border-t hairline">
        <h3 class="h-section text-[18px] md:text-[20px] mb-5">${title}</h3>
        <div class="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
          ${items.map(p => `
            <article class="group block shrink-0 w-[150px] md:w-[170px] snap-start" data-qv-card data-qv-id="${p.id}" data-qv-name="${p.name}" data-qv-price="${formatPLN(p.price)}" data-qv-image="${p.img}" data-qv-url="${p.url}" data-qv-sizes="${p.sizes}">
              <div class="tile relative aspect-[4/5] overflow-hidden rounded-[2px]">
                <a href="${p.url}" class="absolute inset-0"><img src="${p.img}" alt="" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"/></a>
                <button type="button" class="qv-btn" data-qv-open aria-label="Dodaj do koszyka"></button>
              </div>
              <div class="mt-3">
                <div class="pc-name">${p.name}</div>
                <div class="mt-1 text-[12px] tabular-nums">${formatPLN(p.price)}</div>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `;
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
            <div class="text-[11px] tracking-wide2 uppercase mb-3">Rozmiar <span class="text-black/55" data-qv-size-label>XS</span></div>
            <div class="flex flex-wrap items-center gap-2 mb-6">
              ${sizes.map((s, i) => `<button type="button" data-qv-size="${s}" class="h-11 w-12 border ${i===0?'border-black':'hairline'} text-[12px] rounded-[3px] hover:border-black transition">${s}</button>`).join('')}
            </div>
            <button type="submit" class="block w-full h-12 rounded-full bg-black text-white text-[11px] tracking-wide2 uppercase font-medium pill pill-dark">Dodaj do koszyka</button>
            <a href="${data.url || '#'}" class="block text-center mt-3 h-12 leading-[3rem] rounded-full border hairline text-[11px] tracking-wide2 uppercase font-medium pill">Kup teraz</a>
            <a href="${data.url || '#'}" class="block text-center mt-4 text-[11px] tracking-wide2 uppercase link-underline">Zobacz szczegóły</a>
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

  function bindFilters(){
    const drawer = document.getElementById('filter-drawer');
    if (!drawer) return;
    const panel = drawer.querySelector('[data-fd-panel]');
    const backdrop = drawer.querySelector('[data-fd-backdrop]');
    function open(){
      drawer.classList.remove('pointer-events-none');
      drawer.setAttribute('aria-hidden', 'false');
      requestAnimationFrame(() => {
        backdrop.style.opacity = '1';
        panel.classList.remove('-translate-x-full');
      });
      document.documentElement.style.overflow = 'hidden';
    }
    function shut(){
      drawer.setAttribute('aria-hidden', 'true');
      backdrop.style.opacity = '0';
      panel.classList.add('-translate-x-full');
      setTimeout(() => drawer.classList.add('pointer-events-none'), 280);
      document.documentElement.style.overflow = '';
    }
    document.querySelectorAll('[data-filters-open]').forEach(b => b.addEventListener('click', open));
    drawer.querySelectorAll('[data-fd-close]').forEach(b => b.addEventListener('click', shut));
    backdrop.addEventListener('click', shut);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && drawer.getAttribute('aria-hidden') === 'false') shut(); });
    const clearBtn = drawer.querySelector('[data-fd-clear]');
    if (clearBtn) clearBtn.addEventListener('click', () => {
      drawer.querySelectorAll('input[type="number"]').forEach(i => { i.value = ''; });
      drawer.querySelectorAll('input[type="checkbox"]').forEach(c => { c.checked = false; });
    });
    const applyBtn = drawer.querySelector('[data-fd-apply]');
    if (applyBtn) applyBtn.addEventListener('click', shut);
    // Caret rotation tied to <details> open state
    drawer.querySelectorAll('.fd-section').forEach(sec => {
      const caret = sec.querySelector('.fd-caret');
      const sync = () => { if (caret) caret.style.transform = sec.open ? 'rotate(180deg)' : ''; };
      sec.addEventListener('toggle', sync);
      sync();
    });
  }

  function bindSort(){
    const roots = document.querySelectorAll('[data-sort-root]');
    if (!roots.length) return;
    function closeAll(){
      document.querySelectorAll('[data-sort-menu]').forEach(m => m.remove());
      document.querySelectorAll('[data-sort-caret]').forEach(c => c.style.transform = '');
    }
    roots.forEach(root => {
      const toggle = root.querySelector('[data-sort-toggle]');
      const label = root.querySelector('[data-sort-label]');
      const caret = root.querySelector('[data-sort-caret]');
      if (!toggle || !label) return;
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const existing = root.querySelector('[data-sort-menu]');
        closeAll();
        if (existing) return;
        const menu = document.createElement('div');
        menu.setAttribute('data-sort-menu', '');
        menu.className = 'absolute right-0 top-full mt-2 w-[230px] bg-white border hairline rounded-[6px] shadow-[0_18px_40px_-20px_rgba(0,0,0,0.25)] z-50 overflow-hidden';
        const current = label.textContent.trim();
        menu.innerHTML = SORT_OPTIONS.map(([id, name]) => {
          const active = current === name;
          return `<button type="button" data-sort-pick="${id}" class="w-full text-left px-5 py-2.5 text-[13px] hover:bg-black/[.04] transition-colors ${active ? 'font-semibold bg-black/[.03]' : ''}">${name}</button>`;
        }).join('');
        root.appendChild(menu);
        if (caret) caret.style.transform = 'rotate(180deg)';
        menu.querySelectorAll('[data-sort-pick]').forEach(b => {
          b.addEventListener('click', (ev) => {
            ev.stopPropagation();
            const id = b.getAttribute('data-sort-pick');
            const pick = SORT_OPTIONS.find(o => o[0] === id);
            if (pick) label.textContent = pick[1];
            closeAll();
          });
        });
      });
    });
    document.addEventListener('click', (e) => {
      const inMenu = e.target.closest && e.target.closest('[data-sort-menu]');
      const inToggle = e.target.closest && e.target.closest('[data-sort-toggle]');
      if (!inMenu && !inToggle) closeAll();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });
  }

  function bindDesktopMega(){
    document.querySelectorAll('[data-dm-drill]').forEach(drill => {
      const subs  = drill.querySelectorAll('[data-dm-sub]');
      const items = drill.querySelectorAll('[data-dm-items-for]');
      subs.forEach(sb => {
        const activate = () => {
          const k = sb.getAttribute('data-dm-sub');
          subs.forEach(x => x.classList.toggle('dm-sub-active', x === sb));
          items.forEach(b => b.classList.toggle('hidden', b.getAttribute('data-dm-items-for') !== k));
        };
        sb.addEventListener('mouseenter', activate);
        sb.addEventListener('focus', activate);
        sb.addEventListener('click', activate);
      });
    });
  }

  function bindMobileMenu(){
    const drawer = document.getElementById('mobile-menu');
    if (!drawer) return;
    const panel = drawer.querySelector('[data-mm-panel]');
    const backdrop = drawer.querySelector('[data-mm-backdrop]');
    function open(){
      drawer.classList.remove('pointer-events-none');
      drawer.setAttribute('aria-hidden', 'false');
      requestAnimationFrame(() => {
        backdrop.style.opacity = '1';
        panel.classList.remove('-translate-x-full');
      });
      document.documentElement.style.overflow = 'hidden';
    }
    function shut(){
      drawer.setAttribute('aria-hidden', 'true');
      backdrop.style.opacity = '0';
      panel.classList.add('-translate-x-full');
      setTimeout(() => { drawer.classList.add('pointer-events-none'); }, 280);
      document.documentElement.style.overflow = '';
    }
    document.querySelectorAll('[data-mobile-menu-toggle]').forEach(b => b.addEventListener('click', open));
    drawer.querySelectorAll('[data-mm-close]').forEach(b => b.addEventListener('click', shut));
    backdrop.addEventListener('click', shut);
    // close drawer when a leaf link is clicked (anchors only — push buttons handled separately)
    drawer.querySelectorAll('a[href]:not([data-mm-back])').forEach(a => a.addEventListener('click', shut));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && drawer.getAttribute('aria-hidden') === 'false') shut(); });

    // Stack navigation: each [data-mm-screen] is an absolutely-positioned full-height page.
    // mm-screen-active = visible, mm-screen-right = waiting off-screen right, mm-screen-left = pushed away to the left.
    const stack = ['root'];
    function screenEl(name){ return drawer.querySelector('[data-mm-screen="' + name + '"]'); }
    function pushTo(target){
      const cur = stack[stack.length - 1];
      const curEl = screenEl(cur);
      const tgtEl = screenEl(target);
      if (!curEl || !tgtEl || cur === target) return;
      tgtEl.classList.remove('mm-screen-right');
      tgtEl.classList.add('mm-screen-active');
      curEl.classList.remove('mm-screen-active');
      curEl.classList.add('mm-screen-left');
      tgtEl.scrollTop = 0;
      stack.push(target);
    }
    function popOne(){
      if (stack.length < 2) return;
      const popped = stack.pop();
      const popEl = screenEl(popped);
      const prev = stack[stack.length - 1];
      const prevEl = screenEl(prev);
      if (!popEl || !prevEl) return;
      popEl.classList.remove('mm-screen-active');
      popEl.classList.add('mm-screen-right');
      prevEl.classList.remove('mm-screen-left');
      prevEl.classList.add('mm-screen-active');
    }
    function resetToRoot(){
      while (stack.length > 1) popOne();
    }
    drawer.querySelectorAll('[data-mm-go]').forEach(b => b.addEventListener('click', () => pushTo(b.getAttribute('data-mm-go'))));
    drawer.querySelectorAll('[data-mm-back]').forEach(b => b.addEventListener('click', popOne));
    // Reset stack to root every time the drawer is closed
    const originalShut = shut;
    const wrappedShut = function(){ originalShut(); setTimeout(resetToRoot, 320); };
    drawer.querySelectorAll('[data-mm-close]').forEach(b => { b.removeEventListener('click', shut); b.addEventListener('click', wrappedShut); });
    backdrop.removeEventListener('click', shut);
    backdrop.addEventListener('click', wrappedShut);
  }

  function inject(){
    document.querySelectorAll('[data-release-header]').forEach(el => el.outerHTML = header);
    document.querySelectorAll('[data-release-footer]').forEach(el => el.outerHTML = footer);
    document.body.insertAdjacentHTML('beforeend', mobileMenu);
    document.body.insertAdjacentHTML('beforeend', searchDrawer);
    document.body.insertAdjacentHTML('beforeend', cartDrawer);
    document.body.insertAdjacentHTML('beforeend', quickviewDrawer);
    document.body.insertAdjacentHTML('beforeend', sizeGuideModal);
    document.body.insertAdjacentHTML('beforeend', filterDrawer);
    bindMobileMenu();
    bindDesktopMega();
    bindFilters();
    bindSort();
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
