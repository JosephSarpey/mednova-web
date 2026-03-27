import {
  Heart,
  Apple,
  Brain,
  Activity,
  Dumbbell,
  Moon,
  Leaf,
  ShieldCheck,
  Users,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

export type ResourceType =
  | "Article"
  | "Guide"
  | "Whitepaper"
  | "Video"
  | "Infographic"
  | "Toolkit";

export interface Resource {
  title: string;
  description: string;
  type: ResourceType;
  category: string;
  readTime?: string;
  href: string;
  featured?: boolean;
}

export interface ResourceCategory {
  slug: string;
  label: string;
  icon: LucideIcon;
  description: string;
}

export const resourceCategories: ResourceCategory[] = [
  {
    slug: "all",
    label: "All Resources",
    icon: Stethoscope,
    description: "Browse our full collection of health and wellness resources.",
  },
  {
    slug: "lifestyle-medicine",
    label: "Lifestyle Medicine",
    icon: Heart,
    description:
      "Evidence-based approaches to preventing and treating chronic disease through lifestyle interventions.",
  },
  {
    slug: "nutrition",
    label: "Nutrition & Diet",
    icon: Apple,
    description:
      "Guides on balanced nutrition, dietary planning, and food as medicine.",
  },
  {
    slug: "mental-health",
    label: "Mental Health",
    icon: Brain,
    description:
      "Resources for understanding and improving mental well-being, stress management, and resilience.",
  },
  {
    slug: "chronic-disease",
    label: "Chronic Disease",
    icon: Activity,
    description:
      "Information on managing and preventing chronic conditions like diabetes, hypertension, and heart disease.",
  },
  {
    slug: "fitness",
    label: "Physical Activity",
    icon: Dumbbell,
    description:
      "Tips, plans, and research on exercise for all fitness levels and health conditions.",
  },
  {
    slug: "sleep",
    label: "Sleep & Recovery",
    icon: Moon,
    description:
      "Best practices for quality sleep and recovery to support overall health.",
  },
  {
    slug: "preventive-care",
    label: "Preventive Care",
    icon: ShieldCheck,
    description:
      "Screenings, vaccinations, and proactive health measures to stay ahead of illness.",
  },
  {
    slug: "community-health",
    label: "Community Health",
    icon: Users,
    description:
      "Resources focused on public health initiatives, advocacy, and community wellness programs.",
  },
  {
    slug: "holistic-wellness",
    label: "Holistic Wellness",
    icon: Leaf,
    description:
      "Integrative approaches combining conventional and complementary health practices.",
  },
];

export const resources: Resource[] = [
  // ── Lifestyle Medicine ──
  {
    title: "The Six Pillars of Lifestyle Medicine",
    description:
      "A comprehensive guide to the six evidence-based pillars—nutrition, physical activity, sleep, stress management, social connections, and avoidance of risky substances—that form the foundation of lifestyle medicine.",
    type: "Guide",
    category: "lifestyle-medicine",
    readTime: "12 min read",
    href: "/contact",
    featured: true,
  },
  {
    title: "How Lifestyle Changes Can Reverse Chronic Disease",
    description:
      "Research-backed evidence showing how targeted lifestyle interventions can halt and even reverse conditions like type 2 diabetes and cardiovascular disease.",
    type: "Whitepaper",
    category: "lifestyle-medicine",
    readTime: "18 min read",
    href: "/contact",
  },
  {
    title: "Building Healthy Habits That Stick",
    description:
      "Practical strategies rooted in behavioral science to help you create and maintain lasting health-positive habits in your daily routine.",
    type: "Article",
    category: "lifestyle-medicine",
    readTime: "7 min read",
    href: "/contact",
  },

  // ── Nutrition & Diet ──
  {
    title: "Nutrition Essentials: A Beginner's Guide",
    description:
      "Everything you need to know about macronutrients, micronutrients, and creating a balanced plate for optimal health and energy throughout the day.",
    type: "Guide",
    category: "nutrition",
    readTime: "10 min read",
    href: "/contact",
    featured: true,
  },
  {
    title: "Anti-Inflammatory Foods for Better Health",
    description:
      "Discover the top anti-inflammatory foods and how to incorporate them into your meals to reduce chronic inflammation and support immune function.",
    type: "Infographic",
    category: "nutrition",
    readTime: "5 min read",
    href: "/contact",
  },
  {
    title: "Managing Diabetes Through Diet",
    description:
      "A detailed guide to dietary strategies for blood sugar management, including meal timing, glycemic index, and carbohydrate counting.",
    type: "Guide",
    category: "nutrition",
    readTime: "14 min read",
    href: "/contact",
  },

  // ── Mental Health ──
  {
    title: "Understanding Stress and Its Impact on the Body",
    description:
      "Learn how chronic stress affects your cardiovascular, immune, and digestive systems—and actionable techniques to break the stress cycle.",
    type: "Article",
    category: "mental-health",
    readTime: "8 min read",
    href: "/contact",
    featured: true,
  },
  {
    title: "Mindfulness & Meditation Starter Kit",
    description:
      "A practical toolkit with guided exercises, journal prompts, and weekly plans to help you begin a sustainable mindfulness practice.",
    type: "Toolkit",
    category: "mental-health",
    readTime: "6 min read",
    href: "/contact",
  },
  {
    title: "Mental Health in the Workplace",
    description:
      "Strategies for employers and employees to foster mentally healthy work environments, reduce burnout, and promote psychological safety.",
    type: "Whitepaper",
    category: "mental-health",
    readTime: "15 min read",
    href: "/contact",
  },

  // ── Chronic Disease ──
  {
    title: "Heart Disease Prevention: What You Need to Know",
    description:
      "Key risk factors, warning signs, and preventive measures for cardiovascular disease—the leading cause of death globally.",
    type: "Article",
    category: "chronic-disease",
    readTime: "9 min read",
    href: "/contact",
  },
  {
    title: "Hypertension Management Guide",
    description:
      "A complete overview of blood pressure management including lifestyle modifications, dietary approaches (DASH diet), and monitoring best practices.",
    type: "Guide",
    category: "chronic-disease",
    readTime: "11 min read",
    href: "/contact",
    featured: true,
  },
  {
    title: "Living Well With Type 2 Diabetes",
    description:
      "Daily management strategies, meal planning tips, exercise guidelines, and latest research on living a full life with type 2 diabetes.",
    type: "Video",
    category: "chronic-disease",
    readTime: "22 min watch",
    href: "/contact",
  },

  // ── Fitness ──
  {
    title: "Exercise Prescription for Beginners",
    description:
      "A structured plan to safely start an exercise routine, covering warm-ups, progressive overload, and recovery for people of all fitness levels.",
    type: "Guide",
    category: "fitness",
    readTime: "10 min read",
    href: "/contact",
  },
  {
    title: "The Science of Walking for Health",
    description:
      "Why walking is one of the most underrated forms of exercise and how just 30 minutes a day can dramatically improve cardiovascular and mental health.",
    type: "Article",
    category: "fitness",
    readTime: "6 min read",
    href: "/contact",
  },

  // ── Sleep ──
  {
    title: "Sleep Hygiene: Your Complete Guide",
    description:
      "Evidence-based tips for improving sleep quality, from optimizing your bedroom environment to establishing a consistent pre-sleep routine.",
    type: "Guide",
    category: "sleep",
    readTime: "8 min read",
    href: "/contact",
    featured: true,
  },
  {
    title: "How Sleep Affects Your Immune System",
    description:
      "Explore the critical connection between quality sleep and immune function, and learn why skimping on rest makes you more vulnerable to illness.",
    type: "Article",
    category: "sleep",
    readTime: "7 min read",
    href: "/contact",
  },

  // ── Preventive Care ──
  {
    title: "Recommended Health Screenings by Age",
    description:
      "A comprehensive chart of recommended preventive screenings, vaccinations, and check-ups organized by age group and risk factors.",
    type: "Infographic",
    category: "preventive-care",
    readTime: "4 min read",
    href: "/contact",
  },
  {
    title: "Vaccination Guide for Adults",
    description:
      "Stay up-to-date on adult immunizations—what vaccines you need, when to get them, and how they protect you and your community.",
    type: "Guide",
    category: "preventive-care",
    readTime: "9 min read",
    href: "/contact",
  },

  // ── Community Health ──
  {
    title: "Advocating for Public Health in Your Community",
    description:
      "A practical guide to grassroots health advocacy, including how to organize health drives, partner with local organizations, and influence policy.",
    type: "Toolkit",
    category: "community-health",
    readTime: "13 min read",
    href: "/contact",
  },
  {
    title: "Health Equity: Bridging the Gap",
    description:
      "An in-depth look at health disparities, social determinants of health, and what communities can do to promote equitable access to care.",
    type: "Whitepaper",
    category: "community-health",
    readTime: "16 min read",
    href: "/contact",
    featured: true,
  },

  // ── Holistic Wellness ──
  {
    title: "Integrative Approaches to Pain Management",
    description:
      "Exploring complementary therapies—acupuncture, yoga, cognitive behavioral therapy—alongside conventional treatment for chronic pain.",
    type: "Article",
    category: "holistic-wellness",
    readTime: "10 min read",
    href: "/contact",
  },
  {
    title: "The Power of Social Connection for Health",
    description:
      "Research shows strong social ties rival diet and exercise in their impact on longevity. Learn how to nurture meaningful relationships for better health.",
    type: "Article",
    category: "holistic-wellness",
    readTime: "7 min read",
    href: "/contact",
  },
];
