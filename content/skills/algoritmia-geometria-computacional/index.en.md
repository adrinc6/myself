---
title: Algorithms and computational geometry
summary: "Custom algorithms for robust 2D geometry and structure detection in irregular shapes, with the judgement to measure whether the new one beats the old."
category: Engineering & algorithms
tech: [Python, numpy, scipy, shapely, Voronoi, NURBS]
level: 1 project · 2026
featured: true
---

## What I can do

I write custom algorithms when the standard library falls short: robust 2D
geometry, structure detection in irregular shapes, propagation over neighbourhood
graphs. I can choose the right representation of a problem — usually half the
solution — and I can measure whether a new algorithm beats the previous one
rather than assuming it.

I also know to question the baseline: if the system you are comparing against
gets things wrong, resembling it is not the goal.

## Tools and techniques

- Voronoi diagrams and space partitioning.
- Curvature detection and shape analysis.
- Robust 2D boolean operations and spatial indexing.
- Propagation over neighbourhood graphs.
- Principal component analysis, homographies and projective transforms.
- B-spline / NURBS curves for curved edges.
- Caching keyed by input hash plus schema version.
- Python, numpy, scipy, shapely.

![Propagating error versus bounded error](./assets/relativo-vs-absoluto.svg)

## Where I have done it

### Geometric analysis library · aerospace sector · 2026

This is the project where I am effectively the sole author: **27 of 29 commits**.
The rest come from an automated assistant.

**Context** · Starting from the geometric definition of a structural part, the
system has to automatically derive its internal decomposition into structural
elements, ready for manufacturing.

**What I did** · I started from an **inherited reference version** and (a)
**rewrote the topology engine** and (b) **built the labelling module from
scratch**.

*Scope*: the package's general architecture, its public API and the test suite
came with that reference version. Mine is the engine and the labelling, not the
library's original design.

**The topology engine** · The inherited approach started from a discrete
representation of the problem that introduced geometric artefacts and made the
result depend on sampling parameters. I diagnosed that **the root cause was the
representation, not the parameter tuning** — which is where the search had been
focused until then.

I replaced it with a representation that preserves the traceability of each
geometric primitive's origin, so the result stops being ambiguous **by
construction** rather than being corrected after the fact. I also added contour
preprocessing to remove geometry that would otherwise produce results to be
discarded, and a scaling of the space for numerical stability.

**The labelling** · The original algorithm propagated **relatively**: it worked on
small parts and fell apart on large ones, because an early error was dragged
through the whole result and areas unreachable from the starting point were left
unidentified.

I redesigned it so each element derives its identity from verifiable local
invariants rather than a chain of dependencies. That way **errors stay bounded
instead of propagating**.

**Good practices applied**

- An **engineering logbook** with the diagnosis, the changes and — deliberately —
  the **discarded hypotheses**, so as not to repeat them.
- **Questioning the metric**: the obvious comparison was resembling the previous
  algorithm, but measuring it showed the previous one produced duplicate
  identifiers and row jumps. I changed the criterion to **internal consistency**
  — gaps, ordering breaks, duplicates — instead of using the earlier system as
  judge.
- Explicitly flagging low-confidence results instead of silently discarding them.
- Caching keyed by input hash plus schema version, **documenting its
  limitation**: the key does not detect code changes, only data changes.

**Results** · From my own logbook, across a set of real parts of widely varying
complexity — more than an order of magnitude between the smallest and the
largest:

- **Zero unidentified elements, zero duplicates and zero overlaps** across every
  part evaluated. The previous algorithm left a significant fraction
  unidentified and generated duplicates on the larger parts.
- Labelling time: **reduced by an order of magnitude**.
- Data preparation for analysis, via caching: **from minutes to fractions of a
  second**.
- **An important and deliberate caveat**: agreement with the previous algorithm
  is not total, and that is **not a loss of quality**: the previous one was
  numbering incorrectly. On small parts my version is always right and it was the
  previous one that failed.
- A good part of the work was spotting **implicit assumptions in the input data
  that nobody had documented**: an identifier that looked like a coordinate and
  was not. Correcting that interpretation produced the single largest improvement
  in the project.
- The absolute time and volume figures belong to the client and are not
  published.

**What was missing** · The reference version came with a broad test suite and
development cut it down drastically. Losing that coverage is the project's most
serious technical debt, and it is mine. There is also module duplication from a
half-finished refactor.

**In real use** · Yes, in the client's workflow.
