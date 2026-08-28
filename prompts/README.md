# Prompts

Dos prompts para documentar un proyecto y convertirlo en evidencia de una
habilidad del portfolio, sin escribir el texto desde cero ni acordarse de todos
los campos del frontmatter.

La idea: separar **recopilar** de **redactar**. Recopilar hay que hacerlo donde
está el código; redactar se hace aquí. Además, así el material en bruto queda
guardado y se puede rehacer el texto final sin repetir la entrevista.

## El flujo

```
Proyecto externo                     Este repo
─────────────────                    ──────────
01-recopilar-proyecto.md
        │
        │  analiza el código
        │  + te entrevista
        ▼
_portfolio-raw/<slug>/  ─ copiar ─►  content/skills/_raw/<slug>/
  ├── RAW.md                                  │
  ├── metadata.yml                            │  02-raw-a-web.md
  ├── NOTES.md                                ▼
  └── assets/                        content/skills/<habilidad>/
                                       ├── index.es.md
                                       └── index.en.md
```

## Paso 1 — Recopilar

```bash
cp prompts/01-recopilar-proyecto.md /ruta/a/mi-proyecto/
cd /ruta/a/mi-proyecto
claude
```

Y le dices:

> Lee `01-recopilar-proyecto.md` y sigue las instrucciones.

Claude analiza el repositorio por su cuenta (stack, estructura, historial de git,
reparto de autoría) y después te entrevista por tandas. Empieza **siempre** por
confidencialidad, porque condiciona todo lo demás, y termina identificando **qué
habilidades demuestra** el proyecto.

Resultado: una carpeta `_portfolio-raw/<slug>/` con todo lo hablado.

## Paso 2 — Convertir

Copia esa carpeta a `content/skills/_raw/`, abre Claude Code en la raíz de este
repo y le dices:

> Lee `prompts/02-raw-a-web.md` y procesa `content/skills/_raw/<slug>`.

El prompt mira qué habilidades existen ya y decide: **añadir el proyecto a una
habilidad existente**, o **crear una nueva**. Te dice qué ha decidido antes de
escribir nada, para que puedas corregirlo.

Es un proceso **incremental**: las habilidades crecen a medida que añades
proyectos que las respaldan. Un mismo proyecto puede aparecer en varias, contado
desde el ángulo que corresponde a cada una.

## Paso 3 — Revisar y publicar

```bash
npm run dev     # míralo en local
npm run build   # confirma que compila
```

Revisa el texto —sobre todo lo que Claude te diga que ha generalizado por
confidencialidad—, ajusta lo que veas y haz commit. El despliegue es automático
al hacer push a `main`.

## Sobre proyectos confidenciales

La mayoría del trabajo de cliente no se puede contar con nombres ni cifras. Los
dos prompts parten de esa base:

- El prompt 1 pregunta por confidencialidad **antes que por nada más**, y deja
  las reglas escritas al principio de `RAW.md`.
- El prompt 2 las aplica al redactar: sector en lugar del nombre del cliente,
  mejoras relativas en lugar de cifras de negocio.

La línea que mantienen: **generalizar sí, inventar no.** Describir un resultado
real sin dar la cifra exacta es correcto y es lo normal en este tipo de trabajo.
Inventarse una cifra porque suena mejor es otra cosa, y no aguanta la primera
entrevista técnica en la que pregunten por el proyecto.

## Notas

- Sirven igual para proyectos personales y académicos; el bloque de
  confidencialidad se resuelve en una pregunta.
- No hace falta pasar por el prompt 1 si tienes el proyecto fresco: puedes
  escribir un `RAW.md` a mano y pasarlo al prompt 2.
- Para educación y experiencia no hay prompt: son entradas cortas que se
  escriben a mano copiando una carpeta existente.
