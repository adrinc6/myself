---
title: Profile measurement by computer vision
summary: "A segmentation model that worked locally, turned into a service with an API and an interface anyone can use."
sector: Aerospace
period: "2026"
status: Client review
tech: [Python, FastAPI, ONNX Runtime, JavaScript]
skills:
  - slug: puesta-en-produccion-modelos
    contribution: "Putting it into service: inference API, visualisation frontend and separation between the training and deployment environments."
---

## What I did

There was a trained segmentation model and a pipeline that reconstructed and
measured a profile's cross-section. Everything ran locally, launched by hand.
**My work was putting it into service**:

- The **inference service with an API**, so an analysis can be requested rather
  than a script executed.
- The **visualisation frontend**: file upload, profile selection, section
  thumbnails, an explanation of the parameters and a results table.
- The fix to the **thickness calculation** and its presentation, including the
  detail of the variations.
- The **curation of the input set**, separating processable files from those
  that were not.

**A colleague trained the model** and is the repository's main author: the
architecture, the training, the dataset generation and the export are theirs, as
is the geometric reconstruction pipeline. My contribution is the layer that
turns it into something usable.

## Good practices

- **An inference runtime independent** of the training framework: the model is
  served in an interchange format (ONNX), which avoids carrying the whole
  training environment into production.
- **Deployment dependencies declared separately** and in CPU version, rather
  than reusing the GPU-accelerated training ones.
- **The model loaded once** and reused across requests.
- An interface that **explains the parameters** instead of showing bare numbers.

## Outcome

Prepared for client review, with specific change requests addressed on the
sample. It went from a script its own author ran to a tool somebody else can use
without knowing the model from the inside.
