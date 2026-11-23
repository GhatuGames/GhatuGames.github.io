/* =====================================================================
   PUBLICACIONES / NOVEDADES DE GHATU GAMES
   Cada bloque { ... } es una publicación. La MÁS NUEVA va PRIMERO.
   Forma fácil: usa generador.html (llena el formulario y copia el bloque).
   Guía: EDITAR-WEB.txt
   ---------------------------------------------------------------------
   id:        nombre corto sin espacios ni tildes (se usa en el enlace)
   titulo, fecha ('AAAA-MM-DD'), categoria (ej.: 'Noticias', 'Lanzamientos')
   imagen:    'assets/img/publicaciones/archivo.webp' o un enlace https:// ('' = sin imagen)
   resumen:   1-2 frases para la lista
   texto:     párrafos; se puede usar **negrita**, *cursiva* y [enlaces](url)
   descarga:  botón opcional a CUALQUIER enlace (Mega, Google Drive, MediaFire,
              GitHub Releases hasta 2 GB, Dropbox…). Bórralo o pon null si no hay.
                { texto: 'Descargar', url: 'https://...', tamano: '120 MB' }
              El servicio (Mega, Drive, etc.) se detecta solo por el enlace.
   ===================================================================== */
window.GHATU = window.GHATU || {};
GHATU.publicaciones = [
  {
    id: 'web-six-circle',
    titulo: 'Hicimos la web oficial de Six Circle',
    fecha: '2026-11-20', categoria: 'Proyectos',
    imagen: 'assets/img/publicaciones/web-six-circle.webp',
    resumen: 'La banda boliviana de rock y metal Six Circle ya tiene su página: música, videos y todas sus plataformas en un solo lugar.',
    texto: [
      'Además de juegos y apps, en Ghatu Games también hacemos páginas web. La primera fue para **Six Circle**, banda boliviana de rock y metal.',
      'La web reúne sus lanzamientos con enlaces a Spotify, Apple Music, YouTube Music, Amazon Music, Deezer y Qobuz, su reproductor de Spotify, sus videos de YouTube y sus redes. Es liviana, funciona bien en el celular y los videos solo se cargan cuando los tocas.'
    ],
    descarga: { texto: 'Visitar la web de Six Circle', url: 'https://sixcircleoficialband.github.io/', tamano: '' }
  },
  {
    id: 'lanzamiento-web',
    titulo: '¡Estrenamos nuestra página web!',
    fecha: '2026-11-20', categoria: 'Noticias',
    imagen: 'assets/img/publicaciones/lanzamiento-web.webp',
    resumen: 'Desde hoy todos nuestros juegos y apps se descargan desde un solo lugar, con tutoriales para instalarlos en Android y PC.',
    texto: [
      'Bienvenidos a la casa de **Ghatu Games**. Aquí encontrarás todos nuestros juegos —Pukara, Comando Wara, Chacra Guardiana, Honda Andina y Cohete Crash— y nuestras apps para aprender inglés: Wiñay English y Taller English.',
      'Todo es gratis, sin anuncios y funciona sin internet. Cada juego tiene su versión para Android (APK) y para PC (se abre con doble clic en el navegador). Si es tu primera vez, mira el tutorial [Cómo instalar un APK en Android](tutorial.html?id=instalar-apk-android).',
      'Para celebrar, el estreno de esta semana es **Pukara: Señores de la Fortaleza**, nuestro juego de estrategia de castillos.'
    ],
    descarga: { texto: 'Descargar Pukara 1.1', url: 'https://github.com/GhatuGames/GhatuGames.github.io/releases/tag/pukara-v1.1', tamano: '' }
  }
];
