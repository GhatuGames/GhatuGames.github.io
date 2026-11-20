/* Mini renderizador de Markdown para los tutoriales (sin librerías externas).
   Soporta: # y ## títulos (h2), ### (h3), párrafos, **negrita**, *cursiva*, `código`, bloques ``` ```,
   listas (- o 1.), > notas, enlaces [texto](url), imágenes ![alt](ruta), --- (línea)
   y VIDEOS DE YOUTUBE: una línea sola con el enlace del video
   (https://www.youtube.com/watch?v=ID  o  https://youtu.be/ID)  o  [youtube: ID]. */
(function () {
  'use strict';
  var G = window.GHATU = window.GHATU || {};
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function safeUrl(u) { u = String(u).trim(); return /^(javascript|data|vbscript):/i.test(u) ? '#' : u; }
  function ytId(s) {
    s = String(s).trim(); var m;
    if ((m = s.match(/^\[youtube:\s*([A-Za-z0-9_-]{6,20})\s*\]$/i))) return m[1];
    if ((m = s.match(/^<?https?:\/\/(?:www\.|m\.)?youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)([A-Za-z0-9_-]{6,20})[^\s>]*>?$/i))) return m[1];
    if ((m = s.match(/^<?https?:\/\/youtu\.be\/([A-Za-z0-9_-]{6,20})[^\s>]*>?$/i))) return m[1];
    return null;
  }
  G.ytId = ytId;
  G.videoHtml = function (id, titulo) {
    return '<div class="video" data-yt="' + esc(id) + '"><button type="button" class="video-play" aria-label="Reproducir video' + (titulo ? ': ' + esc(titulo) : '') + '">' +
      '<img loading="lazy" alt="" src="https://i.ytimg.com/vi/' + esc(id) + '/hqdefault.jpg" onerror="this.remove()"><span class="video-btn" aria-hidden="true">▶</span>' +
      '<span class="video-txt">Ver video' + (titulo ? ' · ' + esc(titulo) : '') + '</span></button></div>';
  };
  function inline(s) {
    var codes = [];
    s = s.replace(/`([^`]+)`/g, function (m, c) { codes.push(c); return '\u0000' + (codes.length - 1) + '\u0000'; });
    s = esc(s);
    s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, function (m, a, u) { return '<img src="' + esc(safeUrl(u.replace(/&amp;/g, '&'))) + '" alt="' + a + '" loading="lazy">'; });
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (m, t, u) { var url = safeUrl(u.replace(/&amp;/g, '&')), ext = /^https?:/i.test(url); return '<a href="' + esc(url) + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' + t + '</a>'; });
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
    s = s.replace(/\u0000(\d+)\u0000/g, function (m, i) { return '<code>' + esc(codes[+i]) + '</code>'; });
    return s;
  }
  G.markdown = function (src) {
    var L = String(src).replace(/\r\n?/g, '\n').split('\n'), out = [], i = 0, para = [];
    function flush() { if (para.length) { out.push('<p>' + inline(para.join(' ')) + '</p>'); para = []; } }
    while (i < L.length) {
      var l = L[i], t = l.trim(), m, id;
      if (/^```/.test(t)) { flush(); var code = []; i++; while (i < L.length && !/^```/.test(L[i].trim())) code.push(L[i++]); i++; out.push('<pre><code>' + esc(code.join('\n')) + '</code></pre>'); continue; }
      if (!t) { flush(); i++; continue; }
      if ((id = ytId(t))) { flush(); out.push(G.videoHtml(id)); i++; continue; }
      if ((m = t.match(/^(#{1,4})\s+(.*)$/))) { flush(); var n = Math.max(2, m[1].length); var txt = m[2]; var slug = txt.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); out.push('<h' + n + ' id="' + slug + '">' + inline(txt) + '</h' + n + '>'); i++; continue; }
      if (/^(-{3,}|\*{3,})$/.test(t)) { flush(); out.push('<hr>'); i++; continue; }
      if (/^>/.test(t)) { flush(); var q = []; while (i < L.length && /^>/.test(L[i].trim())) q.push(L[i++].trim().replace(/^>\s?/, '')); out.push('<blockquote>' + G.markdown(q.join('\n')) + '</blockquote>'); continue; }
      if (/^([-*+])\s+/.test(t) || /^\d+[.)]\s+/.test(t)) {
        flush(); var ord = /^\d/.test(t), items = [];
        while (i < L.length) { var x = L[i].trim(); if (ord ? /^\d+[.)]\s+/.test(x) : /^[-*+]\s+/.test(x)) { items.push(x.replace(/^(\d+[.)]|[-*+])\s+/, '')); i++; } else if (x && /^\s{2,}/.test(L[i]) && items.length) { items[items.length - 1] += ' ' + x; i++; } else break; }
        out.push((ord ? '<ol>' : '<ul>') + items.map(function (it) { return '<li>' + inline(it) + '</li>'; }).join('') + (ord ? '</ol>' : '</ul>')); continue;
      }
      para.push(t); i++;
    }
    flush(); return out.join('\n');
  };
})();
