---
title: Puesta en producción de modelos
summary: "Convertir un modelo que funciona en local en un servicio usable: API, interfaz, runtime de inferencia separado del entorno de entrenamiento."
category: Datos e IA
tech: [Python, FastAPI, ONNX Runtime, JavaScript]
level: 3 proyectos · 2025–2026
---

## Qué resuelve

Un modelo que funciona en un cuaderno no es un producto. Lo convierto en algo que
otra persona puede usar: un servicio con su API, su interfaz y un tiempo de
respuesta razonable, con el entorno de entrenamiento fuera de producción y el
modelo servido en un formato de intercambio en lugar de arrastrar el marco de
entrenamiento entero. La capa de visualización forma parte del encargo: el
resultado tiene que ser interpretable por quien lo va a mirar.

En el proyecto donde esta habilidad aplica con más claridad, **el modelo lo
entrenó un compañero**. Mi trabajo fue ponerlo en servicio.

## Herramientas y técnicas

- Servicio de inferencia con API HTTP.
- Ejecución de modelos en formato de intercambio, con el entorno de entrenamiento
  fuera de producción.
- Separación entre dependencias de entrenamiento y de despliegue.
- Frontend de visualización de resultados.
- Curación del conjunto de entradas: separar lo procesable de lo que no lo es.
- Python, FastAPI, ONNX Runtime, JavaScript.

![Del modelo entrenado al servicio](./assets/modelo-a-servicio.svg)

## Proyectos

### Análisis de perfiles por visión artificial · sector aeronáutico · 2026

Un pipeline de visión que se ejecutaba a mano en local, convertido en un servicio
con interfaz. El modelo no es mío; la puesta en servicio, sí.

**Contexto** · Existía un modelo de visión entrenado que identificaba las partes
de una sección estructural a partir de su geometría, y un pipeline que
reconstruía y medía esa sección. Todo funcionaba en local, ejecutado a mano.

**Mi aportación** · La **puesta en servicio**: el servicio de inferencia con API,
para poder pedir un análisis en vez de ejecutar un script; el **frontend de
visualización** —subida del fichero de entrada, selección del perfil a analizar,
miniaturas de las secciones, explicación de los parámetros y tabla de
resultados—; la corrección del **cálculo de espesores** y su presentación,
incluido el detalle de las variaciones; y la **curación del conjunto de
entradas**, separando los ficheros procesables de los que no lo eran.

*Delimitación*: **no entrené ningún modelo**, y ahí está la mayor parte del valor
del proyecto. Los modelos de visión, la generación del conjunto de datos y la
exportación al formato de intercambio son trabajo de un compañero, autor
principal del repositorio: 18 de 22 commits frente a mis 4. El pipeline de
reconstrucción geométrica tampoco es mío.

**Cómo lo abordé** · El servicio carga el modelo en un runtime de inferencia
independiente del marco con el que se entrenó, lo que evita llevar el entorno de
entrenamiento a producción. Las dependencias de despliegue se declararon aparte y
en versión de CPU, en lugar de reutilizar las de entrenamiento con aceleración
por GPU. El modelo se carga una sola vez y se reutiliza entre peticiones, y la
interfaz explica los parámetros en lugar de mostrar solo números.

**Resultado** · Se preparó para revisión del cliente y se atendieron peticiones
de cambio concretas sobre la muestra. 4 commits de 22; sin cifras de rendimiento
del servicio autorizadas.

---

### Servicios de IA en producción · sector salud · 2025–2026

Aquí lo que se pone en producción no es un modelo propio, sino un flujo que
consume modelos de un proveedor externo.

**Contexto** · Los dos productos clínicos donde trabajo el pipeline de extracción
exponen su funcionalidad de IA como servicios Python desplegados.

**Mi aportación** · El servicio de IA de uno de ellos es mayoritariamente mío
(detalle en
[Pipelines con LLM en producción](/myself/skills/pipelines-llm-produccion)), con
su autenticación, su caché de credenciales, su control de coste y su
instrumentación.

*Delimitación*: el despliegue, la infraestructura y la integración continua las
llevan compañeros. Mi terreno es el servicio, no la plataforma que lo aloja.

**Resultado** · Ambos en producción.

## Límites

- **No he entrenado modelos de aprendizaje profundo en un proyecto real.** Sé
  leer lo que hizo quien los entrenó, integrarlos y servirlos, pero el diseño de
  la arquitectura, la preparación del conjunto de entrenamiento y el ajuste de
  hiperparámetros no forman parte de mi experiencia demostrable.
- Tampoco he montado infraestructura de despliegue ni integración continua: he
  trabajado dentro de plataformas que mantenían otros.
- El repositorio de visión artificial no tiene tests ni integración continua, y
  arrastra una copia divergente del código de análisis —dos versiones del mismo
  módulo en paralelo—. No la introduje yo, pero tampoco la resolví.
