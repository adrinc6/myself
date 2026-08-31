---
title: Buscador clínico multiidioma
summary: "Varios catálogos y vocabularios oficiales, en distintos idiomas y formatos, consultables desde un mismo punto y con tiempos de respuesta aceptables."
sector: Salud
period: "2025–2026"
status: En producción
tech: [Python, Elasticsearch, PostgreSQL, numpy, SNOMED CT, CIAP-3]
skills:
  - slug: ingesta-datos-busqueda-semantica
    contribution: "La ingesta completa de los catálogos, el buscador multiidioma y el ajuste de puntuación del motor."
  - slug: clasificacion-vocabularios-controlados
    contribution: "La política de codificación configurable: qué se codifica y con qué vocabulario, sacado del código a configuración validada."
  - slug: pipelines-llm-produccion
    contribution: "La reorganización del módulo clínico, separando procesos de utilidades comunes y aplicando buenas prácticas de prompts."
  - slug: puesta-en-produccion-modelos
    contribution: "El módulo clínico del servicio desplegado."
---

## Qué hice

- La **ingesta completa** de los catálogos oficiales al motor de indexación, el
  **buscador multiidioma** y el ajuste de la puntuación, además de los procesos
  de exportación e importación de índices entre entornos.
- La descarga y normalización del **catálogo oficial de medicamentos**.
- La **política de codificación configurable**: en vez de dejar repartida por el
  código la decisión de "qué se codifica con qué", la saqué a una estructura
  declarativa de tres niveles —sección del documento, tipo de concepto y
  sistemas de codificación aplicables— con validación que rechaza combinaciones
  imposibles. Un cliente cambia la política sin tocar código.

## Buenas prácticas

- **Embeddings en memoria mapeada** (`memmap`) en lugar de en RAM: el catálogo
  completo no cabe cómodamente y así se accede por índice sin cargarlo entero.
- **Reanudación**: antes de calcular, el proceso carga lo ya calculado y solo
  pide lo que falta, por lotes. Recalcular un catálogo entero cuesta tiempo y
  dinero; esto lo evita.
- **Un índice de Elasticsearch por idioma**, seleccionado en tiempo de consulta,
  en vez de uno mezclado.
- **Colapso de resultados en el propio motor** en vez de en Python, moviendo el
  trabajo a donde ya están los datos.
- **Idempotencia**: relanzar la ingesta no duplica ni recalcula.
- Validación estricta de la configuración con errores explicativos, valores por
  defecto seguros y copia defensiva para que nadie mute la política global por
  accidente.

## Resultado

Producto desplegado, con búsqueda en tres idiomas sobre varios vocabularios
oficiales. La política de codificación es de lo poco del conjunto que tiene un
test automatizado dedicado.
