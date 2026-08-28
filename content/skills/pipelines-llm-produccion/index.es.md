---
title: Diseño y operación de pipelines con LLM en producción
summary: "Flujos que convierten lenguaje natural en datos estructurados fiables, con prompts versionados, validación de salida y control de coste por llamada."
category: Datos e IA
tech: [Python, asyncio, FastAPI, LLMs, ASR]
level: 3 proyectos · 2023–2026
featured: true
---

## Qué sé hacer

Construyo flujos que pasan de una entrada en lenguaje natural a datos
estructurados fiables, y los mantengo funcionando en un dominio donde
equivocarse tiene consecuencias. Sé descomponer un problema grande en fases y
campos independientes, versionar los prompts fuera del código, validar la salida
antes de darla por buena y controlar lo que cuesta cada llamada.

La parte que más me diferencia no es hacer que un modelo responda: es hacer que
**no invente**, que no duplique, y que cuando no tenga evidencia suficiente lo
diga en vez de rellenar el hueco.

## Herramientas y técnicas

- Orquestación asíncrona de llamadas a modelos (`asyncio`), con paralelización
  por campo.
- Prompts versionados en fichero de datos, cargados por un módulo dedicado.
- Salida forzada a JSON estable y validación de esquema.
- Deduplicación y verificación contra catálogos maestros antes de emitir.
- Contabilidad de tokens y coste por ejecución.
- Autenticación con caché de token no bloqueante contra proveedor cloud.
- Transcripción de audio en streaming con detección de actividad de voz.
- Python, FastAPI.

![Arquitectura por fases y campos](./assets/pipeline-fases-campos.svg)

## Dónde lo he hecho

### Producto asistencial en producción · sector salud · 2025–2026

Es mi aportación principal en esta habilidad.

**Contexto** · A partir de la grabación de una consulta hay que producir
información clínica estructurada, campo a campo, lista para integrarse en el
sistema del cliente.

**Qué hice yo** · **Prácticamente todo el servicio de IA en Python**: el flujo
completo de prompts y llamadas al modelo para las distintas líneas asistenciales
del producto. Respaldado por el historial: soy el segundo autor del repositorio (de
seis personas) y el primero con diferencia en la carpeta del servicio Python. Los
extractores por campo, el cargador de prompts, el cliente de modelo y la división
del código en fases son míos.

*Delimitación*: la capa web, la infraestructura, el despliegue y la base de datos
son mayoritariamente de compañeros. Esta habilidad se ciñe al servicio de IA.

**Cómo lo implementé**

- **Descomposición del flujo en fases explícitas** y **un extractor
  independiente por campo clínico** en lugar de una única llamada monolítica.
  Cada campo tiene sus reglas y puede evolucionar sin tocar los demás.
- **Prompts fuera del código**, en un fichero de datos con su cargador. Se pueden
  revisar y versionar sin desplegar código.
- **Agrupación de peticiones por campo** para reducir el número de llamadas.
- **Planificación de la cola de peticiones** para que el tiempo total no lo
  marque la tarea más lenta.
- **Caché de token de autenticación** con renovación anticipada, resuelto fuera
  del bucle de eventos para no bloquearlo.

**Buenas prácticas aplicadas**

- Validación contra catálogos maestros: no se emite un concepto que no exista.
- Control explícito de duplicados en los campos donde repetir es un error
  clínico.
- Instrumentación de tokens y tiempos, con variables de entorno para activar el
  detalle.
- Salida JSON estable en vez de texto libre parseado a posteriori.

**Lo que faltó** · El repositorio no tiene un ejecutor de tests unificado ni
linter configurado. La validación oficial es comprobación de sintaxis. Lo suplí
construyendo un banco de evaluación propio (habilidad aparte), pero no sustituye
a tests unitarios.

**Cifras** · El pipeline se mide con ese banco, comparando versiones entre sí
sobre un conjunto de casos de referencia. Las cifras de acierto no son
publicables.

**En uso real** · Sí, en producción con profesionales sanitarios, con despliegue
continuo y trabajo activo sobre versiones nuevas de modelo.

---

### I+D de NLP biomédico · sector salud · 2023–2024

**Contexto** · La investigación previa donde se probó el enfoque que luego llegó
a producto.

**Qué hice yo** · **Diseñé e implementé el pipeline entero**: transcripción,
estructuración de la conversación con modelo de lenguaje, extracción de campos y
codificación. Segundo autor de cinco.

*Delimitación*: el subproyecto de terminología avanzada era de compañeros.

**Cómo lo implementé** · Reestructuré el proyecto entero en módulos por
responsabilidad y **paralelicé el proceso**, que hasta entonces era secuencial.

**Buenas prácticas aplicadas** · Separación de responsabilidades en módulos;
parametrización de umbrales en lugar de constantes repartidas.

**Lo que faltó** · Sin tests, sin CI, dependencias mal declaradas. Era código de
investigación y se nota.

**En uso real** · No como repositorio; el enfoque sí pasó a producto.

---

### Suite clínica modular · sector salud · 2025–2026

**Contexto** · El mismo tipo de flujo clínico dentro de una plataforma
multiproducto.

**Qué hice yo** · La **reorganización del módulo clínico** separando procesos de
utilidades comunes, con limpieza y simplificación del código y aplicación de
buenas prácticas de LLM y prompts. También documenté las funciones del módulo.
Cuarto autor de cinco: mi aportación aquí es acotada.

*Delimitación*: los subsistemas de orquestación de agentes, búsqueda vectorial y
transcripción son de compañeros.

**Buenas prácticas aplicadas** · Separación procesos/comunes; extracción de la
política de decisión a configuración validada; documentación de funciones.

**En uso real** · Sí, producto desplegado.
