---
title: Ingesta de datos y búsqueda semántica
summary: "Traer datos de catálogos oficiales, bases de datos o portales sin API, normalizarlos y dejarlos consultables por texto o por significado."
category: Datos e IA
tech: [Python, pandas, Elasticsearch, PostgreSQL, Selenium]
level: 3 proyectos · 2023–2026
---

## Qué resuelve

Traigo datos de donde estén —un catálogo oficial, una base de datos, un portal
web sin API—, los normalizo y los dejo consultables, por texto o por significado.
La ingesta se monta **reanudable**: si falla a mitad, continúa donde iba en vez
de empezar de cero, y no recalcula lo que ya tiene.

La búsqueda por significado no siempre gana. Para términos exactos, una búsqueda
léxica bien puntuada acierta más y sale más barata; decidir cuál toca en cada
caso es parte del trabajo, y se decide midiendo.

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

## Proyectos

### Suite clínica modular · sector salud · 2025–2026

Varios catálogos oficiales, en distintos idiomas y formatos, consultables desde
un único punto y con tiempos de respuesta aceptables.

**Contexto** · El producto necesitaba consultar catálogos y vocabularios
oficiales de distintas fuentes, en distintos idiomas y con formatos distintos,
sin que cada consulta pagara el precio de esa dispersión.

**Mi aportación** · La **ingesta completa de esos catálogos al motor de
indexación**, el buscador multiidioma, el ajuste de la puntuación y los procesos
de exportación e importación de índices entre entornos. También la descarga y
normalización de un catálogo oficial regulado. Cuarto autor de un repositorio de
cinco personas; esta parte es la más claramente mía.

*Delimitación*: los subsistemas de búsqueda vectorial, orquestación de agentes y
transcripción son de compañeros.

**Cómo lo abordé**

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
- Reintentos en las llamadas a servicios externos, procesamiento por lotes,
  idempotencia —volver a lanzar la ingesta no duplica ni recalcula— y
  normalización de texto para que las variantes de escritura no generen entradas
  distintas.

**Resultado** · Producto desplegado, con búsqueda multiidioma y los parámetros
del proceso configurables. Sin cifras de volumen ni de latencia autorizadas.

---

### Extracción de un portal sin API · sector salud · 2023–2025

Proyecto pequeño y enteramente mío —7 de 7 commits—, y el código más flojo del
conjunto.

**Contexto** · Había que sacar información de un sistema clínico de terceros que
no ofrecía ninguna vía de integración. La única forma de acceder era la interfaz
web.

**Mi aportación** · **Todo**: diseño e implementación del extractor completo. No
es un proyecto de IA y no lo presento como tal: es extracción y automatización.

**Cómo lo abordé** · Automatización de navegador que recorre la interfaz, navega
por las secciones, extrae la información de las tablas y la vuelca a ficheros
tabulares; además descarga los documentos asociados. Cubre varias áreas
funcionales del sistema.

**Resultado** · Se usó para extraer datos reales. ~740 líneas; sin cifras de
volumen autorizadas.

---

### I+D de NLP biomédico · sector salud · 2023–2024

La preparación de datos y la carga de embeddings que alimentaban el pipeline de
codificación.

**Mi aportación** · La preparación de datos y la carga de embeddings del catálogo
a la base de datos, como paso previo del pipeline de codificación que diseñé
(detalle en
[Clasificación contra vocabularios controlados](/myself/skills/clasificacion-vocabularios-controlados)).

**Resultado** · Fue I+D; el repositorio no se desplegó.

## Límites

- El extractor del portal sin API tiene los defectos que se le suponen a un
  script de 2023: dos ficheros que se duplican casi por completo en vez de
  compartir módulo, selectores atados a identificadores autogenerados que se
  rompen si cambia la interfaz, **credenciales escritas en el propio código**,
  rutas absolutas de mi máquina y ninguna gestión de dependencias. Funcionó para
  lo que hacía falta; hoy no lo escribiría así.
- El proyecto de I+D era código de investigación: sin tests y sin integración
  continua.
