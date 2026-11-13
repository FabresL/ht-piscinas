/* ========== CONFIGURAÇÃO ========== */
const CONFIG = {
  whatsapp: '5551997576515',
  mapsApiKey: '',                                   // cole aqui a chave da API do Google Maps (Maps JavaScript API)
  loja: {                                           // endereço exibido no mapa: altere à vontade
    nome: 'HT Piscinas',
    endereco: 'Rua Paes Lemes, 715 - Loja 7, Canoas - RS',
    lat: null,                                      // null = o mapa localiza pelo endereço
    lng: null                                       // (opcional: informe lat/lng para posição exata)
  }
};

/* ========== LOGO: fallback em texto se assets/logo.png não existir ========== */
document.querySelectorAll('.logo__img').forEach((img) => {
  const semLogo = () => img.closest('.logo').classList.add('sem-logo');
  if (img.complete && img.naturalWidth === 0) semLogo();
  img.addEventListener('error', semLogo);
});

/* ========== MENU MOBILE ========== */
const menuBotao = document.getElementById('menuBotao');
const menu = document.getElementById('menu');
if (menuBotao && menu) {
  const alternarMenu = (abrir) => {
    menu.classList.toggle('aberto', abrir);
    menuBotao.setAttribute('aria-expanded', String(abrir));
  };
  menuBotao.addEventListener('click', () => alternarMenu(!menu.classList.contains('aberto')));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => alternarMenu(false)));
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !menuBotao.contains(e.target)) alternarMenu(false);
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') alternarMenu(false); });
}

/* ========== CARROSSEL (1 foto no mobile, 2 no tablet, 3 no desktop; loop contínuo) ========== */
const carrossel = document.getElementById('carrossel');
if (carrossel) {
  const faixa = document.getElementById('carrosselFaixa');
  const pontos = document.getElementById('carrosselPontos');
  const originais = [...faixa.children];
  const total = originais.length;
  const mqDesktop = window.matchMedia('(min-width: 1000px)');
  const mqTablet = window.matchMedia('(min-width: 768px)');
  const calcPorVista = () => (mqDesktop.matches ? 3 : mqTablet.matches ? 2 : 1);
  let porVista = calcPorVista();
  let atual = 0;
  let timer;

  // Clones das primeiras fotos no final da faixa: permitem o loop sem "voltar" visível
  function montarFaixa() {
    faixa.querySelectorAll('.clone').forEach((c) => c.remove());
    originais.slice(0, porVista).forEach((s) => {
      const c = s.cloneNode(true);
      c.classList.add('clone');
      c.setAttribute('aria-hidden', 'true');
      faixa.appendChild(c);
    });
    pontos.innerHTML = '';
    originais.forEach((_, i) => {
      const p = document.createElement('button');
      p.setAttribute('aria-label', `Ir para a foto ${i + 1}`);
      p.addEventListener('click', () => { posicionar(i, true); reiniciarAuto(); });
      pontos.appendChild(p);
    });
  }

  function posicionar(i, animar) {
    faixa.style.transition = animar ? '' : 'none';
    faixa.style.transform = `translateX(-${i * (100 / porVista)}%)`;
    atual = i;
    [...pontos.children].forEach((p, idx) => p.classList.toggle('ativo', idx === atual % total));
  }

  const avancar = () => posicionar(atual + 1, true);
  const voltar = () => {
    if (atual <= 0) { posicionar(total, false); faixa.offsetWidth; }   // salta para o clone e anima para trás
    posicionar(atual - 1, true);
  };
  // Ao chegar no clone, volta ao início sem animação (visualmente idêntico)
  faixa.addEventListener('transitionend', () => { if (atual >= total) posicionar(atual - total, false); });

  const iniciarAuto = () => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(avancar, 5000);
  };
  const reiniciarAuto = () => { clearInterval(timer); iniciarAuto(); };

  document.getElementById('carrosselAnt').addEventListener('click', () => { voltar(); reiniciarAuto(); });
  document.getElementById('carrosselProx').addEventListener('click', () => { avancar(); reiniciarAuto(); });
  carrossel.addEventListener('mouseenter', () => clearInterval(timer));
  carrossel.addEventListener('mouseleave', reiniciarAuto);

  let inicioX = 0;                                   // swipe
  carrossel.addEventListener('touchstart', (e) => { inicioX = e.touches[0].clientX; clearInterval(timer); }, { passive: true });
  carrossel.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - inicioX;
    if (Math.abs(dx) > 50) (dx < 0 ? avancar : voltar)();
    reiniciarAuto();
  });

  const aoRedimensionar = () => { porVista = calcPorVista(); montarFaixa(); posicionar(0, false); };
  mqDesktop.addEventListener('change', aoRedimensionar);
  mqTablet.addEventListener('change', aoRedimensionar);
  montarFaixa();
  posicionar(0, false);
  iniciarAuto();
}

