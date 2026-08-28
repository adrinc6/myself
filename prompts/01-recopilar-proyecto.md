# Prompt 1 — Recopilar la información de un proyecto

> **Cómo se usa:** copia este archivo a la carpeta raíz del proyecto que quieres
> documentar, abre Claude Code ahí y dile:
> *"Lee `01-recopilar-proyecto.md` y sigue las instrucciones."*
>
> El resultado es una carpeta `_portfolio-raw/<slug>/` que después te llevas al
> repo del portfolio y procesas con el prompt 2.

---

## Tu papel

Vas a ayudarme a documentar este proyecto para mi portfolio personal. Tu trabajo
tiene dos partes: **analizar el código** por tu cuenta y **entrevistarme** sobre
lo que no se puede deducir leyendo el repositorio.

Mi portfolio está organizado **por habilidades**, no por proyectos: cada
habilidad se describe a fondo y los proyectos aparecen dentro como evidencia de
que sé aplicarla. Así que además de documentar el proyecto, hay que identificar
**qué habilidades demuestra**.

El objetivo NO es que escribas la versión final para la web. Eso lo hace el
prompt 2. Aquí solo recopilas materia prima: cuanto más completa y más honesta,
mejor saldrá el texto final.

---

## Paso 1 — Analiza el proyecto (sin preguntarme todavía)

Explora la carpeta y averigua por tu cuenta todo lo que puedas:

- **Qué es**: tipo de proyecto (API, script, web, análisis, librería, pipeline…)
  y qué problema resuelve, según el README y el código.
- **Stack**: lenguajes, frameworks y dependencias principales. Mira los archivos
  de dependencias (`package.json`, `requirements.txt`, `pyproject.toml`,
  `pom.xml`, `go.mod`…), no solo las importaciones.
- **Estructura**: cómo está organizado, cuáles son los puntos de entrada y qué
  módulos parecen ser el núcleo frente a lo accesorio.
- **Escala**: número aproximado de archivos y líneas de código propio, excluyendo
  dependencias y ficheros generados.
- **Calidad**: ¿hay tests? ¿CI? ¿documentación? ¿linters?
- **Historia**: si hay repositorio git, mira `git log`. Interesa el rango de
  fechas, el número de commits y **quién los hizo**. Ejecuta
  `git shortlog -sne --all` para ver el reparto entre autores: eso indica si fue
  un proyecto individual o de equipo. Si fue de equipo, no asumas que todo el
  código es mío.

Cuando termines, **hazme un resumen breve** de lo que has entendido (5-10 líneas)
y dime explícitamente qué **no** has podido deducir. Así corrijo de entrada
cualquier malentendido antes de que sigamos.

---

## Paso 2 — Entrevístame

Ahora pregúntame lo que el código no dice. Reglas de la entrevista:

- **Por tandas de 2 o 3 preguntas**, no todas de golpe. Es una conversación.
- **No me preguntes lo que ya has averiguado** leyendo el repositorio.
- Si una respuesta mía se queda corta o vaga, **repregunta**. "Mejoró el
  rendimiento" no vale: hace falta saber cuánto, respecto a qué y cómo se midió.
- Si digo que no me acuerdo de algo, **déjalo estar** y anótalo como desconocido.
  No pasa nada por tener huecos.

### Bloque A — Confidencialidad (SIEMPRE va primero)

Muchos de mis proyectos son para clientes privados y no puedo contar según qué
cosas. Antes de nada, pregúntame:

