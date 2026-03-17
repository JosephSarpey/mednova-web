export interface Socials {
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
}

export interface DoctorProfile {
  bio: string[];
  coreSkills?: string[];
  specialties?: string[];
  languagesSpoken?: string[];
  locationInformation?: string[];
  populationServed?: string[];
}

export interface Doctor {
  slug: string;
  name: string;
  role: string;
  image: string;
  socials: Socials;
  profile?: DoctorProfile;
}

export const doctors: Doctor[] = [
  {
    slug: "dr-edem",
    name: "Dr. P. Edem Nukunu",
    role: "Neuropsychotherapist",
    image: "/team/dr_edem.jpg",
    socials: {
      facebook: "https://www.facebook.com/share/1SXmZ9nAAc/",
      twitter: "#",
      linkedin:
        "https://www.linkedin.com/in/promise-edem-nukunu-80a57367?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "#",
    },
    profile: {
      bio: [
        "Dr. Promise Edem Nukunu MD(HM), | MPH| Cert. FMCP| NPT-C, is a Holistic Health and Integrative Medicine Practitioner/Educator. Currently he provides leadership for MedNova+ Inc. With nearly 10 years of experience in the medical/healthcare field, Promise’s expertise is multidisciplinary and across cultures spanning health & wellness, public health projects coordinating/research, Mental health and dentistry. He believes that Lifestyle/behavior is a major contributor of Chronic health challenges of individuals. Nukunu has several certifications, including a Bachelor of Science degree in Dental Sciences, Doctor of Medicine Degree in Holistic Medicine, MPH Epidemiology and Biostatics from Monroe University, New York, Cert. in NeuroPsychotherapy, as well as Certificate in Functional and Integrative Medicine from the United State. Nukunu is a trusted health practitioner and Educator with diverse skills. He has worked and collaborated with diverse clinicians including MDs, NPs, DCs, IMDs NDs and nutrition experts. His focus area is using evidence-based functional and holistic medicine practices and methodologies to tackle Chronic Diseases and Lifestyle related health challenges.",
      ],
      coreSkills: [
        "Public health Intervention planning and research focusing on epidemiology and community health.",
        "Holistic Health and Wellness",
        "Mental health",
        "Adolescent reproductive health/project management",
        "Oral/Dental Prosthetics",
        "Six Sigma application in Healthcare",
        "Epidemiology, Research and Data Analysis in Healthcare",
      ],
      specialties: [
        "Gastrointestinal- GI",
        "Anti-Aging",
        "Weight Loss",
        "Chronic Infections & Parasites",
        "Chronic diseases/illness",
        "Autoimmune Issues",
        "Stress Management",
        "Women’s Health",
        "Men’s Health",
        "Thyroid Health",
        "Immune Health",
        "Hormone Therapy-BHRT",
        "Sleep Issues/Mood Issues & Mental Health",
        "Oral Health/Dental Prosthetics",
      ],
      locationInformation: ["In Person", "Virtual"],
      populationServed: [
        "Women",
        "Men",
        "Seniors",
        "Veterans",
        "Religious Community",
        "Minority groups",
      ],
    },
  },
  {
    slug: "dr-simon",
    name: "Dr. Simon Arthur",
    role: "Lifestyle Medicine Specialist",
    image: "/team/dr_simon.jpg",
    socials: {
      facebook: "https://www.facebook.com/share/18BCtaePAC/",
      twitter: "#",
      linkedin: "#",
      instagram: "#",
    },
    profile: {
      bio: [
        "Dr. Simon Arthur, MD, GCPS, MPH, is a currently a resident Surgeon, Member of the Ghana College of Physician and Surgeons and Co-founder of MedNova in Ghana. Arthur is an accomplish Physician with over 8 years of experience in the field of Medicine, Surgery and Public Health. Arthur has diverse expertise in healthcare practice. He has worked in both the field of Gynecology and Obstetrics in addressing Maternal and child health, and in Surgery across Ghana/Africa. He is committed to healthcare and passionate in addressing access to medical care in mostly underserved communities and he believe that quality health care is a human right. Arthur is multidisciplinary across and a team player.",
      ],
      coreSkills: [
        "Public health planning and intervention",
        "Surgery",
        "Maternal Health and Childhealth",
        "Research",
      ],
      specialties: [
        "Gastrointestinal- GI",
        "Endocrinology",
        "Gynecology and Obsterics",
        "Chronic diseases management",
        "Skin Health",
        "Women’s Health",
        "Thyroid Health",
        "Men’s Health",
        "Pain Management",
        "Surgical intervention",
      ],
      locationInformation: ["In Person (Ghana)", "Virtual"],
      populationServed: [
        "Women",
        "Men",
        "Seniors",
        "Religious Community",
        "Minority groups",
      ],
    },
  },
  {
    slug: "dr-zipporah",
    name: "Dr. Zipporah Oparebea Nukunu",
    role: "Healthcare Operations Consultant and Director",
    image: "/team/dr_zipporah.jpg",
    socials: { facebook: "#", twitter: "#", linkedin: "#", instagram: "#" },
    profile: {
      bio: [
        "Zipporah Oparebea Nukunu is a dedicated and highly accomplished healthcare administrator with over 7 years of progressive experience. She currently serves as the director for MedNova+, Inc. (MedNovaPlus Inc.). In her role as the director of MedNova+, inc, Zipporah performs overall critical administrative and managerial functions, including strategic planning; organizational staff scheduling using Clairvia and ANSOS systems; HR coordination (such as HRAR forms and international liaison duties); and support for leadership with special projects and organizational planning. She excels in multitasking, crisis intervention, and ensuring compliance through certifications in HIPAA, infection control, and workplace safety.",
        'Prior to her role at MedNova+ Inc. (pronouns: "MedNovaPlus, Inc."), she had experience at North Central Bronx Hospital (NCB) (NYC Health + Hospitals) and Lincoln Hospital, in the Nursing Administration Office and Staff Development, respectively. Holding a BBA in Health Services Administration from Monroe University (Summa Cum Laude), New Rochelle, and an AAS in Medical Office Administration from Morrisville State College, including certificates in alternative medicines, she combines strong academic foundations in health policy, management, public health systems, data analytics, and medical coding with practical expertise in hospital operations. She also has valuable experience from her earlier volunteer work in the Pathology department/lab and the COVID vaccine clinic during 2021–2022 at NCB, including data visualization, competency tracking, performance improvement projects, and patient registration via Epic. Multilingual (with advanced skills in Microsoft Office, PowerBI, Tableau, Canva, and digital marketing), Zipporah is a proactive team player committed to operational excellence and community service.',
      ],
    },
  },
];
