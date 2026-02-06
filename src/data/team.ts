export interface Socials {
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
}

export interface Doctor {
  name: string;
  role: string;
  image: string;
  socials: Socials;
}

export const doctors: Doctor[] = [
  {
    name: "Dr. Unknown",
    role: "Chief Medical Officer",
    image: "/mednova_pro_2.jpg",
    socials: { facebook: "#", twitter: "#", linkedin: "#", instagram: "#" }
  },
  {
    name: "Dr. Unknown",
    role: "Lifestyle Medicine Specialist",
    image: "/mednova_pro_2.jpg",
    socials: { facebook: "#", twitter: "#", linkedin: "#", instagram: "#" }
  },
  {
    name: "Dr. Unknown",
    role: "Public Health Consultant",
    image: "/mednova_pro_4.jpg",
    socials: { facebook: "#", twitter: "#", linkedin: "#", instagram: "#" }
  },
  {
    name: "Dr. Unknown",
    role: "Wellness Coach",
    image: "/mednova_pro_4.jpg",
    socials: { facebook: "#", twitter: "#", linkedin: "#", instagram: "#" }
  }
];
