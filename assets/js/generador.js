/* Generador de bloques para data/catalogo.js y data/publicaciones.js.
   Funciona sin internet y sin servidor: todo ocurre en tu navegador. */
(function () {
  'use strict';
  var G = window.GHATU || {}, root = document.getElementById('generador'); if (!root) return;
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  // texto -> literal JS entre comillas simples (seguro para pegar)
  function q(s) { return "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, ' ').replace(/\u2028|\u2029/g, ' ') + "'"; }
  function slug(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ñ/g, 'n').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40); }
  function lineas(s) { return String(s || '').split(/\r?\n/).map(function (x) { return x.trim(); }).filter(Boolean); }
  function parrafos(s) { return String(s || '').split(/\r?\n\s*\r?\n/).map(function (x) { return x.replace(/\s*\r?\n\s*/g, ' ').trim(); }).filter(Boolean); }
  function hoy() { var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function tam(b) { return b < 1000000 ? Math.max(1, Math.round(b / 1024)) + ' KB' : b < 1e9 ? (Math.round(b / 104857.6) / 10).toFixed(1).replace('.', ',') + ' MB' : (Math.round(b / 107374182.4) / 10).toFixed(1).replace('.', ',') + ' GB'; }
  var RUTA = /^[a-z0-9][a-z0-9._\/-]*\.(webp|jpg|jpeg|png|gif)$/i, HTTPS = /^https:\/\/[^\s'"<>]+\.[^\s'"<>]+$/i;

  function campo(id, label, o) {
    o = o || {}; var t = o.tipo || 'text', ctl;
    if (t === 'textarea') ctl = '<textarea id="' + id + '" ' + (o.ph ? 'placeholder="' + esc(o.ph) + '"' : '') + ' rows="' + (o.filas || 4) + '"></textarea>';
    else if (t === 'select') ctl = '<select id="' + id + '">' + o.opciones.map(function (x) { return '<option value="' + esc(x[0]) + '">' + esc(x[1]) + '</option>'; }).join('') + '</select>';
    else ctl = '<input id="' + id + '" type="' + t + '" ' + (o.ph ? 'placeholder="' + esc(o.ph) + '"' : '') + (o.extra || '') + ' autocomplete="off">';
    return '<div class="campo" data-campo="' + id + '"><label for="' + id + '">' + label + (o.req ? ' <span aria-hidden="true" style="color:var(--rosa2)">*</span>' : '') + '</label>' + ctl + (o.ayuda ? '<small>' + o.ayuda + '</small>' : '') + '<span class="msg" role="alert"></span></div>';
  }
  function archivoCalc(pref) {
    return '<div class="campo"><label for="' + pref + '_file">Calcular tamaño y huella desde el archivo (opcional)</label><input id="' + pref + '_file" type="file"><small class="archivo-calc" id="' + pref + '_estado">Elige el archivo en tu celular o PC: se calcula aquí mismo, no se sube a ningún lado.</small></div>';
  }

  root.innerHTML = '<section class="cabeza-pagina"><div class="envoltura"><h1>🧩 Generador de bloques</h1><p>Llena el formulario y la página arma el bloque exacto para pegar en los archivos de datos. Funciona sin internet y nada sale de tu dispositivo. Paso a paso: <a href="tutorial.html?id=subir-desde-celular">Cómo subir tus juegos, programas y publicaciones desde el celular</a>.</p></div></section>' +
    '<section class="seccion" style="padding-top:6px"><div class="envoltura gen"><div class="pestanas" role="tablist"><button type="button" role="tab" class="activo" data-tab="item" aria-selected="true">🎮 Juego o app</button><button type="button" role="tab" data-tab="pub" aria-selected="false">📰 Publicación</button></div>' +
    // ---- juego / app
    '<form id="f-item" novalidate><fieldset><legend>Datos básicos</legend><div class="fila">' +
    campo('i_tipo', 'Tipo', { tipo: 'select', opciones: [['juego', 'Juego'], ['app', 'App / programa']] }) + campo('i_nombre', 'Nombre', { req: 1, ph: 'Ej.: Llama Runner' }) + '</div><div class="fila">' +
    campo('i_id', 'Identificador (id)', { req: 1, ph: 'llama-runner', ayuda: 'Se llena solo con el nombre. Sin espacios ni tildes.' }) + campo('i_version', 'Versión', { req: 1, ph: '1.0' }) + '</div><div class="fila">' +
    campo('i_genero', 'Género', { req: 1, ph: 'Ej.: Carreras infinitas' }) + campo('i_etiquetas', 'Etiquetas', { ph: 'Acción, Arcade', ayuda: 'Separadas por comas.' }) + '</div>' +
    '<label class="check"><input type="checkbox" id="i_nuevo" checked> Mostrar cinta «NUEVO»</label>' +
    campo('i_resumen', 'Resumen (1-2 frases para la tarjeta)', { tipo: 'textarea', req: 1, filas: 2 }) +
    campo('i_descripcion', 'Descripción', { tipo: 'textarea', req: 1, filas: 5, ayuda: 'Deja una línea en blanco entre párrafos.' }) +
    campo('i_caract', 'Características', { tipo: 'textarea', filas: 4, ph: 'Una por línea', ayuda: 'Una por línea.' }) +
    campo('i_requisitos', 'Requisitos', { ph: 'Android 6.0+ · PC con Chrome o Edge' }) + '</fieldset>' +
    '<fieldset><legend>Imágenes</legend>' + campo('i_portada', 'Portada', { req: 1, ph: 'assets/img/items/llama-runner-portada.webp', ayuda: 'Súbela a la carpeta assets/img/items/ con este nombre (16:9, ~800x450).' }) +
    campo('i_icono', 'Ícono (opcional)', { ph: 'assets/img/items/llama-runner-icono.webp' }) +
    campo('i_capturas', 'Capturas (opcional)', { tipo: 'textarea', filas: 3, ph: 'assets/img/items/llama-runner-1.webp | Pantalla de inicio\nassets/img/items/llama-runner-2.webp | Nivel 3 | vertical', ayuda: 'Una por línea: ruta | descripción | vertical (si es de celular).' }) + '</fieldset>' +
    '<fieldset><legend>Descargas (GitHub Releases)</legend>' + campo('i_tag', 'Tag de la Release', { req: 1, ph: 'llama-runner-v1.0', ayuda: 'Se llena solo: id-vVersión. Debe ser IGUAL al tag que crees en GitHub.' }) +
    '<h3 style="font-size:16px;margin:8px 0">🤖 APK (Android)</h3><div class="fila">' + campo('a_archivo', 'Nombre del archivo', { ph: 'llama-runner-android.apk' }) + campo('a_tamano', 'Tamaño', { ph: '1,2 MB' }) + '</div>' + campo('a_sha', 'SHA-256 (opcional)', { ph: '64 letras y números' }) + archivoCalc('a') +
    '<h3 style="font-size:16px;margin:8px 0">💻 Versión PC</h3><div class="fila">' + campo('p_archivo', 'Nombre del archivo', { ph: 'llama-runner-pc.html' }) + campo('p_tamano', 'Tamaño', { ph: '800 KB' }) + '</div>' + campo('p_sha', 'SHA-256 (opcional)') + archivoCalc('p') +
    '<small style="color:var(--suave)">Deja vacío el nombre de archivo si no hay versión APK o PC.</small></fieldset>' +
    '<button class="btn" type="submit">⚙️ Generar bloque</button></form>' +
    // ---- publicación
    '<form id="f-pub" novalidate hidden><fieldset><legend>Publicación</legend>' + campo('b_titulo', 'Título', { req: 1 }) + '<div class="fila">' +
    campo('b_id', 'Identificador (id)', { req: 1, ayuda: 'Se llena solo con el título.' }) + campo('b_fecha', 'Fecha', { req: 1, tipo: 'date' }) + '</div><div class="fila">' +
    campo('b_categoria', 'Categoría', { req: 1, ph: 'Noticias, Lanzamientos, Proyectos…', extra: ' list="cats"' }) + campo('b_imagen', 'Imagen (opcional)', { ph: 'assets/img/publicaciones/foto.webp o https://…' }) + '</div>' +
    '<datalist id="cats"><option value="Noticias"><option value="Lanzamientos"><option value="Proyectos"><option value="Actualizaciones"><option value="Descargas"></datalist>' +
    campo('b_resumen', 'Resumen (1-2 frases)', { tipo: 'textarea', req: 1, filas: 2 }) +
    campo('b_texto', 'Texto', { tipo: 'textarea', req: 1, filas: 7, ayuda: 'Línea en blanco entre párrafos. Puedes usar **negrita**, *cursiva* y [texto](https://enlace).' }) + '</fieldset>' +
    '<fieldset><legend>Botón de descarga (opcional)</legend>' + campo('b_url', 'Enlace', { ph: 'https://mega.nz/…  ·  https://drive.google.com/…  ·  https://www.mediafire.com/…', ayuda: 'Cualquier enlace https: Mega, Google Drive, MediaFire, Dropbox, GitHub Releases (hasta 2 GB por archivo)…' }) +
    '<div class="fila">' + campo('b_btexto', 'Texto del botón', { ph: 'Descargar' }) + campo('b_tamano', 'Tamaño (opcional)', { ph: '350 MB' }) + '</div><p id="b_servicio" class="archivo-calc"></p></fieldset>' +
    '<button class="btn" type="submit">⚙️ Generar bloque</button></form>' +
    '<div id="salida" hidden><h2 style="margin-top:24px">📋 Tu bloque</h2><div id="donde"></div><div class="resultado"><pre id="codigo" tabindex="0"></pre></div><div class="acciones"><button class="btn oro" type="button" id="copiar">📋 Copiar bloque</button></div><p id="copiado" class="aviso-ok" hidden>¡Copiado! Ahora pégalo en el archivo indicado.</p></div></div></section>';

  var $ = function (id) { return document.getElementById(id); }, tabActual = 'item';
  root.querySelectorAll('[data-tab]').forEach(function (b) {
    b.addEventListener('click', function () {
      tabActual = b.getAttribute('data-tab');
      root.querySelectorAll('[data-tab]').forEach(function (x) { x.classList.toggle('activo', x === b); x.setAttribute('aria-selected', x === b); });
      $('f-item').hidden = tabActual !== 'item'; $('f-pub').hidden = tabActual !== 'pub'; $('salida').hidden = true;
    });
  });
  $('b_fecha').value = hoy();
  // autocompletar id, tag y archivos
  var tocado = {};
  ['i_id', 'i_tag', 'a_archivo', 'p_archivo', 'b_id'].forEach(function (k) { $(k).addEventListener('input', function () { tocado[k] = true; }); });
  function auto() {
    var id = tocado.i_id ? $('i_id').value : slug($('i_nombre').value); if (!tocado.i_id) $('i_id').value = id;
    if (!tocado.i_tag) $('i_tag').value = id ? id + '-v' + ($('i_version').value.trim() || '1.0') : '';
    if (!tocado.a_archivo) $('a_archivo').value = id ? id + '-android.apk' : '';
    if (!tocado.p_archivo) $('p_archivo').value = id ? id + '-pc.html' : '';
  }
  ['i_nombre', 'i_id', 'i_version'].forEach(function (k) { $(k).addEventListener('input', auto); });
  $('b_titulo').addEventListener('input', function () { if (!tocado.b_id) $('b_id').value = slug($('b_titulo').value); });
  $('b_url').addEventListener('input', function () { var u = $('b_url').value.trim(); $('b_servicio').textContent = HTTPS.test(u) ? 'Servicio detectado: ' + servicioDe(u) : ''; });
  function servicioDe(u) { var h = (u.match(/^https?:\/\/([^\/?#]+)/i) || [])[1] || ''; return /mega\./i.test(h) ? 'Mega' : /drive\.google|docs\.google/i.test(h) ? 'Google Drive' : /mediafire/i.test(h) ? 'MediaFire' : /github\.com/i.test(h) ? 'GitHub' : /dropbox/i.test(h) ? 'Dropbox' : h.replace(/^www\./, ''); }
  // tamaño + sha256 desde archivo local
  ['a', 'p'].forEach(function (pref) {
    $(pref + '_file').addEventListener('change', function (e) {
      var f = e.target.files && e.target.files[0], st = $(pref + '_estado'); if (!f) return;
      $(pref + '_tamano').value = tam(f.size); if (!tocado[pref + '_archivo']) { /* respeta el nombre sugerido */ }
      if (f.name !== $(pref + '_archivo').value) st.innerHTML = '⚠️ El archivo se llama <b>' + esc(f.name) + '</b>. Súbelo a GitHub con el nombre del campo de arriba, o cambia el campo.'; else st.textContent = 'Tamaño calculado.';
      if (!(window.crypto && crypto.subtle)) { st.textContent += ' (Este navegador no puede calcular la huella aquí; ábrelo desde la web publicada.)'; return; }
      if (f.size > 400 * 1024 * 1024) { st.textContent += ' Archivo muy grande para calcular la huella en el navegador (máx. 400 MB).'; return; }
      st.textContent += ' Calculando huella…';
      f.arrayBuffer().then(function (buf) { return crypto.subtle.digest('SHA-256', buf); }).then(function (h) {
        $(pref + '_sha').value = Array.prototype.map.call(new Uint8Array(h), function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
        st.textContent = st.textContent.replace(' Calculando huella…', '') + ' Huella SHA-256 lista ✔';
      }).catch(function () { st.textContent = 'No se pudo leer el archivo.'; });
    });
  });

  function marcar(id, msg) { var c = root.querySelector('[data-campo="' + id + '"]'); if (!c) return; c.classList.toggle('error', !!msg); c.querySelector('.msg').textContent = msg || ''; }
  function limpiar(form) { form.querySelectorAll('.campo').forEach(function (c) { c.classList.remove('error'); }); }
  function v(id) { return $(id).value.trim(); }

  function validarItem() {
    var e = {}, id = v('i_id');
    if (!v('i_nombre')) e.i_nombre = 'Escribe el nombre.';
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) e.i_id = 'Solo minúsculas, números y guiones (ej.: llama-runner).';
    else if ((G.catalogo || []).some(function (x) { return x.id === id; })) e.i_id = 'Ya existe un juego/app con este id. Si es una versión nueva, edita el bloque existente (cambia version, tag y tamaños).';
    if (!/^\d+(\.\d+){0,3}$/.test(v('i_version'))) e.i_version = 'Usa números y puntos (ej.: 1.0 o 2.1.3).';
    if (!v('i_genero')) e.i_genero = 'Escribe el género.';
    if (!v('i_resumen')) e.i_resumen = 'Escribe un resumen corto.'; else if (v('i_resumen').length > 220) e.i_resumen = 'Muy largo (máx. 220 letras).';
    if (!v('i_descripcion')) e.i_descripcion = 'Escribe la descripción.';
    if (!RUTA.test(v('i_portada'))) e.i_portada = 'Ruta de imagen válida, ej.: assets/img/items/nombre-portada.webp';
    if (v('i_icono') && !RUTA.test(v('i_icono'))) e.i_icono = 'Ruta de imagen no válida.';
    lineas(v('i_capturas')).forEach(function (l) { if (!RUTA.test(l.split('|')[0].trim())) e.i_capturas = 'Revisa: «' + l.slice(0, 40) + '» (formato: ruta | descripción | vertical).'; });
    if (!/^[A-Za-z0-9._-]+$/.test(v('i_tag'))) e.i_tag = 'Sin espacios (ej.: llama-runner-v1.0).';
    var hay = false;
    [['a', /\.apk$/i, 'APK'], ['p', /\.html?$/i, 'PC']].forEach(function (x) {
      var ar = v(x[0] + '_archivo'); if (!ar) return; hay = true;
      if (!/^[A-Za-z0-9._-]+$/.test(ar) || !x[1].test(ar)) e[x[0] + '_archivo'] = 'Nombre sin espacios que termine en ' + (x[0] === 'a' ? '.apk' : '.html') + '.';
      if (!/^\d+([.,]\d+)?\s?(KB|MB|GB)$/i.test(v(x[0] + '_tamano'))) e[x[0] + '_tamano'] = 'Ej.: 850 KB o 1,2 MB (o elige el archivo abajo).';
      if (v(x[0] + '_sha') && !/^[a-f0-9]{64}$/i.test(v(x[0] + '_sha'))) e[x[0] + '_sha'] = 'La huella tiene 64 caracteres (0-9, a-f).';
    });
    if (!hay) e.a_archivo = 'Pon al menos una descarga (APK o PC).';
    return e;
  }
  function bloqueItem() {
    var id = v('i_id'), I = '    ', L = [];
    L.push('  {');
    L.push(I + 'id: ' + q(id) + ', tipo: ' + q(v('i_tipo')) + ', nombre: ' + q(v('i_nombre')) + ', version: ' + q(v('i_version')) + ($('i_nuevo').checked ? ', nuevo: true' : '') + ',');
    L.push(I + 'genero: ' + q(v('i_genero')) + ', etiquetas: [' + v('i_etiquetas').split(',').map(function (x) { return x.trim(); }).filter(Boolean).map(q).join(', ') + '],');
    L.push(I + 'portada: ' + q(v('i_portada')) + (v('i_icono') ? ', icono: ' + q(v('i_icono')) : '') + ',');
    L.push(I + 'resumen: ' + q(v('i_resumen')) + ',');
    L.push(I + 'descripcion: [\n' + parrafos(v('i_descripcion')).map(function (p) { return I + '  ' + q(p); }).join(',\n') + '\n' + I + '],');
    L.push(I + 'caracteristicas: [' + lineas(v('i_caract')).map(q).join(', ') + '],');
    L.push(I + 'requisitos: ' + q(v('i_requisitos') || 'Android 6.0+ · PC con Chrome o Edge') + ',');
    var caps = lineas(v('i_capturas')).map(function (l) { var p = l.split('|').map(function (x) { return x.trim(); }); return I + '  { img: ' + q(p[0]) + ', alt: ' + q(p[1] || v('i_nombre')) + (/^vertical$/i.test(p[2] || '') ? ', vertical: true' : '') + ' }'; });
    L.push(I + 'capturas: [' + (caps.length ? '\n' + caps.join(',\n') + '\n' + I : '') + '],');
    var d = [];
    if (v('a_archivo')) d.push(I + '  apk: { archivo: ' + q(v('a_archivo')) + ', tamano: ' + q(v('a_tamano')) + (v('a_sha') ? ', sha256: ' + q(v('a_sha').toLowerCase()) : '') + ' }');
    if (v('p_archivo')) d.push(I + '  pc:  { archivo: ' + q(v('p_archivo')) + ', tamano: ' + q(v('p_tamano')) + (v('p_sha') ? ', sha256: ' + q(v('p_sha').toLowerCase()) : '') + ' }');
    L.push(I + 'descargas: { tag: ' + q(v('i_tag')) + ',\n' + d.join(',\n') + ' }');
    L.push('  },');
    return L.join('\n');
  }
  function validarPub() {
    var e = {}, id = v('b_id');
    if (!v('b_titulo')) e.b_titulo = 'Escribe el título.';
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) e.b_id = 'Solo minúsculas, números y guiones.';
    else if ((G.publicaciones || []).some(function (x) { return x.id === id; })) e.b_id = 'Ya existe una publicación con este id. Cambia el título o el id.';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v('b_fecha'))) e.b_fecha = 'Fecha con formato AAAA-MM-DD.';
    if (!v('b_categoria')) e.b_categoria = 'Escribe una categoría.';
    if (v('b_imagen') && !RUTA.test(v('b_imagen')) && !HTTPS.test(v('b_imagen'))) e.b_imagen = 'Ruta (assets/img/publicaciones/foto.webp) o enlace https://';
    if (!v('b_resumen')) e.b_resumen = 'Escribe un resumen corto.';
    if (!v('b_texto')) e.b_texto = 'Escribe el texto.';
    if (v('b_url') && !HTTPS.test(v('b_url'))) e.b_url = 'El enlace debe empezar con https://';
    if ((v('b_btexto') || v('b_tamano')) && !v('b_url')) e.b_url = 'Falta el enlace del botón.';
    return e;
  }
  function bloquePub() {
    var I = '    ', L = ['  {'];
    L.push(I + 'id: ' + q(v('b_id')) + ',');
    L.push(I + 'titulo: ' + q(v('b_titulo')) + ',');
    L.push(I + 'fecha: ' + q(v('b_fecha')) + ', categoria: ' + q(v('b_categoria')) + ',');
    L.push(I + 'imagen: ' + q(v('b_imagen')) + ',');
    L.push(I + 'resumen: ' + q(v('b_resumen')) + ',');
    L.push(I + 'texto: [\n' + parrafos(v('b_texto')).map(function (p) { return I + '  ' + q(p); }).join(',\n') + '\n' + I + '],');
    L.push(I + 'descarga: ' + (v('b_url') ? '{ texto: ' + q(v('b_btexto') || 'Descargar') + ', url: ' + q(v('b_url')) + ', tamano: ' + q(v('b_tamano')) + ' }' : 'null'));
    L.push('  },');
    return L.join('\n');
  }
  function enviar(form, validar, bloque, donde) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault(); limpiar(form); var e = validar(), ks = Object.keys(e);
      ks.forEach(function (k) { marcar(k, e[k]); });
      var sal = $('salida');
      if (ks.length) { sal.hidden = true; var c = root.querySelector('[data-campo="' + ks[0] + '"] input, [data-campo="' + ks[0] + '"] textarea, [data-campo="' + ks[0] + '"] select'); if (c) c.focus(); var a = $('aviso-err') || document.createElement('p'); a.id = 'aviso-err'; a.className = 'aviso-mal'; a.textContent = 'Revisa ' + ks.length + ' campo(s) marcados en rojo.'; form.appendChild(a); return; }
      var a2 = $('aviso-err'); if (a2) a2.remove();
      $('codigo').textContent = bloque(); $('donde').innerHTML = donde; $('copiado').hidden = true; sal.hidden = false; sal.scrollIntoView({ block: 'start' });
    });
  }
  enviar($('f-item'), validarItem, bloqueItem, '<div class="aviso-ok">Pega este bloque en <b>data/catalogo.js</b>, justo debajo de la línea <code>GHATU.catalogo = [</code> (así sale primero). Luego sube las imágenes y crea la Release con el tag indicado.</div>');
  enviar($('f-pub'), validarPub, bloquePub, '<div class="aviso-ok">Pega este bloque en <b>data/publicaciones.js</b>, justo debajo de la línea <code>GHATU.publicaciones = [</code> (la más nueva va primero).</div>');
  $('copiar').addEventListener('click', function () {
    var t = $('codigo').textContent, ok = function () { $('copiado').hidden = false; };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(t).then(ok, viejo); else viejo();
    function viejo() { var ta = document.createElement('textarea'); ta.value = t; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); ok(); } catch (e) { } ta.remove(); }
  });
})();
