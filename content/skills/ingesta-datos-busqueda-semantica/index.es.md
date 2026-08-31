---
title: Ingesta de datos y buscadores
summary: "Traer datos de catálogos oficiales, bases de datos o portales sin API, normalizarlos y dejarlos consultables por texto o por significado."
category: Datos e IA
tech: [Python, pandas, numpy, Elasticsearch, PostgreSQL, Selenium]
---

## Qué sé hacer

- Traer datos de donde estén —un catálogo oficial, una base de datos, un portal
  web sin API—, normalizarlos y dejarlos consultables.
- Montar la ingesta para que sea **reanudable**: si falla a mitad, continúa donde
  iba en vez de empezar de cero, y no recalcula lo que ya tiene.
- **Embeddings en memoria mapeada** (`memmap` de numpy) cuando el catálogo no
  cabe cómodamente en RAM.
- Ajustar la **puntuación de Elasticsearch** y montar índices separados por
  idioma.
- Automatizar el navegador con **Selenium** para fuentes que no ofrecen otra vía.

## Buenas prácticas

- **Idempotencia**: relanzar la ingesta no duplica ni recalcula.
- **Reanudación por lotes**: antes de calcular, cargar lo ya calculado y pedir
  solo lo que falta. Recalcular un catálogo entero cuesta tiempo y dinero.
- **Reintentos** en las llamadas a servicios externos, y carga masiva en vez de
  petición a petición.
- **Un índice por idioma**, seleccionado en tiempo de consulta, en vez de uno
  mezclado.
- **Colapsar resultados en el propio motor** en lugar de en Python: mover el
  trabajo a donde ya están los datos.
- **Normalización de texto** para que las variantes de escritura no generen
  entradas distintas.
- **Exportación e importación de índices** entre entornos, para no repetir la
  ingesta completa en cada uno.

## Cuándo lo uso

- **Búsqueda léxica bien puntuada** cuando los términos son exactos: acierta más
  y sale mucho más barata que los embeddings.
- **Búsqueda por significado** cuando la consulta no se parece al catálogo, que
  es cuando el coste extra se justifica.
- **Memoria mapeada** en cuanto el catálogo deja de caber cómodamente: se accede
  por índice sin cargarlo entero.

![Flujo de ingesta y consulta](./assets/ingesta-y-consulta.svg)
