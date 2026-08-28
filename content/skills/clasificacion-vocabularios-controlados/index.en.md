---
title: Classifying free text against controlled vocabularies
summary: "Automatic assignment of closed-taxonomy codes to text written by people, with calibrated thresholds and declarative coding policies."
category: Data & AI
tech: [Python, embeddings, PostgreSQL, Elasticsearch]
level: 3 projects · 2023–2026
---

## What it solves

I turn text written by people into codes from a closed taxonomy, automatically
and with control over false positives. I have built this kind of classifier three
times, with three different approaches, across two products that are in
production.

When an embedding similarity threshold is the right tool, when a well-scored
lexical search is enough, and when both have to be combined is a decision made by
measuring. But the hard part is not choosing the model: it is deciding what gets
coded, against which vocabulary, and what the system does when it is not sure.

## Tools and techniques

- Embeddings + cosine similarity with a threshold, against a catalogue indexed in
  the database.
- Thresholds **calibrated per field type**, not one global threshold.
- Explicit tie-breaking between admissible candidates.
- Scored lexical search over an indexing engine, with separate indices per
  language.
- Hybrid strategy: embedding retrieval versus title retrieval.
- A declarative, validated coding policy.
- Python, PostgreSQL, Elasticsearch.

![Classification flow](./assets/flujo-clasificacion.svg)

## Projects

### Biomedical NLP R&D · healthcare sector · 2023–2024

The complete coding pipeline, end to end: my most extensive contribution within
this skill.

**Context** · Codes from several standard clinical taxonomies had to be assigned
to the concepts appearing in natural language during a clinical conversation.

**My contribution** · **I designed and implemented the entire coding pipeline**,
from concept extraction to code emission.

**How I approached it** · Each extracted concept is resolved against an indexed
catalogue, with an **explicit tie-breaking rule** when several candidates are
admissible rather than taking the first. Concepts are routed to sub-indices
according to their nature, a decision I made **after measuring** that a single
index degraded accuracy. Thresholds are **different per field type** rather than
global: where a false positive is more costly, the threshold is stricter. The
catalogue connection is kept separate from the operational data connection, and
the full process is parallelised.

**Outcome** · The approach validated here later moved into the product.

---

### Modular clinical suite · healthcare sector · 2025–2026

The configurable coding policy: what gets coded, against which vocabulary,
without touching code.

**Context** · Several product modules needed to code against different
terminology systems, and each client wanted to code different things.

**My contribution** · The **configurable coding policy** and the multilingual
search.

**How I approached it** · Instead of leaving the "what gets coded against what"
decision scattered through the code, I extracted it into a **multi-level
declarative structure** with a validation function that rejects impossible
combinations and allows partial overrides per deployment. Input configuration is
validated strictly, with explanatory errors, safe defaults, partial override
instead of full replacement, and defensive copying so nobody mutates the global
policy by accident. It is one of the few pieces in the set that does have a
dedicated automated test.

**Outcome** · Deployed product, with multilingual search. A client can change the
policy without touching code. The specific figures are covered by
confidentiality.

---

### Clinical product in production · healthcare sector · 2025–2026

Coding as an integrated step within the extraction flow that runs on every real
consultation.

**Context** · Here coding is not a separate system but one piece of the LLM
pipeline covered under
[LLM pipelines in production](/myself/en/skills/pipelines-llm-produccion).

**My contribution** · The integration of coding within the per-field extractors,
and duplicate control.

**How I approached it** · Coding is applied field by field, with verification
against master catalogues before a code is accepted — a concept that does not
exist is never emitted — and explicit deduplication.

**Outcome** · In production with healthcare professionals. Measured with the
evaluation bench I built (see
[Evaluating AI systems](/myself/en/skills/evaluacion-sistemas-ia)); the specific
figures are not publishable.
