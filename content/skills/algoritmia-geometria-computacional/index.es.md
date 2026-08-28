---
title: Algoritmia y geometría computacional
summary: "Algoritmos a medida para geometría 2D robusta y detección de estructura en formas irregulares, con criterio para medir si el nuevo mejora al anterior."
category: Ingeniería y algoritmia
tech: [Python, numpy, scipy, shapely, Voronoi, NURBS]
level: 1 proyecto · 2026
featured: true
---

## Qué resuelve

Hay problemas para los que la librería estándar no llega: geometría 2D robusta,
detección de estructura en formas irregulares, propagación sobre grafos de
vecindad. Escribo el algoritmo a medida, y antes de escribirlo elijo la
representación del problema, que suele ser la mitad de la solución.

La otra mitad es medir. Un algoritmo nuevo se compara contra el que sustituye, y
si el sistema de referencia se equivoca, parecerse a él no es el objetivo:
cuestionar la métrica es parte del trabajo.

## Herramientas y técnicas

- Diagramas de Voronoi y particiones del espacio.
- Detección de curvatura y análisis de forma.
- Operaciones booleanas 2D robustas e indexado espacial.
- Propagación sobre grafos de vecindad.
- Análisis de componentes principales, homografías y transformaciones
  proyectivas.
- Curvas B-spline / NURBS para bordes curvos.
- Caché con clave por hash de entrada y versión de esquema.
- Python, numpy, scipy, shapely.

![Error que se propaga frente a error acotado](./assets/relativo-vs-absoluto.svg)

## Proyectos

### Librería de análisis geométrico · sector aeronáutico · 2026

La librería que deriva automáticamente la descomposición estructural de una
pieza a partir de su geometría. La escribí yo.

**Contexto** · A partir de la definición geométrica de una pieza estructural hay
que derivar automáticamente su descomposición interna en elementos
estructurales, lista para fabricación. La versión heredada funcionaba en piezas
pequeñas y se desmoronaba en las grandes.

**Mi aportación** · Sobre una versión de referencia heredada, **reescribí el
motor de topología** y **construí desde cero el módulo de etiquetado**, que son
las dos piezas de las que dependía que el resultado fuera correcto.

**Cómo lo abordé**

- **El motor de topología.** El enfoque heredado partía de una representación
  discreta que introducía artefactos geométricos y hacía que el resultado
  dependiera de parámetros de muestreo. La causa raíz estaba en la
  representación, no en el ajuste de parámetros —que es donde se había buscado
  hasta entonces—. La sustituí por una que preserva la trazabilidad del origen de
  cada primitiva geométrica: el resultado deja de ser ambiguo **por
  construcción**, en lugar de corregirse a posteriori. Añadí un preprocesado del
  contorno para eliminar geometría que de otro modo genera resultados a
  descartar, y un escalado del espacio por estabilidad numérica.
- **El etiquetado.** El algoritmo original propagaba de forma **relativa**: un
  error temprano se arrastraba por todo el resultado y las zonas no alcanzables
  desde el punto de partida se quedaban sin identificar. Lo rediseñé para que
  cada elemento derive su identidad de invariantes locales verificables en lugar
  de una cadena de dependencias, de modo que **los errores queden acotados en vez
  de propagarse**.
- **Cuestionar la métrica.** La comparación obvia era parecerse al algoritmo
  anterior; al medirlo resultó que el anterior producía identificadores
  duplicados y saltos de fila. Cambié el criterio a **consistencia interna**
  —huecos, roturas de orden, duplicados— en vez de usar el sistema previo como
  juez.
- **Bitácora de ingeniería** con el diagnóstico, los cambios y las hipótesis
  descartadas, para no repetirlas.
- Marcado explícito de los resultados de baja confianza en lugar de descartarlos
  en silencio, y caché con clave por hash de entrada más versión de esquema,
  documentando su limitación: la clave detecta cambios en los datos, no en el
  código.

**Resultado** · En uso en el flujo de trabajo del cliente. De mi propia bitácora,
sobre un conjunto de piezas reales de complejidad muy dispar —más de un orden de
magnitud entre la menor y la mayor—:

- **Cero elementos sin identificar, cero duplicados y cero solapes** en todas las
  piezas evaluadas. El algoritmo anterior dejaba sin identificar una fracción
  significativa y generaba duplicados en las piezas grandes.
- Tiempo de etiquetado: **reducción de un orden de magnitud**. Preparación de
  datos para análisis, mediante caché: **de minutos a fracciones de segundo**.
- La coincidencia con el algoritmo anterior no es total, y no es una pérdida de
  calidad: el anterior numeraba mal. En las piezas pequeñas mi versión acierta
  siempre.
- Buena parte del trabajo fue detectar **supuestos implícitos en los datos de
  entrada que nadie había documentado** —un identificador que parecía una
  coordenada y no lo era—. Corregir esa interpretación produjo la mayor mejora
  individual del proyecto.
- Las cifras absolutas de tiempo y volumen están sujetas a confidencialidad.
