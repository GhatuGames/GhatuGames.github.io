# Cómo subir tus juegos, programas y publicaciones desde el celular

Con el celular puedes publicar una versión nueva, agregar un juego o escribir una noticia **sin computadora**. Solo necesitas el navegador (Chrome) y la cuenta de GitHub **GhatuGames**.

> **Antes de empezar:** inicia sesión en [github.com](https://github.com) desde Chrome. Si alguna opción no aparece, abre el menú ⋮ de Chrome y activa **«Sitio de escritorio»**. La app de GitHub sirve para mirar, pero subir archivos a Releases se hace desde el navegador.

## 1. Sube el APK y la versión PC (Releases)

Los archivos grandes (APK, .html, .zip) **no** van dentro de la web: van en **Releases**, donde cada archivo puede pesar **hasta 2 GB**.

1. Abre `https://github.com/GhatuGames/GhatuGames.github.io/releases/new`
2. Toca **Choose a tag**, escribe el tag (por ejemplo `llama-runner-v1.0`) y toca **Create new tag**. Usa siempre el formato `id-vVersión`.
3. En **Release title** escribe el nombre, por ejemplo `Llama Runner 1.0`.
4. Toca **Attach binaries by dropping them here or selecting them** y elige los archivos desde la carpeta *Descargas* del celular: `llama-runner-android.apk` y `llama-runner-pc.html`.
5. Espera a que la barra de cada archivo termine y toca **Publish release**.

![Página de Releases de Ghatu Games vista en el celular](assets/img/tutoriales/celular-releases.webp)

> **Importante:** los nombres de archivo deben ser **exactamente** los que pondrás en la web (mayúsculas incluidas). Nunca subas llaves de firma (`.jks`, `.keystore`) ni contraseñas.

## 2. Arma el bloque con el generador

En vez de escribir código a mano, usa el **generador**: `https://ghatugames.github.io/generador.html` (funciona sin internet una vez abierto y nada sale de tu celular).

1. Elige **🎮 Juego o app** o **📰 Publicación**.
2. Llena los campos. El *id*, el *tag* y los nombres de archivo se completan solos con el nombre y la versión.
3. En **Calcular tamaño y huella desde el archivo**, elige el APK (y luego el .html): el tamaño y la huella SHA-256 se llenan solos.
4. Toca **⚙️ Generar bloque**. Si algo falta, el campo se marca en rojo con la explicación.
5. Toca **📋 Copiar bloque**.

![Formulario del generador en el celular](assets/img/tutoriales/celular-generador.webp)

![Bloque generado listo para copiar](assets/img/tutoriales/celular-bloque.webp)

## 3. Sube las imágenes

1. En el repositorio abre la carpeta `assets/img/items` (para juegos y apps) o `assets/img/publicaciones` (para noticias).
2. Toca **Add file → Upload files**, elige las imágenes y toca **Commit changes**.
3. Usa los mismos nombres que pusiste en el generador (por ejemplo `llama-runner-portada.webp`). Formato recomendado: WebP, de menos de 150 KB. Puedes convertirlas en [squoosh.app](https://squoosh.app).

## 4. Pega el bloque en el archivo de datos

1. Abre el archivo:
   - juegos y apps: `data/catalogo.js`
   - publicaciones: `data/publicaciones.js`
2. Toca el **lápiz ✏️ (Edit this file)**.
3. Busca la línea `GHATU.catalogo = [` (o `GHATU.publicaciones = [`), pon el cursor al final de esa línea, toca **Enter** y **pega** el bloque.
4. Toca **Commit changes…** y luego otra vez **Commit changes**.
5. Espera 1 o 2 minutos y abre la web: el juego o la publicación ya aparece.

> **Consejo:** para una **versión nueva** de un juego que ya existe no hace falta el generador: en `data/catalogo.js` cambia `version`, `tag`, `tamano` y `sha256` del bloque de ese juego.

## 5. Publicaciones con descarga desde Mega, Drive o MediaFire

En una publicación, el botón de descarga puede llevar a **cualquier enlace**: Mega, Google Drive, MediaFire, Dropbox o una Release de GitHub. La web reconoce el servicio sola y lo muestra en el botón.

- En **Google Drive**: toca ⋮ → **Compartir** → **Acceso general: Cualquier persona con el enlace** → **Copiar enlace**.
- En **Mega** y **MediaFire**: usa el botón **Compartir / Copiar enlace**.
- Pega ese enlace en el campo **Enlace** del generador.

![Así se ve una publicación con su botón de descarga](assets/img/tutoriales/celular-publicacion.webp)

## Si algo sale mal

- **La página quedó vacía:** casi siempre falta una coma o una comilla. Abre el archivo en GitHub, toca **History**, entra al último cambio y compáralo; o pega de nuevo el bloque desde el generador.
- **El botón de descarga da error 404:** revisa que el *tag* y el nombre del archivo sean idénticos en la Release y en la web.
- **No veo los cambios:** espera 2 minutos y recarga la página.
