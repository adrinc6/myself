# Contenido

Todo lo que se ve en la web vive aquí como Markdown, separado del código.

El portfolio está organizado **por habilidades**: cada una se describe a fondo y
los proyectos aparecen dentro como evidencia de que sé aplicarla. No hay una
colección de proyectos aparte.

| Carpeta | Qué contiene |
|---|---|
| `skills/` | Habilidades, con sus proyectos dentro |
| `skills/order.json` | En qué orden salen las habilidades en la web |
| `skills/_raw/` | Bandeja de entrada: material sin procesar |
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

## Cómo se escribe una habilidad

El cuerpo del Markdown tiene dos partes:

1. **La descripción de la habilidad**: qué sé hacer exactamente y hasta dónde
   llega. No una lista de tecnologías, sino qué problemas sé resolver con ellas.
2. **Una sección por proyecto** que la demuestre, separadas por `---`, con
   contexto, implementación, cómo fue y resultados.

Copia `skills/_ejemplo-habilidad/`, que lo documenta entero.

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
| `level` | texto | Titular corto: "3 proyectos", "2 años" |
| `featured` | booleano | Destacar |

El orden de las habilidades **no** se toca aquí, sino en `skills/order.json`.

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
- **Entre idiomas deben coincidir** `tech`, `order`, `featured` y `draft` (y las
  fechas en educación y experiencia). Si divergen, las dos versiones del sitio se
  desincronizan.

Si algo no cuadra con el esquema, el build falla indicando el archivo y el campo
concreto. El esquema completo está en
[`../src/content.config.ts`](../src/content.config.ts).
