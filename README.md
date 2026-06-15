# Nernutri — Tu web · Guía de edición

Hola Nerea 👋 Esta es tu web lista para publicar. Aquí te explico cómo editarla tú misma.

---

## ✏️ Cambiar textos (sin saber programar)

Abre el archivo `lib/manifest.js` con el **Bloc de notas** (clic derecho → Abrir con → Bloc de notas).

Ahí encontrarás todos los textos importantes bien etiquetados. Busca lo que quieras cambiar y edítalo entre las comillas `"..."`.

Ejemplos de lo que puedes cambiar:

```
name: "Nerea Fernández",       ← Tu nombre completo
tagline: "Come bien. Vive mejor.",  ← El lema principal
whatsapp: "34602592794",       ← Tu número (no cambiar el 34 del principio)
```

**Regla:** cambia solo lo que está entre las comillas. No borres las comas, los corchetes ni los puntos y coma.

---

## 📸 Añadir tu foto (Sección "Sobre mí")

1. Pon tu foto en la carpeta `assets/img/`
2. Renómbrala exactamente así: `nerea.webp`
3. Si tu foto es JPG, cámbiala a ese nombre así: `nerea.jpg` y edita `index.html` buscando `nerea.webp` y cambiándolo por `nerea.jpg`

**Consejo:** la foto queda mejor si es vertical (formato retrato) y tiene buena luz.

---

## 🍽️ Añadir fotos de comida en los testimonios

Las 4 fotos de fondo de los testimonios se llaman así:

| Testimonial | Archivo |
|---|---|
| Carmen R. | `assets/img/testimonial-1.jpg` |
| Marcos D. | `assets/img/testimonial-2.jpg` |
| Lucía F.  | `assets/img/testimonial-3.jpg` |
| Adrián M. | `assets/img/testimonial-4.jpg` |

Simplemente pon las fotos en `assets/img/` con esos nombres exactos.
Las fotos que me mandaste (boniato con jamón y queso, bowl con carne, berenjenas, pasta) son perfectas para esto.

---

## 📱 Cambiar el número de WhatsApp

En `lib/manifest.js`, busca esta línea:

```
whatsapp: "34602592794",
```

Cambia solo los números **después del 34** (34 es el prefijo de España, déjalo).

También actualiza los botones en `index.html`: busca y reemplaza `34602592794` por tu nuevo número.

---

## 🚀 Subir a Hostinger (paso a paso)

1. Entra en tu panel de Hostinger
2. Ve a **Administrador de archivos** → carpeta `public_html`
3. Arrastra y suelta **toda la carpeta `nernutri`** (o su contenido)
4. Asegúrate de que `index.html` está en la raíz de `public_html`
5. ¡Listo! Espera 2–5 minutos y visita tu dominio

**Si usas FileZilla (FTP):**
- Host: tu dominio o IP de Hostinger
- Usuario y contraseña: los de tu panel FTP en Hostinger
- Sube todo a `public_html/`

---

## 🎨 Para mejorar las animaciones (opcional — no es obligatorio)

La web funciona perfectamente sin esto, pero si quieres animaciones más fluidas:

1. Ve a https://gsap.com/community/files/gsap-public/minified/
2. Descarga `gsap.min.js` y `ScrollTrigger.min.js`
3. Reemplaza los archivos que hay en la carpeta `lib/`

---

## 📞 ¿Dudas?

Si algo no funciona o quieres cambiar algo que no aparece aquí, contacta con quien hizo tu web.

---

*© 2026 Nernutri · Nerea Fernández*
