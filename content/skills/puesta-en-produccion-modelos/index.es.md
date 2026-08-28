---
title: Puesta en producción de modelos
summary: "Convertir un modelo que funciona en local en un servicio usable: API, interfaz, runtime de inferencia separado del entorno de entrenamiento."
category: Datos e IA
tech: [Python, FastAPI, ONNX Runtime, JavaScript]
level: 3 proyectos · 2025–2026
---

## Qué sé hacer

Cojo un modelo que ya funciona en un cuaderno y lo convierto en algo que otra
persona puede usar: un servicio con su API, su interfaz, y un tiempo de respuesta
razonable. Sé separar el entorno de entrenamiento del de inferencia, servir el
modelo en un formato de intercambio en lugar de arrastrar el marco de
entrenamiento entero a producción, y montar la capa de visualización para que el
resultado sea interpretable por quien lo va a mirar.

**Aviso importante y deliberado**: en el proyecto donde más claramente aplica
esta habilidad, **el modelo lo entrenó otra persona**. Mi trabajo fue ponerlo en
servicio. Lo digo aquí arriba porque prefiero que quede claro desde el principio
antes que sugerir lo contrario.

## Herramientas y técnicas

- Servicio de inferencia con API HTTP.
- Ejecución de modelos en formato de intercambio, con el entorno de entrenamiento
  fuera de producción.
- Separación entre dependencias de entrenamiento y de despliegue.
- Frontend de visualización de resultados.
- Curación del conjunto de entradas: separar lo procesable de lo que no lo es.
- Python, FastAPI, ONNX Runtime, JavaScript.

![Del modelo entrenado al servicio](./assets/modelo-a-servicio.svg)

## Dónde lo he hecho

### Análisis de perfiles por visión artificial · sector aeronáutico · 2026

**Contexto** · Existía un modelo de visión entrenado que identificaba las
partes de una sección estructural a partir de su geometría, y un pipeline que
reconstruía y medía esa sección. Todo funcionaba en local, ejecutado a mano.

**Qué hice yo** · **La puesta en servicio.** Concretamente:

- El **servicio de inferencia** con API, para poder pedir un análisis en vez de
  ejecutar un script.
- El **frontend de visualización**: subida del fichero de entrada, selección del
  perfil a analizar, miniaturas de las secciones, explicación de los parámetros y
  tabla de resultados.
- La corrección del **cálculo de espesores** y su presentación, incluyendo el
  detalle de las variaciones.
- La **curación del conjunto de entradas**, separando los ficheros procesables de
  los que no lo eran.

**Qué NO hice, y es la mayor parte del valor del proyecto** · **No entrené ningún
modelo.** Los modelos de visión, la generación del conjunto de datos y la
exportación al formato de intercambio son trabajo de un compañero, que es el
autor principal del
repositorio (18 de 22 commits frente a mis 4). Tampoco escribí el pipeline de
reconstrucción geométrica.

**Cómo lo implementé** · El servicio carga el modelo en un runtime de inferencia
independiente del marco con el que se entrenó, lo que evita llevar el entorno de
entrenamiento a producción. Las dependencias de despliegue se declararon aparte y
en versión de CPU, en lugar de reutilizar las de entrenamiento con aceleración
por GPU.

**Buenas prácticas aplicadas** · Separación entre dependencias de entrenamiento y
de despliegue; carga del modelo una sola vez y reutilización entre peticiones;
interfaz que explica los parámetros en lugar de mostrar solo números.

**Lo que faltó** · El repositorio no tiene tests ni integración continua, y
existe una copia divergente del código de análisis —dos versiones del mismo módulo que hay que mantener en paralelo—. No lo
introduje yo, pero tampoco lo resolví.

**Cifras** · 4 commits de 22. Sin cifras de rendimiento del servicio autorizadas.

**En uso real** · Se preparó para revisión del cliente; se atendieron peticiones
de cambio concretas sobre la muestra.

---

### Servicios de IA en producción · sector salud · 2025–2026

**Contexto** · Los dos productos clínicos donde trabajo el pipeline de extracción
exponen su funcionalidad de IA como servicios Python desplegados.

**Qué hice yo** · El servicio de IA de uno de ellos es mayoritariamente mío
(detalle en
[Pipelines con LLM en producción](/myself/skills/pipelines-llm-produccion)). Aquí
la puesta en producción no es de un modelo propio, sino de un flujo que consume
modelos de un proveedor externo, con su autenticación, su caché de credenciales,
su control de coste y su instrumentación.

*Delimitación*: el despliegue, la infraestructura y la integración continua las
llevan compañeros. Mi terreno es el servicio, no la plataforma que lo aloja.

**En uso real** · Sí, ambos en producción.

## Dónde NO llego (y lo digo)

**No he entrenado modelos de aprendizaje profundo en un proyecto real.** Sé leer
lo que hizo quien los entrenó, integrarlos y servirlos, pero el diseño de la
arquitectura, la preparación del conjunto de entrenamiento y el ajuste de
hiperparámetros no forman parte de mi experiencia demostrable. Tampoco he montado
infraestructura de despliegue ni integración continua: he trabajado dentro de
plataformas que mantenían otros.
