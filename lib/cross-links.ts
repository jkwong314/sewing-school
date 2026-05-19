import { listContent, type ContentDoc } from "./content";

export function projectsUsingStitch(stitchSlug: string): ContentDoc[] {
  return listContent("projects").filter((p) =>
    (p.frontmatter.stitches ?? []).includes(stitchSlug),
  );
}

export function projectsUsingMaterial(
  kind: keyof NonNullable<ContentDoc["frontmatter"]["materials"]>,
  value: string,
): ContentDoc[] {
  return listContent("projects").filter(
    (p) => p.frontmatter.materials?.[kind] === value,
  );
}
