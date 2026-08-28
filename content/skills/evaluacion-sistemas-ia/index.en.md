---
title: Evaluating AI systems
summary: "Infrastructure to measure whether an AI system works and what it costs to make it work: per-field accuracy, latency, tokens and caching in one view."
category: Data & AI
tech: [Python, asyncio, CSV, HTML]
level: 2 projects · 2026
featured: true
---

## What it solves

"Is this better than what we had?" gets answered either with an impression or
with a table. I build the infrastructure that answers it with a table: accuracy
per field, time per phase, input and output tokens and cache utilisation, all
comparable across versions.

It is the difference between using a model and being able to answer for it. A
high average can hide one field that always fails, and an accuracy gain can turn
out to be expensive; neither shows up unless it is measured separately.

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

## Projects

### Clinical product in production · healthcare sector · 2026

The evaluation bench for the clinical pipeline, built from scratch: the piece of
the portfolio that is most entirely mine.

**Context** · There was a language-model extraction pipeline in production and no
systematic way of knowing whether a prompt change or a model version made it
better or worse.

**My contribution** · **I built the whole thing from scratch**, between June and
July 2026, designing the evaluation methodology as well as implementing it. No
other author has touched that folder in the history.

*Scope*: the bench measures a pipeline that I largely wrote myself. It is a
self-evaluation tool, not an independent audit.

**How I approached it**

- **Versioned reference cases** in the repository, with expected output, so
  evaluation is reproducible and does not depend on data sitting on one machine.
- **Per-field scoring** as well as overall: a high average can hide one specific
  field that always fails, and that is exactly the one to fix.
- **Cost and latency metrics in the same table as quality metrics** — average
  time, input and output tokens, cache utilisation — per phase and per field, so
  an expensive accuracy gain shows up before deployment.
- **Atomic mode**: each component measured in isolation, as well as the full
  flow, to locate where accuracy is lost.
- **Results archived per version**: comparing two versions means reading two
  folders, not repeating the experiment.
- **Discrepancy export** to CSV, listing what failed, not just the summarising
  number.
- **Custom HTML dashboard and console**, with no external dependencies: a few
  numbers at the top for a quick look, the detail below for investigation.
- Dataset versioned alongside the code, separation between generation, execution,
  evaluation and export, and results immutable per version.

**Outcome** · It was used to decide on changes to the system in production.
Several versions evaluated comparatively over a versioned reference case set,
with scoring broken down by clinical field and clinical line; accuracy figures
belong to the client and are not published.

---

### Geometric analysis library · aerospace sector · 2026

The engineering logbook that settled what counted as an improvement in the
labelling module.

**Context** · A new labelling algorithm had to be compared against the previous
one across several real parts, and the obvious comparison — resembling the
previous one — turned out to be the wrong one.

**My contribution** · The module's logbook, with per-part metrics, root cause
diagnosis and an **explicit record of discarded hypotheses**.

**How I approached it** · A per-part comparison table — parts resolved,
unlabelled, duplicates, time — before and after the change, plus a section on why
the obvious metric did not serve: the baseline algorithm was getting it wrong, so
resembling it was not the goal. Dead ends are documented so that nobody, myself
included, repeats them.

**Outcome** · It guided the module's development. The detail is in
[Algorithms and computational geometry](/myself/en/skills/algoritmia-geometria-computacional).

## Limits

- My ground is **end-to-end evaluation**: measuring the behaviour of the complete
  system. That is not the same as unit test coverage or setting up continuous
  integration, and in those I have no solid experience — the repositories I have
  worked on have barely any unit tests or configured linters, and several have
  none at all.
- The clinical product's bench measures code that is mostly mine: it serves to
  decide between versions, not as independent validation.