/* ========== ORÇAMENTO -> WhatsApp com mensagem pré-preenchida ========== */
const form = document.getElementById('formOrcamento');
if (form) {
  const aviso = document.getElementById('orcamentoAviso');
  // Links "Solicitar orçamento" dos cards de serviço pré-selecionam a opção
  document.querySelectorAll('[data-interesse]').forEach((a) => a.addEventListener('click', () => {
    form.interesse.value = a.dataset.interesse;
  }));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = form.nome.value.trim();
    form.nome.classList.toggle('invalido', !nome);
    if (!nome) { aviso.textContent = 'Informe seu nome para continuar.'; form.nome.focus(); return; }
    const detalhes = form.detalhes.value.trim();
    const msg = `Olá! Meu nome é ${nome}. Gostaria de solicitar um orçamento: ${form.interesse.value}.` + (detalhes ? ` Detalhes: ${detalhes}` : '');
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    aviso.textContent = 'Abrindo o WhatsApp com a sua solicitação...';
  });
}

/* ========== LOJA: filtro por categoria ========== */
const filtros = document.getElementById('filtros');
if (filtros) {
  filtros.addEventListener('click', (e) => {
    const btn = e.target.closest('.filtro');
    if (!btn) return;
    filtros.querySelectorAll('.filtro').forEach((b) => b.classList.toggle('ativo', b === btn));
    document.querySelectorAll('.produto').forEach((p) => {
      p.hidden = btn.dataset.filtro !== 'todos' && p.dataset.categoria !== btn.dataset.filtro;
    });
  });
}

/* ========== LOJA: Google Maps ========== */
const mapa = document.getElementById('mapa');
if (mapa) {
  const { nome, endereco, lat, lng } = CONFIG.loja;
  const consulta = lat != null && lng != null ? `${lat},${lng}` : `${nome}, ${endereco}`;
  document.getElementById('mapaEndereco').textContent = `${nome} — ${endereco}`;
  document.getElementById('mapaLink').href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(consulta);

  if (!CONFIG.mapsApiKey) {
    // Sem chave: mapa embutido via iframe (não exige API)
    document.getElementById('mapaFrame').src = 'https://www.google.com/maps?q=' + encodeURIComponent(consulta) + '&output=embed';
  } else {
    // Com chave: usa a Maps JavaScript API
    mapa.innerHTML = '';
    window.iniciarMapa = () => {
      const desenhar = (pos) => {
        const m = new google.maps.Map(mapa, { center: pos, zoom: 16 });
        new google.maps.Marker({ position: pos, map: m, title: nome });
      };
      if (lat != null && lng != null) return desenhar({ lat, lng });
      new google.maps.Geocoder().geocode({ address: endereco }, (r, status) => {
        if (status === 'OK') desenhar(r[0].geometry.location);
        else mapa.textContent = 'Não foi possível localizar o endereço.';
      });
    };
    const el = document.createElement('script');
    el.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(CONFIG.mapsApiKey)}&callback=iniciarMapa`;
    el.async = true;
    document.head.appendChild(el);
  }
}
