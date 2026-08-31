---
title: AI evaluation bench
summary: "Infrastructure that answers whether a prompt or model change improves the system or degrades it, and what the improvement costs."
sector: Healthcare
period: "2026"
status: In production
tech: [Python, asyncio, CSV, HTML]
skills:
  - slug: evaluacion-sistemas-ia
    contribution: "Built entirely from scratch, methodology included: per-field accuracy, cost and latency in the same table."
---

## What I did

There was an LLM extraction pipeline in production and **no systematic way to
know whether a change improved it or made it worse**. I built the whole thing
from scratch, between June and July 2026, designing the evaluation methodology
as well as implementing it.

- **Versioned reference cases** in the repository, with their expected output,
  so evaluation is reproducible and does not depend on one machine.
- **Per-field scoring** as well as global, broken down by care line.
- **Atomic mode**: each component measured in isolation, alongside the full
  flow, to locate where accuracy is lost.
- **A self-contained HTML dashboard**, with no external dependencies.

## Good practices

- **Cost and latency in the same table as quality** —mean time, input and output
  tokens, cache usage—, per phase and per field. It shows that an accuracy gain
  comes expensive **before** it ships.
- **Prompts ordered with the stable part first** so it gets cached: measuring
  cache usage is what allowed cutting cost without touching quality.
- **Results archived per version**, so comparing two versions means reading two
  folders rather than repeating the experiment.
- **Discrepancy export** to CSV: the list of what failed, so it can be
  investigated, not just the number summarising it.
- Separation between generation, execution, evaluation and export.
- A deliberately designed report: few numbers at the top for a quick look, the
  detail below for digging in.

## Outcome

Used to decide on changes to the system in production: four versions compared
over a set of reference cases, with scoring broken down by clinical field and by
care line.

It is the piece most clearly mine in the whole portfolio: no other author has
touched that folder in the history.
