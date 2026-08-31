---
title: From model to service
summary: "Turning a model that works locally into something somebody else can use: an API, an interface and a reasonable response time."
category: Data & AI
tech: [Python, FastAPI, ONNX Runtime, JavaScript]
---

## What I can do

- Take a model that works in a notebook and turn it into **a service with an
  API**, so an analysis can be requested rather than a script executed.
- Serve the model in an **interchange format (ONNX Runtime)** instead of
  dragging the whole training framework into production.
- Separate **training and deployment dependencies**.
- Build the **visualisation frontend** so the result is interpretable by whoever
  is going to look at it.
- **Curate the input set**: separate what can be processed from what cannot.

## Good practices

- **An inference runtime independent of the training framework**: production
  does not need the environment the model was trained in.
- **Deployment dependencies declared separately** and in CPU version, rather
  than reusing GPU-accelerated training ones.
- **The model loaded once** and reused across requests, instead of re-reading it
  on every call.
- **An interface that explains the parameters** instead of showing bare numbers:
  a result nobody can read is worth nothing.
- **Validation of admissible inputs** before processing them.

## When I use it

- As soon as somebody who did not write the model needs to use it. A script only
  its author runs is not a product.
- **An interchange format** when the training framework is heavy or awkward to
  install on the server: almost always.
- The interface earns its place as soon as the result has to be **reviewed by a
  person**, not consumed by another system.

![From trained model to service](./assets/modelo-a-servicio.svg)
