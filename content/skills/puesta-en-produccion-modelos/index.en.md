---
title: Putting models into production
summary: "Turning a model that works locally into a usable service: API, interface, and an inference runtime separated from the training environment."
category: Data & AI
tech: [Python, FastAPI, ONNX Runtime, JavaScript]
level: 3 projects · 2025–2026
---

## What it solves

A model that works in a notebook is not a product. I turn it into something
somebody else can use: a service with its API, its interface and a reasonable
response time, with the training environment kept out of production and the model
served in an interchange format rather than dragging the whole training framework
along. The visualisation layer is part of the job: the result has to be
interpretable by whoever will be looking at it.

In the project where this skill applies most clearly, **the model was trained by
a colleague**. My work was putting it into service.

## Tools and techniques

- Inference service with an HTTP API.
- Running models in an interchange format, with the training environment kept out
  of production.
- Separation between training and deployment dependencies.
- Frontend for visualising results.
- Curation of the input set: separating what is processable from what is not.
- Python, FastAPI, ONNX Runtime, JavaScript.

![From trained model to service](./assets/modelo-a-servicio.svg)

## Projects

### Computer vision profile analysis · aerospace sector · 2026

A vision pipeline that ran locally by hand, turned into a service with an
interface. The model is not mine; putting it into service is.

**Context** · There was a trained vision model that identified the parts of a
structural section from its geometry, and a pipeline that reconstructed and
measured that section. Everything ran locally, executed by hand.

**My contribution** · **Putting it into service**: the inference service with an
API, so an analysis could be requested rather than a script run; the
**visualisation frontend** — input file upload, selection of the profile to
analyse, section thumbnails, an explanation of the parameters and a results
table; fixing the **thickness calculation** and its presentation, including the
detail of the variations; and the **curation of the input set**, separating
processable files from those that were not.

*Scope*: **I did not train any model**, and that is most of the project's value.
The vision models, the dataset generation and the export to the interchange
format are a colleague's work — they are the repository's main author, 18 of 22
commits against my 4. The geometric reconstruction pipeline is not mine either.

**How I approached it** · The service loads the model into an inference runtime
independent of the framework it was trained with, which avoids taking the
training environment into production. Deployment dependencies were declared
separately and in CPU versions, instead of reusing the GPU-accelerated training
ones. The model is loaded once and reused across requests, and the interface
explains the parameters rather than showing bare numbers.

**Outcome** · It was prepared for client review and specific change requests on
the sample were addressed. 4 commits out of 22; no authorised service performance
figures.

---

### AI services in production · healthcare sector · 2025–2026

Here what goes into production is not a model of my own, but a flow that consumes
an external provider's models.

**Context** · The two clinical products where I work on the extraction pipeline
expose their AI functionality as deployed Python services.

**My contribution** · The AI service of one of them is largely mine (detail in
[LLM pipelines in production](/myself/en/skills/pipelines-llm-produccion)), with
its authentication, its credential cache, its cost control and its
instrumentation.

*Scope*: deployment, infrastructure and continuous integration are handled by
colleagues. My ground is the service, not the platform hosting it.

**Outcome** · Both in production.

## Limits

- **I have not trained deep learning models on a real project.** I can read what
  the person who trained them did, integrate them and serve them, but
  architecture design, training set preparation and hyperparameter tuning are not
  part of my demonstrable experience.
- Nor have I set up deployment infrastructure or continuous integration: I have
  worked inside platforms maintained by others.
- The computer vision repository has no tests and no continuous integration, and
  carries a divergent copy of the analysis code — two versions of the same module
  in parallel. I did not introduce it, but I did not resolve it either.
