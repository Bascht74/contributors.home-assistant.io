// The share card of every page, as /og/<path of the page>.png. Base.astro
// points og:image at it. See src/lib/og.ts for what is on a card, and
// src/lib/og-render.ts for how it looks.
import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { getPosts } from "../../lib/blog";
import {
  BLOG_CARD,
  type Card,
  DEFAULT_CARD,
  docsCard,
  docsCardSlug,
  HOME_CARD,
  postCard,
  postCardSlug,
} from "../../lib/og";
import { renderCard } from "../../lib/og-render";

export const getStaticPaths = (async () => {
  const cards = new Map<string, Card>([
    ["index", HOME_CARD],
    ["default", DEFAULT_CARD],
    ["blog", BLOG_CARD],
  ]);

  const add = (slug: string, card: Card) => {
    // An area called "blog" or a page called "default" would overwrite a card.
    if (cards.has(slug)) {
      throw new Error(`Two pages want the share card /og/${slug}.png.`);
    }
    cards.set(slug, card);
  };

  for (const entry of await getCollection("docs")) {
    add(docsCardSlug(entry), docsCard(entry));
  }
  for (const post of await getPosts()) {
    add(postCardSlug(post), postCard(post));
  }

  return [...cards].map(([slug, card]) => ({ params: { slug }, props: { card } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ card: Card }> = async ({ props }) => {
  const png = await renderCard(props.card);

  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
