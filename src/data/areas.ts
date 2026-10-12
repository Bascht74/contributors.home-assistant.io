// Every area of the site, in the order they appear on the homepage.
//
// An area is a documentation space of its own: its own folder under
// src/content/docs/<id>/, its own sidebar, and its own search filter.
// Adding an area here and creating its folder is all it takes.

export type AreaGroup = "start" | "build" | "shape" | "run" | "understand";

export interface Area {
  id: string;
  title: string;
  // Shown on the homepage tile, written from the visitor's point of view.
  action: string;
  description: string;
  group: AreaGroup;
  icon: string;
}

// The groups of the homepage and the area switcher, in this order.
export const AREA_GROUPS: Record<AreaGroup, string> = {
  start: "Start here",
  build: "Build the software",
  shape: "Design, write, translate",
  run: "Run the project",
  understand: "Understand how it works",
};

export const AREAS: Area[] = [
  {
    id: "start",
    title: "Get started",
    action: "Get started",
    description: "How the project works, and how to make your first contribution.",
    group: "start",
    icon: "flag",
  },
  {
    id: "core",
    title: "Core and integrations",
    action: "Build integrations",
    description: "Python, core, and the integration platform.",
    group: "build",
    icon: "code",
  },
  {
    id: "frontend",
    title: "Frontend",
    action: "Work on the frontend",
    description: "Dashboards, panels, and dialogs.",
    group: "build",
    icon: "layout",
  },
  {
    id: "apps",
    title: "Apps",
    action: "Build apps",
    description: "Package software that runs next to Home Assistant.",
    group: "build",
    icon: "package",
  },
  {
    id: "marketplace",
    title: "Marketplace",
    action: "Share what you build",
    description: "Publish integrations, cards, themes, and blueprints for others to install.",
    group: "build",
    icon: "shopping-bag",
  },
  {
    id: "companion",
    title: "Companion apps",
    action: "Work on the companion apps",
    description: "Android, iOS, and macOS.",
    group: "build",
    icon: "smartphone",
  },
  {
    id: "os",
    title: "OS and Supervisor",
    action: "Work on the OS and Supervisor",
    description: "The operating system, boards, and updates.",
    group: "build",
    icon: "cpu",
  },
  {
    id: "design",
    title: "Design",
    action: "Design the experience",
    description: "Foundations, components, patterns, and UI text.",
    group: "shape",
    icon: "pen",
  },
  {
    id: "brand",
    title: "Brand",
    action: "Speak as Home Assistant",
    description: "Who Home Assistant is, how it sounds, and how to use its name and logo.",
    group: "shape",
    icon: "message",
  },
  {
    id: "writing",
    title: "Writing docs",
    action: "Write documentation",
    description: "The user documentation on home-assistant.io.",
    group: "shape",
    icon: "file",
  },
  {
    id: "translate",
    title: "Translations",
    action: "Translate",
    description: "Bring Home Assistant to your language.",
    group: "shape",
    icon: "globe",
  },
  {
    id: "community",
    title: "Community",
    action: "Grow the community",
    description: "Moderation, social media, and events.",
    group: "run",
    icon: "users",
  },
  {
    id: "releases",
    title: "Releases",
    action: "Test betas and releases",
    description: "Try the beta, report what breaks, and see how a release comes together.",
    group: "run",
    icon: "tag",
  },
  {
    id: "roadmap",
    title: "Roadmap",
    action: "See where we're heading",
    description: "How ideas become planned work, and where you can help shape what comes next.",
    group: "run",
    icon: "map",
  },
  {
    id: "architecture",
    title: "Architecture",
    action: "Understand the architecture",
    description: "How everything fits together, and the decisions behind it.",
    group: "understand",
    icon: "layers",
  },
  {
    id: "security",
    title: "Security",
    action: "Keep homes safe",
    description: "Report a vulnerability, and build software that protects the homes it runs in.",
    group: "understand",
    icon: "shield",
  },
  {
    id: "data",
    title: "Data",
    action: "Work with data",
    description: "Analytics and open data sets.",
    group: "understand",
    icon: "chart",
  },
  {
    id: "glossary",
    title: "Glossary",
    action: "Look up a term",
    description: "One term, one meaning. Shared by code, UI text, and docs.",
    group: "understand",
    icon: "book",
  },
];

// Pages that are not an area, but that people look for next to the areas of
// a group, like the events calendar. They show on the homepage and in the
// area switcher, after the areas of their group.
export interface Shortcut {
  title: string;
  action: string;
  description: string;
  group: AreaGroup;
  icon: string;
  href: string;
}

export const SHORTCUTS: Shortcut[] = [
  {
    title: "Events and calendar",
    action: "Join an event",
    description: "Community syncs and release days, and how to add them to your own calendar.",
    group: "run",
    icon: "calendar",
    href: "/community/reference/events/",
  },
];

// Everything a group links to: its areas first, then its shortcuts.
export function groupLinks(group: AreaGroup): (Shortcut & { id?: string })[] {
  const areas = AREAS.filter((area) => area.group === group).map((area) => ({
    ...area,
    href: `/${area.id}/`,
  }));
  return [...areas, ...SHORTCUTS.filter((shortcut) => shortcut.group === group)];
}

export function getArea(id: string): Area | undefined {
  return AREAS.find((area) => area.id === id);
}
