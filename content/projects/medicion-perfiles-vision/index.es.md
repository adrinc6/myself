---
title: Medición de perfiles por visión artificial
summary: "Un modelo de segmentación que funcionaba en local, convertido en un servicio con API e interfaz que cualquiera puede usar."
sector: Aeronáutico
period: "2026"
status: Revisión de cliente
tech: [Python, FastAPI, ONNX Runtime, JavaScript]
skills:
  - slug: puesta-en-produccion-modelos
    contribution: "La puesta en servicio: API de inferencia, frontend de visualización y separación entre el entorno de entrenamiento y el de despliegue."
---

## Qué hice

Existía un modelo de segmentación entrenado y un pipeline que reconstruía y
medía la sección de un perfil. Todo funcionaba en local, ejecutado a mano. **Mi
trabajo fue la puesta en servicio**:

- El **servicio de inferencia con API**, para poder pedir un análisis en vez de
  ejecutar un script.
- El **frontend de visualización**: subida del fichero, selección del perfil,
  miniaturas de las secciones, explicación de los parámetros y tabla de
  resultados.
- La corrección del **cálculo de espesores** y su presentación, incluido el
  detalle de las variaciones.
- La **curación del conjunto de entradas**, separando los ficheros procesables
  de los que no lo eran.

**El modelo lo entrenó un compañero**, que es el autor principal del
repositorio: la arquitectura, el entrenamiento, la generación del conjunto de
datos y la exportación son suyos, igual que el pipeline de reconstrucción
geométrica. Mi aportación es la capa que lo convierte en algo usable.

## Buenas prácticas

- **Runtime de inferencia independiente** del marco de entrenamiento: el modelo
  se sirve en formato de intercambio (ONNX), lo que evita llevar el entorno de
  entrenamiento entero a producción.
- **Dependencias de despliegue declaradas aparte** y en versión de CPU, en lugar
  de reutilizar las de entrenamiento con aceleración por GPU.
- **Carga del modelo una sola vez**, reutilizada entre peticiones.
- Interfaz que **explica los parámetros** en vez de mostrar solo números.

## Resultado

Se preparó para revisión del cliente y se atendieron peticiones de cambio
concretas sobre la muestra. Pasó de ser un script que ejecutaba su autor a una
herramienta que otra persona puede usar sin conocer el modelo por dentro.
