---
title: From consultation to clinical report
summary: "From the recording of a consultation to structured clinical information, field by field, ready to enter the client's system."
sector: Healthcare
period: "2025–2026"
status: In production
tech: [Python, asyncio, FastAPI, LLMs, SNOMED CT, ICD-10]
skills:
  - slug: pipelines-llm-produccion
    contribution: "The whole AI service: ten independent extractors, one per clinical field, instead of a single call to the model."
  - slug: clasificacion-vocabularios-controlados
    contribution: "SNOMED CT and ICD-10 coding applied field by field, validated against a master catalogue."
  - slug: puesta-en-produccion-modelos
    contribution: "The Python service exposing the AI, with authentication, credential caching and cost control."
---

## What I did

- **The AI service in Python**: the complete flow of prompts and model calls for
  the product's two care lines.
- The **per-field extractors** —ten clinical fields, each with its own rules—,
  the prompt loader, the model client and the split of the code into phases.
- **Coding** against SNOMED CT and ICD-10 built into the extractors, plus
  duplicate control.

Healthcare professionals read the output and it enters the client's system field
by field, so an invented or duplicated value is not a cosmetic defect: it is an
error somebody has to catch by hand.

## Good practices

- **One extractor per field** rather than a monolithic call: each field evolves
  without touching the others.
- **Prompts outside the code**, in a data file with its own loader. They can be
  reviewed and versioned without a deploy.
- **Validation against a master catalogue**: a concept that does not exist is
  never emitted.
- **Explicit deduplication** in the fields where repeating is a clinical error.
- **Token and cost accounting** per run, so the price of a call is known before
  the invoice says so.
- **Auth token caching** with early renewal, resolved off the event loop so it
  never blocks it.

## Outcome

In production, used by healthcare professionals in real consultations, with
continuous deployment and active work on new model versions. Its behaviour is
measured with the evaluation bench I built separately.
