import { z } from "zod";

export const i18nSchema = z.object({ en: z.string().default(""), ar: z.string().default("") });

/**
 * The same pair, optional as a whole.
 *
 * Field defaults do not make the object itself optional, so `seo: { canonical }`
 * was rejected for want of `seo.title`. Nested blocks use this so a caller can
 * send the one key it means to change.
 */
const i18n = () => i18nSchema.default({ en: "", ar: "" });

/** Uploaded path, absolute https URL, or empty. Used by the cover and the OG image. */
const imageUrl = z
  .string()
  .max(2048)
  .refine((v) => v === "" || /^\/api\/images\/[a-f0-9]{24}$/.test(v) || /^https:\/\/\S+$/.test(v), {
    message: "Use an uploaded image or an https URL",
  });

/** Free-text labels: tags and keywords. Same shape, same limits, two uses. */
const labels = z.array(z.string().trim().min(1).max(40)).max(15).default([]);

/**
 * Questions render as an accordion under the post and as FAQPage JSON-LD, so
 * one edit feeds both the page and the search result.
 */
export const faqSchema = z.object({ q: i18n(), a: i18n() });

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
    .object({ url: imageUrl.default(""), alt: i18n() })
    .default({ url: "", alt: { en: "", ar: "" } }),
  title: i18nSchema,
  excerpt: i18nSchema,
  // Arabic may be empty: a post can publish in English and fall back.
  body: i18nSchema,
  faqs: z.array(faqSchema).max(15).default([]),

  seo: z
    .object({
      title: i18n(),
      description: i18n(),
      // Falls back to the cover when blank, so most posts never set it.
      ogImage: z
        .object({ url: imageUrl.default(""), alt: i18n() })
        .default({ url: "", alt: { en: "", ar: "" } }),
      // Only for a post that first appeared somewhere else.
      canonical: z
        .string()
        .max(2048)
        .refine((v) => v === "" || /^https:\/\/\S+$/.test(v), { message: "Use an https URL" })
        .default(""),
      primaryKeyword: z.string().max(80).default(""),
      keywords: labels,
      noindex: z.boolean().default(false),
      /**
       * Article and FAQPage are generated from the post itself. This is the
       * escape hatch for anything else (HowTo, Event); a block whose @type
       * matches a generated one replaces it rather than duplicating it.
       */
      jsonLd: z.string().max(20000).default(""),
    })
    .default({
      title: { en: "", ar: "" },
      description: { en: "", ar: "" },
      ogImage: { url: "", alt: { en: "", ar: "" } },
      canonical: "",
      primaryKeyword: "",
      keywords: [],
      noindex: false,
      jsonLd: "",
    }),

  authorName: z.string().max(120).default(""),
  reviewedBy: z.string().max(120).default(""),
  tags: labels,
  /** Blank estimates from the body; a number overrides that estimate. */
  readingMinutes: z.number().int().min(1).max(120).nullable().default(null),
  publishedAt: z.string().datetime().nullable().optional(),
  /** Bumped by hand on a material edit; drives dateModified and the caption. */
  lastUpdatedAt: z.string().datetime().nullable().default(null),
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
export type Faq = z.infer<typeof faqSchema>;
