---
title: Codificación automática de texto clínico
summary: "Convierto lo que un profesional escribe a mano en códigos de SNOMED CT, CIE-10 y CIAP-3, con control sobre los falsos positivos."
category: Datos e IA
tech: [Python, embeddings, Elasticsearch, PostgreSQL, SNOMED CT, CIE-10, CIAP-3]
featured: true
---

## Qué sé hacer

- Asignar códigos de **SNOMED CT, CIE-9/10/11 y CIAP-3** a texto escrito a mano
  por personas, de forma automática.
- Consultar esos vocabularios con **SQL y Elasticsearch**, no solo conocerlos.
- Normalizar y mantener el **catálogo oficial de medicamentos** como fuente.
- Decidir qué se codifica, con qué vocabulario, y qué hace el sistema cuando no
  está seguro — que es la parte difícil, no elegir el modelo.

Lo he construido tres veces, con tres enfoques distintos, en dos productos que
están en producción.

## Buenas prácticas

- **Umbral de similitud calibrado por tipo de campo**, no uno global: donde un
  falso positivo sale más caro, el umbral es más exigente.
- **Un índice de Elasticsearch por tipo de concepto** —síntoma, diagnóstico,
  procedimiento— en vez de uno solo mezclado, porque mezclarlos degradaba el
  acierto.
- **Voto por frecuencia** cuando varios candidatos superan el umbral, en lugar
  de coger el primero.
- **Política de codificación en configuración validada**, no repartida por el
  código: un cliente puede cambiar qué se codifica sin tocar nada.
- **Verificación contra catálogo maestro** antes de dar un código por bueno.

## Cuándo lo uso

- Con **vocabulario cerrado y términos exactos**, una búsqueda léxica bien
  puntuada acierta más y sale más barata que los embeddings.
- Los **embeddings** los reservo para cuando el texto no se parece al catálogo:
  cuando alguien describe un síntoma con sus palabras en vez de nombrarlo.
- Cuando ninguna de las dos da confianza suficiente, **el sistema lo dice** en
  vez de rellenar el hueco con el candidato menos malo.

![Flujo de clasificación](./assets/flujo-clasificacion.svg)
