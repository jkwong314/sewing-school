import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ContentType = "projects" | "stitches" | "setup" | "reference";

export type Materials = {
  needle?: string;
  thread?: string;
  fabric?: string;
};

export type Frontmatter = {
  title: string;
  slug: string;
  difficulty?: string;
  timeMinutes?: number;
  stitches?: string[];
  materials?: Materials;
  heroImage?: string;
  status?: "published" | "draft";
  summary?: string;
};

export type ContentDoc = {
  frontmatter: Frontmatter;
  body: string;
  type: ContentType;
};

const ROOT = path.join(process.cwd(), "content");

export function listContent(type: ContentType): ContentDoc[] {
  const dir = path.join(ROOT, type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => readDoc(type, f.replace(/\.mdx$/, "")))
    .filter((d): d is ContentDoc => d !== null);
}

export function readDoc(type: ContentType, slug: string): ContentDoc | null {
  const file = path.join(ROOT, type, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = { slug, ...data } as Frontmatter;
  if (!frontmatter.title) frontmatter.title = slug;
  return { frontmatter, body: content, type };
}

export function listSlugs(type: ContentType): string[] {
  return listContent(type).map((d) => d.frontmatter.slug);
}
