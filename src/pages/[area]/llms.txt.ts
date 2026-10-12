// Every page of one area, for language models and agents. See
// src/lib/llms.ts.
import type { APIContext } from "astro";
import type { Area } from "../../data/areas";
import { areaLlmsIndex, areasWithPages } from "../../lib/llms";

export async function getStaticPaths() {
  return (await areasWithPages()).map((area) => ({ params: { area: area.id }, props: { area } }));
}

export async function GET({ props }: APIContext<{ area: Area }>) {
  return new Response(await areaLlmsIndex(props.area), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
