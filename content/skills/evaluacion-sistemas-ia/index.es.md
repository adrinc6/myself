---
title: Evaluación de sistemas de IA
summary: "Medir si un sistema de IA funciona y cuánto cuesta que funcione: acierto por campo, latencia, tokens y caché en la misma vista."
category: Datos e IA
tech: [Python, asyncio, CSV, HTML]
featured: true
---

## Qué sé hacer

- Montar un **conjunto de casos de referencia versionado**, con su salida
  esperada, para que la evaluación sea reproducible.
- Puntuar **por campo** y no solo en global: un promedio alto esconde el campo
  que falla siempre, que es justo el que hay que arreglar.
- Poner **coste y latencia en la misma tabla que la calidad**, por fase y por
  campo.
- Comparar versiones sin repetir el experimento, archivando resultados.
- Construir el **cuadro de mando** sin dependencias externas.

Es la diferencia entre usar un modelo y **poder responder por él**. Cuando
alguien pregunta "¿esto va mejor que lo de antes?", tengo con qué contestar en
vez de una impresión.

## Buenas prácticas

- **Dataset versionado junto al código**, para que no dependa de una máquina.
- **Modo atómico**: cada componente medido aislado, además del flujo completo,
  para localizar dónde se pierde el acierto.
- **Resultados inmutables por versión**: comparar dos versiones es leer dos
  carpetas.
- **Export de discrepancias** a CSV — el listado de lo que falló, no solo el
  número que lo resume.
- **Aprovechamiento de caché medido, no supuesto**: es la palanca más barata
  sobre el coste por llamada.
- **Bitácora con las hipótesis descartadas**, para que nadie las repita.
- Informe con pocos números arriba para mirar rápido y el detalle debajo para
  investigar.

## Cuándo lo uso

- Antes de cambiar un prompt o subir de versión de modelo. Sin línea base, "va
  mejor" es una opinión.
- Cuando una mejora de acierto **sale cara**: verlo antes de desplegar, no en la
  factura del mes siguiente.
- Cuando el sistema de referencia contra el que comparas **se equivoca**,
  parecerse a él deja de ser el objetivo. Ahí cambio la métrica a consistencia
  interna y lo documento.

![Ciclo de evaluación](./assets/ciclo-evaluacion.svg)
