// The llms.txt files: an index of the site for language models and agents,
// following https://llmstxt.org/. Everything comes from the collections and
// src/data/areas.ts, so a new page or area shows up by itself.
//
// - /llms.txt: every area with its pages, or its starting points when the
//   area is large.
// - /<area>/llms.txt: every page of one area.
// - /llms-full.txt and /<area>/llms-full.txt: the full text of the pages.
import { getCollection } from "astro:content";
import { AREAS, type Area } from "../data/areas";
import { SITE } from "../data/site";
import { buildSidebar, type DocsEntry, getAreaEntries, hrefOf, markdownHref, type NavNode, pathOf } from "./docs";
import { absoluteUrl, pageMarkdown } from "./markdown-export";

// Areas with more pages than this only list their starting points in
// /llms.txt, and point to their own file for the rest.
const LARGE_AREA = 30;

// The glossary is reference: /llms.txt lists it under "Optional", the
// section an agent can skip when it is short on room.
const OPTIONAL_AREAS = ["glossary"];

export interface OrderedPage {
  entry: DocsEntry;
  // The sidebar groups the page is in, outermost first.
  groups: string[];
}

// Every page of an area, in the order of its sidebar.
export async function areaPages(areaId: string): Promise<OrderedPage[]> {
  const entries = await getAreaEntries(areaId);
  const byHref = new Map(entries.map((entry) => [hrefOf(entry), entry]));
  const pages: OrderedPage[] = [];

  const walk = (nodes: NavNode[], groups: string[]) => {
    for (const node of nodes) {
      // A collapsed folder links to its overview, which is also its first
      // child. Its children are the pages, like in pagination().
      const entry = node.href && !node.collapsed ? byHref.get(node.href) : undefined;
      if (entry) {
        pages.push({ entry, groups });
      }
      if (node.children.length > 0) {
        walk(node.children, [...groups, node.label]);
      }
    }
  };
  walk(await buildSidebar(areaId, ""), []);

  return pages;
}

function pageLink(entry: DocsEntry): string {
  return `- [${entry.data.title}](${absoluteUrl(markdownHref(entry))}): ${entry.data.description}`;
}

function areaLinks(area: Area): string {
  return `The pages of this area: [${area.title}](${absoluteUrl(`/${area.id}/llms.txt`)}). Their full text: [${area.title}, full text](${absoluteUrl(`/${area.id}/llms-full.txt`)}).`;
}

// The overview, the pages at the top of the area, like "Your first
// contribution" and "How it works", and the overview of every folder.
function isStartingPoint({ entry, groups }: OrderedPage): boolean {
  const isFolderOverview = /(^|\/)index\.mdx?$/.test(entry.filePath ?? "") && pathOf(entry).split("/").length === 2;
  return groups.length === 0 || isFolderOverview;
}

export async function llmsIndex(): Promise<string> {
  const lines = [
    `# ${SITE.title}`,
    "",
    `> ${SITE.description} This is the contributor site of Home Assistant, the open source home automation platform, for everyone who contributes: developers, designers, documentation writers, translators, community moderators, and the people who run releases. It replaces developers.home-assistant.io, design.home-assistant.io, and data.home-assistant.io.`,
    "",
    `Every page is also available as Markdown: add \`index.md\` to its URL, like ${absoluteUrl("/core/integrations/config-flow/index.md")}. The links below go to those Markdown versions. Each area has its own list of all its pages at \`/<area>/llms.txt\`, and the full text of its pages at \`/<area>/llms-full.txt\`. The full text of every page of the site is in ${absoluteUrl("/llms-full.txt")}. That file is large, so prefer the file of the area you need.`,
  ];

  for (const area of AREAS.filter((area) => !OPTIONAL_AREAS.includes(area.id))) {
    const pages = await areaPages(area.id);
    if (pages.length === 0) {
      continue;
    }

    lines.push("", `## ${area.title}`, "", area.description);

    if (pages.length > LARGE_AREA) {
      lines.push(
        "",
        `This area has ${pages.length} pages. Below are its starting points. ${areaLinks(area)}`,
        "",
        ...pages.filter(isStartingPoint).map(({ entry }) => pageLink(entry)),
      );
    } else {
      lines.push("", ...pages.map(({ entry }) => pageLink(entry)), "", areaLinks(area));
    }
  }

  lines.push(
    "",
    "## Optional",
    "",
    `- [Blog](${absoluteUrl("/blog/")}): News for everyone who contributes to Home Assistant. The feed is at ${absoluteUrl("/blog/rss.xml")}.`,
  );

  for (const area of AREAS.filter((area) => OPTIONAL_AREAS.includes(area.id))) {
    const pages = await areaPages(area.id);
    const overview = pages.find(({ groups }) => groups.length === 0);
    if (overview) {
      lines.push(pageLink(overview.entry));
    }
    lines.push(
      `- [${area.title}, every page](${absoluteUrl(`/${area.id}/llms.txt`)}): Every page of the ${area.title.toLowerCase()}, with its description.`,
      `- [${area.title}, full text](${absoluteUrl(`/${area.id}/llms-full.txt`)}): The full text of every page of the ${area.title.toLowerCase()}.`,
    );
  }

  return `${lines.join("\n").replace(/\n{3,}/g, "\n\n")}\n`;
}

