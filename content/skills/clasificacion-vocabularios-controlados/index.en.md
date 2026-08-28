---
title: Classifying free text against controlled vocabularies
summary: "Automatically assigning closed-taxonomy codes to text written by people, with calibrated thresholds and declarative coding policies."
category: Data & AI
tech: [Python, embeddings, PostgreSQL, Elasticsearch]
level: 3 projects · 2023–2026
---

## What I can do

I turn text written by people into codes from a closed taxonomy, automatically
and with control over false positives. I have built this kind of classifier three
times, with three different approaches, across two products that are in
production.

I know when a similarity threshold over embeddings is the right tool, when a
well-scored lexical search is enough, and when both need combining. And I know
the hard part is not choosing the model: it is deciding what gets coded, against
which vocabulary, and what to do when the system is not sure.

## Tools and techniques

- Embeddings + cosine similarity with a threshold, against a catalogue indexed in
  the database.
- Thresholds **calibrated per field type**, not one global threshold.
- Explicit tie-breaking between admissible candidates.
- Scored lexical search over an indexing engine, with separate indices per
  language.
- Hybrid strategy: embedding-based retrieval versus title-based retrieval.
- Declarative, validated coding policy.
- Python, PostgreSQL, Elasticsearch.

![Classification flow](./assets/flujo-clasificacion.svg)

## Where I have done it

### Biomedical NLP R&D · healthcare sector · 2023–2024

**Context** · Codes from several standard clinical taxonomies had to be assigned
to the concepts appearing in natural language during a clinical conversation.

**What I did** · **I designed and implemented the entire coding pipeline.** It is
my most complete contribution within this skill. I was the second author of the
repository, out of five people.

*Scope*: that same repository contained a more advanced terminology subproject
(post-coordination, alternative matchers, knowledge graphs) run by colleagues. It
is not mine and I do not claim it.

**How I implemented it** · Each extracted concept is resolved against an indexed
catalogue, with an **explicit tie-breaking rule** when several candidates are
admissible rather than taking the first. Concepts are routed to sub-indices
according to their nature, a decision I made **after measuring** that a single
index degraded accuracy.

**Good practices applied** · **Different thresholds per field type** rather than
one global value — fields where a false positive is more costly get a stricter
threshold; separation between the catalogue connection and the operational data
connection; parallelisation of the full process.

**What was missing** · No automated tests. Validation was manual, case by case.
It is a real gap in the project and I acknowledge it.

**In real use** · It was R&D. The approach later moved into the product; the
repository itself was not deployed.

---

### Modular clinical suite · healthcare sector · 2025–2026

**Context** · Several product modules needed to code against different
terminology systems, and each client wanted to code different things.

**What I did** · The **configurable coding policy** and the multilingual search.
Fourth author of a five-person repository; my part here is clearly bounded.

*Scope*: the post-coordination, vector search and personal data anonymisation
subsystems belong to colleagues.

**How I implemented it** · Instead of leaving the "what gets coded against what"
decision scattered through the code, I extracted it into a **multi-level
declarative structure** with a validation function that rejects impossible
combinations and allows partial overrides per deployment. A client can change the policy without
touching code.

**Good practices applied** · Strict validation of input configuration with
explanatory errors; safe defaults; partial override instead of full replacement;
defensive copying so nobody mutates the global policy by accident. **It is one of
the few pieces in the set that does have a dedicated automated test.**

**Numbers** · Multilingual search; no authorised accuracy figures.

**In real use** · Yes, deployed product.

---

### Clinical product in production · healthcare sector · 2025–2026

**Context** · Coding as an integrated step within the clinical extraction flow
that runs on every real consultation.

**What I did** · The integration of coding within the per-field extractors, and
duplicate control. Here coding is one piece of something larger — the LLM
pipeline — which I cover under another skill.

**How I implemented it** · Coding is applied field by field, with validation
against master catalogues so codes for non-existent concepts are never emitted.

**Good practices applied** · Verification against the catalogue before accepting a
code; explicit deduplication.

**Numbers** · Measured with the evaluation bench I built (see
[Evaluating AI systems](/myself/en/skills/evaluacion-sistemas-ia)); the specific
figures are not publishable.

**In real use** · Yes, in production with healthcare professionals.
