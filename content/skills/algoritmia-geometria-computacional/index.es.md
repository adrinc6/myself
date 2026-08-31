---
title: Algoritmia y geometría computacional
summary: "Algoritmos a medida para geometría 2D robusta y detección de estructura en formas irregulares, con criterio para medir si el nuevo mejora al anterior."
category: Ingeniería y algoritmia
tech: [Python, numpy, scipy, shapely, Voronoi, NURBS]
featured: true
---

## Qué sé hacer

- Escribir el algoritmo a medida cuando la librería estándar no llega: geometría
  2D robusta, detección de estructura en formas irregulares, propagación sobre
  grafos de vecindad.
- **Diagramas de Voronoi sobre segmentos** con `scipy.spatial` y `shapely`, no
  solo sobre puntos.
- Detección de curvatura con **suavizado gaussiano y valles por prominencia**.
- Operaciones booleanas 2D robustas, indexado espacial, **PCA**, homografías y
  curvas **B-spline / NURBS** para bordes curvos.

Antes de escribir el algoritmo elijo **la representación del problema**, que
suele ser la mitad de la solución. La otra mitad es medir.

## Buenas prácticas

- **Atacar la representación, no los parámetros.** Cuando el resultado depende
  del muestreo, el problema casi nunca está en el ajuste fino: está en cómo se
  ha modelado.
- **Preservar la procedencia** de cada primitiva geométrica, para que el
  resultado sea inequívoco por construcción en vez de corregirse a posteriori.
- **Errores acotados en vez de propagados**: que cada elemento derive su
  identidad de invariantes locales verificables, no de una cadena de
  dependencias donde un fallo temprano lo arrastra todo.
- **Marcar lo dudoso** en lugar de descartarlo en silencio.
- **Caché con clave por hash de entrada y versión de esquema**, documentando su
  límite: detecta cambios en los datos, no en el código.

## Cuándo lo uso

- Cuando el resultado depende de un parámetro de muestreo que nadie sabe
  justificar, la representación es el problema.
- **Voronoi sobre segmentos y no sobre puntos** cuando la entrada son contornos:
  discretizar en puntos mete artefactos que luego hay que limpiar.
- Cuando hay que comparar contra un algoritmo previo, **primero compruebo si el
  previo acierta**. Si no, parecerse a él es el objetivo equivocado.

![Error que se propaga frente a error acotado](./assets/relativo-vs-absoluto.svg)
