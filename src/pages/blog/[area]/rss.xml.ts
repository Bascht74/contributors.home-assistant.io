import type { APIContext } from "astro";
import { BLOG_TOPICS, type BlogTopic } from "../../../data/blog-topics";
import { SITE } from "../../../data/site";
import { getPosts } from "../../../lib/blog";
import { buildFeed } from "../../../lib/feed";

// One feed per area, and per topic of the blog, so people only follow what
// they work on.
export function getStaticPaths() {
  return BLOG_TOPICS.map((topic) => ({ params: { area: topic.id }, props: { area: topic } }));
}

export async function GET(context: APIContext) {
  const { area } = context.props as { area: BlogTopic };
  const posts = (await getPosts()).filter((post) =>
    post.data.areas.includes(area.id),
  );

  return buildFeed(
    context,
    posts,
    `${SITE.title} blog: ${area.title}`,
    `News for contributors to ${area.title}.`,
  );
}
