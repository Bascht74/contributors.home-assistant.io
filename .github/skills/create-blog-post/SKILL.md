---
name: create-blog-post
description: Use this if the user wants to convert a blog post draft, such as a Google Docs Markdown export, into a blog post for the Home Assistant contributors website.
---

# Create blog post

Convert a draft Markdown file into a blog post for this site.

## Usage

Place the draft in a `create-blog-post/` directory in the project root, together with its images, then run `/create-blog-post`. The directory is temporary: remove it after the post is created.

## Draft format

```markdown
# Metadata

**Blog title:** Your blog title

**Author:** Author Name

**Publish date:** DD-MM-YYYY

**Areas:** Core and integrations, Frontend

**Description** (120-158 characters):
What readers will find, and why they should read it.

# Blog notes/preparations

☝️ Any lines with the pointer emoji are instructions and are removed.

# Blog content

Your intro paragraph here...

![][image1]

Rest of the content...
```

## Conversion process

### 1. Pre-process the draft

Google Docs exports embed images as base64 at the bottom of the file, which can make the file very large. Strip them before reading the draft:

```shell
sed -i '/^\[image[0-9]*\]: <data:/d' "create-blog-post/draft.md"
```

Only read the draft after this command completes.

### 2. Parse the metadata

- Extract the title, authors, publish date, areas, and description.
- Map each area name to its ID in `BLOG_TOPIC_IDS` of `src/data/blog-topics.ts`: the areas of the site, plus topics of the blog itself, like `announcements`. If an area does not match, stop and ask the user.
- Generate the slug from the title: lowercase, hyphens for spaces, no special characters.
- Remove the "# Blog notes/preparations" section and every line that starts with the ☝️ emoji.

### 3. Process the images

- Images referenced as `![][image2]` are named `image2.*` in `create-blog-post/`.
- Convert each image to WebP with a maximum width of 1200 pixels, using `cwebp -resize 1200 0 -q 85 input -o output.webp`. If `cwebp` is missing, ask the user to install it.
- Place the images in `src/content/blog/images/YYYY-MM-slug/` and reference them with a relative path from the post, so Astro optimizes them.
- Use the image caption or the surrounding text for the alt text. If neither describes the image, ask the user.

### 4. Clean the content

- Remove bold formatting from headings.
- Content starts at heading level 2. If the draft starts at level 1, demote all headings one level.
- Keep links as Markdown links. Rewrite links to contributors.home-assistant.io as absolute paths, like `/design/`.
- Strip stray escape characters that Google Docs adds, but leave code blocks and inline code alone.
- Keep the author's wording, phrasing, and emojis as they are. If you spot typos or British spelling, collect them and ask the user before changing anything.

### 5. Write the post

Create `src/content/blog/YYYY-MM-DD-slug.md`:

```markdown
---
title: Your blog title
description: What readers will find, and why they should read it.
date: YYYY-MM-DD
authors:
  - Author Name
areas:
  - core
  - frontend
---

Content...
```

## Summary

After creating the post, give the user a summary:

- The title, authors, date, and areas (with the matched IDs).
- Every image: its source, its original size and format, and where it was written.
- Every notable transformation, such as removed sections, demoted headings, or rewritten links.
- Proposed text changes that need the user's approval. Do not apply them until the user confirms.
