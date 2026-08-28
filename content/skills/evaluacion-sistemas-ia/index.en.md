---
title: Evaluating AI systems
summary: "Infrastructure to measure whether an AI system works and what it costs to make it work: per-field accuracy, latency, tokens and caching in one view."
category: Data & AI
tech: [Python, asyncio, CSV, HTML]
level: 2 projects · 2026
featured: true
---

## What I can do

I build the infrastructure that tells you whether an AI system works, and **what
it costs** to make it work. Not just accuracy: accuracy per field, time per
phase, input and output tokens, and cache utilisation, all in the same table and
comparable across versions.

It is the difference between using a model and being able to answer for it. When
someone asks "is this better than what we had?", I have something to answer with
instead of an impression.

## Tools and techniques

- A reference case set with expected output (*ground truth*).
- Reproducible runs per version, with results archived by version.
- Scoring **per field**, not only overall, broken down by business line.
- Cost and latency metrics alongside quality metrics, in the same view.
- Atomic execution: each component measured separately, as well as the full flow.
- CSV export to compare versions, and a discrepancy export to investigate
  failures.
- An HTML dashboard, with no external dependencies.
- An engineering logbook that also records discarded hypotheses.
- Python, `asyncio`.

![Evaluation cycle](./assets/ciclo-evaluacion.svg)

## Where I have done it

### Clinical product in production · healthcare sector · 2026

My cleanest contribution in the whole portfolio: this piece is **entirely mine,
from scratch**.

**Context** · There was a language-model extraction pipeline in production and no
systematic way of knowing whether a prompt change or a model version made it
better or worse.

**What I did** · **I built the whole thing from scratch**, between June and July
2026. No other author has touched that folder in the history. I designed the
evaluation methodology as well as implementing it.

*A note on honesty*: the bench measures a pipeline that I also **largely wrote
myself**. It is a self-evaluation tool, not an independent audit.

**How I implemented it**

- **Versioned reference cases** in the repository, with expected output, so
  evaluation is reproducible and does not depend on data sitting on one machine.
- **Per-field scoring** as well as overall: a high average can hide one specific
  field that always fails, and that is exactly the one to fix.
- **Cost and latency metrics in the same table as quality metrics** — average
  time, input and output tokens, cache utilisation — per phase and per field. It
  lets you see that an accuracy gain is expensive before deploying it.
- **Atomic mode**: each component measured in isolation, as well as the full
  flow, to locate where accuracy is lost.
- **Results archived per version**, so comparing two versions means reading two
  folders, not repeating the experiment.
- **Discrepancy export** to CSV: the list of what failed, to investigate it, not
  just the summarising number.
- **Custom HTML dashboard and console**, with no external dependencies.
- Deliberate report design: a few numbers at the top for a quick look, the detail
  below for investigation.

**Good practices applied** · Dataset versioned alongside the code; separation
between generation, execution, evaluation and export; results immutable per
version.

**Numbers** · A versioned set of reference cases, with **several versions
evaluated comparatively** and scoring broken down by clinical field and by
clinical line. The accuracy figures belong to the client and are not
published.

**In real use** · Yes, it was used to decide on changes to the system in
production.

---

### Geometric analysis library · aerospace sector · 2026

**Context** · A labelling algorithm that had to be compared against the previous
algorithm across several real parts.

**What I did** · The module's engineering logbook, with per-part metrics, root
cause diagnosis and an **explicit record of discarded hypotheses**.

**How I implemented it** · A per-part comparison table (parts resolved,
unlabelled, duplicates, time) before and after the change, plus a section
dedicated to why the obvious metric — resembling the previous algorithm — **was
not the right metric**, because the previous one was getting it wrong.

**Good practices applied** · Documenting dead ends so that nobody — myself
included — repeats them; questioning the baseline instead of assuming it valid.

**Numbers** · A set of real parts of widely varying complexity. The detail is
in
[Algorithms and computational geometry](/myself/en/skills/algoritmia-geometria-computacional).

**In real use** · Yes, it guided the module's development.

## Where I fall short (and I say so)

In the repositories I have worked on there are **barely any unit tests or
configured linters**; several have none at all. My solid experience is in
**evaluating AI systems** — measuring end-to-end behaviour — not in unit test
coverage or setting up continuous integration pipelines. It is a real gap, and
saying so here seems more useful than letting it surface in the first technical
question.
