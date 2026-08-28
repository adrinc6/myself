---
title: Evaluación de sistemas de IA
summary: "Infraestructura para medir si un sistema de IA funciona y cuánto cuesta que funcione: acierto por campo, latencia, tokens y caché en la misma vista."
category: Datos e IA
tech: [Python, asyncio, CSV, HTML]
level: 2 proyectos · 2026
featured: true
---

## Qué sé hacer

Monto la infraestructura que dice si un sistema de IA funciona, y **cuánto
cuesta** que funcione. No solo acierto: acierto por campo, tiempo por fase,
tokens de entrada y salida, y aprovechamiento de caché, todo en la misma tabla y
comparable entre versiones.

Es la diferencia entre usar un modelo y poder responder por él. Cuando alguien
pregunta "¿esto va mejor que lo de antes?", tengo con qué contestar en vez de una
impresión.

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

## Dónde lo he hecho

### Producto asistencial en producción · sector salud · 2026

Mi aportación más limpia de todo el portfolio: esta pieza es **enteramente mía,
de cero**.

**Contexto** · Había un pipeline de extracción con modelo de lenguaje en
producción y ninguna forma sistemática de saber si un cambio de prompt o de
versión de modelo lo mejoraba o lo empeoraba.

**Qué hice yo** · **Lo construí entero, de cero**, entre junio y julio de 2026.
Ningún otro autor ha tocado esa carpeta en el historial. Diseñé la metodología de
evaluación además de implementarla.

*Nota de honestidad*: el banco mide un pipeline que en su mayor parte **también
escribí yo**. Es una herramienta de autoevaluación, no una auditoría
independiente.

**Cómo lo implementé**

- **Casos de referencia versionados** en el repositorio, con la salida esperada,
  para que la evaluación sea reproducible y no dependa de datos de una máquina
  concreta.
- **Puntuación por campo** además de global: un promedio alto puede esconder un
  campo concreto que falla siempre, y ese es justo el que hay que arreglar.
- **Métricas de coste y latencia en la misma tabla que las de calidad** —tiempo
  medio, tokens de entrada y salida, aprovechamiento de caché— por fase y por
  campo. Permite ver que una mejora de acierto sale cara antes de desplegarla.
- **Modo atómico**: cada componente se mide aislado, además del flujo completo,
  para localizar en qué punto se pierde el acierto.
- **Resultados archivados por versión**, de modo que comparar dos versiones es
  leer dos carpetas, no repetir el experimento.
- **Export de discrepancias** a CSV: el listado de lo que falló, para
  investigarlo, no solo el número que resume.
- **Cuadro de mando y consola en HTML** propios, sin dependencias externas.
- Diseño del informe deliberado: pocos números arriba para mirar rápido, el
  detalle debajo para investigar.

**Buenas prácticas aplicadas** · Dataset versionado junto al código; separación
entre generación, ejecución, evaluación y exportación; resultados inmutables por
versión.

**Cifras** · Un conjunto de casos de referencia versionado, con **varias
versiones evaluadas comparativamente** y puntuación desglosada por campo clínico
y por línea asistencial. Las cifras de acierto son del cliente y no se
publican.

**En uso real** · Sí, se usó para decidir sobre cambios del sistema en
producción.

---

### Librería de análisis geométrico · sector aeronáutico · 2026

**Contexto** · Un algoritmo de etiquetado que había que comparar contra el
algoritmo anterior sobre varias piezas reales.

**Qué hice yo** · La bitácora de ingeniería del módulo, con métricas por pieza,
diagnóstico de la causa raíz y **registro explícito de las hipótesis
descartadas**.

**Cómo lo implementé** · Tabla comparativa por pieza (piezas resueltas, sin
etiqueta, duplicados, tiempo) antes y después del cambio, más una sección
dedicada a por qué la métrica obvia —parecerse al algoritmo anterior— **no era la
métrica correcta**, porque el anterior se equivocaba.

**Buenas prácticas aplicadas** · Documentar los callejones sin salida para que
nadie —yo incluido— los repita; cuestionar la referencia en vez de asumirla
válida.

**Cifras** · Un conjunto de piezas reales de complejidad muy dispar. El detalle
está en
[Algoritmia y geometría computacional](/myself/skills/algoritmia-geometria-computacional).

**En uso real** · Sí, guio el desarrollo del módulo.

## Dónde NO llego (y lo digo)

En los repositorios en los que he trabajado **apenas hay tests unitarios ni
linters configurados**; en varios no hay ninguno. Mi experiencia sólida es en
**evaluación de sistemas de IA** —medir comportamiento de extremo a extremo—, no
en cobertura de tests unitarios ni en montar pipelines de integración continua.
Es una carencia real y decirlo aquí me parece más útil que dejar que se descubra
en la primera pregunta técnica.
