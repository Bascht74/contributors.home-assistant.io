import { type DocsEntry, getAreaEntries, hrefOf, pathOf } from "./docs";

// The terms of the glossary: every page in src/content/docs/glossary/,
// except the overview. One page per term.
export async function getTerms(): Promise<DocsEntry[]> {
  const entries = await getAreaEntries("glossary");

  return entries
    .filter((entry) => pathOf(entry) !== "glossary")
    .sort((a, b) => sortKey(a).localeCompare(sortKey(b)));
}

// The name of a term's page, like "config-entry": what `related` refers to.
export function termName(entry: DocsEntry): string {
  return pathOf(entry).split("/").pop() ?? pathOf(entry);
}

export function termHref(entry: DocsEntry): string {
  return hrefOf(entry);
}

// "The hass object" sorts under H, and "`hass`" would sort under H too.
export function sortKey(entry: DocsEntry): string {
  return entry.data.title.replace(/^(the|a|an) /i, "").replace(/[`"]/g, "").toLowerCase();
}

// The letter a term is listed under in the overview.
export function letterOf(entry: DocsEntry): string {
  const first = sortKey(entry).charAt(0).toUpperCase();
  return /[A-Z]/.test(first) ? first : "#";
}

// The terms a term lists as related. A name that is not a term is a typo,
// and fails the build, so a broken link never ships.
export async function relatedTerms(entry: DocsEntry): Promise<DocsEntry[]> {
  const names = entry.data.term?.related ?? [];
  if (names.length === 0) {
    return [];
  }

  const terms = await getTerms();
  return names.map((name) => {
    const term = terms.find((candidate) => termName(candidate) === name);
    if (!term) {
      throw new Error(
        `${entry.filePath} lists "${name}" as a related term, but there is no glossary page with that name.`,
      );
    }
    return term;
  });
}
