---
title: Clasificación de texto libre contra vocabularios controlados
summary: "Asignación automática de códigos de taxonomías cerradas a texto escrito por personas, con umbrales calibrados y políticas de codificación declarativas."
category: Datos e IA
tech: [Python, embeddings, PostgreSQL, Elasticsearch]
level: 3 proyectos · 2023–2026
---

## Qué sé hacer

Convierto texto escrito por personas en códigos de una taxonomía cerrada, de
forma automática y con control sobre los falsos positivos. He construido este
tipo de clasificador tres veces, con tres enfoques distintos, en dos productos
que están en producción.

Sé cuándo conviene un umbral de similitud sobre embeddings, cuándo basta una
búsqueda léxica bien puntuada, y cuándo hay que combinar ambas. Y sé que la parte
difícil no es elegir el modelo: es decidir qué se codifica, con qué vocabulario,
y qué hacer cuando el sistema no está seguro.

## Herramientas y técnicas

- Embeddings + similitud coseno con umbral, contra un catálogo indexado en base
  de datos.
- Umbrales **calibrados por tipo de campo**, no un umbral global.
- Desempate explícito entre candidatos admisibles.
- Búsqueda léxica puntuada sobre motor de indexación, con índices separados por
  idioma.
- Estrategia híbrida: recuperación por embeddings frente a recuperación por
  título.
- Política de codificación declarativa y validada.
- Python, PostgreSQL, Elasticsearch.

![Flujo de clasificación](./assets/flujo-clasificacion.svg)

## Dónde lo he hecho

### I+D de NLP biomédico · sector salud · 2023–2024

**Contexto** · Había que asignar códigos de varias taxonomías clínicas estándar a
los conceptos que aparecían en lenguaje natural en una conversación asistencial.

**Qué hice yo** · **Diseñé e implementé el pipeline de codificación entero.** Es
mi aportación más completa en esta habilidad. Fui el segundo autor del
repositorio, de cinco personas.

*Delimitación*: en ese mismo repositorio había un subproyecto de terminología más
avanzado (post-coordinación, *matchers* alternativos, grafos de conocimiento) que
llevaban compañeros. No es mío y no lo cuento como tal.

**Cómo lo implementé** · Cada concepto extraído se resuelve contra un catálogo
indexado, con una **regla de desempate explícita** cuando varios candidatos son
admisibles en lugar de quedarse con el primero. Los conceptos se enrutan a
subíndices según su naturaleza, una decisión que tomé **tras medir** que el
índice único degradaba el acierto.

**Buenas prácticas aplicadas** · Umbrales **distintos por tipo de campo** en vez
de uno global —los campos donde un falso positivo es más caro llevan umbral más
exigente—; separación entre la conexión al catálogo y la de datos operativos;
paralelización del proceso completo.

**Lo que faltó** · Sin tests automatizados. La validación era manual sobre casos.
Es una carencia real del proyecto y la reconozco.

**En uso real** · Fue I+D. El enfoque pasó después al producto; el repositorio en
sí no se desplegó.

---

### Suite clínica modular · sector salud · 2025–2026

**Contexto** · Varios módulos de producto necesitaban codificar contra distintos
sistemas terminológicos, y cada cliente quería codificar cosas distintas.

**Qué hice yo** · La **política de codificación configurable** y el buscador
multiidioma. Cuarto autor de un repositorio de cinco personas; mi parte aquí está
bien acotada.

*Delimitación*: los subsistemas de post-coordinación, búsqueda vectorial y
anonimización de datos personales son de compañeros.

**Cómo lo implementé** · En lugar de dejar la decisión de "qué se codifica con
qué" repartida por el código, la saqué a una **estructura declarativa
multinivel** con una función de validación que rechaza combinaciones imposibles y
permite sobrescritura parcial por despliegue. Un cliente puede cambiar la
política sin tocar código.

**Buenas prácticas aplicadas** · Validación estricta de la configuración de
entrada con errores explicativos; valores por defecto seguros; sobrescritura
parcial en vez de reemplazo total; copia defensiva para que nadie mute la
política global por accidente. **Es de lo poco del conjunto que sí tiene un test
automatizado dedicado.**

**Cifras** · Búsqueda multiidioma; sin cifras de acierto autorizadas.

**En uso real** · Sí, producto desplegado.

---

### Producto asistencial en producción · sector salud · 2025–2026

**Contexto** · La codificación como paso integrado dentro del flujo de extracción
clínica que corre en cada consulta real.

**Qué hice yo** · La integración de la codificación dentro de los extractores por
campo, y el control de duplicados. Aquí la codificación es una pieza de algo
mayor —el pipeline de LLM— que cuento en otra habilidad.

**Cómo lo implementé** · La codificación se aplica campo a campo, con validación
contra catálogos maestros para no emitir códigos de conceptos inexistentes.

**Buenas prácticas aplicadas** · Verificación contra catálogo antes de dar por
bueno un código; deduplicación explícita.

**Cifras** · Medido con el banco de evaluación que construí (ver
[Evaluación de sistemas de IA](/myself/skills/evaluacion-sistemas-ia)); las
cifras concretas no son publicables.

**En uso real** · Sí, en producción con profesionales sanitarios.
