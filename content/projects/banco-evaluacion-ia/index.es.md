---
title: Banco de pruebas para IA
summary: "Infraestructura que responde si un cambio de prompt o de modelo mejora el sistema o lo empeora, y cuánto cuesta la mejora."
sector: Salud
period: "2026"
status: En producción
tech: [Python, asyncio, CSV, HTML]
skills:
  - slug: evaluacion-sistemas-ia
    contribution: "Construido entero, de cero, incluida la metodología: acierto por campo, coste y latencia en la misma tabla."
---

## Qué hice

Había un pipeline de extracción con modelo de lenguaje en producción y **ninguna
forma sistemática de saber si un cambio lo mejoraba o lo empeoraba**. Lo
construí entero, de cero, entre junio y julio de 2026, incluida la metodología
de evaluación además de la implementación.

- **Casos de referencia versionados** en el repositorio, con su salida esperada,
  para que la evaluación sea reproducible y no dependa de una máquina concreta.
- **Puntuación por campo** además de global, desglosada por línea asistencial.
- **Modo atómico**: cada componente se mide aislado, además del flujo completo,
  para localizar en qué punto se pierde el acierto.
- **Cuadro de mando en HTML** propio, sin dependencias externas.

## Buenas prácticas

- **Coste y latencia en la misma tabla que la calidad** —tiempo medio, tokens de
  entrada y salida, aprovechamiento de caché—, por fase y por campo. Permite ver
  que una mejora de acierto sale cara **antes** de desplegarla.
- **Resultados archivados por versión**, de modo que comparar dos versiones es
  leer dos carpetas, no repetir el experimento.
- **Export de discrepancias** a CSV: el listado de lo que falló para poder
  investigarlo, no solo el número que lo resume.
- Separación entre generación, ejecución, evaluación y exportación.
- Informe diseñado a propósito: pocos números arriba para mirar rápido, el
  detalle debajo para investigar.

## Resultado

Se usó para decidir sobre cambios del sistema en producción: cuatro versiones
comparadas sobre un conjunto de casos de referencia, con la puntuación
desglosada por campo clínico y por línea asistencial.

Es la pieza más claramente mía de todo el portfolio: ningún otro autor ha tocado
esa carpeta en el historial.
