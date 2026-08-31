---
title: Biomedical NLP research
summary: "The earlier research where the approach that later reached the product was tested: from a care conversation to coded clinical concepts."
sector: Healthcare
period: "2023–2024"
tech: [Python, embeddings, PostgreSQL, SNOMED CT, ICD-10]
skills:
  - slug: pipelines-llm-produccion
    contribution: "I designed and implemented the entire pipeline: transcription, LLM structuring of the conversation, field extraction and coding."
  - slug: clasificacion-vocabularios-controlados
    contribution: "My most complete contribution in coding: the code assignment pipeline, end to end."
  - slug: ingesta-datos-busqueda-semantica
    contribution: "The data preparation and the loading of the catalogue embeddings into the database."
---

## What I did

**I designed and implemented the entire pipeline**, from transcription to
coding: structuring the conversation with a language model, extracting fields
and assigning SNOMED CT and ICD-10 codes to the concepts appearing in natural
language.

Each extracted concept is compared by cosine similarity against a catalogue of
embeddings persisted in the database. When several candidates pass the
threshold, it is resolved **by frequency** rather than taking the first one.

I also restructured the project into modules by responsibility and
**parallelised the process**, which until then had been sequential.

## Good practices

- **Thresholds calibrated per field type** rather than one global value: fields
  where a false positive costs more carry a stricter threshold.
- **Subindices per concept type** —symptom, diagnosis, procedure—, because
  mixing them degraded accuracy.
- **Frequency voting** among candidates that pass the threshold.
- Separation between the catalogue connection and the operational data one.
- Thresholds parameterised rather than left as constants scattered through the
  code.

## Outcome

It was research and the repository itself was never deployed, but **the approach
did reach the product**: it is the origin of what runs in production today.
