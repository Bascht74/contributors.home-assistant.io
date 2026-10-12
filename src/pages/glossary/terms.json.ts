// Every term of the glossary, with its short definition, for the tooltips
// on links to the glossary. See src/components/HoverCards.astro.
import { getTerms, termHref } from "../../lib/glossary";

export async function GET() {
  const terms = await getTerms();

  return Response.json(
    Object.fromEntries(
      terms.map((term) => [
        termHref(term),
        { title: term.data.title, description: term.data.description },
      ]),
    ),
  );
}
