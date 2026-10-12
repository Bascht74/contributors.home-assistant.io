// The Markdown version of every docs page, at <page URL>index.md, for
// language models and agents. See src/lib/markdown-export.ts.
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { type DocsEntry, pathOf } from "../../lib/docs";
import { pageMarkdown } from "../../lib/markdown-export";

export async function getStaticPaths() {
  const entries = await getCollection("docs");

  return entries.map((entry) => ({
    params: { slug: pathOf(entry) },
    props: { entry },
  }));
}

export async function GET({ props }: APIContext<{ entry: DocsEntry }>) {
  return new Response(await pageMarkdown(props.entry), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
