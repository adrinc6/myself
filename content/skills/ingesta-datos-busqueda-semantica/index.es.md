---
title: Ingesta de datos y búsqueda semántica
summary: "Traer datos de catálogos oficiales, bases de datos o portales sin API, normalizarlos y dejarlos consultables por texto o por significado."
category: Datos e IA
tech: [Python, pandas, Elasticsearch, PostgreSQL, Selenium]
level: 3 proyectos · 2023–2026
---

## Qué sé hacer

Traigo datos de donde estén —un catálogo oficial, una base de datos, un portal
web sin API—, los normalizo y los dejo consultables, ya sea por texto o por
significado. Sé montar la ingesta para que sea **reanudable**: si falla a mitad,
continúa donde iba en vez de empezar de cero, y no recalcula lo que ya tiene.

También sé cuándo la búsqueda por significado aporta y cuándo una búsqueda léxica
bien puntuada es más barata y funciona igual de bien.

## Herramientas y técnicas

- Ingesta a motor de indexación con carga masiva y reintentos.
- Embeddings persistidos en memoria mapeada (`memmap`), sin cargar todo en RAM.
- Cálculo por lotes con reanudación desde lo ya calculado.
- Índices separados por idioma, seleccionados en consulta.
- Estrategia híbrida: recuperación por significado frente a recuperación por
  título.
- Ajuste de puntuación del motor de búsqueda.
- Exportación e importación de índices entre entornos.
- Normalización de catálogos: unificación de nomenclatura y deduplicación.
- Automatización de navegador para fuentes sin API.
- Python, pandas, numpy, Elasticsearch, PostgreSQL, Selenium.

![Flujo de ingesta y consulta](./assets/ingesta-y-consulta.svg)

## Dónde lo he hecho

### Suite clínica modular · sector salud · 2025–2026

**Contexto** · El producto necesitaba consultar varios catálogos y vocabularios
oficiales —de distintas fuentes, en distintos idiomas y con formatos distintos—
desde un mismo punto y con tiempos de respuesta aceptables.

**Qué hice yo** · La **ingesta completa de esos catálogos al motor de
indexación**, el buscador multiidioma, el ajuste de la puntuación y los procesos
de exportación e importación de índices entre entornos. También la descarga y
normalización de un catálogo oficial regulado. Cuarto autor de un repositorio de
cinco personas; esta parte es la más claramente mía.

*Delimitación*: los subsistemas de búsqueda vectorial, orquestación de agentes y
transcripción son de compañeros.

**Cómo lo implementé**

- **Persistencia de los embeddings en almacenamiento accesible por índice**, en
  lugar de en memoria: el catálogo completo no cabe cómodamente en RAM.
- **Reanudación**: antes de calcular, el proceso carga lo ya calculado y solo
  pide los términos que faltan, por lotes. Recalcular un catálogo entero cuesta
  tiempo y dinero; esto lo evita.
- **Un índice por idioma**, seleccionado en tiempo de consulta según el idioma de
  entrada, en lugar de un índice mezclado.
- **Separación entre recuperación por significado y por título**, porque para
  términos exactos la búsqueda léxica acertaba más y salía más barata.
- **Empujar el trabajo al motor de datos** en lugar de resolverlo en código de
  aplicación, moviéndolo a donde ya estaban los datos.
- **Exportación e importación de índices**, para no repetir la ingesta completa
  en cada entorno.

**Buenas prácticas aplicadas** · Reintentos en las llamadas a servicios externos;
procesamiento por lotes; idempotencia —volver a lanzar la ingesta no duplica ni
recalcula—; normalización de texto para que las variantes de escritura no generen
entradas distintas.

**Cifras** · Búsqueda multiidioma, con los parámetros del proceso configurables.
Sin cifras de volumen ni de latencia autorizadas.

**En uso real** · Sí, producto desplegado.

---

### Extracción de un portal sin API · sector salud · 2023–2025

Proyecto pequeño, pero **enteramente mío**: 7 de 7 commits.

**Contexto** · Había que sacar información de un sistema clínico de terceros que
no ofrecía ninguna vía de integración. La única forma de acceder era la interfaz
web.

**Qué hice yo** · **Todo.** Diseño e implementación del extractor completo.

**Cómo lo implementé** · Automatización de navegador que recorre la interfaz,
navega por las secciones, extrae la información de las tablas y la vuelca a
ficheros tabulares; además descarga los documentos asociados. Cubre varias áreas
funcionales del sistema.

**Cifras** · ~740 líneas. Sin cifras de volumen autorizadas.

**En uso real** · Sí, se usó para extraer datos reales.

**Lo que hice mal, y lo digo** · Es el código más flojo del portfolio. Dos
scripts que se duplican casi por completo en vez de compartir módulo; selectores
dependientes de identificadores autogenerados, que se rompen si cambia la
interfaz; **credenciales escritas en el propio código**; rutas absolutas de mi
máquina; y ninguna gestión de dependencias. Funcionó para lo que hacía falta,
pero no es código que defendería hoy como ejemplo de buen trabajo.

**No es un proyecto de IA** y no lo presento como tal: es extracción y
automatización.

---

### I+D de NLP biomédico · sector salud · 2023–2024

**Qué hice yo** · La preparación de datos y la carga de embeddings del catálogo a
la base de datos, como paso previo del pipeline de codificación que diseñé
(detalle en
[Clasificación contra vocabularios controlados](/myself/skills/clasificacion-vocabularios-controlados)).

**En uso real** · Fue I+D.
