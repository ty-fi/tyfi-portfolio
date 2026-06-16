import { defineCollection, z } from 'astro:content';

const work = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    type: z.enum(['testimony', 'report', 'white-paper', 'brief', 'article', 'thesis', 'comment']),
    date: z.coerce.date(),
    employer: z.string().optional(),
    client: z.string().optional(),
    jurisdiction: z.string().optional(),
    docket_no: z.string().optional(),
    topics: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    coauthors: z.array(z.string()).default([]),
    summary: z.string(),
    pdf_url: z.string().optional(),
    canonical_url: z.string().url().optional(),
    featured: z.boolean().default(false),
  }),
});

const press = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    outlet: z.string(),
    date: z.coerce.date(),
    kind: z.enum(['citation', 'interview', 'conference-talk', 'podcast', 'video']),
    url: z.string().url(),
    quote: z.string().optional(),
    related_work: z.string().optional(),
    summary: z.string().optional(),
  }),
});

const author = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    headline: z.string(),
    location: z.string().optional(),
    current_role: z.object({
      org: z.string(),
      title: z.string(),
      url: z.string().url().optional(),
    }),
    bio_short: z.string(),
    bio_long: z.string(),
    education: z.array(
      z.object({
        degree: z.string(),
        school: z.string(),
        focus: z.string().optional(),
      })
    ),
    experience: z.array(
      z.object({
        org: z.string(),
        title: z.string(),
        start: z.string(),
        end: z.string().optional(),
      })
    ),
    contact: z.object({
      email: z.string().email().optional(),
      linkedin: z.string().url().optional(),
      github: z.string().url().optional(),
      bluesky: z.string().url().optional(),
    }),
    photo: z.string().optional(),
  }),
});

export const collections = { work, press, author };
