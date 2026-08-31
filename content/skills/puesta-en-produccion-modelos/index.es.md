---
title: De modelo a servicio
summary: "Convertir un modelo que funciona en local en algo que otra persona puede usar: API, interfaz y un tiempo de respuesta razonable."
category: Datos e IA
tech: [Python, FastAPI, ONNX Runtime, JavaScript]
---

## Qué sé hacer

- Coger un modelo que funciona en un cuaderno y convertirlo en **un servicio con
  su API**, para pedir un análisis en vez de ejecutar un script.
- Servir el modelo en **formato de intercambio (ONNX Runtime)** en lugar de
  arrastrar el marco de entrenamiento entero a producción.
- Separar las **dependencias de entrenamiento y de despliegue**.
- Montar el **frontend de visualización** para que el resultado sea
  interpretable por quien lo va a mirar.
- **Curar el conjunto de entradas**: separar lo procesable de lo que no lo es.

## Buenas prácticas

- **Runtime de inferencia independiente del marco de entrenamiento**: producción
  no necesita el entorno con el que se entrenó.
- **Dependencias de despliegue declaradas aparte** y en versión de CPU, en vez
  de reutilizar las de entrenamiento con aceleración por GPU.
- **Carga del modelo una sola vez**, reutilizada entre peticiones, en lugar de
  releerlo en cada llamada.
- **Interfaz que explica los parámetros** en vez de mostrar solo números: un
  resultado que nadie sabe leer no sirve de nada.
- **Validación de las entradas admisibles** antes de procesarlas.

## Cuándo lo uso

- En cuanto alguien que no escribió el modelo necesita usarlo. Un script que
  solo ejecuta su autor no es un producto.
- **Formato de intercambio** cuando el marco de entrenamiento es pesado o
  incómodo de instalar en el servidor: casi siempre.
- La interfaz merece la pena en cuanto el resultado tiene que **revisarlo una
  persona**, no consumirlo otro sistema.

![Del modelo entrenado al servicio](./assets/modelo-a-servicio.svg)
