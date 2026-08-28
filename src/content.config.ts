import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Keeps entry IDs as "<slug>/index.<lang>". The loader's default slugifier
 * would strip the dot and produce "<slug>/indexen", losing the language.
 */
const idFromPath = ({ entry }: { entry: string }) => entry.replace(/\.md$/, '');

/**
 * Content lives in /content at the repo root (not inside src/) so that it is
 * obvious where to drop the folders produced by the prompts in /prompts.
 *
 * Each item is a folder whose name is the shared slug, containing one file per
 * language: index.es.md and index.en.md. The shared slug is what lets the
 * language switcher keep the visitor on the same page across languages.
 */

// Dates are YYYY-MM strings. An omitted endDate means "still ongoing" and is
// rendered as "Presente" / "Present".
const yearMonth = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Date must be in YYYY-MM format');

const shared = {
  title: z.string(),
  summary: z.string(),
  draft: z.boolean().default(false),
};

/**
 * Skills are the backbone of the site: what I can actually do, each one
 * evidenced by the projects where I applied it. The projects live as sections
 * inside the skill's Markdown body, not as separate pages.
 *
 * Folders starting with "_" are excluded, which keeps `_raw/` (the inbox for
 * material pending processing) out of the build.
 *
 * Skills carry no `order` field: their running order lives in
 * content/skills/order.json, so reordering means editing one file.
 */
const skills = defineCollection({
  loader: glob({
    pattern: '**/index.{es,en}.md',
    base: './content/skills',
    generateId: idFromPath,
    // Ignore the raw inbox and any other underscore-prefixed folder.
    exclude: ['_*/**'],
  }),
  schema: z.object({
    ...shared,
    // Broad area used to group skills on the home page.
    category: z.string().optional(),
    // Concrete technologies backing the skill.
    tech: z.array(z.string()).default([]),
    // Headline for the card: "3 proyectos", "2 años", etc.
    level: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const education = defineCollection({
  loader: glob({
    pattern: '**/index.{es,en}.md',
    base: './content/education',
    generateId: idFromPath,
    exclude: ['_*/**'],
  }),
  schema: z.object({
    ...shared,
    order: z.number().default(0),
    institution: z.string(),
    startDate: yearMonth,
    endDate: yearMonth.optional(),
    specialty: z.string().optional(),
    location: z.string().optional(),
  }),
});

const experience = defineCollection({
  loader: glob({
    pattern: '**/index.{es,en}.md',
    base: './content/experience',
    generateId: idFromPath,
    exclude: ['_*/**'],
  }),
  schema: z.object({
    ...shared,
    order: z.number().default(0),
    company: z.string(),
    startDate: yearMonth,
    endDate: yearMonth.optional(),
    location: z.string().optional(),
    tech: z.array(z.string()).default([]),
  }),
});

export const collections = { skills, education, experience };
