---
title: Pipelines con LLM en producción
summary: "Flujos que convierten lenguaje natural en datos estructurados fiables, y que siguen funcionando cuando equivocarse tiene consecuencias."
category: Datos e IA
tech: [Python, asyncio, FastAPI, LLMs, transcripción de voz]
featured: true
---

## Qué sé hacer

- Descomponer un problema grande en **fases y campos independientes**, en vez de
  una sola llamada al modelo que lo hace todo.
- **Versionar los prompts fuera del código**, para revisarlos sin desplegar.
- Forzar **salida JSON estable** y validarla antes de darla por buena.
- **Controlar el coste** por llamada, con la cuenta de tokens a la vista.
- Orquestar llamadas asíncronas con `asyncio`, paralelizando por campo.

Lo que más me diferencia no es conseguir que un modelo responda: es conseguir
que **no invente**, que no duplique y que, cuando no tenga evidencia suficiente,
lo diga en vez de rellenar el hueco.

## Buenas prácticas

- **Un extractor por campo**, con sus propias reglas, para que cada uno
  evolucione sin tocar los demás.
- **Prompts en fichero de datos** con su cargador, versionables aparte del
  código.
- **Validación contra catálogos maestros**: no se emite un concepto que no
  exista.
- **Deduplicación explícita** donde repetir un dato es un error de dominio.
- **Instrumentación de tokens y tiempos**, activable por variable de entorno.
- **Ordenación de la cola** poniendo primero las tareas más pesadas, para que el
  tiempo total no dependa de la última en llegar.
- **Caché del token de autenticación** con renovación anticipada, fuera del
  bucle de eventos para no bloquearlo.
- **La parte estable del prompt delante**, para que se pueda cachear y el coste
  por llamada baje sin tocar la calidad.

## Cuándo lo uso

- Cuando la entrada es lenguaje natural y la salida tiene que **entrar en otro
  sistema**: ahí la validación de esquema deja de ser opcional.
- **Una llamada por campo, no una para todo**, en cuanto los campos tienen
  reglas distintas o alguien va a querer cambiar uno sin tocar el resto.
- Cuando el coste importa, la agrupación de peticiones y el aprovechamiento de
  caché pesan más que el modelo que se elija.

![Arquitectura por fases y campos](./assets/pipeline-fases-campos.svg)
