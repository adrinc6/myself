---
title: Automatic clinical text coding
summary: "I turn what a professional writes by hand into SNOMED CT, ICD-10 and ICPC-3 codes, with control over false positives."
category: Data & AI
tech: [Python, embeddings, Elasticsearch, PostgreSQL, SNOMED CT, ICD-10, ICPC-3]
featured: true
---

## What I can do

- Assign **SNOMED CT, ICD-9/10/11 and ICPC-3** codes to text written by hand,
  automatically.
- Query those vocabularies with **SQL and Elasticsearch**, not just know they
  exist.
- Normalise and maintain the **official medicines catalogue** as a source.
- Decide what gets coded, against which vocabulary, and what the system does
  when it is not sure — which is the hard part, not choosing the model.

I have built this three times, with three different approaches, across two
products that are in production.

## Good practices

- **A similarity threshold calibrated per field type**, not a global one: where
  a false positive costs more, the threshold is stricter.
- **One Elasticsearch index per concept type** —symptom, diagnosis, procedure—
  rather than a single mixed one, because mixing them degraded accuracy.
- **Frequency voting** when several candidates pass the threshold, instead of
  taking the first.
- **The coding policy in validated configuration**, not scattered through the
  code: a client can change what gets coded without touching anything.
- **Verification against a master catalogue** before accepting a code.

## When I use it

- With a **closed vocabulary and exact terms**, a well-scored lexical search is
  more accurate and cheaper than embeddings.
- I keep **embeddings** for when the text does not look like the catalogue: when
  someone describes a symptom in their own words instead of naming it.
- When neither gives enough confidence, **the system says so** rather than
  filling the gap with the least bad candidate.

![Classification flow](./assets/flujo-clasificacion.svg)
