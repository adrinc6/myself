---
title: Algorithms and computational geometry
summary: "Custom algorithms for robust 2D geometry and structure detection in irregular shapes, with the judgement to measure whether the new one beats the old."
category: Engineering & algorithms
tech: [Python, numpy, scipy, shapely, Voronoi, NURBS]
level: 1 project · 2026
featured: true
---

## What it solves

Some problems are past what the standard library reaches: robust 2D geometry,
structure detection in irregular shapes, propagation over neighbourhood graphs. I
write the algorithm from scratch, and before writing it I choose how to represent
the problem — usually half the solution.

The other half is measurement. A new algorithm gets compared against the one it
replaces, and if the baseline is wrong, resembling it is not the goal:
questioning the metric is part of the job.

## Tools and techniques

- Voronoi diagrams and space partitioning.
- Curvature detection and shape analysis.
- Robust 2D boolean operations and spatial indexing.
- Propagation over neighbourhood graphs.
- Principal component analysis, homographies and projective transformations.
- B-spline / NURBS curves for curved edges.
- Caching keyed by input hash and schema version.
- Python, numpy, scipy, shapely.

![Propagating error versus bounded error](./assets/relativo-vs-absoluto.svg)

## Projects

### Geometric analysis library · aerospace sector · 2026

The library that automatically derives a part's structural decomposition from
its geometry. I wrote it.

**Context** · Starting from the geometric definition of a structural part, the
system has to automatically derive its internal decomposition into structural
elements, ready for manufacturing. The inherited version worked on small parts
and fell apart on large ones.

**My contribution** · On top of an inherited reference version, I **rewrote the
topology engine** and **built the labelling module from scratch** — the two
pieces the correctness of the result depended on.

**How I approached it**

- **The topology engine.** The inherited approach started from a discrete
  representation that introduced geometric artefacts and made the result depend
  on sampling parameters. The root cause was the representation, not the
  parameter tuning — which is where the search had been focused until then. I
  replaced it with one that preserves the traceability of each geometric
  primitive's origin: the result stops being ambiguous **by construction**,
  rather than being corrected after the fact. I added contour preprocessing to
  remove geometry that would otherwise produce results to be discarded, and a
  scaling of the space for numerical stability.
- **The labelling.** The original algorithm propagated **relatively**: an early
  error was dragged through the whole result, and areas unreachable from the
  starting point were left unidentified. I redesigned it so each element derives
  its identity from verifiable local invariants rather than a chain of
  dependencies, so **errors stay bounded instead of propagating**.
- **Questioning the metric.** The obvious comparison was resembling the previous
  algorithm; measuring it showed that the previous one produced duplicate
  identifiers and row jumps. I changed the criterion to **internal consistency**
  — gaps, ordering breaks, duplicates — instead of using the earlier system as
  judge.
- **An engineering logbook** with the diagnosis, the changes and the discarded
  hypotheses, so as not to repeat them.
- Explicitly flagging low-confidence results instead of silently discarding them,
  and caching keyed by input hash plus schema version, with its limitation
  documented: the key detects data changes, not code changes.

**Outcome** · In use in the client's workflow. From my own logbook, across a set
of real parts of widely varying complexity — more than an order of magnitude
between the smallest and the largest:

- **Zero unidentified elements, zero duplicates and zero overlaps** across every
  part evaluated. The previous algorithm left a significant fraction
  unidentified and generated duplicates on the larger parts.
- Labelling time: **reduced by an order of magnitude**. Data preparation for
  analysis, via caching: **from minutes to fractions of a second**.
- Agreement with the previous algorithm is not total, and that is not a loss of
  quality: the previous one was numbering incorrectly. On small parts my version
  is always right.
- A good part of the work was spotting **implicit assumptions in the input data
  that nobody had documented** — an identifier that looked like a coordinate and
  was not. Correcting that interpretation produced the single largest improvement
  in the project.
- Absolute time and volume figures are covered by confidentiality.
