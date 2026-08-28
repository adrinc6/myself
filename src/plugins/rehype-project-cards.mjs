/**
 * Turns each project inside a skill page into a collapsible full-width card.
 *
 * In the skill Markdown, a project is an `###` heading followed by everything up
 * to the next heading. This plugin rewrites that run of nodes into:
 *
 *   <details class="project-card">
 *     <summary>  title · meta · one-line description  </summary>
 *     <div class="project-card__body"> the rest </div>
 *   </details>
 *
 * so the page reads as a stack of project cards that open on click. It is built
 * on <details>/<summary>, so it needs no JavaScript and keyboard and
 * screen-reader support come for free.
 *
 * Two conventions in the Markdown feed the collapsed card:
 *
 *  - The heading reads `Title · sector · years`. The first segment is the card
 *    title; the rest becomes the muted metadata line.
 *  - The first paragraph after the heading is the card's description. Anything
 *    after it only shows once the card is open.
 *
 * Only skill pages are affected: education and experience keep plain Markdown.
 */

const isElement = (node, tag) => node?.type === 'element' && node.tagName === tag;

/** Blank text between block nodes, which should not count as content. */
const isBlank = (node) => node?.type === 'text' && node.value.trim() === '';

/** Plain text of a hast subtree, used to split the heading into title + meta. */
function textOf(node) {
  if (node.type === 'text') return node.value;
  if (Array.isArray(node.children)) return node.children.map(textOf).join('');
  return '';
}

const el = (tagName, properties, children = []) => ({
  type: 'element',
  tagName,
  properties,
  children,
});

const chevron = el('span', { className: ['project-card__chevron'], 'aria-hidden': 'true' }, [
  el(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 20 20',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 1.75,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
    [el('path', { d: 'M5 8l5 5 5-5' })],
  ),
]);

/**
 * Builds one card from its heading and the nodes that follow it.
 */
function buildCard(heading, body) {
  // "Title · sector · years" → bold title, muted rest.
  const [title, ...meta] = textOf(heading).split(' · ');

  const headParts = [
    // The original heading properties are kept so its anchor id survives.
    el('h3', { ...heading.properties, className: ['project-card__title'] }, [
      { type: 'text', value: title.trim() },
    ]),
  ];

  if (meta.length > 0) {
    headParts.push(
      el('span', { className: ['project-card__meta'] }, [
        { type: 'text', value: meta.join(' · ') },
      ]),
    );
  }

  // The first paragraph is the description shown while the card is closed.
  // Its children are phrasing content, so they can live inside <summary>.
  const firstIndex = body.findIndex((node) => !isBlank(node));
  let rest = body;
  if (firstIndex !== -1 && isElement(body[firstIndex], 'p')) {
    headParts.push(el('span', { className: ['project-card__desc'] }, body[firstIndex].children));
    rest = body.slice(firstIndex + 1);
  }

  headParts.push(chevron);

  return el('details', { className: ['project-card'] }, [
    el('summary', { className: ['project-card__head'] }, headParts),
    el('div', { className: ['project-card__body'] }, rest),
  ]);
}

export function rehypeProjectCards() {
  return (tree, file) => {
    const path = file?.path ?? file?.history?.[0] ?? '';
    // Only skills describe projects this way.
    if (!path.replaceAll('\\', '/').includes('/content/skills/')) return;

    const source = tree.children;
    const out = [];

    for (let i = 0; i < source.length; i++) {
      if (!isElement(source[i], 'h3')) {
        out.push(source[i]);
        continue;
      }

      const heading = source[i];
      const body = [];
      // Everything up to the next heading belongs to this project.
      while (
        i + 1 < source.length &&
        !isElement(source[i + 1], 'h2') &&
        !isElement(source[i + 1], 'h3')
      ) {
        body.push(source[++i]);
      }

      // The `---` separating projects in the Markdown is redundant now that
      // each card draws its own border.
      while (body.length > 0 && (isBlank(body.at(-1)) || isElement(body.at(-1), 'hr'))) {
        body.pop();
      }

      out.push(buildCard(heading, body));
    }

    tree.children = out;
  };
}