1. ¿Es un proyecto público, personal, académico o para un cliente?
2. Si es para un cliente: **¿puedo nombrarlo?** Si no, ¿cómo lo describo?
   ("una empresa del sector logístico", "una aseguradora", "una startup de
   salud digital"…)
3. ¿Hay algo que **no** pueda aparecer? Nombres de producto, cifras de negocio,
   arquitecturas internas, nombres de clientes finales, datos de usuarios.
4. ¿Puedo enlazar el repositorio o alguna demo, o es todo privado?
5. ¿Hay alguna parte de **cómo** lo resolviste que no debería hacerse pública?
   No por el cliente, sino por ti: si un competidor lee la solución y puede
   replicarla, ahí hay que quedarse en el qué y no bajar al cómo.

Anota las respuestas con claridad al principio del archivo `RAW.md`, porque el
prompt 2 las va a necesitar para saber qué puede publicar y qué no.

### Bloque B — El problema

6. ¿Qué problema resolvía este proyecto? ¿Qué pasaba antes de que existiera?
7. ¿Quién lo iba a usar y con qué frecuencia?
8. ¿Por qué se decidió construirlo en lugar de usar algo que ya existía?

### Bloque C — Mi aportación (el bloque más importante)

9. ¿Fue individual o en equipo? Si fue en equipo, **¿cuántas personas y qué hizo
   cada una?**
10. **¿Qué partes escribí yo exactamente?** Sé concreto: módulos, funciones,
   decisiones de diseño. Si hay partes que no toqué, dilo también.
11. ¿Qué parte del proyecto es código propio y qué parte es una librería o un
    framework haciendo el trabajo?
12. ¿Cuál fue mi papel: diseño, implementación, ambos? ¿Definí yo el enfoque o
    me lo dieron hecho?

### Bloque D — Decisiones técnicas

13. ¿Cuáles fueron las 2 o 3 decisiones técnicas importantes?
14. Para cada una: **¿qué alternativas descarté y por qué?**
15. ¿Qué fue lo más difícil? ¿Dónde me quedé atascado y cómo salí?
16. ¿Hay algo en el código de lo que esté especialmente satisfecho?

### Bloque E — Resultados

17. ¿Funcionó? ¿Se llegó a usar de verdad o se quedó en el cajón?
18. ¿Hay algún número? (tiempo ahorrado, volumen procesado, precisión, usuarios,
    reducción de errores…). Si no hay cifras exactas, **¿se puede dar el orden de
    magnitud o la mejora relativa?**
19. ¿Cómo se midió que iba bien?

### Bloque F — Habilidades que demuestra

Este bloque es el que conecta el proyecto con la estructura del portfolio.

20. **¿Qué habilidades concretas demuestra este proyecto?** No vale "programación
    en Python": interesa el tipo de capacidad, como "diseño de esquemas
    relacionales", "integración de LLMs en producto" o "análisis numérico
    aplicado". Entre una y tres por proyecto.
21. Para cada una: **¿qué parte del proyecto lo demuestra exactamente?**
22. ¿Fue la primera vez que aplicaste esa habilidad, o ya la traías de antes?

### Bloque G — Retrospectiva

23. ¿Qué haría distinto ahora?
24. ¿Qué limitaciones conocidas tiene?
25. ¿Qué aprendí que no sabía antes de empezar?

### Bloque H — Material gráfico

26. ¿Tengo capturas, diagramas o gráficas que pueda incluir? **Cuidado**: si el
    proyecto es confidencial, revisa que no salgan datos reales de clientes en
    las capturas.

---

## Paso 3 — Escribe la carpeta raw

Crea `_portfolio-raw/<slug>/` en la raíz del proyecto, donde `<slug>` es un
nombre corto en minúsculas y con guiones. Esta carpeta se copiará después a
`content/skills/_raw/` en el repo del portfolio. Dentro:

### `RAW.md`

Todo lo recopilado, sin pulir y sin recortar. Estructura:

~~~markdown
# <Nombre del proyecto>

## Confidencialidad
- Tipo: público / personal / académico / cliente
- ¿Se puede nombrar al cliente?: sí / no -> descripción genérica: "..."
- Prohibido publicar: ...
- Enlaces publicables: ...

## Análisis técnico (deducido del código)
...

## Entrevista
### El problema
...
### Mi aportación
...
### Decisiones técnicas
...
### Resultados
...
### Habilidades que demuestra
- <habilidad>: <qué parte del proyecto lo demuestra>
- ...
### Retrospectiva
...
~~~

Recoge mis respuestas **con mis palabras**, sin adornarlas. El prompt 2 ya les
dará forma; si las embelleces aquí, el texto final se aleja de la realidad sin
que nadie lo note.

### `metadata.yml`

Datos estructurados provisionales:

~~~yaml
slug: nombre-del-proyecto
title: Título del proyecto
client: ""            # descripción genérica, o vacío si no aplica
confidential: false
role: ""
startDate: YYYY-MM
endDate: YYYY-MM      # vacío si sigue en curso
tech: []
# Habilidades que demuestra este proyecto. El prompt 2 las usará para decidir
# a qué habilidad del portfolio añadirlo, o si hay que crear una nueva.
skills: []
repoUrl: ""
demoUrl: ""
~~~

### `NOTES.md`

Lo que quedó pendiente:

- Preguntas que no supe contestar.
- Datos que habría que confirmar (fechas aproximadas, cifras sin verificar).
- Cosas que hay que revisar antes de publicar.

Cada punto, como `TODO: ...`.

### `assets/`

Copia aquí las imágenes que te indique.

---

## Reglas que no se saltan

1. **No inventes nada.** Si no lo sé o no lo has podido deducir, va a `NOTES.md`
   como `TODO`. Un portfolio con detalles inventados se cae en la primera
   entrevista técnica en la que pregunten por él.

2. **No infles mi aportación.** Si el 70 % del trabajo lo hacía una librería,
   eso se dice. Si fue un proyecto de equipo, mi parte se delimita. Es más fuerte
   decir "diseñé el algoritmo de scoring de un sistema de matching que
   desarrollamos entre tres" que atribuirse el sistema entero.

3. **Anonimizar sí, exagerar no.** Cambiar "Cliente S.A." por "una empresa del
   sector retail" es correcto y necesario. Convertir "redujo algo el tiempo de
   proceso" en "redujo el tiempo un 80 %" no lo es. La confidencialidad afecta a
   los *nombres* y a los *detalles del negocio*, no a la veracidad de lo que
   hice.

4. **Distingue lo medido de lo estimado.** Si un número es una impresión mía y no
   una medición, márcalo como estimación en `RAW.md`.

5. **Recoge el detalle técnico completo en `RAW.md`.** Es material interno y
   sirve para preparar entrevistas, así que no te cortes aquí. Pero **marca con
   `[NO PUBLICAR]`** lo que sea receta replicable —la secuencia de pasos, la
   estructura concreta de la solución, los parámetros—, para que el prompt 2
   sepa qué no puede sacar a la web. El archivo completo se queda; el filtro se
   aplica al publicar.

6. **Precaución con los secretos.** Si al leer el código te encuentras claves de
   API, contraseñas o datos personales, avísame y **no los copies** a la carpeta
   raw.

---

## Al terminar

Dime:

- Dónde has dejado la carpeta.
- Un resumen de lo que has recopilado.
- Los `TODO` que quedan abiertos.
- Las habilidades que has identificado y qué parte del proyecto justifica cada
  una.
- Tu opinión sincera: ¿hay material suficiente para una buena entrada de
  portfolio, o falta información importante?
