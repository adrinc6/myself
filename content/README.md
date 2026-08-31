# Contenido

Todo lo que se ve en la web vive aquí como Markdown, separado del código.

El portfolio se lee **en los dos sentidos**: una habilidad muestra los proyectos
que la demuestran, y un proyecto muestra las habilidades que salieron de él. Las
habilidades siguen siendo el eje, pero cada proyecto tiene ficha propia.

Esa relación se escribe **una sola vez**: en el campo `skills` del frontmatter de
cada proyecto. El sentido contrario se deriva en el build, así que las dos listas
no pueden desincronizarse.

| Carpeta | Qué contiene |
|---|---|
| `skills/` | Habilidades: qué sé hacer |
| `skills/order.json` | En qué orden salen las habilidades en la web |
| `skills/_raw/` | Bandeja de entrada: material sin procesar |
| `projects/` | Proyectos: dónde lo he aplicado |
| `projects/order.json` | En qué orden salen los proyectos en la web |
| `education/` | Titulaciones y formación |
| `experience/` | Puestos de trabajo |

## Cómo se estructura un elemento

Cada elemento es una carpeta con un archivo por idioma:

```
skills/ingenieria-de-datos/
├── index.es.md      # versión en español
├── index.en.md      # versión en inglés
└── assets/          # imágenes (opcional)
```

El nombre de la carpeta es el **slug compartido** por los dos idiomas, y es lo
que permite cambiar de idioma sin salir de la página en la que estás.

Si falta la traducción al inglés, se muestra la española y el build avisa por
consola. La web no se rompe por tener una traducción a medias.

Las carpetas que empiezan por `_` las ignora el loader, así que `_raw/` y las
plantillas de ejemplo no llegan a publicarse.

## Cómo se escribe una habilidad o un proyecto

Las dos usan **tres epígrafes fijos**, y solo cambia el tercero:

| | Habilidad | Proyecto |
|---|---|---|
| 1 | `## Qué sé hacer` | `## Qué hice` |
| 2 | `## Buenas prácticas` | `## Buenas prácticas` |
| 3 | `## Cuándo lo uso` | `## Resultado` |

El `summary` del frontmatter **hace de contexto** y no se repite dentro: no hay
epígrafe "Contexto". Bullets cortos en vez de párrafos largos; el objetivo es que
una ficha se lea en menos de un minuto.

**El bloque de proyectos no se escribe a mano en la habilidad.** Se genera desde
`projects/`. Escribirlo en el Markdown lo duplicaría y acabaría desfasado.

## Cómo se enlazan habilidades y proyectos

En el frontmatter del **proyecto**, y solo ahí:

```yaml
skills:
  - slug: pipelines-llm-produccion
    contribution: "Diez extractores independientes, uno por campo clínico."
```

`slug` es el nombre de la carpeta de la habilidad. Si no existe, **el build
falla** indicando el fichero y los slugs válidos.

`contribution` se muestra en las dos direcciones —en la habilidad, bajo el
nombre del proyecto; en el proyecto, bajo el nombre de la habilidad—, así que
tiene que leerse bien en ambos sentidos: *qué me dio este proyecto en esa
habilidad*.

## Cómo añadir un proyecto

Con los prompts de [`../prompts/`](../prompts/README.md): uno analiza el
repositorio del proyecto y te entrevista, y el otro decide si el proyecto va a
una habilidad existente o justifica una nueva.

El material en bruto se deja en [`skills/_raw/`](skills/_raw/README.md).

## Campos disponibles

Obligatorios en las tres colecciones: `title` y `summary`.

| Campo | Tipo | Notas |
|---|---|---|
| `title` | texto | Obligatorio |
| `summary` | texto | Obligatorio. Es lo que se ve en la tarjeta |
| `draft` | booleano | `true` = visible en local, fuera de la web publicada |

En `education/` y `experience/` hay además un campo `order` (menor número,
aparece antes). **Las habilidades no lo llevan**: su orden se define en
[`skills/order.json`](skills/order.json), moviendo las líneas de la lista. Una
habilidad que no aparezca en esa lista sale al final, por orden alfabético.

**Solo en `skills/`**

| Campo | Tipo | Notas |
|---|---|---|
| `category` | texto | Área amplia: "Datos e IA", "Ingeniería" |
| `tech` | lista | Tecnologías. En la fila solo se ven las 3 primeras |
| `featured` | booleano | Destacar |

El orden de las habilidades **no** se toca aquí, sino en `skills/order.json`.

**Solo en `projects/`**

| Campo | Tipo | Notas |
|---|---|---|
| `sector` | texto | Obligatorio. "Salud", "Aeronáutico" |
| `period` | texto | Obligatorio. **Entrecomillado**: `"2026"` sin comillas es un número y rompe el build |
| `status` | texto | "En producción", "Revisión de cliente" |
| `tech` | lista | Tecnologías y vocabularios |
| `skills` | lista | El enlace con las habilidades. Ver arriba |

El orden de los proyectos se define en `projects/order.json`.

**Solo en `education/`**: `institution` y `startDate` (obligatorios), `endDate`,
`specialty`, `location`.

**Solo en `experience/`**: `company` y `startDate` (obligatorios), `endDate`,
`location`, `tech`.

## Reglas que conviene recordar

- **Las fechas son `YYYY-MM` exacto.** `2024-3` o `marzo 2024` hacen fallar el
  build. Las habilidades no llevan fecha.
- **Cuidado con los dos puntos en YAML.** Un `summary: Llevar a producto:
  prompts y validación` rompe el build: hay que entrecomillar la cadena entera.
- **Los campos opcionales se omiten, no se vacían.**
- **Entre idiomas deben coincidir** `tech`, `order`, `featured`, `draft` y los
  `slug` de `skills` (y las fechas en educación y experiencia). Si divergen, las
  dos versiones del sitio se desincronizan. El `contribution` sí se traduce.

Si algo no cuadra con el esquema, el build falla indicando el archivo y el campo
concreto. El esquema completo está en
[`../src/content.config.ts`](../src/content.config.ts).
