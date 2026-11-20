# Cómo comprobar que la descarga es original

Cada archivo que publicamos tiene una **huella SHA-256**: un código de 64 letras y números que cambia por completo si se altera un solo byte del archivo. Si la huella de tu archivo coincide con la publicada, tienes exactamente el archivo original.

Las huellas aparecen en la **ficha de cada juego o app** (debajo de los botones de descarga) y en el archivo `MANIFIESTO.txt` de nuestras publicaciones (Releases) de GitHub.

## En Windows

1. Abre la carpeta donde está el archivo (por ejemplo *Descargas*).
2. Haz clic derecho en un espacio vacío → **Abrir en Terminal** (o abre **PowerShell** y ve a esa carpeta).
3. Escribe, cambiando el nombre por el de tu archivo:

```
Get-FileHash .\honda-andina-android.apk -Algorithm SHA256
```

4. Compara el resultado con la huella publicada. Deben ser **idénticas** (no importan mayúsculas o minúsculas).

## En Mac o Linux

Abre la Terminal en la carpeta del archivo y escribe:

```
sha256sum honda-andina-android.apk
```

(En Mac también puedes usar `shasum -a 256 archivo`).

## En Android

Usa una app gestora de archivos que muestre «suma de comprobación» o «hash» (por ejemplo, en las propiedades del archivo) y elige SHA-256.

> **Importante:** descarga nuestros juegos solo desde esta web o desde nuestro GitHub oficial. Si encuentras una copia en otra página, no podemos garantizar que sea segura.
