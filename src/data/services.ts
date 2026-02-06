export interface ServiceItem {
  name: string;
  subItems?: string[];
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string; 
  items: ServiceItem[];
  image: string; 
}

export const services: Service[] = [
  {
    id: "general-health-wellness",
    slug: "general-health-wellness",
    title: "General Health and Wellness Services",
    description: "Because we are aware that about 60% of all diseases condition including cancer are as a result of lifestyle and behavior, we adapt to an evidence-based, data-driven approach to helping you relieve suffering.",
    icon: "HeartPulse",
    image: "/services/healthcare-bg.jpg",
    items: [
      {
        name: "Medically-Led Consultations",
        subItems: [
          "Evidence based, data-driven Medically-Led Consultations",
          "Discuss medical issues you may have relating to the management of your illness.",
          "This is not a second opinion service, but rather to support you with the issues that are of concern to you."
        ]
      },
      {
        name: "Emotional and Psychological Well-being coaching",
        subItems: [
          "We will help you gain psychological flexibility to connect with the life that matters to you despite the fears and uncertainties that life brings."
        ]
      },
      {
        name: "Lifestyle care",
        subItems: [
          "A healthy lifestyle is a cornerstone of wellbeing.",
          "We will guide you in making informed choices about nutrition, exercise, stress management, sleep and self-care practices.",
          "Our goal is provide a holistic health care to empower you to take control of your health and nurture your body, mind and soul."
        ]
      },
      {
        name: "Education and Empowerment",
        subItems: [
          "Knowledge is power.",
          "We will provide you with reliable information rooted in evidence, resources, and educational materials to enhance your understanding of your condition and treatment options.",
          "With this knowledge, you will be equipped to actively participate in your care and make informed decisions."
        ]
      }
    ]
  },
  {
    id: "public-health",
    slug: "public-health-consultancy",
    title: "Public Health Consultancy",
    description: "Addressing complex health challenges in communities worldwide. We partner with governments, non-profits, and private organizations to design and implement strategies that improve population health outcomes.",
    icon: "HandHeart",
    image: "/services/public-health-bg_new.jpg",
    items: [
      { name: "Program Development and Evaluation" },
      { name: "Policy Analysis and Advocacy" },
      { name: "Community Health Assessments" },
      { name: "Epidemiological Research" }
    ]
  },
  {
    id: "education-research",
    slug: "education-training-research",
    title: "Education, Training & Research",
    description: "Empowerment thrives on knowledge. We deliver programs to boost health awareness and skills for individuals, professionals, and entities, keeping education rooted in current science.",
    icon: "BookOpenCheck",
    image: "/services/research-bg.jpg",
    items: [
      { name: "Customized training for providers and leaders" },
      { name: "Public workshops and seminars" },
      { name: "Pioneering research in public health and mental wellness" }
    ]
  },
  {
    id: "holistic-medicine",
    slug: "holistic-lifestyle-medicine",
    title: "Holistic & Lifestyle Medicine",
    description: "True wellness integrates mind, body, and spirit. We address root causes via blended traditional and complementary care for enduring health.",
    icon: "Leaf",
    image: "/services/holistic_medicine.jpg",
    items: [
      { name: "Personalized nutrition, exercise, and habit coaching" },
      { name: "Mind-body methods (mindfulness, yoga, meditation)" },
      { name: "Preventive plans for chronic conditions" },
      { name: "Full integrative consultations" }
    ]
  },
  {
    id: "mental-health",
    slug: "psychotherapy-mental-health",
    title: "Psychotherapy & Mental Health",
    description: "Mental health underpins total well-being. We deliver empathetic, evidence-based aid for life's hurdles via licensed therapists and coaches.",
    icon: "Brain",
    image: "/services/mental_health_bg.jpg",
    items: [
      { name: "Personalized therapy (anxiety, depression, trauma)" },
      { name: "Group sessions for communal healing" },
      { name: "Coaching for resilience and coping" },
      { name: "Urgent crisis aid" }
    ]
  },
  {
    id: "dental-lab",
    slug: "dental-laboratory-services",
    title: "Dental Laboratory Services",
    description: "Supplying top-tier, custom dental products with modern tech and expert technicians. Supporting superior dental care and improving patient satisfaction.",
    icon: "Smile",
    image: "/services/dental-bg.jpg",
    items: [
      {
        name: "Custom Restorations & Appliances",
        subItems: [
          "Removable partial and full/complete dentures",
          "Bite Rims & Nightguards",
          "Essex Retainers & Flippers",
          "Denture Repairs",
          "Implant over dentures and Snap-on dentures",
          "Orthodontic Appliances"
        ]
      },
      { name: "Digital CAD/CAM Precision" },
      { name: "Advisory partnerships for service integration" }
    ]
  }
];
