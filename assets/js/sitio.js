/* Ghatu Games — lógica de la web. NO hace falta editar este archivo para
   agregar juegos, apps o tutoriales: edita data/catalogo.js y data/tutoriales.js */
(function () {
  'use strict';
  var G = window.GHATU || {}, S = G.sitio || {}, CAT = G.catalogo || [], TUT = G.tutoriales || [], PUB = G.publicaciones || [];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function param(n) { var m = location.search.match(new RegExp('[?&]' + n + '=([^&]*)')); return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : ''; }
  function fecha(f) { var p = String(f).split('-'), M = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']; return p.length === 3 ? (+p[2]) + ' ' + M[+p[1] - 1] + ' ' + p[0] : esc(f); }
  var pagina = document.body.getAttribute('data-pagina');
  var main = $('#contenido');

  /* ---------- cabecera y pie ---------- */
  var MENU = [['index', 'index.html', 'Inicio'], ['juegos', 'juegos.html', 'Juegos'], ['apps', 'apps.html', 'Apps'], ['publicaciones', 'publicaciones.html', 'Publicaciones'], ['tutoriales', 'tutoriales.html', 'Tutoriales'], ['acerca', 'acerca.html', 'Acerca de']];
  function activo(id) {
    if (pagina === 'ficha') { var it = buscar(param('id')); return id === (it && it.tipo === 'app' ? 'apps' : 'juegos'); }
    if (pagina === 'tutorial') return id === 'tutoriales';
    return id === pagina;
  }
  $('#cabecera').innerHTML = '<div class="envoltura barra"><a class="marca" href="index.html"><img src="assets/img/logo-128.webp" alt="" width="40" height="40">' + esc(S.nombre || 'Ghatu Games') + '</a>' +
    '<button class="boton-menu" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menú">☰</button>' +
    '<nav class="menu" id="menu" aria-label="Principal">' + MENU.map(function (m) { return '<a href="' + m[1] + '"' + (activo(m[0]) ? ' class="activo" aria-current="page"' : '') + '>' + m[2] + '</a>'; }).join('') + '</nav></div>';
  var bm = $('.boton-menu'), nav = $('#menu');
  bm.addEventListener('click', function () { var a = nav.classList.toggle('abierto'); bm.setAttribute('aria-expanded', a); bm.textContent = a ? '✕' : '☰'; bm.setAttribute('aria-label', a ? 'Cerrar menú' : 'Abrir menú'); });
  var redes = [['correo', 'Correo'], ['youtube', 'YouTube'], ['facebook', 'Facebook'], ['tiktok', 'TikTok']].filter(function (r) { return S[r[0]]; })
    .map(function (r) { var u = r[0] === 'correo' ? 'mailto:' + S.correo : S[r[0]]; return '<a href="' + esc(u) + '"' + (r[0] === 'correo' ? '' : ' target="_blank" rel="noopener"') + '>' + r[1] + '</a>'; }).join('');
  $('#pie').innerHTML = '<div class="envoltura pie"><div>© ' + new Date().getFullYear() + ' ' + esc(S.nombre || 'Ghatu Games') + ' · Hecho en Bolivia con 💗</div><nav aria-label="Pie">' +
    MENU.map(function (m) { return '<a href="' + m[1] + '">' + m[2] + '</a>'; }).join('') + redes + '</nav></div>';

  /* ---------- utilidades del catálogo ---------- */
  function buscar(id) { for (var i = 0; i < CAT.length; i++) if (CAT[i].id === id) return CAT[i]; return null; }
  function urlFicha(it) { return 'ficha.html?id=' + encodeURIComponent(it.id); }
  function botonesDescarga(it, grande) {
    var d = it.descargas || {}, h = '';
    if (d.apk) h += '<a class="btn" href="' + esc(G.urlDescarga(d.tag, d.apk.archivo)) + '" download data-descarga="apk"><span><span class="ico" aria-hidden="true">🤖</span> Descargar APK</span><small>Android · ' + esc(d.apk.tamano) + '</small></a>';
    if (d.pc) h += '<a class="btn oro" href="' + esc(G.urlDescarga(d.tag, d.pc.archivo)) + '" download data-descarga="pc"><span><span class="ico" aria-hidden="true">💻</span> Versión PC</span><small>Navegador · ' + esc(d.pc.tamano) + '</small></a>';
    return h;
  }
  function tarjeta(it) {
    return '<article class="tarjeta"><a class="portada" href="' + urlFicha(it) + '" aria-label="' + esc(it.nombre) + '"><img src="' + esc(it.portada) + '" alt="" loading="lazy" width="800" height="450">' +
      (it.nuevo ? '<span class="cinta">Nuevo</span>' : '') + (it.icono ? '<img class="icono-item" src="' + esc(it.icono) + '" alt="" loading="lazy" width="56" height="56">' : '') + '</a>' +
      '<div class="cuerpo"><div class="genero">' + esc(it.genero) + '</div><h3><a href="' + urlFicha(it) + '">' + esc(it.nombre) + '</a></h3><p>' + esc(it.resumen) + '</p>' +
      '<div class="meta"><span class="chip">v' + esc(it.version) + '</span>' + (it.descargas && it.descargas.apk ? '<span class="chip">APK ' + esc(it.descargas.apk.tamano) + '</span>' : '') +
      (it.descargas && it.descargas.pc ? '<span class="chip">PC ' + esc(it.descargas.pc.tamano) + '</span>' : '') + '</div>' +
      '<div class="botones">' + botonesDescarga(it) + '</div><a class="mas" href="' + urlFicha(it) + '">Ver detalles y capturas →</a></div></article>';
  }
  function rejilla(lista) { return lista.length ? '<div class="rejilla">' + lista.map(tarjeta).join('') + '</div>' : '<div class="vacio">Pronto habrá novedades aquí.</div>'; }
  var ICONO_CAT = { Android: '🤖', PC: '💻', Apps: '🎧', Seguridad: '🛡️', Equipo: '📲' };
  function tuto(t) {
    return '<a class="tuto" href="tutorial.html?id=' + encodeURIComponent(t.id) + '"><span class="num" aria-hidden="true">' + (ICONO_CAT[t.categoria] || '📘') + '</span><span><small>' + esc(t.categoria) + ' · ' + esc(t.minutos) + ' min' + (t.youtube ? ' · ▶ video' : '') + '</small><h3>' + esc(t.titulo) + '</h3><p>' + esc(t.resumen) + '</p></span></a>';
  }

  /* ---------- publicaciones ---------- */
  function urlSegura(u) { u = String(u || '').trim(); return /^(https?:\/\/|[a-z0-9_\-./]+(\?[^\s]*)?$)/i.test(u) && !/^(javascript|data):/i.test(u) ? u : ''; }
  function servicio(u) {
    var h = (String(u).match(/^https?:\/\/([^\/?#]+)/i) || [])[1] || '';
    if (/mega\.(nz|io)$/i.test(h)) return ['Mega', '☁️'];
    if (/drive\.google\.com$|docs\.google\.com$/i.test(h)) return ['Google Drive', '📁'];
    if (/mediafire\.com$/i.test(h)) return ['MediaFire', '🔥'];
    if (/github\.com$/i.test(h) && /\/releases\//.test(u)) return ['GitHub', '📦'];
    if (/github\.(com|io)$/i.test(h)) return ['GitHub', '🌐'];
    if (/dropbox\.com$/i.test(h)) return ['Dropbox', '📦'];
    if (/onedrive\.live\.com$|1drv\.ms$|sharepoint\.com$/i.test(h)) return ['OneDrive', '☁️'];
    if (/youtube\.com$|youtu\.be$/i.test(h)) return ['YouTube', '▶️'];
    return h ? [h.replace(/^www\./, ''), '🔗'] : ['', '🔗'];
  }
  function inlineMd(t) { var h = G.markdown ? G.markdown(String(t)) : '<p>' + esc(t) + '</p>'; return h; }
  function botonPub(d) {
    if (!d || !urlSegura(d.url)) return '';
    var sv = servicio(d.url), ext = /^https?:/i.test(d.url);
    return '<a class="btn" href="' + esc(d.url) + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + ' data-descarga="pub"><span><span class="ico" aria-hidden="true">' + sv[1] + '</span> ' + esc(d.texto || 'Descargar') + '</span><small>' + esc([sv[0], d.tamano].filter(Boolean).join(' · ')) + '</small></a>';
  }
  function pubCorta(p) {
    return '<article class="tarjeta pub-corta"><a class="portada" href="publicaciones.html#' + encodeURIComponent(p.id) + '" aria-label="' + esc(p.titulo) + '">' + (urlSegura(p.imagen) ? '<img src="' + esc(p.imagen) + '" alt="" loading="lazy" width="800" height="420">' : '<span class="sin-img" aria-hidden="true">📰</span>') + '</a>' +
      '<div class="cuerpo"><div class="genero">' + esc(p.categoria) + ' · ' + fecha(p.fecha) + '</div><h3><a href="publicaciones.html#' + encodeURIComponent(p.id) + '">' + esc(p.titulo) + '</a></h3><p>' + esc(p.resumen) + '</p><a class="mas" href="publicaciones.html#' + encodeURIComponent(p.id) + '">Leer más →</a></div></article>';
  }
  function pubLarga(p) {
    return '<article class="pub" id="' + esc(p.id) + '" data-cat="' + esc(p.categoria) + '">' + (urlSegura(p.imagen) ? '<img class="pub-img" src="' + esc(p.imagen) + '" alt="" loading="lazy" width="800" height="420">' : '') +
      '<div class="pub-cuerpo"><div class="genero">' + esc(p.categoria) + ' · <time datetime="' + esc(p.fecha) + '">' + fecha(p.fecha) + '</time></div><h2>' + esc(p.titulo) + '</h2><div class="prosa">' + (p.texto || []).map(inlineMd).join('') + '</div>' +
      (botonPub(p.descarga) ? '<div class="pub-boton">' + botonPub(p.descarga) + '</div>' : '') + '<a class="enlace-pub" href="#' + esc(p.id) + '">🔗 Enlace a esta publicación</a></div></article>';
  }
  var juegos = CAT.filter(function (i) { return i.tipo !== 'app'; }), apps = CAT.filter(function (i) { return i.tipo === 'app'; });
  function cabeza(t, p) { return '<section class="cabeza-pagina"><div class="envoltura"><h1>' + t + '</h1><p>' + p + '</p></div></section>'; }
  function titulo(t) { document.title = t + ' · ' + (S.nombre || 'Ghatu Games'); }

  /* ---------- páginas ---------- */
  var P = {};
  P.index = function () {
    return '<section class="heroe"><div class="envoltura dos"><div><div class="sello"><img src="assets/img/logo-128.webp" alt="" width="32" height="32"><span><small>HECHO POR</small><b>GHATU GAMES</b></span></div>' +
      '<h1>Juegos y apps <span>hechos en Bolivia</span></h1><p class="lead">' + esc(S.lema) + '</p>' +
      '<div class="acciones"><a class="btn" href="juegos.html">🎮 Ver juegos</a><a class="btn oro" href="apps.html">📚 Apps para aprender</a><a class="btn borde" href="tutoriales.html">¿Cómo instalo?</a></div></div>' +
      '<div class="logo-grande"><img src="assets/img/logo-512.webp" alt="Logo de Ghatu Games: una bolita rosada peluda con cuernos y aureola" width="512" height="512"></div></div>' +
      '<div class="envoltura"><div class="ventajas"><div class="ventaja"><i>📴</i>Funcionan sin internet</div><div class="ventaja"><i>🚫</i>Sin anuncios</div><div class="ventaja"><i>🔒</i>Sin permisos raros</div><div class="ventaja"><i>🆓</i>Gratis</div></div></div></section>' +
      '<section class="seccion"><div class="envoltura"><div class="titulo-seccion"><div><h2>🎮 Juegos</h2><p>Acción, estrategia y diversión andina.</p></div><a class="btn borde" href="juegos.html">Ver todos</a></div>' + rejilla(juegos.slice(0, 3)) + '</div></section>' +
      '<section class="seccion"><div class="envoltura"><div class="titulo-seccion"><div><h2>📚 Apps y programas</h2><p>Aprende inglés jugando, sin conexión.</p></div><a class="btn borde" href="apps.html">Ver todas</a></div>' + rejilla(apps.slice(0, 2)) + '</div></section>' +
      (PUB.length ? '<section class="seccion"><div class="envoltura"><div class="titulo-seccion"><div><h2>📰 Publicaciones</h2><p>Novedades, lanzamientos y descargas.</p></div><a class="btn borde" href="publicaciones.html">Ver todas</a></div><div class="rejilla">' + PUB.slice(0, 3).map(pubCorta).join('') + '</div></div></section>' : '') +
      '<section class="seccion"><div class="envoltura"><div class="titulo-seccion"><div><h2>🛠️ Tutoriales</h2><p>Guías cortas para instalar y jugar.</p></div><a class="btn borde" href="tutoriales.html">Ver todos</a></div><div class="lista-tutos">' + TUT.slice(0, 2).map(tuto).join('') + '</div></div></section>';
  };
  P.juegos = function () { return cabeza('🎮 Juegos', 'Todos nuestros juegos son gratis, sin anuncios y funcionan sin internet. Descarga el <b>APK</b> para Android o la <b>Versión PC</b> (se abre con doble clic en el navegador).') + '<section class="seccion"><div class="envoltura">' + rejilla(juegos) + '</div></section>'; };
  P.apps = function () { return cabeza('📚 Apps y programas', 'Herramientas para aprender, pensadas para estudiantes bolivianos. Sin internet, sin cuentas y sin anuncios.') + '<section class="seccion"><div class="envoltura">' + rejilla(apps) + '</div></section>'; };
  P.ficha = function () {
    var it = buscar(param('id'));
    if (!it) { titulo('No encontrado'); return '<div class="envoltura"><div class="caja aviso"><h1>No encontramos ese juego</h1><p>Puede que el enlace esté mal escrito o que el juego haya cambiado de nombre. Mira la lista completa:</p><a class="btn" href="juegos.html">Ver juegos</a></div></div>'; }
    titulo(it.nombre);
    var d = it.descargas || {}, seccion = it.tipo === 'app' ? ['apps.html', 'Apps'] : ['juegos.html', 'Juegos'];
    var hashes = [['apk', 'APK'], ['pc', 'PC']].filter(function (k) { return d[k[0]] && d[k[0]].sha256; }).map(function (k) { return '<div><b>' + k[1] + '</b> <span>(' + esc(d[k[0]].archivo) + ')</span><div class="hash">' + esc(d[k[0]].sha256) + '</div></div>'; }).join('');
    return '<div class="envoltura"><nav class="migas" aria-label="Ruta"><a href="index.html">Inicio</a> › <a href="' + seccion[0] + '">' + seccion[1] + '</a> › ' + esc(it.nombre) + '</nav>' +
      '<div class="ficha"><div><div class="portada"><img src="' + esc(it.portada) + '" alt="' + esc(it.nombre) + '" width="800" height="450">' + (it.nuevo ? '<span class="cinta">Nuevo</span>' : '') + '</div>' +
      '<section class="seccion"><div class="genero">' + esc(it.genero) + '</div><h1>' + esc(it.nombre) + '</h1>' + (it.descripcion || []).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
      (it.caracteristicas && it.caracteristicas.length ? '<h2>Lo que trae</h2><ul class="lista-check">' + it.caracteristicas.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ul>' : '') +
      (it.capturas && it.capturas.length ? '<h2>Capturas</h2><div class="capturas">' + it.capturas.map(function (c, i) { return '<button type="button" class="' + (c.vertical ? 'vertical' : '') + '" data-i="' + i + '" aria-label="Ampliar: ' + esc(c.alt) + '"><img src="' + esc(c.img) + '" alt="' + esc(c.alt) + '" loading="lazy"></button>'; }).join('') + '</div>' : '') +
      '</section></div><aside><div class="panel"><h2>Descargar</h2>' + botonesDescarga(it, true) + '<p style="font-size:14px;color:var(--suave);margin:4px 0 0">¿Primera vez? Lee <a href="tutorial.html?id=instalar-apk-android">cómo instalar un APK</a> o <a href="tutorial.html?id=abrir-juegos-en-pc">cómo abrir la versión PC</a>.</p></div>' +
      '<div class="panel"><ul class="datos"><li><span>Versión</span><b>' + esc(it.version) + '</b></li>' + (d.apk ? '<li><span>Tamaño APK</span><b>' + esc(d.apk.tamano) + '</b></li>' : '') + (d.pc ? '<li><span>Tamaño PC</span><b>' + esc(d.pc.tamano) + '</b></li>' : '') +
      '<li><span>Requisitos</span><b style="text-align:right">' + esc(it.requisitos) + '</b></li><li><span>Internet</span><b>No necesita</b></li><li><span>Precio</span><b>Gratis</b></li></ul></div>' +
      (hashes ? '<div class="panel"><h3>Huella SHA-256</h3><p style="font-size:14px;color:var(--suave)">Para <a href="tutorial.html?id=verificar-descarga">comprobar que el archivo es original</a>.</p>' + hashes + '</div>' : '') +
      '</aside></div></div>';
  };
  P.publicaciones = function () {
    var cats = []; PUB.forEach(function (p) { if (cats.indexOf(p.categoria) < 0) cats.push(p.categoria); });
    return cabeza('📰 Publicaciones', 'Novedades de Ghatu Games: lanzamientos, proyectos y descargas.') + '<section class="seccion" style="padding-top:6px"><div class="envoltura">' +
      (cats.length > 1 ? '<div class="filtros" role="group" aria-label="Categoría" style="margin-bottom:18px"><button type="button" class="activo" data-c="">Todas</button>' + cats.map(function (c) { return '<button type="button" data-c="' + esc(c) + '">' + esc(c) + '</button>'; }).join('') + '</div>' : '') +
      '<div class="lista-pubs">' + (PUB.length ? PUB.map(pubLarga).join('') : '<div class="vacio">Pronto habrá publicaciones.</div>') + '</div></div></section>';
  };
  P.tutoriales = function () {
    var cats = []; TUT.forEach(function (t) { if (cats.indexOf(t.categoria) < 0) cats.push(t.categoria); });
    return cabeza('🛠️ Tutoriales', 'Guías paso a paso para instalar, jugar y aprovechar nuestras apps.') + '<section class="seccion" style="padding-top:6px"><div class="envoltura"><div class="buscador"><input type="search" id="q" placeholder="Buscar tutorial…" aria-label="Buscar tutorial"><div class="filtros" role="group" aria-label="Categoría"><button type="button" class="activo" data-c="">Todos</button>' +
      cats.map(function (c) { return '<button type="button" data-c="' + esc(c) + '">' + esc(c) + '</button>'; }).join('') + '</div></div><div class="lista-tutos" id="lista"></div></div></section>';
  };
  P.tutorial = function () {
    var id = param('id'), t = null; TUT.forEach(function (x) { if (x.id === id) t = x; });
    if (!t) { titulo('No encontrado'); return '<div class="envoltura"><div class="caja aviso"><h1>No encontramos ese tutorial</h1><p>Puede que el enlace esté mal escrito. Aquí están todas nuestras guías:</p><a class="btn" href="tutoriales.html">Ver tutoriales</a></div></div>'; }
    titulo(t.titulo);
    return '<div class="envoltura"><article class="articulo"><nav class="migas" aria-label="Ruta"><a href="index.html">Inicio</a> › <a href="tutoriales.html">Tutoriales</a> › ' + esc(t.categoria) + '</nav><h1>' + esc(t.titulo) + '</h1>' +
      '<div class="info">' + fecha(t.fecha) + ' · ' + esc(t.minutos) + ' min de lectura · ' + esc(t.categoria) + '</div>' + (t.youtube ? G.videoHtml(t.youtube, t.titulo) : '') +
      '<div class="prosa" id="prosa"><p>Cargando…</p></div><p style="margin-top:30px"><a class="btn borde" href="tutoriales.html">← Más tutoriales</a></p></article></div>';
  };
  P.acerca = function () {
    return cabeza('Acerca de Ghatu Games', 'Somos un estudio independiente de Bolivia que hace juegos y apps ligeros, en español, que funcionan en cualquier teléfono y sin internet.') +
      '<section class="seccion"><div class="envoltura"><div class="columnas">' +
      '<div class="caja"><h3>💗 Nuestra idea</h3><p>Juegos divertidos con sabor andino y apps que ayudan a aprender, sin anuncios ni compras escondidas. Que cualquiera pueda jugar aunque tenga un teléfono sencillo o poca señal.</p></div>' +
      '<div class="caja"><h3>🔒 Tu privacidad</h3><p>Nuestras apps no piden permisos de internet, cámara ni contactos, y no recogen datos. Tus avances se guardan solo en tu dispositivo.</p></div>' +
      '<div class="caja"><h3>📦 Descargas seguras</h3><p>Todos los archivos se publican en nuestra página de GitHub con su huella SHA-256 para que puedas <a href="tutorial.html?id=verificar-descarga">comprobar que son originales</a>.</p></div>' +
      '</div><div class="caja" style="margin-top:16px"><h3>🎸 También hacemos webs</h3><p>Hicimos la página oficial de <b>Six Circle</b>, banda boliviana de rock y metal: música, videos y todas sus plataformas.</p><a class="btn borde" href="https://ghatugames.github.io/sixcircle/" target="_blank" rel="noopener">Visitar la web de Six Circle ↗</a></div><div class="caja" style="margin-top:16px;text-align:center"><img src="assets/img/logo-256.webp" alt="" width="120" height="120" style="width:120px;margin:0 auto 10px;border-radius:50%;border:5px solid var(--oro)"><h3>¿Ideas o problemas?</h3><p>' +
      (S.correo ? 'Escríbenos a <a href="mailto:' + esc(S.correo) + '">' + esc(S.correo) + '</a>.' : 'Muy pronto publicaremos nuestros canales de contacto.') + '</p>' + (redes ? '<p class="pie" style="justify-content:center;padding:0">' + redes + '</p>' : '') + '</div></div></section>';
  };
  P.generador = function () { return '<div id="generador"></div>'; };
  P['404'] = function () { return '<div class="envoltura"><div class="caja aviso" style="margin-top:50px"><img src="assets/img/logo-256.webp" alt="" width="120" height="120" style="width:120px;margin:0 auto 10px;border-radius:50%;border:5px solid var(--oro)"><h1>¡Uy! 404</h1><p>Esta página se escapó como llama asustada. Volvamos al inicio o mira nuestros juegos.</p><a class="btn" href="index.html">Ir al inicio</a></div></div>'; };

  main.insertAdjacentHTML('beforeend', (P[pagina] || P['404'])());

  /* ---------- interacciones ---------- */
  if (pagina === 'tutoriales') {
    var q = $('#q'), cat = '', lista = $('#lista');
    var pintar = function () {
      var s = q.value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      var r = TUT.filter(function (t) { var txt = (t.titulo + ' ' + t.resumen + ' ' + t.categoria).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); return (!cat || t.categoria === cat) && (!s || txt.indexOf(s) >= 0); });
      lista.innerHTML = r.length ? r.map(tuto).join('') : '<div class="vacio">No hay tutoriales con esa búsqueda.</div>';
    };
    q.addEventListener('input', pintar);
    main.querySelectorAll('.filtros button').forEach(function (b) { b.addEventListener('click', function () { cat = b.getAttribute('data-c'); main.querySelectorAll('.filtros button').forEach(function (x) { x.classList.toggle('activo', x === b); }); pintar(); }); });
    pintar();
  }
  if (pagina === 'publicaciones') {
    main.querySelectorAll('.filtros button').forEach(function (b) { b.addEventListener('click', function () { var c = b.getAttribute('data-c'); main.querySelectorAll('.filtros button').forEach(function (x) { x.classList.toggle('activo', x === b); }); main.querySelectorAll('.pub').forEach(function (a) { a.hidden = !!c && a.getAttribute('data-cat') !== c; }); }); });
    if (location.hash) { var dest = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (dest) setTimeout(function () { dest.scrollIntoView(); dest.classList.add('resaltar'); }, 50); }
  }
  if (pagina === 'tutorial' && $('#prosa')) {
    var t = TUT.filter(function (x) { return x.id === param('id'); })[0], prosa = $('#prosa');
    fetch(t.archivo, { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); }).then(function (txt) {
      if (/\.html?$/i.test(t.archivo)) prosa.innerHTML = txt;
      else prosa.innerHTML = G.markdown(txt.replace(/^\s*#\s+[^\n]*\n/, '')); // el título ya está arriba
    }).catch(function () {
      prosa.innerHTML = '<div class="caja aviso"><p><b>No se pudo cargar el tutorial.</b></p><p>' + (location.protocol === 'file:' ? 'Abriste la web con doble clic: los tutoriales necesitan un servidor. Usa <code>python3 -m http.server</code> (ver EDITAR-WEB.txt) o mira la web publicada.' : 'Revisa tu conexión e intenta de nuevo.') + '</p></div>';
    });
  }
  // videos de YouTube: se cargan solo al tocar (más liviano y privado)
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.video-play'); if (!b) return;
    var box = b.parentNode, id = box.getAttribute('data-yt');
    box.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0" title="Video de YouTube" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  });
  // visor de capturas
  var caps = main.querySelectorAll('.capturas button');
  caps.forEach(function (b) {
    b.addEventListener('click', function () {
      var img = b.querySelector('img'), v = document.createElement('div');
      v.className = 'visor'; v.setAttribute('role', 'dialog'); v.setAttribute('aria-modal', 'true'); v.setAttribute('aria-label', img.alt);
      v.innerHTML = '<img src="' + img.getAttribute('src') + '" alt="' + esc(img.alt) + '"><p>' + esc(img.alt) + '</p><button type="button" aria-label="Cerrar">✕</button>';
      var cerrar = function () { v.remove(); document.removeEventListener('keydown', tecla); b.focus(); };
      var tecla = function (e) { if (e.key === 'Escape') cerrar(); };
      v.addEventListener('click', cerrar); document.addEventListener('keydown', tecla);
      document.body.appendChild(v); v.querySelector('button').focus();
    });
  });
})();
