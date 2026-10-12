// The index of the site for language models and agents. See src/lib/llms.ts.
import { llmsIndex } from "../lib/llms";

export async function GET() {
  return new Response(await llmsIndex(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
