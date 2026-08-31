---
title: LLM pipelines in production
summary: "Flows that turn natural language into reliable structured data, and keep working where getting it wrong has consequences."
category: Data & AI
tech: [Python, asyncio, FastAPI, LLMs, speech transcription]
featured: true
---

## What I can do

- Break a large problem into **independent phases and fields**, rather than one
  model call doing everything.
- **Version prompts outside the code**, so they can be reviewed without a deploy.
- Force **stable JSON output** and validate it before accepting it.
- **Control cost** per call, with the token count in plain sight.
- Orchestrate async calls with `asyncio`, parallelising per field.

What sets my work apart is not getting a model to answer: it is getting it to
**not invent**, not duplicate, and to say so when the evidence is not there
rather than filling the gap.

## Good practices

- **One extractor per field**, with its own rules, so each evolves without
  touching the others.
- **Prompts in a data file** with a loader, versioned separately from the code.
- **Validation against master catalogues**: a concept that does not exist is
  never emitted.
- **Explicit deduplication** where repeating a value is a domain error.
- **Token and timing instrumentation**, switchable by environment variable.
- **Queue ordering** that puts the heaviest tasks first, so total time does not
  depend on the last one to arrive.
- **Auth token caching** with early renewal, off the event loop so it never
  blocks it.
- **The stable part of the prompt first**, so it can be cached and cost per
  call drops without touching quality.

## When I use it

- When the input is natural language and the output has to **enter another
  system**: that is where schema validation stops being optional.
- **One call per field, not one for everything**, as soon as fields have
  different rules or somebody will want to change one without touching the rest.
- When cost matters, request batching and cache usage weigh more than the choice
  of model.

![Phase and field architecture](./assets/pipeline-fases-campos.svg)
