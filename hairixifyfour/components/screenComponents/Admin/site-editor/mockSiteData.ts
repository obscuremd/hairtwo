// ─────────────────────────────────────────────
// components/screenComponents/Admin/site-editor/mockSiteData.ts
// ─────────────────────────────────────────────

import { SiteEditorData } from "./types";

export const MOCK_SITE_DATA: SiteEditorData = {
  global_brand: {
    siteName: "Servify",
    tagline: "Connect. Book. Done.",
    logoUrl: "",
    faviconUrl: "",
    primaryColor: "#003225",
    secondaryColor: "#3ad688",
    tertiaryColor: "#f5f5f4",
  },

  global_seo: {
    metaTitle: "Servify – Find Local Services",
    metaDescription: "Book trusted local service providers for beauty, wellness, home and more.",
    ogImage: "",
    twitterHandle: "@servify",
    canonicalUrl: "https://servify.com",
  },

  global_header: {
    ctaLabel: "Get Started",
    ctaUrl: "/register",
    ctaVisible: true,
    navLinks: [
      { id: "nl1", label: "Home",     url: "/",        external: false },
      { id: "nl2", label: "Services", url: "/services", external: false },
      { id: "nl3", label: "About",    url: "/about",    external: false },
    ],
    categories: [
      {
        id: "cat1",
        name: "Beauty",
        slug: "beauty",
        icon: "Sparkles",
        visible: true,
        subCategories: [
          { id: "sc1", name: "Hair Styling",    slug: "hair-styling",    icon: "Scissors", visible: true },
          { id: "sc2", name: "Nail Care",       slug: "nail-care",       icon: "Hand",     visible: true },
          { id: "sc3", name: "Makeup Artistry", slug: "makeup-artistry", icon: "Brush",    visible: false },
        ],
      },
      {
        id: "cat2",
        name: "Wellness",
        slug: "wellness",
        icon: "Heart",
        visible: true,
        subCategories: [
          { id: "sc4", name: "Massage Therapy", slug: "massage-therapy", icon: "Activity", visible: true },
          { id: "sc5", name: "Yoga",            slug: "yoga",            icon: "Flame",    visible: true },
        ],
      },
    ],
  },

  global_footer: {
    copyrightText: "© 2025 Servify. All rights reserved.",
    newsletterTitle: "Stay in the loop",
    newsletterBody: "Get the latest updates, tips and service recommendations.",
    showNewsletter: true,
    socialLinks: [
      { id: "sl1", platform: "instagram", url: "https://instagram.com/servify", label: "" },
      { id: "sl2", platform: "twitter",   url: "https://twitter.com/servify",   label: "" },
    ],
    footerColumns: [
      {
        id: "fc1",
        heading: "Platform",
        links: [
          { id: "fcl1", label: "Browse Services", url: "/services" },
          { id: "fcl2", label: "Become a Provider", url: "/become-provider" },
        ],
      },
      {
        id: "fc2",
        heading: "Company",
        links: [
          { id: "fcl3", label: "About Us", url: "/about" },
          { id: "fcl4", label: "Careers",  url: "/careers" },
        ],
      },
    ],
  },

  home_hero: {
    headline: "Find the best services near you",
    subheadline: "Browse hundreds of trusted local providers for beauty, wellness, home services and more.",
    heroImage: "",
    overlayOpacity: 40,
    primaryCta: "Browse Services",
    primaryCtaUrl: "/services",
    secondaryCta: "Learn More",
    secondaryCtaUrl: "/about",
    showSearchBar: true,
    searchPlaceholder: "Search for a service…",
  },

  home_features: {
    sectionTitle: "Why choose Servify?",
    sectionSubtitle: "Everything you need to book with confidence.",
    features: [
      { id: "f1", icon: "ShieldCheck", title: "Verified Providers",  description: "Every provider on the platform is verified and reviewed." },
      { id: "f2", icon: "Clock",        title: "Instant Booking",     description: "Book in minutes with real-time availability." },
      { id: "f3", icon: "Star",         title: "Trusted Reviews",     description: "Thousands of genuine reviews from real customers." },
    ],
  },

  home_cta_banner: {
    headline: "Are you a service provider?",
    bodyText: "Join hundreds of providers growing their business on Servify.",
    bgColor: "#003225",
    ctaLabel: "Become a Provider",
    ctaUrl: "/become-provider",
    ctaVariant: "outline",
    image: "",
  },

  home_testimonials: {
    sectionTitle: "What our customers say",
    sectionSubtitle: "Real stories from real people.",
    testimonials: [
      { id: "t1", quote: "Found an amazing hair stylist within 5 minutes. Absolutely love this app!", name: "Ama Serwaa", role: "Client", avatar: "", rating: 5 },
      { id: "t2", quote: "Servify has tripled my bookings in just two months.", name: "Kwesi Boateng", role: "Provider", avatar: "", rating: 5 },
    ],
  },

  about_hero: {
    headline: "We're building a better way to find services.",
    body: "Servify was founded with a simple mission: make it easy for everyone to find and book trusted local services.",
    heroImage: "",
  },

  about_team: {
    sectionTitle: "Meet the team",
    members: [
      { id: "m1", name: "Kofi Asante", role: "Co-Founder & CEO", bio: "Passionate about connecting people with great services.", photo: "", linkedIn: "" },
      { id: "m2", name: "Abena Mensah", role: "Head of Product",  bio: "Obsessed with building intuitive, delightful products.",   photo: "", linkedIn: "" },
    ],
  },
};
