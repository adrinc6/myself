---
title: Designing and operating LLM pipelines in production
summary: "Flows that turn natural language into reliable structured data, with versioned prompts, output validation and per-call cost control."
category: Data & AI
tech: [Python, asyncio, FastAPI, LLMs, ASR]
level: 3 projects · 2023–2026
featured: true
---

## What I can do

I build flows that go from natural-language input to reliable structured data,
and I keep them running in a domain where getting it wrong has consequences. I
can break a large problem into independent phases and fields, version prompts
outside the code, validate output before treating it as good, and control what
each call costs.

What sets my work apart is not making a model respond: it is making sure it
**does not make things up**, does not duplicate, and says when it lacks enough
evidence instead of filling the gap.

## Tools and techniques

- Asynchronous orchestration of model calls (`asyncio`), parallelised per field.
- Prompts versioned in a data file, loaded by a dedicated module.
- Output forced to stable JSON, with schema validation.
- Deduplication and verification against master catalogues before emitting.
- Token and cost accounting per run.
- Authentication with a non-blocking token cache against a cloud provider.
- Streaming audio transcription with voice activity detection.
- Python, FastAPI.

![Phase and field architecture](./assets/pipeline-fases-campos.svg)

## Where I have done it

### Clinical product in production · healthcare sector · 2025–2026

This is my main contribution within this skill.

**Context** · Starting from the recording of a consultation, the system has to
produce structured clinical information, field by field, ready to integrate into
the client's system.

**What I did** · **Practically the entire AI service in Python**: the complete
flow of prompts and model calls for the product's various clinical lines. Backed
by the history: I am the second author of the repository (out of six people) and
by far the first within the Python service folder. The per-field extractors, the
prompt loader, the model client and the split of the code into phases are mine.

*Scope*: the web layer, infrastructure, deployment and database are mostly my
colleagues' work. This skill covers the AI service only.

**How I implemented it**

- **Decomposition of the flow into explicit phases** and **one independent
  extractor per clinical field** rather than a single monolithic call. Each field
  has its own rules and can evolve without touching the others.
- **Prompts outside the code**, in a data file with its own loader. They can be
  reviewed and versioned without deploying code.
- **Request batching per field** to reduce the number of calls.
- **Request queue planning** so that total time is not set by the slowest task.
- **Authentication token cache** with early renewal, resolved outside the event
  loop so it never blocks it.

**Good practices applied**

- Validation against master catalogues: a concept that does not exist is never
  emitted.
- Explicit duplicate control in the fields where repetition is a clinical error.
- Token and timing instrumentation, with environment variables to turn on detail.
- Stable JSON output instead of free text parsed after the fact.

**What was missing** · The repository has no unified test runner and no linter
configured. Official validation is a syntax check. I compensated by building my
own evaluation bench (a separate skill), but that does not replace unit tests.

**Numbers** · The pipeline is measured with that bench, comparing versions
against each other over a set of reference cases. The accuracy figures are not
publishable.

**In real use** · Yes, in production with healthcare professionals, with
continuous deployment and active work on new model versions.

---

### Biomedical NLP R&D · healthcare sector · 2023–2024

**Context** · The earlier research where the approach that later reached the
product was tested.

**What I did** · **I designed and implemented the entire pipeline**:
transcription, structuring the conversation with a language model, field
extraction and coding. Second author out of five.

*Scope*: the advanced terminology subproject belonged to colleagues.

**How I implemented it** · I restructured the whole project into modules by
responsibility and **parallelised the process**, which until then was sequential.

**Good practices applied** · Separation of responsibilities into modules;
thresholds parameterised instead of constants scattered around.

**What was missing** · No tests, no CI, badly declared dependencies. It was
research code and it shows.

**In real use** · Not as a repository; the approach did make it into the product.

---

### Modular clinical suite · healthcare sector · 2025–2026

**Context** · The same kind of clinical flow inside a multi-product platform.

**What I did** · The **reorganisation of the clinical module**, separating
processes from shared utilities, with cleanup and simplification of the code and
the application of good LLM and prompt practices. I also documented the module's
functions. Fourth author out of five: my contribution here is limited.

*Scope*: the agent orchestration, vector search and transcription subsystems
belong to colleagues.

**Good practices applied** · Separation of processes and shared code; decision
policy extracted into validated configuration; function documentation.

**In real use** · Yes, deployed product.
