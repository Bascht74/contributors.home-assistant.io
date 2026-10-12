// Downloads the shared referrer allow list of the Open Home Foundation and
// writes it to src/data/allowed-referrers.json. PlausibleAnalytics.astro
// inlines it into every page, so it is fetched once per build instead of
// once per page.
//
// Same approach as works-with.home-assistant.io.

import { access, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const SOURCE_URL = "https://www.openhomefoundation.org/allowed-referrers.json";
const OUTPUT = fileURLToPath(
  new URL("../src/data/allowed-referrers.json", import.meta.url),
);

function write(referrers) {
  return writeFile(OUTPUT, JSON.stringify(referrers, null, 2) + "\n");
}

async function main() {
  const response = await fetch(SOURCE_URL, {
    headers: { "User-Agent": "contributors.home-assistant.io-build" },
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  if (!Array.isArray(data) || !data.every((d) => typeof d === "string")) {
    throw new Error("payload is not an array of strings");
  }

  const referrers = data
    .map((domain) => domain.trim().toLowerCase().replace(/\.$/, ""))
    .filter((domain) => domain.length > 0);

  await write(referrers);
  console.log(`[allowed-referrers] wrote ${referrers.length} domains`);
}

// A failed fetch must never break the build. Keep the copy on disk, and only
// seed an empty list when there is none (a fresh clone without network), so
// the import in the component still resolves.
main().catch(async (error) => {
  console.warn(`[allowed-referrers] fetch failed, keeping existing file. ${error}`);

  try {
    await access(OUTPUT);
  } catch {
    await write([]);
    console.warn("[allowed-referrers] no existing file, seeded an empty list");
  }
});
