// ─────────────────────────────────────────────
// components/screenComponents/Admin/site-editor/config/sections.ts
//
// THIS is where you add new editable sections.
// No new components needed — just add a SectionDef here.
// ─────────────────────────────────────────────

import { SectionDef } from "./types";

export const SITE_SECTIONS: SectionDef[] = [
  // ── GLOBAL ───────────────────────────────

  {
    id: "global_brand",
    label: "Brand Identity",
    description:
      "Logo, site name, favicon and brand colors used across all pages.",
    icon: "Palette",
    group: "Global",
    fields: [
      {
        key: "siteName",
        label: "Site Name",
        type: "text",
        placeholder: "e.g. Servify",
        required: true,
      },
      {
        key: "tagline",
        label: "Tagline",
        type: "text",
        placeholder: "A short one-liner for the brand",
      },
      {
        key: "logoUrl",
        label: "Logo",
        type: "image",
        hint: "Recommended: SVG or PNG with transparent background, min 200px wide",
      },
      {
        key: "faviconUrl",
        label: "Favicon",
        type: "image",
        hint: "32×32 or 64×64 PNG",
      },
      {
        key: "primaryColor",
        label: "Primary Color",
        type: "color",
        hint: "Maps to --color-primary-c",
      },
      {
        key: "secondaryColor",
        label: "Secondary Color",
        type: "color",
        hint: "Maps to --color-secondary-c",
      },
      {
        key: "tertiaryColor",
        label: "Tertiary Color",
        type: "color",
        hint: "Maps to --color-tertiary-c",
      },
    ],
  },

  {
    id: "global_seo",
    label: "SEO & Metadata",
    description:
      "Default meta title, description and Open Graph image used site-wide.",
    icon: "SearchCode",
    group: "Global",
    fields: [
      {
        key: "metaTitle",
        label: "Default Meta Title",
        type: "text",
        placeholder: "e.g. Servify – Find Local Services",
        required: true,
      },
      {
        key: "metaDescription",
        label: "Default Meta Description",
        type: "textarea",
        placeholder: "150–160 characters recommended",
      },
      {
        key: "ogImage",
        label: "Default OG Image",
        type: "image",
        hint: "1200×630px recommended",
      },
      {
        key: "twitterHandle",
        label: "Twitter / X Handle",
        type: "text",
        placeholder: "@yourhandle",
      },
      {
        key: "canonicalUrl",
        label: "Canonical Base URL",
        type: "url",
        placeholder: "https://yoursite.com",
      },
    ],
  },

  {
    id: "global_header",
    label: "Header & Navigation",
    description:
      "Top navigation bar — logo position, CTA button, and primary nav links.",
    icon: "PanelTop",
    group: "Global",
    fields: [
      {
        key: "ctaLabel",
        label: "CTA Button Text",
        type: "text",
        placeholder: "e.g. Get Started",
      },
      {
        key: "ctaUrl",
        label: "CTA Button URL",
        type: "url",
        placeholder: "/register",
      },
      { key: "ctaVisible", label: "Show CTA Button", type: "boolean" },
      {
        key: "navLinks",
        label: "Navigation Links",
        type: "list",
        itemLabel: "Nav Link",
        itemFields: [
          {
            key: "label",
            label: "Label",
            type: "text",
            placeholder: "e.g. About",
            required: true,
          },
          {
            key: "url",
            label: "URL",
            type: "url",
            placeholder: "/about",
            required: true,
          },
          { key: "external", label: "Open in new tab", type: "boolean" },
        ],
      },
      {
        key: "categories",
        label: "Header Categories",
        type: "list",
        itemLabel: "Category",
        itemFields: [
          {
            key: "name",
            label: "Name",
            type: "text",
            placeholder: "e.g. Beauty",
            required: true,
          },
          {
            key: "slug",
            label: "Slug",
            type: "text",
            placeholder: "e.g. beauty",
            required: true,
            hint: "URL-safe, lowercase, no spaces",
          },
          {
            key: "icon",
            label: "Icon",
            type: "icon",
            placeholder: "e.g. Scissors",
          },
          { key: "visible", label: "Visible", type: "boolean" },
          {
            key: "subCategories",
            label: "Sub-categories",
            type: "list",
            itemLabel: "Sub-category",
            itemFields: [
              {
                key: "name",
                label: "Name",
                type: "text",
                placeholder: "e.g. Hair Styling",
                required: true,
              },
              {
                key: "slug",
                label: "Slug",
                type: "text",
                placeholder: "e.g. hair-styling",
                required: true,
              },
              { key: "icon", label: "Icon", type: "icon" },
              { key: "visible", label: "Visible", type: "boolean" },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "global_footer",
    label: "Footer",
    description:
      "Footer columns, social links, legal copy and newsletter opt-in.",
    icon: "PanelBottom",
    group: "Global",
    fields: [
      {
        key: "copyrightText",
        label: "Copyright Text",
        type: "text",
        placeholder: "© 2025 Servify. All rights reserved.",
      },
      {
        key: "newsletterTitle",
        label: "Newsletter Heading",
        type: "text",
        placeholder: "Stay in the loop",
      },
      { key: "newsletterBody", label: "Newsletter Body", type: "textarea" },
      {
        key: "showNewsletter",
        label: "Show Newsletter Signup",
        type: "boolean",
      },
      {
        key: "socialLinks",
        label: "Social Links",
        type: "list",
        itemLabel: "Social Link",
        itemFields: [
          {
            key: "platform",
            label: "Platform",
            type: "select",
            options: [
              { label: "Instagram", value: "instagram" },
              { label: "Twitter / X", value: "twitter" },
              { label: "Facebook", value: "facebook" },
              { label: "LinkedIn", value: "linkedin" },
              { label: "YouTube", value: "youtube" },
              { label: "TikTok", value: "tiktok" },
            ],
          },
          { key: "url", label: "URL", type: "url" },
          {
            key: "label",
            label: "Display Label",
            type: "text",
            placeholder: "Optional override",
          },
        ],
      },
      {
        key: "footerColumns",
        label: "Footer Link Columns",
        type: "list",
        itemLabel: "Column",
        itemFields: [
          {
            key: "heading",
            label: "Column Heading",
            type: "text",
            required: true,
          },
          {
            key: "links",
            label: "Links",
            type: "list",
            itemLabel: "Link",
            itemFields: [
              { key: "label", label: "Label", type: "text", required: true },
              { key: "url", label: "URL", type: "url", required: true },
            ],
          },
        ],
      },
    ],
  },

  // ── HOME PAGE ─────────────────────────────

  {
    id: "home_hero",
    label: "Hero Section",
    description:
      "The main above-the-fold banner — headline, subtext, image and CTAs.",
    icon: "Sparkles",
    group: "Home Page",
    fields: [
      {
        key: "headline",
        label: "Headline",
        type: "text",
        placeholder: "e.g. Find the best services near you",
        required: true,
      },
      {
        key: "subheadline",
        label: "Sub-headline",
        type: "textarea",
        placeholder: "Supporting line under the headline",
      },
      {
        key: "heroImage",
        label: "Hero Image",
        type: "image",
        hint: "1440×800px recommended, WebP preferred",
      },
      {
        key: "overlayOpacity",
        label: "Image Overlay Opacity",
        type: "number",
        hint: "0 = no overlay, 100 = fully dark",
      },
      {
        key: "primaryCta",
        label: "Primary CTA Text",
        type: "text",
        placeholder: "e.g. Browse Services",
      },
      {
        key: "primaryCtaUrl",
        label: "Primary CTA URL",
        type: "url",
        placeholder: "/services",
      },
      {
        key: "secondaryCta",
        label: "Secondary CTA Text",
        type: "text",
        placeholder: "e.g. Learn More",
      },
      {
        key: "secondaryCtaUrl",
        label: "Secondary CTA URL",
        type: "url",
        placeholder: "/about",
      },
      { key: "showSearchBar", label: "Show Search Bar", type: "boolean" },
      {
        key: "searchPlaceholder",
        label: "Search Placeholder",
        type: "text",
        placeholder: "e.g. Search for a service…",
      },
    ],
  },

  {
    id: "home_features",
    label: "Features / Why Us",
    description: "The section highlighting key value propositions with icons.",
    icon: "LayoutGrid",
    group: "Home Page",
    fields: [
      {
        key: "sectionTitle",
        label: "Section Title",
        type: "text",
        placeholder: "e.g. Why choose us?",
      },
      { key: "sectionSubtitle", label: "Section Subtitle", type: "textarea" },
      {
        key: "features",
        label: "Feature Cards",
        type: "list",
        itemLabel: "Feature",
        itemFields: [
          { key: "icon", label: "Icon", type: "icon", required: true },
          { key: "title", label: "Title", type: "text", required: true },
          {
            key: "description",
            label: "Description",
            type: "textarea",
            required: true,
          },
        ],
      },
    ],
  },

  {
    id: "home_cta_banner",
    label: "CTA Banner",
    description:
      "Mid-page call-to-action strip — often used for provider sign-up.",
    icon: "Megaphone",
    group: "Home Page",
    fields: [
      { key: "headline", label: "Headline", type: "text", required: true },
      { key: "bodyText", label: "Body Text", type: "textarea" },
      { key: "bgColor", label: "Background", type: "color" },
      {
        key: "ctaLabel",
        label: "CTA Text",
        type: "text",
        placeholder: "e.g. Become a Provider",
      },
      { key: "ctaUrl", label: "CTA URL", type: "url" },
      {
        key: "ctaVariant",
        label: "CTA Style",
        type: "select",
        options: [
          { label: "Filled", value: "filled" },
          { label: "Outline", value: "outline" },
          { label: "Ghost", value: "ghost" },
        ],
      },
      { key: "image", label: "Decorative Image", type: "image" },
    ],
  },

  {
    id: "home_testimonials",
    label: "Testimonials",
    description: "Social proof section with user quotes and ratings.",
    icon: "Quote",
    group: "Home Page",
    fields: [
      { key: "sectionTitle", label: "Section Title", type: "text" },
      { key: "sectionSubtitle", label: "Section Subtitle", type: "textarea" },
      {
        key: "testimonials",
        label: "Testimonials",
        type: "list",
        itemLabel: "Testimonial",
        itemFields: [
          { key: "quote", label: "Quote", type: "textarea", required: true },
          { key: "name", label: "Author Name", type: "text", required: true },
          { key: "role", label: "Role / Title", type: "text" },
          { key: "avatar", label: "Avatar Image", type: "image" },
          { key: "rating", label: "Rating (1–5)", type: "number" },
        ],
      },
    ],
  },

  // ── ABOUT PAGE ───────────────────────────

  {
    id: "about_hero",
    label: "About — Hero",
    description: "Hero section for the About page.",
    icon: "Info",
    group: "About Page",
    fields: [
      { key: "headline", label: "Headline", type: "text", required: true },
      { key: "body", label: "Body Text", type: "richtext" },
      { key: "heroImage", label: "Hero Image", type: "image" },
    ],
  },

  {
    id: "about_team",
    label: "About — Team",
    description: "Team member profiles shown on the About page.",
    icon: "Users",
    group: "About Page",
    fields: [
      { key: "sectionTitle", label: "Section Title", type: "text" },
      {
        key: "members",
        label: "Team Members",
        type: "list",
        itemLabel: "Member",
        itemFields: [
          { key: "name", label: "Name", type: "text", required: true },
          { key: "role", label: "Role", type: "text", required: true },
          { key: "bio", label: "Short Bio", type: "textarea" },
          { key: "photo", label: "Photo", type: "image" },
          { key: "linkedIn", label: "LinkedIn URL", type: "url" },
        ],
      },
    ],
  },
];

// ─── Derived helpers ─────────────────────────

export const SECTION_BY_ID = Object.fromEntries(
  SITE_SECTIONS.map((s) => [s.id, s]),
) as Record<string, SectionDef>;

export const SECTIONS_BY_GROUP = SITE_SECTIONS.reduce<
  Record<string, SectionDef[]>
>((acc, s) => {
  if (!acc[s.group]) acc[s.group] = [];
  acc[s.group].push(s);
  return acc;
}, {});

export const GROUP_ORDER = ["Global", "Home Page", "About Page"];
