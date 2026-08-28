---
title: Evaluación de sistemas de IA
summary: "Infraestructura para medir si un sistema de IA funciona y cuánto cuesta que funcione: acierto por campo, latencia, tokens y caché en la misma vista."
category: Datos e IA
tech: [Python, asyncio, CSV, HTML]
level: 2 proyectos · 2026
featured: true
---

## Qué resuelve

La pregunta "¿esto va mejor que lo de antes?" se responde con una impresión o con
una tabla. Monto la infraestructura que la responde con una tabla: acierto por
campo, tiempo por fase, tokens de entrada y salida y aprovechamiento de caché,
todo comparable entre versiones.

Es la diferencia entre usar un modelo y poder responder por él. Un promedio alto
puede esconder un campo que falla siempre, y una mejora de acierto puede salir
carísima; ninguna de las dos cosas se ve sin medirlas por separado.

## Herramientas y técnicas

- Conjunto de casos de referencia con salida esperada (*ground truth*).
- Ejecución reproducible por versión, con resultados archivados por versión.
- Puntuación **por campo**, no solo global, y desglose por línea de negocio.
- Métricas de coste y latencia junto a las de calidad, en la misma vista.
- Ejecución atómica: cada componente medido por separado, además del flujo
  completo.
- Export a CSV para comparar versiones, y export de discrepancias para investigar
  fallos.
- Cuadro de mando en HTML, sin dependencias externas.
- Bitácora de ingeniería: registrar también las hipótesis descartadas.
- Python, `asyncio`.

![Ciclo de evaluación](./assets/ciclo-evaluacion.svg)

## Proyectos

### Producto asistencial en producción · sector salud · 2026

El banco de evaluación del pipeline clínico, construido de cero: es la pieza más
enteramente mía de todo el portfolio.

**Contexto** · Había un pipeline de extracción con modelo de lenguaje en
producción y ninguna forma sistemática de saber si un cambio de prompt o de
versión de modelo lo mejoraba o lo empeoraba.

**Mi aportación** · **Lo construí entero, de cero**, entre junio y julio de 2026,
y diseñé la metodología de evaluación además de implementarla. Ningún otro autor
ha tocado esa carpeta en el historial.

*Delimitación*: el banco mide un pipeline que en su mayor parte también escribí
yo. Es una herramienta de autoevaluación, no una auditoría independiente.

**Cómo lo abordé**

- **Casos de referencia versionados** en el repositorio, con la salida esperada,
  para que la evaluación sea reproducible y no dependa de datos de una máquina
  concreta.
- **Puntuación por campo** además de global: un promedio alto puede esconder un
  campo concreto que falla siempre, y ese es justo el que hay que arreglar.
- **Métricas de coste y latencia en la misma tabla que las de calidad** —tiempo
  medio, tokens de entrada y salida, aprovechamiento de caché— por fase y por
  campo, para ver que una mejora de acierto sale cara antes de desplegarla.
- **Modo atómico**: cada componente se mide aislado, además del flujo completo,
  para localizar en qué punto se pierde el acierto.
- **Resultados archivados por versión**: comparar dos versiones es leer dos
  carpetas, no repetir el experimento.
- **Export de discrepancias** a CSV, con el listado de lo que falló, no solo el
  número que lo resume.
- **Cuadro de mando y consola en HTML** propios, sin dependencias externas, con
  pocos números arriba para mirar rápido y el detalle debajo para investigar.
- Dataset versionado junto al código, separación entre generación, ejecución,
  evaluación y exportación, y resultados inmutables por versión.

**Resultado** · Se usó para decidir sobre cambios del sistema en producción.
Varias versiones evaluadas comparativamente sobre un conjunto de casos
versionado, con puntuación desglosada por campo clínico y por línea asistencial;
las cifras de acierto son del cliente y no se publican.

---

### Librería de análisis geométrico · sector aeronáutico · 2026

La bitácora de ingeniería que decidió qué contaba como mejora en el módulo de
etiquetado.

**Contexto** · Había que comparar un algoritmo de etiquetado nuevo contra el
anterior sobre varias piezas reales, y la comparación obvia —parecerse al
anterior— resultó no ser la correcta.

**Mi aportación** · La bitácora del módulo, con métricas por pieza, diagnóstico
de la causa raíz y **registro explícito de las hipótesis descartadas**.

**Cómo lo abordé** · Tabla comparativa por pieza —piezas resueltas, sin etiqueta,
duplicados, tiempo— antes y después del cambio, más una sección dedicada a por
qué la métrica obvia no servía: el algoritmo de referencia se equivocaba, así que
parecerse a él no era el objetivo. Los callejones sin salida quedan documentados
para que nadie, yo incluido, los repita.

**Resultado** · Guio el desarrollo del módulo. El detalle está en
[Algoritmia y geometría computacional](/myself/skills/algoritmia-geometria-computacional).

## Límites

- Mi terreno es la **evaluación de extremo a extremo**: medir el comportamiento
  del sistema completo. No es lo mismo que cobertura de tests unitarios ni que
  montar integración continua, y en eso no tengo experiencia sólida — en los
  repositorios donde he trabajado apenas hay tests unitarios o linters
  configurados, y en varios no hay ninguno.
- El banco del producto asistencial mide código que en su mayoría es mío: sirve
  para decidir entre versiones, no como validación independiente.
