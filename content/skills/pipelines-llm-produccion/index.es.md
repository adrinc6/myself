---
title: Diseño y operación de pipelines con LLM en producción
summary: "Flujos que convierten lenguaje natural en datos estructurados fiables, con prompts versionados, validación de salida y control de coste por llamada."
category: Datos e IA
tech: [Python, asyncio, FastAPI, LLMs, ASR]
level: 3 proyectos · 2023–2026
featured: true
---

## Qué resuelve

Un pipeline con LLM en producción rara vez falla por no saber llamar al modelo.
Falla cuando inventa, cuando duplica y cuando nadie sabe qué cuesta cada
ejecución. Diseño flujos que convierten una entrada en lenguaje natural en datos
estructurados fiables y los mantengo funcionando en un dominio donde equivocarse
tiene consecuencias.

El trabajo está en descomponer un problema grande en fases y campos
independientes, versionar los prompts fuera del código, validar la salida antes
de darla por buena y controlar el gasto por llamada. La parte difícil no es que
el modelo responda: es que **no invente**, que no duplique y que, cuando la
evidencia no dé, lo diga en vez de rellenar el hueco.

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

## Proyectos

### Producto asistencial en producción · sector salud · 2025–2026

Mi aportación principal en esta habilidad: el servicio de IA que convierte la
grabación de una consulta en información clínica estructurada.

**Contexto** · El resultado entra campo a campo en el sistema del cliente y lo
leen profesionales sanitarios, así que un dato inventado o duplicado no es un
defecto cosmético: es un error que alguien tiene que detectar a mano.

**Mi aportación** · **El servicio de IA en Python**: el flujo completo de
prompts y llamadas al modelo para las distintas líneas asistenciales del
producto. Los extractores por campo, el cargador de prompts, el cliente de
modelo y la división del código en fases son míos.

**Cómo lo abordé**

- **Descomposición del flujo en fases explícitas** y **un extractor
  independiente por campo clínico** en lugar de una única llamada monolítica.
  Cada campo tiene sus reglas y puede evolucionar sin tocar los demás.
- **Prompts fuera del código**, en un fichero de datos con su cargador: se
  revisan y se versionan sin desplegar código.
- **Agrupación de peticiones por campo** para reducir el número de llamadas, y
  **planificación de la cola** para que el tiempo total no lo marque la tarea más
  lenta.
- **Caché de token de autenticación** con renovación anticipada, resuelta fuera
  del bucle de eventos para no bloquearlo.
- Validación contra catálogos maestros: no se emite un concepto que no exista.
- Control explícito de duplicados en los campos donde repetir es un error
  clínico.
- Salida JSON estable en vez de texto libre parseado a posteriori, e
  instrumentación de tokens y tiempos activable por variable de entorno.

**Resultado** · En producción con profesionales sanitarios, con despliegue
continuo y trabajo activo sobre versiones nuevas de modelo. El pipeline se mide
con un banco de evaluación propio que compara versiones sobre un conjunto de
casos de referencia; las cifras concretas están sujetas a confidencialidad.

---

### I+D de NLP biomédico · sector salud · 2023–2024

La investigación previa donde se probó el enfoque que después llegó a producto.

**Contexto** · Había que validar, sobre conversación asistencial real, que un
flujo de transcripción y extracción con modelo de lenguaje daba resultados
aprovechables.

**Mi aportación** · **Diseñé e implementé el pipeline entero**: transcripción,
estructuración de la conversación con modelo de lenguaje, extracción de campos y
codificación.

**Cómo lo abordé** · Reestructuré el proyecto en módulos por responsabilidad y
**paralelicé el proceso**, que hasta entonces era secuencial. Los umbrales
pasaron a ser parámetros en lugar de constantes repartidas por el código.

**Resultado** · El enfoque validado aquí pasó después al producto.

---

### Suite clínica modular · sector salud · 2025–2026

El mismo tipo de flujo clínico dentro de una plataforma multiproducto con
varios módulos clínicos.

**Contexto** · Un módulo clínico que había crecido mezclando procesos y
utilidades comunes, dentro de una plataforma con varios productos.

**Mi aportación** · La **reorganización del módulo clínico**, separando procesos
de utilidades comunes, con limpieza del código y aplicación de buenas prácticas
de LLM y prompts. También documenté las funciones del módulo.

**Cómo lo abordé** · Separación entre procesos y utilidades comunes; extracción
de la política de decisión a configuración validada; documentación de las
funciones del módulo.

**Resultado** · Producto desplegado y en uso.
