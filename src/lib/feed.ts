import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { SITE } from "../data/site";
import { type BlogPost, postHref } from "./blog";

export function buildFeed(
  context: APIContext,
  posts: BlogPost[],
  title: string,
  description: string,
): Promise<Response> {
  return rss({
    title,
    description,
    site: context.site ?? SITE.repository,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postHref(post),
      categories: post.data.areas,
    })),
  });
}
