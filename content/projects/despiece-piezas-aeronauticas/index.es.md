---
title: Despiece automático de piezas aeronáuticas
summary: "A partir de la geometría de una pieza estructural, derivar automáticamente su descomposición interna en elementos, lista para fabricación."
sector: Aeronáutico
period: "2026"
status: En uso en el cliente
tech: [Python, numpy, scipy, shapely, Voronoi, NURBS]
skills:
  - slug: algoritmia-geometria-computacional
    contribution: "Reescribí el motor de topología con Voronoi sobre segmentos y construí el módulo de etiquetado desde cero."
  - slug: evaluacion-sistemas-ia
    contribution: "La bitácora de ingeniería con métricas por pieza, y la decisión de cambiar la métrica cuando el sistema de referencia se equivocaba."
---

## Qué hice

Sobre una versión heredada que funcionaba en piezas pequeñas y se desmoronaba en
las grandes, reescribí las dos piezas de las que dependía que el resultado fuera
correcto:

- **El motor de topología.** El enfoque heredado partía de una representación
  discreta que introducía artefactos y hacía que el resultado dependiera de
  parámetros de muestreo. La causa raíz estaba en la representación, no en el
  ajuste de parámetros, que es donde se había buscado hasta entonces. La
  sustituí por un **diagrama de Voronoi sobre segmentos** (`scipy.spatial` y
  `shapely`) que preserva la procedencia de cada primitiva: el resultado deja de
  ser ambiguo **por construcción** en vez de corregirse después.
- **El etiquetado.** El algoritmo original propagaba de forma relativa: un error
  temprano se arrastraba por todo el resultado. Lo rediseñé para que cada
  elemento derive su identidad de invariantes locales verificables, de modo que
  **los errores queden acotados en vez de propagarse**.

## Buenas prácticas

- **Cuestionar la métrica.** La comparación obvia era parecerse al algoritmo
  anterior; al medirlo resultó que el anterior producía identificadores
  duplicados y saltos de fila. Cambié el criterio a **consistencia interna**
  —huecos, roturas de orden, duplicados— en vez de usar el sistema previo como
  juez.
- **Bitácora de ingeniería** con el diagnóstico, los cambios y **las hipótesis
  descartadas**, para no repetirlas.
- Marcado explícito de los resultados de baja confianza, en lugar de
  descartarlos en silencio.
- Caché con clave por hash de entrada más versión de esquema, documentando su
  límite: detecta cambios en los datos, no en el código.

## Resultado

En uso en el flujo de trabajo del cliente. Sobre piezas reales de complejidad muy
dispar —más de un orden de magnitud entre la menor y la mayor—: **cero elementos
sin identificar, cero duplicados y cero solapes**, donde el algoritmo anterior
dejaba sin identificar una fracción significativa. Tiempo de etiquetado reducido
en un orden de magnitud, y la preparación de datos de minutos a fracciones de
segundo gracias al caché.

Buena parte del trabajo fue detectar **supuestos implícitos en los datos de
entrada que nadie había documentado** —un identificador que parecía una
coordenada y no lo era—. Corregir esa interpretación produjo la mayor mejora
individual del proyecto.
