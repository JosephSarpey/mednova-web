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
    id: "public-health",
    slug: "public-health-consultancy",
    title: "Public Health Consultancy",
    description: "Addressing complex health challenges in communities worldwide. We partner with governments, non-profits, and private organizations to design and implement strategies that improve population health outcomes.",
    icon: "Globe",
    image: "/services/public-health-bg.jpg",
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
    icon: "BookOpen",
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
    image: "/services/healthcare-bg.jpg",
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
    image: "/services/mental-health-bg.jpg",
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
