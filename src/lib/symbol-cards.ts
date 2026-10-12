// What the card on a linked code symbol shows (see
// src/components/HoverCards.astro), from an index in src/data/symbols/.
// Served as /symbols/<index>.json by src/pages/symbols/.
//
// The signature is highlighted here, at build time, with Shiki and the
// themes of the code blocks: the card only puts the HTML in place. The
// signatures come formatted from `pnpm symbols`, so nothing is formatted
// in the browser either.

import { createHighlighter } from "shiki";

interface IndexSymbol {
  id: string;
  kind: string;
  qualname: string;
  module: string;
  path: string;
  line: number;
  signature: string;
  doc: string | null;
}

interface IndexHook {
  id: string;
  kind: string;
  page: string;
  signature: string;
  doc: string;
}

interface SymbolIndex {
  repository: string;
  commit: string;
  symbols: IndexSymbol[];
  hooks?: IndexHook[];
}

export interface SymbolCard {
  kind: string;
  // The line above the signature: the module, the class a method belongs
  // to, or the file of a module.
  where: string;
  // The highlighted signature, the lines of a Shiki code block.
  html: string;
  doc: string | null;
  // Where the link goes: the source on GitHub, or the page of a hook.
  source: string;
}

const highlighter = createHighlighter({ themes: ["github-light", "github-dark"], langs: ["python", "typescript"] });

// Shiki writes the colors of every token inline, like
// `style="color:#D73A49;--shiki-dark:#F97583"`. Over hundreds of
// signatures that is most of the file, so every distinct style becomes a
// short class, and the styles are sent once. The prefix keeps the classes
// of the two indexes apart on a page that shows both.
class Styles {
  readonly classes = new Map<string, string>();

  constructor(readonly prefix: string) {}

  classFor(style: string) {
    if (!this.classes.has(style)) {
      this.classes.set(style, `${this.prefix}${this.classes.size}`);
    }
    return this.classes.get(style)!;
  }

  toJSON() {
    return Object.fromEntries([...this.classes].map(([style, name]) => [name, style]));
  }
}

// The lines of the code block, without the <pre> and <code> around them.
async function highlight(code: string, lang: "python" | "typescript", styles: Styles) {
  const html = (await highlighter).codeToHtml(code, { lang, themes: { light: "github-light", dark: "github-dark" } });
  // Tokens in the plain text color of the theme need no span: they take
  // the text color of the card.
  const plain = html.match(/^<pre[^>]* style="[^"]*?(color:[^;"]+;--shiki-dark:[^;"]+)/)?.[1].toLowerCase();

  // Without the wrapper of each line: the card shows the code in a <pre>,
  // where a line break is a line break.
  return html
    .replace(/^<pre[^>]*><code>/, "")
    .replace(/<\/code><\/pre>$/, "")
    .split("\n")
    .map((line) => line.replace(/^<span class="line">/, "").replace(/<\/span>$/, ""))
    .join("\n")
    .replace(/<span style="([^"]+)">([^<]*)<\/span>/g, (_match, style: string, text: string) =>
      style.toLowerCase() === plain ? text : `<span class="${styles.classFor(style)}">${text}</span>`,
    );
}

function where(symbol: IndexSymbol, lang: "python" | "typescript") {
  if (symbol.kind === "module") {
    return symbol.path;
  }

  // A method or a field shows the class it belongs to.
  const [owner] = symbol.qualname.split(".");
  const isMember = symbol.qualname.includes(".");
  if (lang === "python") {
    return isMember ? `${symbol.module}.${owner}` : symbol.module;
  }
  return symbol.path;
}

// The cards of an index by symbol id, and the token styles they use.
export async function symbolCards(index: SymbolIndex, lang: "python" | "typescript") {
  const cards: Record<string, SymbolCard> = {};
  const styles = new Styles(lang === "python" ? "py" : "ts");

  for (const symbol of index.symbols) {
    cards[symbol.id] = {
      kind: symbol.kind,
      where: where(symbol, lang),
      html: await highlight(symbol.signature, lang, styles),
      doc: symbol.doc,
      source: `https://github.com/${index.repository}/blob/${index.commit}/${symbol.path}#L${symbol.line}`,
    };
  }

  for (const hook of index.hooks ?? []) {
    cards[hook.id] = {
      kind: hook.kind,
      where: "",
      html: hook.signature ? await highlight(hook.signature, lang, styles) : "",
      doc: hook.doc,
      source: hook.page,
    };
  }

  return { styles: styles.toJSON(), symbols: cards };
}
