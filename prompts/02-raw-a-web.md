# Prompt 2 — De `_raw/` a habilidad publicada

> **Cómo se usa:** con el material ya en `content/skills/_raw/<slug>/`, abre
> Claude Code en la raíz del portfolio y dile:
> *"Lee `prompts/02-raw-a-web.md` y procesa `content/skills/_raw/<slug>`."*
>
> El resultado es `content/skills/<slug>/index.es.md` e `index.en.md`, listos
> para publicarse.

---

## Tu papel

El portfolio está organizado **por habilidades**: cada una se describe a fondo y
los proyectos aparecen dentro como evidencia de que sé aplicarla.

En `_raw/` hay material ya trabajado —una carpeta por habilidad, con la
anonimización aplicada y mi aportación delimitada—. Tu trabajo **no es
reescribirlo**, es convertirlo al formato que consume la web: frontmatter válido,
estructura de secciones consistente y versión en inglés.

Es un proceso **incremental**: se procesa una carpeta cada vez, y las habilidades
ya publicadas se amplían en lugar de rehacerse.

---

## Paso 1 — Lee el material

Cada carpeta de `_raw/` contiene:

| Archivo | Qué es |
|---|---|
| `SKILL.md` | El contenido: qué sé hacer, técnicas y proyectos donde lo apliqué |
| `metadata.yml` | Datos estructurados: título, resumen, tech, proyectos, confidencialidad |
| `NOTES.md` | `TODO` pendientes, huecos y limitaciones reconocidas |
| `assets/` | Diagramas e imágenes |

Léelos los cuatro. **`NOTES.md` es obligatorio**: contiene lo que está sin
confirmar y no debe darse por bueno.

Mira también si `content/skills/<slug>/` ya existe: si existe, vas a **ampliarla**
(paso 4B), no a crearla.

---

## Paso 2 — Comprueba los `TODO` bloqueantes

`NOTES.md` distingue tres tipos de anotación, y solo una bloquea:

- **"Pendiente de confirmar"** → **pregúntame antes de escribir.** Son cosas cuya
  autoría o exactitud no está verificada. No las incorpores por tu cuenta.
- **"Huecos de la entrevista"** → no bloquean. Se publica sin ese material y me
  avisas al final de lo que sigue faltando.
- **"Limitaciones reconocidas"** → **van al texto publicado, no se ocultan.** Que
  un repositorio no tuviera tests es información honesta y suma credibilidad.

---

## Paso 3 — Confidencialidad: dos cosas que proteger, no una

1. **La identidad del cliente** — nombres, cifras de negocio, arquitectura
   interna. Esto **ya viene resuelto** en el material de `_raw/`: los proyectos
   aparecen como "producto asistencial en producción, sector salud", no con el
   nombre del cliente. Mantén esa anonimización tal cual: no la deshagas ni la
   afines.

2. **El know-how** — cómo se resolvió el problema. Esto **no viene resuelto** y
   es tu trabajo.

### La regla

> **Se publica el qué y el porqué, no el cómo.**

Un lector debe terminar pensando *"esta persona sabe resolver este tipo de
problema"*, no *"ya sé cómo montarlo yo"*.

| Sí se publica | No se publica |
|---|---|
| Qué problema había | La secuencia de pasos de la solución |
| Qué fallaba en el enfoque anterior | La estructura concreta de la implementación |
| Qué decidiste cambiar y con qué criterio | Los parámetros y la configuración |
| El resultado y su magnitud relativa | Las fases nombradas del sistema del cliente |
| La lista de técnicas que dominas | Cómo las combinaste en este problema concreto |

**Nunca**: recuentos del esquema del producto del cliente (cuántos campos,
cuántas líneas de negocio, cuántas secciones) ni tecnologías de su stack —
especialmente en las delimitaciones de autoría, donde describen trabajo de otros
y **no aportan nada a tu caso** mientras exponen la arquitectura del cliente.

Respeta las marcas `[NO PUBLICAR]` que el prompt 1 haya dejado en `RAW.md` o
`SKILL.md`.

### Comprueba antes de publicar

- No aparecen nombres de cliente, de producto interno ni de repositorio privado.
- Las cifras marcadas como no publicables **no aparecen**. Si el material dice
  "las cifras de acierto no son publicables", el texto dice que se mide con un
  banco de evaluación y no da el número.
- Las métricas absolutas del sistema del cliente (tiempos, volúmenes, tasas de
  fallo de su sistema anterior) pasan a **mejora relativa u orden de magnitud**:
  "reducción de un orden de magnitud" en lugar de "4.726 ms → 428 ms".
- `repoUrl` y `demoUrl` se omiten si están vacíos en `metadata.yml`.

### El límite, por el otro lado

Generalizar es correcto; **exagerar no lo es**, y **vaciar tampoco**. No
conviertas "sin cifras autorizadas" en una mejora inventada, ni "aportación
acotada" en autoría completa. Y no te lleves por delante la señal de competencia:
si al recortar el texto deja de demostrar que sabes hacer algo, has ido
demasiado lejos. Las dos pruebas del Paso 7 tienen que pasar a la vez.

Los recuentos de commits ("27 de 29", "cuarto autor de cinco") **se mantienen
siempre**: son de autoría, no del cliente, y son lo que hace creíble la
delimitación.

---

## Paso 4A — Si la habilidad es nueva

Crea `content/skills/<slug>/index.es.md`.

### Frontmatter