export async function areaLlmsIndex(area: Area): Promise<string> {
  const pages = await areaPages(area.id);
  const lines = [
    `# ${area.title}`,
    "",
    `> ${area.description}`,
    "",
    `An area of ${SITE.title}, the contributor site of Home Assistant. The index of the whole site is at ${absoluteUrl("/llms.txt")}. The links below go to the Markdown version of each page, in the order of the sidebar. The full text of every page of this area is in ${absoluteUrl(`/${area.id}/llms-full.txt`)}.`,
  ];

  // A heading for each sidebar group: H2 for a folder, H3 for a group
  // inside it. Pages at the top of the area go under the area's own name,
  // and when the sidebar has more of them after a folder, under the same
  // name, continued.
  let section: string | undefined;
  let subsection: string | undefined;
  let inTopLevel = false;
  let topLevelSections = 0;

  for (const { entry, groups } of pages) {
    const [folder, subgroup] = groups;

    if (!folder && !inTopLevel) {
      const heading = topLevelSections === 0 ? area.title : `${area.title}, continued`;
      lines.push("", `## ${heading}`, "");
      section = heading;
      inTopLevel = true;
      topLevelSections++;
    }
    if (folder && folder !== section) {
      lines.push("", `## ${folder}`, "");
      section = folder;
      subsection = undefined;
      inTopLevel = false;
    }
    if (subgroup && subgroup !== subsection) {
      lines.push("", `### ${subgroup}`, "");
      subsection = subgroup;
    }

    lines.push(pageLink(entry));
  }

  return `${lines.join("\n").replace(/\n{3,}/g, "\n\n")}\n`;
}

async function fullText(title: string, intro: string, entries: DocsEntry[]): Promise<string> {
  const pages = await Promise.all(entries.map((entry) => pageMarkdown(entry)));
  return `# ${title}\n\n> ${intro}\n\n${pages.join("\n---\n\n")}`;
}

export async function llmsFull(): Promise<string> {
  const entries: DocsEntry[] = [];
  for (const area of AREAS) {
    entries.push(...(await areaPages(area.id)).map(({ entry }) => entry));
  }

  return fullText(
    `${SITE.title}: full text`,
    `Every page of ${SITE.title}, area by area, in the order of the sidebar. Each page starts with its title as a heading and its URL. The index is at ${absoluteUrl("/llms.txt")}.`,
    entries,
  );
}

export async function areaLlmsFull(area: Area): Promise<string> {
  const entries = (await areaPages(area.id)).map(({ entry }) => entry);

  return fullText(
    `${area.title}: full text`,
    `Every page of the ${area.title} area of ${SITE.title}, in the order of the sidebar. Each page starts with its title as a heading and its URL. The index of this area is at ${absoluteUrl(`/${area.id}/llms.txt`)}.`,
    entries,
  );
}

// Areas with at least one page: those get their own files.
export async function areasWithPages(): Promise<Area[]> {
  const docs = await getCollection("docs");
  const used = new Set(docs.map((entry) => pathOf(entry).split("/")[0]));
  return AREAS.filter((area) => used.has(area.id));
}
