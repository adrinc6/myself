import { getCollection, type CollectionEntry } from 'astro:content';
import { ui, defaultLang, languages, type Lang, type UIKey } from './ui';
import skillOrder from '../../content/skills/order.json';

type AnyCollection = 'skills' | 'education' | 'experience';
type AnyEntry = CollectionEntry<AnyCollection>;

/**
 * Translator for UI strings. Falls back to the default language, then to the
 * key itself, so a missing string is visible but never crashes the build.
 */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key] ?? key;
  };
}

/**
 * Builds an internal URL, applying both the deployment base path and the
 * language prefix. EVERY internal link must go through this helper: the site
 * is served from /myself, so a hand-written "/projects" 404s in production
 * even though it works in dev.
 */
export function localizedPath(path: string, lang: Lang): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '').replace(/\/$/, '');
  const prefix = lang === defaultLang ? '' : `/${lang}`;
  const joined = `${base}${prefix}${clean ? `/${clean}` : ''}`;
  return joined || '/';
}

/** Path to an asset in public/, with the base path applied. */
export function assetPath(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

/**
 * Reads the language out of a URL pathname, for the language switcher.
 */
export function langFromUrl(url: URL): Lang {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const rest = url.pathname.slice(base.length).replace(/^\//, '');
  const [maybeLang] = rest.split('/');
  return languages.includes(maybeLang as Lang) ? (maybeLang as Lang) : defaultLang;
}

/**
 * Content entry IDs come from the glob loader as "<slug>/index.<lang>".
 * The slug is shared across languages, which is what lets the language
 * switcher land on the same item.
 */
export function parseEntryId(id: string): { slug: string; lang: Lang } {
  const match = id.match(/^(.*)\/index\.(es|en)$/);
  if (!match) {
    throw new Error(
      `Unexpected content id "${id}". Content files must be named <slug>/index.es.md or <slug>/index.en.md`,
    );
  }
  return { slug: match[1]!, lang: match[2] as Lang };
}

export function entrySlug(entry: AnyEntry): string {
  return parseEntryId(entry.id).slug;
}

/**
 * Position of a skill in content/skills/order.json. A slug missing from the
 * list falls to the end, where the comparator sorts it alphabetically, so
 * forgetting to add a new skill hides it from nobody.
 */
function skillPosition(slug: string): number {
  const index = (skillOrder.order as string[]).indexOf(slug);
  return index === -1 ? Number.POSITIVE_INFINITY : index;
}

/**
 * Sorts entries for display.
 *
 * Skills follow the hand-maintained list in content/skills/order.json, so the
 * running order lives in one file instead of being spread across every
 * frontmatter. Education and experience keep their own `order` field and fall
 * back to most recent first.
 */
function byDisplayOrder(collection: AnyCollection) {
  return (a: AnyEntry, b: AnyEntry): number => {
    if (collection === 'skills') {
      const aPosition = skillPosition(entrySlug(a));
      const bPosition = skillPosition(entrySlug(b));
      if (aPosition !== bPosition) return aPosition < bPosition ? -1 : 1;
      return a.data.title.localeCompare(b.data.title);
    }

    const orderDiff = (a.data.order ?? 0) - (b.data.order ?? 0);
    if (orderDiff !== 0) return orderDiff;

    const aDate = 'startDate' in a.data ? a.data.startDate : undefined;
    const bDate = 'startDate' in b.data ? b.data.startDate : undefined;
    if (aDate && bDate) return bDate.localeCompare(aDate);

    return a.data.title.localeCompare(b.data.title);
  };
}

/**
 * Returns the entries of a collection for one language, sorted for display.
 *
 * If an item has no file in the requested language, its default-language file
 * is used instead and a warning is printed at build time. A pending
 * translation degrades to the other language rather than breaking the page.
 */
export async function getLocalizedCollection<C extends AnyCollection>(
  collection: C,
  lang: Lang,
): Promise<CollectionEntry<C>[]> {
  const all = await getCollection(collection, ({ data }) => import.meta.env.DEV || !data.draft);

  const bySlug = new Map<string, Partial<Record<Lang, CollectionEntry<C>>>>();
  for (const entry of all) {
    const { slug, lang: entryLang } = parseEntryId(entry.id);
    const group = bySlug.get(slug) ?? {};
    group[entryLang] = entry;
    bySlug.set(slug, group);
  }

  const resolved: CollectionEntry<C>[] = [];
  for (const [slug, group] of bySlug) {
    const entry = group[lang] ?? group[defaultLang];
    if (!entry) continue;
    if (!group[lang]) {
      console.warn(
        `[i18n] Missing "${lang}" translation for ${collection}/${slug} — falling back to "${defaultLang}".`,
      );
    }
    resolved.push(entry);
  }

  return resolved.sort(
    byDisplayOrder(collection) as (a: CollectionEntry<C>, b: CollectionEntry<C>) => number,
  );
}

/**
 * Looks up a single item by its shared slug, with the same fallback rule.
 */
export async function getLocalizedEntry<C extends AnyCollection>(
  collection: C,
  slug: string,
  lang: Lang,
): Promise<CollectionEntry<C> | undefined> {
  const entries = await getLocalizedCollection(collection, lang);
  return entries.find((entry) => entrySlug(entry) === slug);
}

/** Every distinct slug in a collection — used to build static paths. */
export async function getCollectionSlugs(collection: AnyCollection): Promise<string[]> {
  const all = await getCollection(collection, ({ data }) => import.meta.env.DEV || !data.draft);
  return [...new Set(all.map((entry) => entrySlug(entry)))];
}

/**
 * Formats a YYYY-MM range as "Jul 2023 — Presente".
 */
export function formatDateRange(
  start: string,
  end: string | undefined,
  lang: Lang,
): string {
  const format = (value: string) => {
    const [year, month] = value.split('-').map(Number);
    const date = new Date(Date.UTC(year!, month! - 1, 1));
    const label = new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-GB', {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(date);
    return label.replace(/\.$/, '');
  };

  const startLabel = format(start);
  const endLabel = end ? format(end) : ui[lang]['date.present'];
  return `${startLabel} — ${endLabel}`;
}

export { languages, defaultLang };
export type { Lang };
