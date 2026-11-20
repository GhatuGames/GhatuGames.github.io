/* =====================================================================
   CATÁLOGO DE GHATU GAMES — el ÚNICO archivo que hay que editar para
   agregar o cambiar juegos y apps (y los enlaces de descarga).
   Instrucciones paso a paso: ver EDITAR-WEB.txt
   ===================================================================== */
window.GHATU = window.GHATU || {};

/* 1) DATOS DEL SITIO Y DE LAS DESCARGAS ------------------------------- */
GHATU.sitio = {
  nombre: 'Ghatu Games',
  lema: 'Diversión con sabor andino y apps para aprender inglés. Para Android y PC, en español: sin internet, sin anuncios y gratis.',
  correo: '',            // ej.: 'contacto@ghatugames.com' (vacío = no se muestra)
  youtube: '',           // ej.: 'https://www.youtube.com/@ghatugames'
  facebook: '',
  tiktok: '',
  // Las descargas se alojan como "Release assets" de GitHub.
  // Usuario y repositorio de GitHub donde están las Releases (cámbialos solo si se mudan).
  github: { usuario: 'GhatuGames', repo: 'GhatuGames.github.io' }
};
// Enlace final de cada archivo:
// https://github.com/GhatuGames/GhatuGames.github.io/releases/download/<tag>/<archivo>
GHATU.urlDescarga = function (tag, archivo) {
  var g = GHATU.sitio.github;
  return 'https://github.com/' + g.usuario + '/' + g.repo + '/releases/download/' + tag + '/' + archivo;
};

/* 2) JUEGOS Y APPS ------------------------------------------------------
   tipo: 'juego' o 'app'        id: nombre corto sin espacios (se usa en la URL)
   portada: imagen 16:9 en assets/img/items/  (WebP, ~800x450)
   capturas: imágenes extra para la ficha (vertical: true si es de teléfono)
   descargas: tag de la release + archivo, tamaño y huella sha256 (opcional) de cada versión
              (si un juego no tiene versión PC o APK, borra esa línea)
   ----------------------------------------------------------------------- */
