import type { CollectionEntry } from 'astro:content';
import {
  entrySlug,
  getLocalizedCollection,
  localizedPath,
  type Lang,
} from '../i18n/utils';

/**
 * The skill/project relationship, resolved in both directions.
 *
 * It is written down in exactly one place: the `skills` array in each project's
 * frontmatter. A skill never lists its own projects, because two hand-kept
 * lists would eventually disagree — the skill side is derived here instead.
 */

/** One card in the "related" block at the foot of a detail page. */
export interface Related {
  slug: string;
  title: string;
  href: string;
  /** Why this pairing exists — the project's own `contribution` line. */
  contribution: string;
  /** Only set when the card points at a project. */
  meta?: string;
}

/** The metadata line under a project title: "salud · 2025–2026 · En producción". */
export function projectMeta(entry: CollectionEntry<'projects'>): string {
  const { sector, period, status } = entry.data;
  return [sector, period, status].filter(Boolean).join(' · ');
}

/**
 * Projects that evidence a given skill, in the projects' own display order.
 */
export async function projectsForSkill(
  skillSlug: string,
  lang: Lang,
): Promise<Related[]> {
  const projects = await getLocalizedCollection('projects', lang);

  return projects
    .filter((project) => project.data.skills.some((link) => link.slug === skillSlug))
    .map((project) => {
      const link = project.data.skills.find((item) => item.slug === skillSlug)!;
      const slug = entrySlug(project);
      return {
        slug,
        title: project.data.title,
        href: localizedPath(`projects/${slug}`, lang),
        contribution: link.contribution,
        meta: projectMeta(project),
      };
    });
}

/**
 * Skills that a given project fed, in the skills' own display order.
 *
 * Reuses the same `contribution` text as the opposite direction, which is why
 * it has to be written to read both ways: "what this project gave that skill".
 */
export async function skillsForProject(
  project: CollectionEntry<'projects'>,
  lang: Lang,
): Promise<Related[]> {
  const skills = await getLocalizedCollection('skills', lang);
  const byLink = new Map(project.data.skills.map((link) => [link.slug, link]));

  return skills
    .filter((skill) => byLink.has(entrySlug(skill)))
    .map((skill) => {
      const slug = entrySlug(skill);
      return {
        slug,
        title: skill.data.title,
        href: localizedPath(`skills/${slug}`, lang),
        contribution: byLink.get(slug)!.contribution,
      };
    });
}

/**
 * Fails the build if a project points at a skill that does not exist.
 *
 * Without this a typo in a slug silently produces a skill page missing one of
 * its projects — the kind of gap nobody notices until it has been live for
 * months. Cheap to check, so it is checked on every build.
 */
export async function assertRelationsResolve(lang: Lang): Promise<void> {
  const [skills, projects] = await Promise.all([
    getLocalizedCollection('skills', lang),
    getLocalizedCollection('projects', lang),
  ]);

  const known = new Set(skills.map(entrySlug));
  const broken: string[] = [];

  for (const project of projects) {
    for (const link of project.data.skills) {
      if (!known.has(link.slug)) {
        broken.push(`  content/projects/${entrySlug(project)} → "${link.slug}"`);
      }
    }
  }

  if (broken.length > 0) {
    throw new Error(
      `Unknown skill slug referenced by a project:\n${broken.join('\n')}\n` +
        `Known skills: ${[...known].sort().join(', ')}`,
    );
  }
}

/** Count of projects evidencing a skill, for the "3 proyectos" headline. */
export async function projectCounts(lang: Lang): Promise<Map<string, number>> {
  const projects = await getLocalizedCollection('projects', lang);
  const counts = new Map<string, number>();

  for (const project of projects) {
    for (const link of project.data.skills) {
      counts.set(link.slug, (counts.get(link.slug) ?? 0) + 1);
    }
  }

  return counts;
}
