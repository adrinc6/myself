---
title: Automatic breakdown of aerospace parts
summary: "From the geometry of a structural part, automatically derive its internal breakdown into elements, ready for manufacturing."
sector: Aerospace
period: "2026"
status: In use at the client
tech: [Python, numpy, scipy, shapely, Voronoi, NURBS]
skills:
  - slug: algoritmia-geometria-computacional
    contribution: "I rewrote the topology engine using Voronoi over segments and built the labelling module from scratch."
  - slug: evaluacion-sistemas-ia
    contribution: "The engineering log with per-part metrics, and the call to change the metric when the reference system was the one getting it wrong."
---

## What I did

Starting from an inherited version that worked on small parts and fell apart on
large ones, I rewrote the two pieces the correctness of the result depended on:

- **The topology engine.** The inherited approach started from a discrete
  representation that introduced artefacts and made the result depend on
  sampling parameters. The root cause was the representation, not the parameter
  tuning where everyone had been looking. I replaced it with a **Voronoi diagram
  over segments** (`scipy.spatial` and `shapely`) that preserves the provenance
  of each primitive: the result stops being ambiguous **by construction**
  instead of being corrected afterwards.
- **The labelling.** The original algorithm propagated relatively: an early
  error was dragged through the whole result. I redesigned it so each element
  derives its identity from verifiable local invariants, which keeps **errors
  bounded instead of propagating**.

## Good practices

- **Questioning the metric.** The obvious comparison was matching the previous
  algorithm; measuring showed the previous one produced duplicate identifiers
  and row jumps. I changed the criterion to **internal consistency** —gaps,
  ordering breaks, duplicates— rather than treating the old system as the judge.
- **An engineering log** with the diagnosis, the changes and **the hypotheses
  that were ruled out**, so they do not get retried.
- Low-confidence results marked explicitly rather than dropped silently.
- A cache keyed by input hash plus schema version, with its limit documented: it
  detects changes in the data, not in the code.

## Outcome

In use in the client's workflow. Across real parts of widely differing
complexity —more than an order of magnitude between the smallest and the
largest—: **zero unidentified elements, zero duplicates and zero overlaps**,
where the previous algorithm left a significant fraction unidentified. Labelling
time down by an order of magnitude, and data preparation from minutes to
fractions of a second thanks to the cache.

A good part of the work was spotting **undocumented implicit assumptions in the
input data** —an identifier that looked like a coordinate and was not—. Fixing
that interpretation produced the single largest improvement in the project.
