import type { MetadataRoute } from "next";
import { listSlugs } from "@/lib/content";

const BASE = "https://sewing-school.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/projects", "/stitches", "/setup", "/reference", "/about"];
  const projects = listSlugs("projects").map((s) => `/projects/${s}`);
  const stitches = listSlugs("stitches").map((s) => `/stitches/${s}`);
  const setup = listSlugs("setup").map((s) => `/setup/${s}`);
  const reference = listSlugs("reference").map((s) => `/reference/${s}`);
  return [...staticRoutes, ...projects, ...stitches, ...setup, ...reference].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1.0 : 0.7,
  }));
}