GHATU.catalogo = [
  {
    id: 'pukara', tipo: 'juego', nombre: 'Pukara: Señores de la Fortaleza', version: '1.1', nuevo: true,
    genero: 'Estrategia de castillos', etiquetas: ['Estrategia', 'Construcción', 'Campaña'],
    portada: 'assets/img/items/pukara-portada.webp', icono: 'assets/img/items/pukara-icono.webp',
    resumen: 'Construye tu pueblo andino, levanta murallas y defiende tu fortaleza contra señores enemigos.',
    descripcion: [
      'Juego de estrategia en tiempo real al estilo de los clásicos de castillos: administra la economía, mantén contenta a tu gente, construye muros, torres y un ejército, y resiste asedios con escaladores y arietes.',
      'Incluye una campaña de 4 misiones, escaramuzas contra 1 a 3 señores con IA en tres dificultades, mapas de varios tamaños y guardado en 3 ranuras con autoguardado.'
    ],
    caracteristicas: ['Campaña de 4 misiones + escaramuza', 'IA en Fácil, Intermedio y Difícil', 'Controles de ratón y táctiles', 'Guardar y cargar partidas'],
    requisitos: 'Android 6.0+ (horizontal) · PC con Chrome o Edge',
    capturas: [
      { img: 'assets/img/items/pukara-1.webp', alt: 'Castillo avanzado con murallas y torres' },
      { img: 'assets/img/items/pukara-2.webp', alt: 'Asedio enemigo a la fortaleza' },
      { img: 'assets/img/items/pukara-3.webp', alt: 'Pueblo con mercado y granjas' }
    ],
    descargas: { tag: 'pukara-v1.1',
      apk: { archivo: 'pukara-android.apk', tamano: '1,6 MB', sha256: '699f5698c697445ce30e1de543ac43c0f417cebcbc50317a7e25041bebd0fff9' },
      pc:  { archivo: 'pukara-pc.html',     tamano: '2,1 MB', sha256: 'ee22760b6d39f32fcc6d5b61d9c1ea058ffd3f552379c9637800c795e8dafdf4' } }
  },
  {
    id: 'comando-wara', tipo: 'juego', nombre: 'Comando Wara', version: '1.2',
    genero: 'Acción y disparos 2D', etiquetas: ['Acción', 'Plataformas', 'Jefes'],
    portada: 'assets/img/items/comando-wara-portada.webp',
    resumen: 'Wara recorre los Andes para rescatar llamas y detener al Doctor Granizo y sus robots de hojalata.',
    descripcion: [
      'Acción con desplazamiento lateral y tono de dibujo animado: los robots se desarman en humo, resortes y tuercas, sin violencia realista.',
      'Misiones con jefes, armas y objetos, tres dificultades con récords y estrellas por dificultad, fondos pintados con paralaje y controles táctiles en Android.'
    ],
    caracteristicas: ['Misiones con jefes finales', '3 dificultades', 'Controles táctiles y de teclado', 'Gráficos pintados con paralaje'],
    requisitos: 'Android 6.0+ (horizontal) · PC con Chrome, Edge o Firefox',
    capturas: [
      { img: 'assets/img/items/comando-wara-1.webp', alt: 'Misión 1: el cangrejo robot' },
      { img: 'assets/img/items/comando-wara-2.webp', alt: 'Misión 4: el cóndor' },
      { img: 'assets/img/items/comando-wara-3.webp', alt: 'Presentación de un jefe' }
    ],
    descargas: { tag: 'comando-wara-v1.2',
      apk: { archivo: 'comando-wara-android.apk', tamano: '1,0 MB', sha256: '29dbd5b5b0c21d7088129bf2b6d7d3c81830e7aa652ce1a28e017dbf65743a5e' },
      pc:  { archivo: 'comando-wara-pc.html',     tamano: '1,4 MB', sha256: '1edb0646f0fa5661dac06bfaa8f6de15834e30f82f5355ad3d68e13d807325bb' } }
  },
  {
    id: 'chacra-guardiana', tipo: 'juego', nombre: 'Chacra Guardiana', version: '1.1',
    genero: 'Defensa de surcos', etiquetas: ['Estrategia', 'Defensa', 'Familiar'],
    portada: 'assets/img/items/chacra-guardiana-portada.webp',
    resumen: '¡Defiende tu chacra andina de las plagas! Planta defensores y protege la casa de adobe.',
    descripcion: [
      'Juego de defensa en una cuadrícula de 5 surcos por 9 casillas: planta defensores, junta recursos y no dejes que los bichos lleguen a la casa.',
      'Tema andino y boliviano, sin violencia, con niveles de día, tarde y noche y un mapa de progreso.'
    ],
    caracteristicas: ['Niveles de día, tarde y noche', 'Defensores y plagas originales', 'Ideal para toda la familia', 'Sin anuncios ni internet'],
    requisitos: 'Android 6.0+ (horizontal) · PC con Chrome, Edge o Firefox',
    capturas: [
      { img: 'assets/img/items/chacra-guardiana-1.webp', alt: 'Nivel 1 de día' },
      { img: 'assets/img/items/chacra-guardiana-2.webp', alt: 'Nivel 12 de noche' },
      { img: 'assets/img/items/chacra-guardiana-3.webp', alt: 'Mapa de niveles' }
    ],
    descargas: { tag: 'chacra-guardiana-v1.1',
      apk: { archivo: 'chacra-guardiana-android.apk', tamano: '65 KB', sha256: '0c939af463958a12250556116ece4795f969f14f40b09d3fa47d1dd50b1b1178' },
      pc:  { archivo: 'chacra-guardiana-pc.html',     tamano: '119 KB', sha256: '821190bc13eb784a679714b1fe71638b5be09780572816f16d0abb6d1bb17bef' } }
  },
  {
    id: 'honda-andina', tipo: 'juego', nombre: 'Honda Andina', version: '1.1',
    genero: 'Física y puntería', etiquetas: ['Física', 'Puzles', 'Casual'],
    portada: 'assets/img/items/honda-andina-portada.webp',
    resumen: '¡Los zorros se robaron la quinua! Lanza a tus amigos andinos con la honda y derriba sus torres.',
    descripcion: [
      'Apunta, tensa la honda y derriba torres de madera, hielo y piedra hasta dejar a todos los zorros fuera de combate.',
      'Niveles en lugares como el Mercado de Copacabana o el Palacio de Hielo, con puntuación y estrellas.'
    ],
    caracteristicas: ['Física de bloques', 'Madera, hielo y piedra', 'Puntuación y estrellas', 'Personajes originales'],
    requisitos: 'Android 6.0+ (horizontal) · PC con Chrome, Edge o Firefox',
    capturas: [
      { img: 'assets/img/items/honda-andina-1.webp', alt: 'Apuntando con la honda' },
      { img: 'assets/img/items/honda-andina-2.webp', alt: 'Nivel del Palacio de Hielo' },
      { img: 'assets/img/items/honda-andina-3.webp', alt: 'Impacto contra una torre' }
    ],
    descargas: { tag: 'honda-andina-v1.1',
      apk: { archivo: 'honda-andina-android.apk', tamano: '61 KB', sha256: 'fe466d82c4df23db76a88ffb54d893ca57f29dfdb1584accf775a1f3f17975ff' },
      pc:  { archivo: 'honda-andina-pc.html',     tamano: '107 KB', sha256: 'a26bb22a274020e4645e544131a23e20c8b97099d3e26757ba467a01a58e3f44' } }
  },
  {
    id: 'cohete-crash', tipo: 'juego', nombre: 'Cohete Crash', version: '1.1',
    genero: 'Reflejos (monedas virtuales)', etiquetas: ['Casual', 'Reflejos'],
    portada: 'assets/img/items/cohete-crash-portada.webp',
    resumen: 'El cohete sube y el multiplicador crece: retírate antes de que explote. Solo monedas virtuales.',
    descripcion: [
      'Juego de reflejos estilo «crash»: el multiplicador sube mientras el cohete vuela y tú decides cuándo retirarte.',
      'IMPORTANTE: solo usa monedas virtuales que no valen nada. No hay dinero real, compras, anuncios ni premios.'
    ],
    caracteristicas: ['Solo monedas virtuales', 'Partidas rápidas', 'Android nativo y versión PC', 'Sin permisos'],
    requisitos: 'Android 6.0+ (vertical) · PC con cualquier navegador moderno',
    capturas: [
      { img: 'assets/img/items/cohete-crash-1.webp', alt: 'El cohete en vuelo', vertical: true },
      { img: 'assets/img/items/cohete-crash-2.webp', alt: 'Explosión del cohete', vertical: true },
      { img: 'assets/img/items/cohete-crash-3.webp', alt: 'Cuenta regresiva', vertical: true }
    ],
    descargas: { tag: 'cohete-crash-v1.1',
      apk: { archivo: 'cohete-crash-android.apk', tamano: '53 KB', sha256: '4f5124ce07ab05051b935b8c3e8d25a779f10022453cd6a73412f4f2be77e71d' },
      pc:  { archivo: 'cohete-crash-pc.html',     tamano: '45 KB', sha256: '51fba6d25778369742014c4e637336a3067f44005623f052a62244940f78287b' } }
  },
  {
    id: 'winay-english', tipo: 'app', nombre: 'Wiñay English', version: '1.0', nuevo: true,
    genero: 'Inglés de cero a avanzado', etiquetas: ['Educación', 'Inglés', 'A1–C1'],
    portada: 'assets/img/items/winay-english-portada.webp', icono: 'assets/img/items/winay-english-icono.webp',
    resumen: 'Aprende inglés de A1 a C1 con explicaciones en español, audio, diálogos, lecturas y repaso espaciado.',
    descripcion: [
      '«Wiñay» significa «crecer» en quechua. 5 niveles, 30 unidades y 150 lecciones: gramática explicada en español, vocabulario y frases útiles, pronunciación con pares mínimos y dictado, conversaciones donde eliges tu respuesta y lecturas con glosario.',
      'Incluye repaso espaciado, XP, racha diaria y una prueba de nivel opcional. Usa la voz en inglés del propio dispositivo (acento EE.UU. o Reino Unido, con velocidad lenta).'
    ],
    caracteristicas: ['150 lecciones (A1 → C1)', '300 ejercicios de gramática', 'Audio, escucha y dictado', 'Repaso espaciado y racha'],
    requisitos: 'Android 6.0+ · PC con Chrome o Edge (voz en inglés del sistema)',
    capturas: [
      { img: 'assets/img/items/winay-english-1.webp', alt: 'Mapa de niveles en el teléfono', vertical: true },
      { img: 'assets/img/items/winay-english-2.webp', alt: 'Conversación: elige tu respuesta', vertical: true },
      { img: 'assets/img/items/winay-english-3.webp', alt: 'Versión de PC' }
    ],
    descargas: { tag: 'winay-english-v1.0',
      apk: { archivo: 'winay-english-android.apk', tamano: '533 KB', sha256: '0611ded586c07fe5c621b1741e29bb4e59c66be9ef7af755d16d7b1ba9b997cf' },
      pc:  { archivo: 'winay-english-pc.html',     tamano: '326 KB', sha256: '9e19319df4c37e786318d0f49cebf3f76f06f611f7ef5f65b47ce009dcc59996' } }
  },
  {
    id: 'taller-english', tipo: 'app', nombre: 'Taller English', version: '1.0',
    genero: 'Inglés técnico automotriz', etiquetas: ['Educación', 'Mecánica', 'Autotrónica'],
    portada: 'assets/img/items/taller-english-portada.webp',
    resumen: 'Vocabulario técnico en inglés del taller: mecánica, autotrónica, OBD-II, híbridos y eléctricos.',
    descripcion: [
      '425 términos con traducción, definición técnica en inglés y español, ejemplos y guía de pronunciación para hispanohablantes, más 190 acrónimos (ECU, OBD-II, ABS, CAN…).',
      '16 categorías, tarjetas, cuestionarios con varios modos, búsqueda y progreso. Funciona sin internet.'
    ],
    caracteristicas: ['425 términos técnicos', '190 acrónimos', 'Tarjetas y cuestionarios', 'Pronunciación guiada'],
    requisitos: 'Android 6.0+ · PC con cualquier navegador moderno',
    capturas: [
      { img: 'assets/img/items/taller-english-1.webp', alt: 'Inicio en el teléfono', vertical: true },
      { img: 'assets/img/items/taller-english-2.webp', alt: 'Modos de cuestionario', vertical: true },
      { img: 'assets/img/items/taller-english-3.webp', alt: 'Búsqueda en la versión de PC' }
    ],
    descargas: { tag: 'taller-english-v1.0',
      apk: { archivo: 'taller-english-android.apk', tamano: '109 KB', sha256: '8daefd67cbb22ec53bec91729c09723d882156ea376502e32a17b4efb9b32457' },
      pc:  { archivo: 'taller-english-pc.html',     tamano: '290 KB', sha256: '26fbddc08bc758c830fa5bec220f738acb0688afc4cc55031e6ac1242516b403' } }
  }
];
