---
title: De la consulta al informe clínico
summary: "De la grabación de una consulta a información clínica estructurada, campo a campo, lista para entrar en el sistema del cliente."
sector: Salud
period: "2025–2026"
status: En producción
tech: [Python, asyncio, FastAPI, LLMs, SNOMED CT, CIE-10]
skills:
  - slug: pipelines-llm-produccion
    contribution: "El servicio de IA entero: diez extractores independientes, uno por campo clínico, en lugar de una sola llamada al modelo."
  - slug: clasificacion-vocabularios-controlados
    contribution: "La codificación contra SNOMED CT y CIE-10 aplicada campo a campo, validada contra catálogo maestro."
  - slug: puesta-en-produccion-modelos
    contribution: "El servicio en Python que expone la IA, con autenticación, caché de credenciales y control de coste."
---

## Qué hice

- **El servicio de IA en Python**: el flujo completo de prompts y llamadas al
  modelo para las dos líneas asistenciales del producto.
- Los **extractores por campo** —diez campos clínicos, cada uno con sus reglas—,
  el cargador de prompts, el cliente de modelo y la división del código en fases.
- La **codificación** contra SNOMED CT y CIE-10 integrada dentro de los
  extractores, más el control de duplicados.

Lo leen profesionales sanitarios y entra campo a campo en el sistema del cliente,
así que un dato inventado o duplicado no es un defecto cosmético: es un error que
alguien tiene que detectar a mano.

## Buenas prácticas

- **Un extractor por campo** en lugar de una llamada monolítica: cada campo
  evoluciona sin tocar los demás.
- **Prompts fuera del código**, en un fichero de datos con su cargador. Se
  revisan y versionan sin desplegar.
- **Validación contra catálogo maestro**: no se emite un concepto que no exista.
- **Deduplicación explícita** en los campos donde repetir es un error clínico.
- **Contabilidad de tokens y coste** por ejecución, para saber qué cuesta cada
  llamada antes de que lo diga la factura.
- **Caché del token de autenticación** con renovación anticipada, resuelta fuera
  del bucle de eventos para no bloquearlo.

## Resultado

En producción, con profesionales sanitarios usándolo en consulta real, con
despliegue continuo y trabajo activo sobre versiones nuevas de modelo. Su
comportamiento se mide con el banco de pruebas que construí aparte.
