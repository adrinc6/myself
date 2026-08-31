---
title: Data ingestion and search
summary: "Pulling data from official catalogues, databases or portals with no API, normalising it and making it queryable by text or by meaning."
category: Data & AI
tech: [Python, pandas, numpy, Elasticsearch, PostgreSQL, Selenium]
---

## What I can do

- Pull data from wherever it is —an official catalogue, a database, a web portal
  with no API—, normalise it and make it queryable.
- Build ingestion so it is **resumable**: if it fails halfway it continues where
  it was instead of starting over, and does not recompute what it already has.
- **Memory-mapped embeddings** (numpy's `memmap`) when the catalogue does not
  fit comfortably in RAM.
- Tune **Elasticsearch scoring** and set up separate indices per language.
- Automate the browser with **Selenium** for sources that offer no other route.

## Good practices

- **Idempotence**: re-running the ingestion neither duplicates nor recomputes.
- **Batched resumption**: before computing, load what is already computed and
  request only what is missing. Recomputing a whole catalogue costs time and
  money.
- **Retries** on external service calls, and bulk loading rather than
  request-by-request.
- **One index per language**, selected at query time, rather than a mixed one.
- **Collapsing results in the engine itself** rather than in Python: moving the
  work to where the data already is.
- **Text normalisation** so spelling variants do not create separate entries.
- **Index export and import** between environments, to avoid repeating the full
  ingestion in each one.

## When I use it

- **Well-scored lexical search** when the terms are exact: more accurate and far
  cheaper than embeddings.
- **Semantic search** when the query does not look like the catalogue, which is
  when the extra cost is justified.
- **Memory mapping** as soon as the catalogue stops fitting comfortably: it is
  accessed by index without loading all of it.

![Ingestion and query flow](./assets/ingesta-y-consulta.svg)
