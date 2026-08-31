---
title: Multilingual clinical search
summary: "Several official catalogues and vocabularies, in different languages and formats, queryable from one place with acceptable response times."
sector: Healthcare
period: "2025–2026"
status: In production
tech: [Python, Elasticsearch, PostgreSQL, numpy, SNOMED CT, ICPC-3]
skills:
  - slug: ingesta-datos-busqueda-semantica
    contribution: "The full ingestion of the catalogues, the multilingual search and the tuning of the engine's scoring."
  - slug: clasificacion-vocabularios-controlados
    contribution: "The configurable coding policy: what gets coded and against which vocabulary, lifted out of the code into validated configuration."
  - slug: pipelines-llm-produccion
    contribution: "The reorganisation of the clinical module, separating processes from shared utilities and applying prompt good practice."
  - slug: puesta-en-produccion-modelos
    contribution: "The clinical module of the deployed service."
---

## What I did

- The **full ingestion** of the official catalogues into the indexing engine,
  the **multilingual search** and the scoring tuning, plus the index export and
  import processes between environments.
- The download and normalisation of the **official medicines catalogue**.
- The **configurable coding policy**: instead of leaving the "what gets coded
  against what" decision scattered through the code, I lifted it into a
  three-level declarative structure —document section, concept type and
  applicable coding systems— with validation that rejects impossible
  combinations. A client changes the policy without touching code.

## Good practices

- **Memory-mapped embeddings** (`memmap`) rather than in RAM: the full catalogue
  does not fit comfortably, and this way it is accessed by index without loading
  all of it.
- **Resumability**: before computing, the process loads what is already computed
  and requests only what is missing, in batches. Recomputing a whole catalogue
  costs time and money; this avoids it.
- **One Elasticsearch index per language**, selected at query time, rather than
  one mixed index.
- **Result collapsing in the engine itself** rather than in Python, moving the
  work to where the data already is.
- **Idempotence**: re-running the ingestion neither duplicates nor recomputes.
- Strict validation of the configuration with explanatory errors, safe defaults
  and defensive copying so nobody mutates the global policy by accident.

## Outcome

A deployed product, with search in three languages across several official
vocabularies. The coding policy is one of the few parts of the codebase with a
dedicated automated test.
