---
title: Investigación en NLP biomédico
summary: "La investigación previa donde se probó el enfoque que después llegó a producto: de una conversación asistencial a conceptos clínicos codificados."
sector: Salud
period: "2023–2024"
tech: [Python, embeddings, PostgreSQL, SNOMED CT, CIE-10]
skills:
  - slug: pipelines-llm-produccion
    contribution: "Diseñé e implementé el pipeline entero: transcripción, estructuración con modelo de lenguaje, extracción de campos y codificación."
  - slug: clasificacion-vocabularios-controlados
    contribution: "Mi aportación más completa en codificación: el pipeline de asignación de códigos, de principio a fin."
  - slug: ingesta-datos-busqueda-semantica
    contribution: "La preparación de datos y la carga de los embeddings del catálogo a base de datos."
---

## Qué hice

**Diseñé e implementé el pipeline entero**, de la transcripción a la
codificación: estructuración de la conversación con modelo de lenguaje,
extracción de campos y asignación de códigos de SNOMED CT y CIE-10 a los
conceptos que aparecían en lenguaje natural.

Cada concepto extraído se compara por similitud coseno contra un catálogo de
embeddings persistido en base de datos. Si varios candidatos pasan el umbral, se
resuelve **por frecuencia** en lugar de coger el primero.

También reestructuré el proyecto en módulos por responsabilidad y **paralelicé
el proceso**, que hasta entonces era secuencial.

## Buenas prácticas

- **Umbrales calibrados por tipo de campo** en vez de uno global: los campos
  donde un falso positivo sale más caro llevan umbral más exigente.
- **Subíndices por tipo de concepto** —síntoma, diagnóstico, procedimiento—,
  porque mezclarlos degradaba el acierto.
- **Voto por frecuencia** entre candidatos que superan el umbral.
- Separación entre la conexión al catálogo y la de datos operativos.
- Parametrización de los umbrales en lugar de constantes repartidas por el
  código.

## Resultado

Fue investigación y como repositorio no se desplegó, pero **el enfoque pasó
después a producto**: es el origen de lo que hoy corre en producción.
