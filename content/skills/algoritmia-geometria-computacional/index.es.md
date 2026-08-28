---
title: Algoritmia y geometría computacional
summary: "Algoritmos a medida para geometría 2D robusta y detección de estructura en formas irregulares, con criterio para medir si el nuevo mejora al anterior."
category: Ingeniería y algoritmia
tech: [Python, numpy, scipy, shapely, Voronoi, NURBS]
level: 1 proyecto · 2026
featured: true
---

## Qué sé hacer

Escribo algoritmos a medida cuando la librería estándar no llega: geometría 2D
robusta, detección de estructura en formas irregulares, propagación sobre grafos
de vecindad. Sé elegir la representación correcta del problema —que suele ser la
mitad de la solución— y sé medir si el algoritmo nuevo es mejor que el anterior
en vez de suponerlo.

También sé cuestionar la referencia: si el sistema con el que comparas se
equivoca, parecerse a él no es el objetivo.

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

## Dónde lo he hecho

### Librería de análisis geométrico · sector aeronáutico · 2026

Es el proyecto donde soy prácticamente el único autor: **27 de 29 commits**. El
resto son de un asistente automático.

**Contexto** · A partir de la definición geométrica de una pieza estructural hay
que derivar automáticamente su descomposición interna en elementos estructurales
y dejarla lista para fabricación.

**Qué hice yo** · Partí de una **versión de referencia heredada** y (a)
**reescribí el motor de topología** y (b) **construí desde cero el módulo de
etiquetado**.

*Delimitación*: la arquitectura general del paquete, su API pública y la suite de
pruebas venían dadas en esa versión de referencia. Lo mío es el motor y el
etiquetado, no el diseño original de la librería.

**El motor de topología** · El enfoque heredado partía de una representación
discreta del problema que introducía artefactos geométricos y hacía que el
resultado dependiera de parámetros de muestreo. Diagnostiqué que **la causa raíz
estaba en la representación, no en el ajuste de parámetros** —que es donde se
había buscado hasta entonces—.

Lo sustituí por una representación que preserva la trazabilidad del origen de
cada primitiva geométrica, de modo que el resultado deja de ser ambiguo **por
construcción** en lugar de corregirse a posteriori. Añadí además un preprocesado
del contorno para eliminar geometría que de otro modo generaría resultados a
descartar, y un escalado del espacio por estabilidad numérica.

**El etiquetado** · El algoritmo original propagaba de forma **relativa**:
funcionaba en piezas pequeñas y se desmoronaba en las grandes, porque un error
temprano se arrastraba por todo el resultado y las zonas no alcanzables desde el
punto de partida se quedaban sin identificar.

Lo rediseñé para que cada elemento derive su identidad de invariantes locales
verificables en lugar de una cadena de dependencias. Así **los errores quedan
acotados en vez de propagarse**.

**Buenas prácticas aplicadas**

- **Bitácora de ingeniería** con el diagnóstico, los cambios y —deliberadamente—
  las **hipótesis descartadas**, para no repetirlas.
- **Cuestionar la métrica**: la comparación obvia era parecerse al algoritmo
  anterior, pero al medirlo resultó que el anterior producía identificadores
  duplicados y saltos de fila. Cambié el criterio a **consistencia interna**
  —huecos, roturas de orden, duplicados— en vez de usar el sistema previo como
  juez.
- Marcado explícito de los resultados de baja confianza en lugar de descartarlos
  en silencio.
- Caché con clave por hash de entrada más versión de esquema, **documentando su
  limitación**: la clave no detecta cambios en el código, solo en los datos.

**Resultados** · De mi propia bitácora, sobre un conjunto de piezas reales de
complejidad muy dispar —más de un orden de magnitud entre la menor y la mayor—:

- **Cero elementos sin identificar, cero duplicados y cero solapes** en todas las
  piezas evaluadas. El algoritmo anterior dejaba sin identificar una fracción
  significativa y generaba duplicados en las piezas de mayor tamaño.
- Tiempo de etiquetado: **reducción de un orden de magnitud**.
- Preparación de datos para análisis, mediante caché: **de minutos a fracciones
  de segundo**.
- **Matiz importante y deliberado**: la coincidencia con el algoritmo anterior no
  es total, y eso **no es una pérdida de calidad**: es que el anterior numeraba
  mal. En las piezas pequeñas mi versión acierta siempre y era el anterior el que
  fallaba.
- Buena parte del trabajo fue detectar **supuestos implícitos en los datos de
  entrada que nadie había documentado**: un identificador que parecía una
  coordenada y no lo era. Corregir esa interpretación produjo la mayor mejora
  individual del proyecto.
- Las cifras absolutas de tiempo y volumen son del cliente y no se publican.

**Lo que faltó** · La versión de referencia traía una suite de pruebas amplia y
el desarrollo la redujo drásticamente. Perder esa cobertura es la deuda técnica
más seria del proyecto y es mía. Hay además duplicación de módulos por un
refactor a medio terminar.

**En uso real** · Sí, en el flujo de trabajo del cliente.
