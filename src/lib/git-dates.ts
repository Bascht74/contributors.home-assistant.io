// When each page last changed, from the Git history of the repository.
//
// One `git log` for the whole content folder, read once per build, instead
// of one Git call per page. A file without commits, like a page that is not
// committed yet, gets no date, and the page shows none.
//
// A shallow clone only has the latest commit, which would give every page
// the same date. Then no page gets a date at all, rather than a wrong one.
// CI checks out the full history for this.

import { execFileSync } from "node:child_process";

let dates: Map<string, Date> | undefined;

function git(args: string[]): string {
  return execFileSync("git", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
}

function readDates(): Map<string, Date> {
  const result = new Map<string, Date>();

  try {
    if (git(["rev-parse", "--is-shallow-repository"]).trim() === "true") {
      return result;
    }

    // Newest commits first, so the first date seen for a file is its latest.
    const log = git(["log", "--format=%x00%cI", "--name-only", "--", "src/content/docs"]);
    let current: Date | undefined;

    for (const line of log.split("\n")) {
      if (line.startsWith("\0")) {
        current = new Date(line.slice(1));
      } else if (line && current && !result.has(line)) {
        result.set(line, current);
      }
    }
  } catch {
    // No Git, or not a repository: the pages simply show no date.
  }

  return result;
}

/** The date of the last commit that changed this file, if Git knows one. */
export function lastUpdated(filePath: string | undefined): Date | undefined {
  if (!filePath) {
    return undefined;
  }

  dates ??= readDates();
  return dates.get(filePath.replace(/^\.\//, ""));
}