Tiene que validar contra el esquema Zod de `src/content.config.ts`. Sale casi
entero de `metadata.yml`:

~~~yaml
---
title: Diseño y operación de pipelines con LLM en producción
summary: "Frase que resume qué sé hacer."
category: Datos e IA
tech: [Python, asyncio, FastAPI]
level: 3 proyectos · 2023–2026
featured: false
draft: false
order: 10
---
~~~

Correspondencias con `metadata.yml`:

- `title` y `summary` → tal cual (recorta `summary` a 100-180 caracteres si viene
  más largo).
- `tech` → los primeros **6 como máximo**, por relevancia. En la fila solo se ven
  3, así que el orden importa.
- `level` → constrúyelo de `projects` y `years_active`: `"3 proyectos ·
  2023–2026"`.
- `category` → agrupa con las habilidades que ya existan; no inventes una
  categoría nueva si encaja en una que ya se usa.
- `order` → deja hueco entre habilidades (10, 20, 30) para poder intercalar.

**Cuidado con el YAML:** si un valor contiene **dos puntos**, hay que
entrecomillar la cadena entera o el build falla con `bad indentation of a mapping
entry`.

### Cuerpo

`SKILL.md` ya trae la estructura buena. Consérvala, con estos ajustes:

1. **Quita el `# Título` de la primera línea**: la página ya lo pinta desde el
   frontmatter, y repetirlo se ve mal.
2. Mantén las secciones `## Qué sé hacer`, `## Herramientas y técnicas` y
   `## Dónde lo he hecho`.
3. Dentro de `## Dónde lo he hecho`, cada proyecto es un `###`. Sepáralos con
   `---` para que se lean como bloques distintos.
4. Las imágenes se referencian con ruta relativa: `![Descripción](./assets/x.svg)`.
5. **No reescribas la prosa.** Corrige erratas y ajusta el formato; el contenido
   ya está trabajado.

---

## Paso 4B — Si la habilidad ya existe

1. **No toques la descripción existente** salvo que el material nuevo la amplíe
   de verdad; en ese caso añade una frase, no rehagas el bloque.
2. Añade los proyectos nuevos dentro de `## Dónde lo he hecho`, separados por
   `---`.
3. Actualiza el frontmatter: `tech` (solo lo nuevo, máximo 6) y `level` (el
   recuento y el rango de años).
4. Haz lo mismo en `index.en.md`, tocando **solo las mismas partes**.

---

## Paso 5 — La versión en inglés

Traduce al inglés lo que hayas escrito o modificado.

- Mismo frontmatter, con `title`, `summary`, `category` y `level` traducidos.
- **`tech`, `order`, `featured` y `draft` deben ser idénticos** entre idiomas. Si
  divergen, las dos versiones del sitio se desincronizan.
- Los nombres de tecnologías no se traducen. Los términos de dominio sí
  (`transcripción automática de voz` → `automatic speech recognition`).
- Registro profesional, inglés natural, sin calcar la sintaxis española.

---

## Paso 6 — Imágenes

1. Copia `_raw/<slug>/assets/` a `content/skills/<slug>/assets/`.
2. Referéncialas con rutas relativas y **texto alternativo descriptivo**.
3. Los SVG de diagramas se ven sobre fondo oscuro: comprueba que no llevan texto
   en negro sobre transparente, o no se leerá nada.
4. **Un diagrama comunica una receta más rápido que un párrafo.** Aplícale el
   mismo criterio que al texto: si dibuja la arquitectura real de la solución o
   las fases nombradas del sistema del cliente, generalízalo. Generalizar el
   texto y dejar el diagrama no protege nada.

---

## Paso 7 — Verifica

1. `index.es.md` e `index.en.md` existen y su frontmatter cumple el esquema.
2. Los campos que deben coincidir entre idiomas coinciden.
3. **Pasada explícita de confidencialidad**: ningún nombre de cliente y ninguna
   cifra marcada como no publicable.
4. **Pasada de know-how**: relee cada sección de proyecto preguntándote *"¿podría
   un ingeniero competente implementar esto leyendo la página?"*. Si la respuesta
   es sí, generalízala.
5. **Pasada del reclutador**, la contraria: *"¿queda claro que esta persona sabe
   hacer esto?"*. Si el recorte se ha llevado la señal de competencia, has ido
   demasiado lejos. Las dos tienen que pasar a la vez.
6. **Pasada de correlación**: comprueba que ningún dato del cliente aparece en
   dos habilidades con formulación distinta. Comparar dos páginas no debe
   permitir deducir nada que ninguna revela por separado — si una dice "diez
   extractores" y otra "once campos", ahí hay una fuga.
4. `npm run build` pasa sin errores ni avisos de i18n.
5. Mira la página en `npm run dev` y comprueba que los diagramas se ven.

---

## Paso 8 — Infórmame

Al terminar, dime:

- Qué habilidad has creado o ampliado.
- **Qué `TODO` de `NOTES.md` siguen abiertos**, en especial los de "pendiente de
  confirmar". Es lo primero que quiero revisar.
- **Qué has dejado fuera por confidencialidad**, separando las dos cosas: qué
  ocultaste de la identidad del cliente y **qué detalle técnico generalizaste
  para no dar la receta**. Lo segundo es lo que quiero revisar con más cuidado.
- Si el build pasó.

No borres la carpeta de `_raw/`: se queda como fuente por si hay que rehacer
algo.
