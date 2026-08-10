import { z } from "zod";

export const i18nSchema = z.object({ en: z.string().default(""), ar: z.string().default("") });

export const postInput = z.object({
  slug: z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lower-case words separated by hyphens"),
  status: z.enum(["draft", "published"]).default("draft"),
  category: i18nSchema,
  featured: z.boolean().default(false),
  // Uploads come back as a same-origin path (/api/images/<id>); a full URL is
  // still accepted so an existing S3 or CDN asset can be pasted in.
  cover: z
    .object({
      url: z
        .string()
        .max(2048)
        .refine((v) => v === "" || /^\/api\/images\/[a-f0-9]{24}$/.test(v) || /^https:\/\/\S+$/.test(v), {
          message: "Use an uploaded image or an https URL",
        }),
      alt: i18nSchema,
    })
    .default({ url: "", alt: { en: "", ar: "" } }),
  title: i18nSchema,
  excerpt: i18nSchema,
  // Arabic may be empty: a post can publish in English and fall back.
  body: i18nSchema,
  seo: z.object({ title: i18nSchema, description: i18nSchema }).default({
    title: { en: "", ar: "" },
    description: { en: "", ar: "" },
  }),
  publishedAt: z.string().datetime().nullable().optional(),
});

export const postPatch = postInput.partial();

export const loginInput = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(200),
});

export const enquiryInput = z.object({
  who: z.string().max(120).default(""),
  needs: z.array(z.string().max(160)).max(10).default([]),
  name: z.string().min(1).max(160),
  email: z.string().email(),
  company: z.string().max(160).default(""),
  message: z.string().max(5000).default(""),
  lang: z.enum(["en", "ar"]).default("en"),
});

export type PostInput = z.infer<typeof postInput>;
