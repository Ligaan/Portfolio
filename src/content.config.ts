import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    summary: z.string(),
    thumbnail: z.string(),
    team: z.string().optional(),   // e.g. "Team of ~10" or "Solo project"
    featured: z.boolean().default(false),
    order: z.number().default(0),
    links: z.object({
      github: z.string().optional(),
      itch: z.string().optional(),
      video: z.string().optional(),
    }).optional(),
  }),
});

export const collections = { projects };