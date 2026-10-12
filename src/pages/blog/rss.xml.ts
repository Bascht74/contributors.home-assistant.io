import type { APIContext } from "astro";
import { SITE } from "../../data/site";
import { getPosts } from "../../lib/blog";
import { buildFeed } from "../../lib/feed";

export async function GET(context: APIContext) {
  return buildFeed(
    context,
    await getPosts(),
    `${SITE.title} blog`,
    "News for everyone who contributes to Home Assistant.",
  );
}
